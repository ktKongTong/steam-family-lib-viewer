import { Hono } from "hono";
import { steamWebStdAPI } from "@repo/steam-proto";
import {getAccessToken} from "@/app/api/[[...routes]]/_middlewares/query-extractor";

const app = new Hono()

// all method in this file need access_token

app.get('/api/steam/family', async (c)=>{
  const token = getAccessToken(c, true)
  const user = token.steamid
  const data = await steamWebStdAPI.familyGroup.getFamilyGroupForUser({
    steamid: BigInt(user),
    includeFamilyGroupResponse: true
  }, { accessToken: token.token })

  return c.json(data)

})

app.get('/api/steam/family/shared/:id', async (c)=> {
  const familyParam = c.req.param('id')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroup
    .getSharedLibraryApps({
      familyGroupid: BigInt(familyParam),
      includeOwn: true,
      includeExcluded: true,
      language: 'schinese',
      includeNonGames: undefined
    }, { accessToken: token.token })
  return c.json(data)
})

app.get('/api/steam/family/preferred/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroup
    .getPreferredLenders({familyGroupid: BigInt(familyId),}, { accessToken: token.token })
  return c.json(data)
})

app.get('/api/steam/family/playtime/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroup
    .getPlaytimeSummary({ familyGroupid: BigInt(familyId) }, { accessToken: token.token })
  return c.json(data)
})


// not work
app.get('/api/steam/family/clear/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroup
    .clearCooldownSkip({ steamid: BigInt(familyId) }, { accessToken: token.token })
  return c.json(data)
})


// not work
app.get('/api/steam/family/setcooldown/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroup
    .setFamilyCooldownOverrides({ familyGroupid: BigInt(familyId), cooldownCount: 0 }, { accessToken: token.token })
  return c.json(data)
})

export default app