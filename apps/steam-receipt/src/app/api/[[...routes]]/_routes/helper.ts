import { Hono } from "hono";

import * as cheerio from 'cheerio';
import { steamWebStdAPI } from "@repo/steam-proto";
import { getAccessTokenFromKV } from "@/app/api/[[...routes]]/util";
import { handlerAccessToken } from "@repo/shared";
import {TokenInvalidError} from "@/app/api/[[...routes]]/errors";

const app = new Hono()


// with new generated typesafe api, no need crawl
app.get('/api/steam/player-stats/:id',async (c)=>{
  const queryId = c.req.param('id')

  const siteOwnerToken = handlerAccessToken(await getAccessTokenFromKV())

  if (!siteOwnerToken.valid) throw new TokenInvalidError('Not Found Any Valid Token')

  const tokenValidRes = await steamWebStdAPI.player.getPlayerLinkDetails({steamids: [BigInt(siteOwnerToken.steamid ?? 0)]}, { accessToken: siteOwnerToken.token })

  if(!tokenValidRes.success) {
    return c.json(tokenValidRes, 401)
  }

  const token = siteOwnerToken.token

  const player = await steamWebStdAPI.player.getPlayerLinkDetails({ steamids: [BigInt(queryId)] }, { accessToken: siteOwnerToken.token })

  const games = await steamWebStdAPI.player.getOwnedGames({
    steamid: BigInt(queryId),
    includeAppinfo: true,
    includePlayedFreeGames: true,
    includeFreeSub: true,
  }, { method: 'GET', accessToken: token})

  const appids = games.data!.games.map(game => game.appid!)

  const gameAchievementProgress = await steamWebStdAPI.player.getAchievementsProgress({ steamid: BigInt(queryId), appids: appids }, {
    accessToken: token
  })

  const achievementProgress = gameAchievementProgress.data!.achievementProgress
  return  c.json({
    player: player.data,
    achievementProgress,
    games: games.data
  })
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