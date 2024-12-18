import {Hono} from "hono";
import { createClient } from '@vercel/kv';
import {steamWebStdAPI} from "@repo/steam-proto";
import {handlerAccessToken} from "@repo/shared";
import {f} from "@/lib/omfetch";
import {randomBytes} from "crypto";

const cron = new Hono()

cron.get('/api/cron/token-refresh', async ( c )=> {
  await refreshTokenTask()

  return c.json({
    status: 'ok'
  })
})
const proxyHost = process.env.STEAM_TOKEN_PROXY_HOST as string;
export const refreshTokenTask = async () => {
  const kv = createClient({
    url: process.env.VERCEL_KV_REST_API_URL,
    token: process.env.VERCEL_KV_API_TOKEN,
  });
  const [refreshToken, accessToken] = await kv.mget<[string, string]>('sflv:cron:refresh-token','sflv:cron:access-token')
  const token = handlerAccessToken(refreshToken, true)
  const remainInSec = token.remaining
  let renew = false
  if(remainInSec <= 3*24*60*60) {
    renew = true
  }
  const id = token.steamid
  const res =  await steamWebStdAPI.authentication.generateAccessTokenForApp({
    refreshToken: refreshToken,
    steamid: id,
    renewalType: renew ? 1 : 0
  })
  let newAK: string
  if(!res.success) {
    try {
      const sessionid = randomBytes(12).toString('hex')
      const res = await f.get(`${proxyHost}/api/steam/auth/getToken`, { query: { nonce: refreshToken, sessionid } })
      newAK = res.data.accessToken
    }catch (e) {
      throw new Error(`refresh token task failed: ${res.errorMessage} ${res.result}`)
    }
  }else {
    newAK = res?.data?.accessToken ?? accessToken
  }
  const newRefreshToken = res?.data?.refreshToken ?? refreshToken
  const newAccessToken = newAK
  await kv.mset({
    'sflv:cron:refresh-token': newRefreshToken,
    'sflv:cron:access-token': newAccessToken
  })
}

export const getAccessTokenFromKV = async () => {
  const kv = createClient({
    url: process.env.VERCEL_KV_REST_API_URL,
    token: process.env.VERCEL_KV_API_TOKEN,
  });
  const accessToken = await kv.get<string>('sflv:cron:access-token')
  return accessToken
}

export default cron