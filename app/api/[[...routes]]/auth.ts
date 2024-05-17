import {Env, Hono} from "hono";
import {SteamAPI} from "@/app/api/[[...routes]]/(api)";

export function steamAuth<T extends Env>(app:Hono<T>) {
  const steam = new SteamAPI()
  app.get('/api/steam/auth/qr', async (c)=>{
    const data = await steam.auth.beginAuthSessionViaQR({
      deviceDetails: {
        deviceFriendlyName: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0",
        platformType: 1
      },
      websiteId: 'Store'
    })
    return c.json(data)
  })

  app.get('/api/steam/auth/poll', async (c)=>{
    const client_id= c.req.query('client_id')
    const request_id= c.req.query('request_id')
    const buf = Buffer.from(request_id!, 'base64')
    const data = await steam.auth.pollAuthSessionStatus({
      clientId: BigInt(client_id!),
      requestId: new Uint8Array(buf)
    })
    return c.json(data)
  })

}