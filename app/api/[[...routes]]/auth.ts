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


  app.get('/api/steam/auth/basic', async (c)=>{
    const ajaxForm = new FormData()
    ajaxForm.set("redir", "https://store.steampowered.com/")
    const sessionResp = await fetch("https://store.steampowered.com/", {method:'HEAD'})
    // extract sessionid from cookie
    const cookies = sessionResp.headers.get('set-cookie')!!

    const sessionidRegex = /sessionid=(\w+);/
    const [, sessionId] =  sessionidRegex.exec(cookies)!

    const ajaxResp = await fetch("https://login.steampowered.com/jwt/ajaxrefresh", {
      method: 'POST',
      headers: {
        "Referer": "https://store.steampowered.com/",
        "Origin":"https://store.steampowered.com",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
      },
      body: ajaxForm
    })
    let ajaxCookies = ajaxResp.headers.get('set-cookie')!
    const ak_bmscRegex = /ak_bmsc=(.+)/
    const [, ak_bmsc] =  ak_bmscRegex.exec(ajaxCookies.split(';')[0])!
    return c.json({
      sessionid: sessionId,
      ak_bmsc: ak_bmsc,
    })
  })

  app.get('/api/steam/auth/ajaxrefresh', async (c)=>{
    // const buf = Buffer.from(request_id!, 'base64')
    const form = new FormData()
    form.set("redir", "https://store.steampowered.com/")

    const res = await fetch("https://login.steampowered.com/jwt/ajaxrefresh", {
      method: 'POST',
      headers: {
        "Referer": "https://store.steampowered.com/",
        "Origin":"https://store.steampowered.com",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
      },
      body: form
    })
    return res
  })


  app.get('/api/steam/auth/finalize-login', async (c)=>{
    const nonce= c.req.query('nonce')!!
    const sessionid= c.req.query('sessionid')!!
    const ak_bmsc = c.req.query('ak_bmsc')!!
    // get cookie

    // const buf = Buffer.from(request_id!, 'base64')
    const form = new FormData()
    form.set("nonce", nonce)
    form.set("sessionid", sessionid)
    form.set("redir", "https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_4__global-header")

    const res = await fetch("https://login.steampowered.com/jwt/finalizelogin", {
      method: 'POST',
      headers: {
        "Referer": "https://store.steampowered.com/",
        "Origin":"https://store.steampowered.com",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
        "Cookie":`ak_bmsc=${ak_bmsc}`
      },
      body: form
    }).then(res=>res.json())
    return c.json(res)
  })

  app.get('/api/steam/auth/settoken', async (c)=>{
    const form = new FormData()
    const nonce= c.req.query('nonce')!!
    const auth= c.req.query('auth')!!
    const steamid= c.req.query('steamid')!!
    form.set("nonce", nonce)
    form.set("auth", auth)
    form.set("steamID", steamid)
    const resp = await fetch("https://store.steampowered.com/login/settoken", {
      method: 'POST',
      headers: {
        "Referer": "https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_4__global-header",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
      },
      body: form
    })

    const cookies = resp.headers.get('set-cookie')!
    // extract token

    const tokenRegex = /steamLoginSecure=(.+)/
    const [, token] =  tokenRegex.exec(cookies.split(';')[0])!
    const decodedToken = decodeURIComponent(token)
    // store steam
    return c.json({
      token: decodedToken.replace(`${steamid}||`,''),
    })
  })


  // 1. getQR
  // 2. PollForTokenGetter
  // 3. getFinalToken
  // combine finalize-login and settoken
  app.get('/api/steam/auth/getToken', async (c)=>{
    const nonce= c.req.query('nonce')!!
    const sessionid= c.req.query('sessionid')!!
    const ak_bmsc = c.req.query('ak_bmsc')!!
    const form = new FormData()
    form.set("nonce", nonce)
    form.set("sessionid", sessionid)
    form.set("redir", "https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_4__global-header")
    const finalRes = await fetch("https://login.steampowered.com/jwt/finalizelogin", {
      method: 'POST',
      headers: {
        "Referer": "https://store.steampowered.com/",
        "Origin":"https://store.steampowered.com",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
        "Cookie":`ak_bmsc=${ak_bmsc}`
      },
      body: form
    }).then(res=>res.json())
    const steamId = finalRes.steamID
    const setTokenTransferInfo = finalRes.transfer_info[0]
    const setTokenUrl = setTokenTransferInfo.url
    const setTokenAuth = setTokenTransferInfo.params.auth
    const setTokenNonce = setTokenTransferInfo.params.nonce
    const setTokenForm = new FormData()
    setTokenForm.set("nonce", setTokenNonce)
    setTokenForm.set("auth", setTokenAuth)
    setTokenForm.set("steamID", steamId)
    const resp = await fetch("https://store.steampowered.com/login/settoken", {
      method: 'POST',
      headers: {
        "Referer": "https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_4__global-header",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
      },
      body: setTokenForm
    })

    const cookie = resp.headers.get('set-cookie')!.split(';')[0]

    //

    const tokenRegex = /steamLoginSecure=(.+)/
    const [, token] =  tokenRegex.exec(cookie)!
    const decodedToken = decodeURIComponent(token)
    // store steam
    return c.json({
      token: decodedToken.replace(`${steamId}||`,''),
      steamId: steamId
    })
  })
}