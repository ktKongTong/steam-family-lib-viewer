import {Env, Hono} from "hono";
import {getGamesByIds} from "@/db";
import {jwtDecode} from "jwt-decode";

import * as cheerio from 'cheerio';
import {steamAPI as steam} from "@repo/steam-proto";
import {getAccessToken} from "@/app/api/[[...routes]]/cron";
const app = new Hono()

const decodeJwt = (token: string) => {
  try {
    const decoded = jwtDecode(token)
    return decoded
  }catch (e) {
    return undefined
  }
}

app.get('/api/steam/info/:ids', async (c) => {
  const {ids} = c.req.param()
  const filteredIds = ids.split(',')
    .map(item=> parseInt(item, 10))
    .filter(item=> !Number.isNaN(item))
    .slice(0, 50)
  if(filteredIds.length > 50){
    return c.json({
      data: null,
      ok: false,
      message: "ids length should be less than 50"
    })
  }
  const games = await getGamesByIds(filteredIds)
  return c.json({
    data: games.map(game=>({...game, top20Tags: game.top20Tags.split(",")})),
    ok: true,
    message: "success",
    status: 200,
  })
})

// crawl for https://steamcommunity.com/profiles/${id}/games?tab=all
// .gameslist_config[data-profile-gameslist]
// this page need login, so we need access_token
app.get('/api/steam/player-stats/:id',async (c)=>{
  const tokenParam = c.req.query('access_token')
  const queryId = c.req.param('id')
  const possibleToken = await getAccessToken()

  const constTokenInfo = decodeJwt(possibleToken??"")
  const tokenInfo = decodeJwt(tokenParam??"")
  const user = tokenInfo?.sub ?? ''
  const constUser = constTokenInfo?.sub ?? ''
  const [tokenResp, possibleTokenResp] = await Promise.all([
    steam.common.getSteamPlayerLinkDetails({steamids: [BigInt(user)]},tokenParam ?? ""),
    steam.common.getSteamPlayerLinkDetails({steamids: [BigInt(constUser)]},possibleToken ?? ""),
  ])

  if(!tokenResp.success && !possibleTokenResp.success) {
    return c.json(tokenResp, 401)
  }
  const fetchGameProfile =async (id: string,communityToken?: string) => {
    try {
      const res =await fetch(`https://steamcommunity.com/profiles/${queryId ?? id}/games?tab=all&games_in_common=false`, {headers: {
          cookie: `steamLoginSecure=${id}%7C%7C${communityToken};`
        }
      })
      return res
    } catch (e) {
      return null
    }
  }
  const [res, possibleRes] = await Promise.all([
    fetchGameProfile(user, tokenParam),
    fetchGameProfile(constUser ?? '', possibleToken ?? ''),
  ])
  const extractData = async (res: Response | null) => {
    if(!res) {
      return Promise.reject("null response is not allowed")
    }
    const html = await res.text()
    const $ = cheerio.load(html)
    if($('.login_modal').length > 0) {
      throw new Error('Token Invalid To access data')
    }
    const data = $('#gameslist_config').attr('data-profile-gameslist')
    // html unescape &quot;
    const text = data?.replaceAll('&quot;', '"')
    // unicode decode
    const j = text?.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    })
    if(!j) {
      return null
    }
    return JSON.parse(j)
  }
  const [r, possibleR] = await Promise.allSettled([
    extractData(res),
    extractData(possibleRes)
  ])
  if(r.status === 'fulfilled' && r.value) {
    return c.json(r.value)
  } if(possibleR.status === 'fulfilled' && possibleR.value) {
    return c.json(possibleR.value)
  }
})

// crawl for https://steamcommunity.com/profiles/${id}
// and https://steamcommunity.com/profiles/${queryId}/myworkshopfiles/?section=guides
app.get('/api/steam/player-community-stats/:id',async (c)=>{
  const queryId = c.req.param('id')
  const guideRes = await fetch(`https://steamcommunity.com/profiles/${queryId}/myworkshopfiles/?section=guides`)
  const res = await fetch(`https://steamcommunity.com/profiles/${queryId}`)
  const guideHtml = await guideRes.text()
  const html = await res.text()
  const $ = cheerio.load(html)
  const $guide = cheerio.load(guideHtml)
  const data = $.extract({
    links: [
      {
        selector: '.profile_item_links a',
        value: {
          // label: {
          //   selector: '.count_link_label',
          //   value: 'innerText',
          // },
          count: {
            selector: '.profile_count_link_total',
            value: (el, key) => {
              const text = $(el).text();
              const trimmed = text.trim().replace(/,/g, '');
              const v = parseInt(trimmed)
              return Number.isNaN(v) ? 0 : v
            },
          },
        },
      },
    ],
  });
  const regex = /\s(?<total>\d+)\s/;
  const guideData = $guide.extract({
    count: {
      selector: '.workshopBrowsePagingInfo',
      value: (el, key) => {
        const text = $guide(el).text();
        const may = regex.exec(text)?.groups?.total
        const v = parseInt(may ?? '0')
        return Number.isNaN(v) ? 0 : v
      },
    }
  })
  const [, inventory, screenshots, workshop, reviews] = data.links

  return c.json({
    guide: guideData?.count??0,
    inventory: inventory?.count??0,
    screenshots: screenshots?.count??0,
    workshopItems: workshop?.count??0,
    reviews: reviews?.count??0,
  })
})
export default app