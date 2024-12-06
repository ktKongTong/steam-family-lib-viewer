import { Hono } from "hono";
import { steamAPI as steam } from "@repo/steam-proto";
import {jwtDecode} from "jwt-decode";


const app = new Hono()

app.get('/api/steam/wishlist/:ids', async (c)=> {
  const idParam = c.req.param('ids')
  const res = await steam.common.getWishlistBySteamIds(idParam)
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
  const data = await steam.common.getSteamItemsById( {
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
  return c.json(data)
})

app.get('/api/steam/detail/:ids', async(c) => {
  const idParam = c.req.param('ids')
  const res = await steam.common.getSteamItemsDetailsByIds(idParam)
  return c.json(res)
})
app.get('/api/steam/player/summaries', async(c) => {
  const idParam = c.req.query('steamids')
  let apiKey = c.req.query('key')
  if(!apiKey) {
    apiKey = process.env.STEAM_API_KEY as string
  }
  return fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${idParam}`)
})

app.get('/api/steam/player/ownedGames', async(c) => {
  const idParam = c.req.query('steamid')
  let apiKey = c.req.query('key')
  if(!apiKey) {
    apiKey = process.env.STEAM_API_KEY as string
  }
  return fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${idParam}&include_appinfo=true&include_extended_appinfo=true`)
})


app.get('/api/steam/player/:ids',async (c)=>{
  const idParam = c.req.param('ids')
  const tokenParam = c.req.query('access_token')
  const tokenInfo = jwtDecode(tokenParam??"")
  const user = tokenInfo.sub
  if(!user) {
    return c.json({
      data:null
    })
  }
  let ids = idParam.split(',')
    .filter(id=>/[0-9]{17}/.test(id))
    .slice(0,6)

  if(ids.includes(user)){ids = ids.filter(id=>id!=user)}
  ids = [user].concat(ids)
  let steamids = ids.map(it=> BigInt(it))
  const data = await steam.common
    .getSteamPlayerLinkDetails({steamids: steamids},tokenParam ?? "")
  const converted = data
  // .accounts
  //   .map((account=>({
  //   ...account,
  //   publicData: {
  //     ...account.publicData,
  //     shaDigestAvatar: shaDigestAvatarToStrAvatarHash(account.publicData?.shaDigestAvatar!)
  //   }
  // })))
  return c.json(converted)
})





export default app