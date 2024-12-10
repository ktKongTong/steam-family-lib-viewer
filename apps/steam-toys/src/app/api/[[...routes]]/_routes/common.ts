import { Hono } from "hono";
import {steamCrawlAPI, steamWebStdAPI} from "@repo/steam-proto";
import {getAccessToken, getAPIKey} from "@/app/api/[[...routes]]/_middlewares/query-extractor";
import {handleSteamStdResponse} from "@/app/api/[[...routes]]/handle-steam-std-response";


const app = new Hono()

app.get('/api/steam/wishlist/:ids', async (c)=> {
  const idParam = c.req.param('ids')
  const res = await steamCrawlAPI.common.getWishlistBySteamIds(idParam)
  return c.json(res)
})
app.get('/api/steam/detail/:ids', async(c) => {
  const idParam = c.req.param('ids')
  const res = await steamCrawlAPI.common.getSteamItemsDetailsByIds(idParam)
  return c.json(res)
})

app.get('/api/steam/items/:ids',async (c)=>{
  const idParam = c.req.param('ids')
  const countryCode = c.req.query('country_code')
  const language = c.req.query('language')
  const ids = idParam.split(',').slice(0,30)
    .map(it=> parseInt(it))
    .filter(it => !Number.isNaN(it))
    .map(it=>({
      appid: it
    }))
  const data = await steamWebStdAPI.storeBrowse.getItems({
    ids: ids,
    context: {
      language: language ?? 'schinese',
      countryCode: countryCode ?? 'US',
      steamRealm: 1
    },
    dataRequest: {
      includeAssets: true,
      includeRelease: true,
      includePlatforms: true,
      includeScreenshots: true,
      includeTrailers: true,
      includeIncludedItems: true,
      includeTagCount: 20
    }
  })
  // @ts-ignore
  return handleSteamStdResponse(c, data)
})



app.get('/api/steam/player/summaries', async(c) => {
  const idParam = c.req.query('steamids')
  const apiKey = getAPIKey(c)
  return fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${idParam}`)
})

app.get('/api/steam/player/ownedGames', async(c) => {
  const idParam = c.req.query('steamid')
  let apiKey = getAPIKey(c)
  const res = await steamWebStdAPI.player.getOwnedGames({
    steamid: idParam,
    includeAppinfo: true,
    includePlayedFreeGames: true,
    includeFreeSub: true,
    includeExtendedAppinfo: true,
    language: 'schinese',
  }, {
    apiKey: apiKey,
    method: 'GET'
  })

  // @ts-ignore
  return handleSteamStdResponse(c, res)
  // return fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${idParam}&include_appinfo=true&include_extended_appinfo=true`)
})


app.get('/api/steam/player/:ids',async (c)=>{
  const idParam = c.req.param('ids')
  const token = getAccessToken(c, true)
  const user = token.steamid
  let ids = idParam.split(',')
    .filter(id=>/[0-9]{17}/.test(id))
    .slice(0,6)

  if(ids.includes(user)){ids = ids.filter(id=>id!=user)}
  ids = [user].concat(ids)
  const data = await steamWebStdAPI.player.getPlayerLinkDetails({steamids: ids}, {accessToken: token.token})
  // .accounts
  //   .map((account=>({
  //   ...account,
  //   publicData: {
  //     ...account.publicData,
  //     shaDigestAvatar: shaDigestAvatarToStrAvatarHash(account.publicData?.shaDigestAvatar!)
  //   }
  // })))
  // @ts-ignore
  return handleSteamStdResponse(c, data)
})





export default app