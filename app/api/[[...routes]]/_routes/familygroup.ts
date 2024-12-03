import { Hono } from "hono";
import {jwtDecode} from "jwt-decode";
import { steamAPI as steam } from "@/app/api/[[...routes]]/(api)";

const app = new Hono()

  app.get('/api/steam/family', async (c)=>{
    const tokenParam = c.req.query('access_token')
    if(!tokenParam) {
      return
    }
    const tokenInfo = jwtDecode(tokenParam??"")
    const user = tokenInfo.sub
    if(!user) {
      return c.json({
        data:null
      })
    }
    const data = await steam.familyGroup.getFamilyGroupForUser({
      steamid: BigInt(user),
      includeFamilyGroupResponse: true
    }, tokenParam)

    return c.json(data)

  })

  app.get('/api/steam/family/shared/:id', async (c)=> {
    const tokenParam = c.req.query('access_token')
    const familyParam = c.req.param('id')
    const tokenInfo = jwtDecode(tokenParam??"")

    const user = tokenInfo.sub
    if(!user) {
      return c.json({
        "ok": false,
        "status": 400,
        "message": "param error, can't extract userinfo from token",
        data:null
      })
    }
    const data = await steam.familyGroup.getFamilyGroupShardLibrary({
      familyGroupid: BigInt(familyParam),
      includeOwn: true,
      includeExcluded: true,
      language: 'schinese',
      includeNonGames: undefined
    }, tokenParam)
    return c.json(data)
  })

  app.get('/api/steam/family/preferred/:id', async (c) => {
    const tokenParam = c.req.query('access_token')
    const familyParam = c.req.param('id')

    const data = await steam.familyGroup.getFamilyGroupPreferredLenders({
      familyGroupid: BigInt(familyParam),
    }, tokenParam)
    return c.json(data)
  })

  app.get('/api/steam/family/playtime/:id', async (c) => {
    const tokenParam = c.req.query('access_token')
    const familyParam = c.req.param('id')
    const data = await steam.familyGroup.getFamilyGroupPlaytimeSummary({
      familyGroupid: BigInt(familyParam),
    }, tokenParam)
    return c.json(data)
  })


// not work
  app.get('/api/steam/family/clear/:id', async (c) => {
    const tokenParam = c.req.query('access_token')
    const familyParam = c.req.param('id')
    const data = await steam.familyGroup.clearCooldownSkip({
      steamid: BigInt(familyParam),
    }, tokenParam)
    return c.json(data)
  })


// not work
  app.get('/api/steam/family/setcooldown/:id', async (c) => {
    const tokenParam = c.req.query('access_token')
    const familyParam = c.req.param('id')
    const data = await steam.familyGroup.setFamilyCooldownOverrides({
      familyGroupid: BigInt(familyParam),
      cooldownCount: 0,
    }, tokenParam)
    return c.json({data: data})
  })

export default app