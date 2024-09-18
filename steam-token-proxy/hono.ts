import { Hono } from 'hono'

export const app = new Hono()

app.get('/', async (c) => {
  return c.json({
    data: "hello hono!"
  })
})

app.get('/api/steam/auth/getToken', async (c)=>{
  const nonce= c.req.query('nonce')!!
  const sessionid = c.req.query('sessionid')!!


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
    console.log("prepare to set login")
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
