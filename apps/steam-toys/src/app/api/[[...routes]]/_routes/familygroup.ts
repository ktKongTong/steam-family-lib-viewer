import { Hono } from "hono";
import { steamWebStdAPI } from "@repo/steam-proto";
import {getAccessToken} from "@/app/api/[[...routes]]/_middlewares/query-extractor";
import {handleSteamStdResponse} from "@/app/api/[[...routes]]/handle-steam-std-response";

const app = new Hono()

// all method in this file need access_token

app.get('/api/steam/family', async (c)=>{
  const token = getAccessToken(c, true)
  const user = token.steamid
  const data = await steamWebStdAPI.familyGroups.getFamilyGroupForUser({
    steamid: user,
    includeFamilyGroupResponse: true
  }, { accessToken: token.token })

  // @ts-ignore
  return handleSteamStdResponse(c, data)

})

app.get('/api/steam/family/shared/:id', async (c)=> {
  const familyParam = c.req.param('id')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroups
    .getSharedLibraryApps({
      familyGroupid: familyParam,
      includeOwn: true,
      includeExcluded: true,
      language: 'schinese'
    }, { accessToken: token.token })
  // @ts-ignore
  return handleSteamStdResponse(c, data)
})

app.get('/api/steam/family/preferred/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroups
    .getPreferredLenders({familyGroupid: familyId,}, { accessToken: token.token })
  // @ts-ignore
  return handleSteamStdResponse(c, data)
})

app.get('/api/steam/family/playtime/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroups
    .getPlaytimeSummary({ familyGroupid: familyId }, { accessToken: token.token })
  // @ts-ignore
  return handleSteamStdResponse(c, data)
})


// not work
app.get('/api/steam/family/clear/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroups
    .clearCooldownSkip({ steamid: familyId }, { accessToken: token.token })
  // @ts-ignore
  return handleSteamStdResponse(c, data)
})


// not work
app.get('/api/steam/family/setcooldown/:familyId', async (c) => {
  const familyId = c.req.param('familyId')
  const token = getAccessToken(c, true)
  const data = await steamWebStdAPI.familyGroups
    .setFamilyCooldownOverrides({ familyGroupid: familyId, cooldownCount: 0 }, { accessToken: token.token })
  // @ts-ignore
  return handleSteamStdResponse(c, data)
})

export default app