import { Hono } from "hono";

import * as cheerio from 'cheerio';
import { steamWebStdAPI } from "@repo/steam-proto";
import { getAccessTokenFromKV } from "@/app/api/[[...routes]]/util";
import { handlerAccessToken } from "@repo/shared";
import { InvalidSteamIDError, InvalidTokenError } from "@/app/api/[[...routes]]/errors";
import SteamID from "steamid";

const app = new Hono()

const getSteamIDByNickname = async (apikey: string,name: string) => {
  //
  try {
    const res = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apikey}&vanityurl=${name}`)
    if (res.ok) {
      const data = await res.json()
      return data.response.steamid as string
    }
  }
  catch (e) {}
}


// with new generated typesafe api, no need crawl
app.get('/api/steam/player-stats/:id',async (c)=>{
  const queryId = c.req.param('id')
  const language = c.req.query('language') ?? 'english'
  let key = c.req.query('key')
  if(!key) {
    key = process.env.STEAM_API_KEY as string
  }
  let sid: SteamID
  try {
    sid = new SteamID(queryId)
    // may nickname
  }catch (e) {
    const res = await getSteamIDByNickname(key, queryId)
    if(!res) {
      throw new InvalidSteamIDError(`Can't found steam user by nickname ${queryId}`)
    }
    sid = new SteamID(res)
  }
  if(!sid.isValidIndividual()) {
    sid = SteamID.fromIndividualAccountID(Number(queryId))
    if(!sid.isValidIndividual()) {
      throw new InvalidSteamIDError(`Can't extract 64-bit steamID from individual account id : ${queryId}`)
    }
  }

  const id: string = sid.getSteamID64()
  const siteOwnerToken = handlerAccessToken(await getAccessTokenFromKV())


  const tokenValidRes = await steamWebStdAPI.player.getPlayerLinkDetails({steamids: [BigInt(siteOwnerToken.steamid ?? 0)]}, { accessToken: siteOwnerToken.token })
  if(!tokenValidRes.success) {
    throw new InvalidTokenError('Not Found Any Valid Token')
  }

  const token = siteOwnerToken.token

  const [player, games, community] = await Promise.all([
    steamWebStdAPI.player.getPlayerLinkDetails({ steamids: [BigInt(id)] }, { accessToken: siteOwnerToken.token }),
    steamWebStdAPI.player.getOwnedGames({
      steamid: BigInt(id),
      includeAppinfo: true,
      includePlayedFreeGames: true,
      includeFreeSub: true,
      language: language
    }, { method: 'GET', accessToken: token }),
    getCommunityStats(id)
  ])
  if(!player.success) {
    throw new InvalidSteamIDError(`Can't found PlayerInfo By 64-bit SteamID: ${id}`)
  }
  const appids = games.data!.games.map(game => game.appid!)

  const gameAchievementProgress = await steamWebStdAPI.player.getAchievementsProgress({ steamid: BigInt(id), appids: appids }, {
    accessToken: token
  })

  const achievementProgress = gameAchievementProgress.data!.achievementProgress
  return c.json({
    player: player.data,
    achievementProgress,
    games: games.data,
    community
  })
})

// crawl for https://steamcommunity.com/profiles/${id}
// and https://steamcommunity.com/profiles/${queryId}/myworkshopfiles/?section=guides
const getCommunityStats = async (queryId: string)=> {
  try {
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
    const regex = /\s(\d+)\s/;
    const guideData = $guide.extract({
      count: {
        selector: '.workshopBrowsePagingInfo',
        value: (el, key) => {
          const text = $guide(el).text();
          const [,may] = regex.exec(text)!
          const v = parseInt(may ?? '0')
          return Number.isNaN(v) ? 0 : v
        },
      }
    })
    const [, inventory, screenshots, workshop, reviews] = data.links
    const result = {
      guide: guideData?.count??0,
      inventory: inventory?.count??0,
      screenshots: screenshots?.count??0,
      workshopItems: workshop?.count??0,
      reviews: reviews?.count??0,
    }
    return result
  } catch (e) {
    return {
      guide: 0,
      inventory: 0,
      screenshots: 0,
      workshopItems: 0,
      reviews: 0,
    }
  }
}

export default app