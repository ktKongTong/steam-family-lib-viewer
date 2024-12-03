import {Env, Hono} from "hono";
import { steamAPI as steam } from "@/app/api/[[...routes]]/(api)";
import {jwtDecode} from "jwt-decode";
import {ua} from "@/lib/ua";
import {f} from "@/lib/ofetch";

const proxyHost = process.env.STEAM_TOKEN_PROXY_HOST as string;

const app = new Hono()

app.get('/api/steam/auth/qr', async (c)=>{
  const data = await steam.auth.beginAuthSessionViaQR({
    websiteId: 'Store',
    platformType: 2,
    deviceFriendlyName: "ChromeSteam",
    // device details are sent for web logins
    deviceDetails: {
      deviceFriendlyName: ua.edgeBrowser,
      platformType: 2,
    }
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

const ajaxRefreshRawRequest = () => f.post("https://login.steampowered.com/jwt/ajaxrefresh", {
  headers: {
    "Referer": "https://store.steampowered.com/",
    "Origin":"https://store.steampowered.com",
    "User-Agent": ua.edgeBrowser
  },
  form: {
    redir: "https://store.steampowered.com/",
  },
  raw: true
})

app.get('/api/steam/auth/basic', async (c)=>{
  const sessionResp = await f.head("https://store.steampowered.com/", { raw: true })
  // extract sessionid from cookie
  const cookies = sessionResp.headers.get('set-cookie')!!
  const sessionidRegex = /sessionid=(\w+);/
  const [, sessionId] =  sessionidRegex.exec(cookies)!
  const ajaxResp = await ajaxRefreshRawRequest()
  let ajaxCookies = ajaxResp.headers.get('set-cookie')!
  const ak_bmscRegex = /ak_bmsc=(.+)/
  const [, ak_bmsc] =  ak_bmscRegex.exec(ajaxCookies.split(';')[0])!
  return c.json({
    sessionid: sessionId,
    ak_bmsc: ak_bmsc,
  })
})

app.get('/api/steam/auth/ajaxrefresh', async (c)=>{
  return ajaxRefreshRawRequest()
})


app.get('/api/steam/auth/finalize-login', async (c)=>{
  const nonce= c.req.query('nonce')!!
  const sessionid= c.req.query('sessionid')!!
  const form = new FormData()
  form.set("nonce", nonce)
  form.set("sessionid", sessionid)
  form.set("redir", "https://steamcommunity.com/login/home/?goto=")

  const res = await fetch("https://login.steampowered.com/jwt/finalizelogin", {
    method: 'POST',
    headers: {
      "Referer": "https://store.steampowered.com/",
      "Origin":"https://store.steampowered.com",
      "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
    },
    body: form
  })

  // extract token in header
  const headers = res.headers
  const setCookie = headers.get('set-cookie')
  let newToken = ""
  let steamid = ""
  if(setCookie) {
    const token = decodeURIComponent(setCookie.split(';')[0])
    newToken = token.split("||")[1]
    steamid = token.split("||")[0]
  }
  return c.json({
    data: {
      refreshToken: newToken,
      steamid: steamid,
    }
  })
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

app.get('/api/steam/auth/getTokenByProxy', async (c)=>{
  const nonce= c.req.query('nonce')!!
  const sessionid = c.req.query('sessionid')!!
  const res = await f.get(`${proxyHost}/api/steam/auth/getToken`, { query: { nonce, sessionid } })
  // const r = await res?.text()
  // return  await fetch(`${proxyHost}/api/steam/auth/getToken?nonce=${nonce}&sessionid=${sessionid}`)
  return c.json(res)
})


// combine finalize-login and settoken
app.get('/api/steam/auth/getToken', async (c)=>{
  const nonce= c.req.query('nonce')!!
  const sessionid = c.req.query('sessionid')!!
  // const buf = Buffer.from(request_id!, 'base64')
  const form = new FormData()
  form.set("nonce", nonce)
  form.set("sessionid", sessionid)
  form.set("redir", "https://steamcommunity.com/login/home/?goto=")
  const res = await fetch("https://login.steampowered.com/jwt/finalizelogin", {
    method: 'POST',
    headers: {
      "Referer": "https://store.steampowered.com/",
      "Origin":"https://store.steampowered.com",
      "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
    },
    body: form
  })
  try {
    const finalRes = await res.json()
    const steamId = finalRes.steamID
    const setTokenTransferInfo = finalRes.transfer_info[0]
    const setTokenUrl = setTokenTransferInfo.url
    const setTokenAuth = setTokenTransferInfo.params.auth
    const setTokenNonce = setTokenTransferInfo.params.nonce
    const setTokenForm = new FormData()
    setTokenForm.set("nonce", setTokenNonce)
    setTokenForm.set("auth", setTokenAuth)
    setTokenForm.set("steamID", steamId)
    const resp = await fetch(setTokenUrl, {method: 'POST', body: setTokenForm})
    const cookie = resp.headers.get('set-cookie')!.split(';')[0]
    const tokenRegex = /steamLoginSecure=(.+)/
    const [, token] =  tokenRegex.exec(cookie)!
    const decodedToken = decodeURIComponent(token)
    return c.json({
      data: {
        accessToken: decodedToken.replace(`${steamId}||`,''),
        steamId: steamId
      }
    })
  }catch(err){
    return res
  }
})

app.get('/api/steam/auth/generateAccessToken', async (c)=>{
  const refreshToken= c.req.query('refresh_token')!!
  let  renewType = c.req.query('renew')
  const renewalType = renewType === "true" ? 1: 0
  const id = jwtDecode(refreshToken).sub!
  const res =  await steam.auth.generateAccessToken({
      refreshToken: refreshToken,
      steamid: BigInt(id),
      renewalType: renewalType
    })
  return c.json({
    ...res
  })
})


app.get('/api/steam/account/private-app', async (c) => {
  const accessToken= c.req.query('access_token')!!
  const res = await steam.accountPrivate.getPrivateAppList({}, accessToken)
  return c.json(res)
})

const steamAuthRoute = app

export default steamAuthRoute