import { createClient } from '@vercel/kv';

export const getAccessTokenFromKV = async () => {
  const kv = createClient({
    url: process.env.VERCEL_KV_REST_API_URL,
    token: process.env.VERCEL_KV_API_TOKEN,
  });
  const accessToken = await kv.get<string>('sflv:cron:access-token')
  return accessToken
}
