import {Context, Hono} from 'hono'
import {handle} from 'hono/vercel'
import {Env as HEnv, Schema} from 'hono'

import {steamFamilyGroup} from "@/app/api/[[...routes]]/familygroup";
import {steamCommon} from "@/app/api/[[...routes]]/common";
import {steamAuth} from "@/app/api/[[...routes]]/auth";

export const runtime = 'edge';


class App<E extends HEnv, S extends Schema = {}, BasePath extends string = '/api'> extends Hono<E,S,BasePath> {
  apply(func: <T extends HEnv>(app: Hono<E,S,BasePath>) => void) {
    func(this)
    return this
  }
  constructor() {
    super();
    this
      .apply(steamFamilyGroup)
      .apply(steamCommon)
      .apply(steamAuth)
  }
}

const app = new App()

app.get('/api/ping', async(c) => {
  return c.json({data: "pong"})
})





export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)