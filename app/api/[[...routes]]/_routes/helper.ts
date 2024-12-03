import {Env, Hono} from "hono";
import {getGamesByIds} from "@/db";
import {jwtDecode} from "jwt-decode";

import * as cheerio from 'cheerio';
const app = new Hono()

app.get('/api/steam/info/:ids', async (c) => {
  const {ids} = c.req.param()
  const filteredIds = ids.split(',')
    .map(item=> parseInt(item, 10))
    .filter(item=> !Number.isNaN(item))
    .slice(0, 50)
  if(filteredIds.length > 50){
    return c.json({
      data: null,
      ok: false,
      message: "ids length should be less than 50"
    })
  }
  const games = await getGamesByIds(filteredIds)
  return c.json({
    data: games.map(game=>({...game, top20Tags: game.top20Tags.split(",")})),
    ok: true,
    message: "success",
    status: 200,
  })
})

app.get('/api/steam/player-stats/:id',async (c)=>{
  const tokenParam = c.req.query('access_token')
  const queryId = c.req.param('id')
  const tokenInfo = jwtDecode(tokenParam??"")
  const user = tokenInfo.sub
  if(!user) {
    return c.json({
      data:null
    })
  }

  const res = await fetch(`https://steamcommunity.com/profiles/${queryId ?? user}/games?tab=all&games_in_common=false`, {
    headers: {
      cookie: `steamLoginSecure=${user}%7C%7C${tokenParam};`
    }
  })
  const html = await res.text()

  const $ = cheerio.load(html)
  const data = $('#gameslist_config').attr('data-profile-gameslist')
  // html unescape &quot;
  const text = data?.replaceAll('&quot;', '"')
  // unicode decode
  const j = text?.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  })

  const r = JSON.parse(j ?? "{}")

  return c.json({
    data: r
  })
})

export default app