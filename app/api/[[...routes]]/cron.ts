import {Hono} from "hono";
import { createClient } from '@vercel/kv';
import {jwtDecode} from "jwt-decode";
import {steamAPI as steam} from "@/app/api/[[...routes]]/(api)";
const cron = new Hono()

cron.get('/api/cron/token-refresh', async ( c )=> {
  await refreshTokenTask()

  return c.json({
    status: 'ok'
  })
})

export const refreshTokenTask = async () => {
  const kv = createClient({
    url: process.env.VERCEL_KV_REST_API_URL,
    token: process.env.VERCEL_KV_API_TOKEN,
  });
  const [refreshToken, accessToken] = await kv.mget<[string, string]>('sflv:cron:refresh-token','sflv:cron:access-token')

  const exp = jwtDecode(refreshToken).exp!
  const remainInSec = exp - Math.floor(Date.now()/1000)
  let renew = false
  if(remainInSec <= 3*24*60*60) {
    renew = true
  }
  const id = jwtDecode(refreshToken).sub!
  const res =  await steam.auth.generateAccessToken({
    refreshToken: refreshToken,
    steamid: BigInt(id),
    renewalType: renew ? 1 : 0
  })
  const newRefreshToken = res?.data?.refreshToken ?? refreshToken
  const newAccessToken = res?.data?.accessToken?? accessToken
  await kv.mset({
    'sflv:cron:refresh-token': newRefreshToken,
    'sflv:cron:access-token': newAccessToken
  })
}

export const getAccessToken = async () => {
  const kv = createClient({
    url: process.env.VERCEL_KV_REST_API_URL,
    token: process.env.VERCEL_KV_API_TOKEN,
  });
  const accessToken = await kv.get<string>('sflv:cron:access-token')
  return accessToken
}

export default cron