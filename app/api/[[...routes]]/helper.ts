import {Env, Hono} from "hono";
import {getGamesByIds} from "@/db";

export function steamHelper<T extends Env>(app:Hono<T>) {
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
}