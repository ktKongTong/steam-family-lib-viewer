import { Hono} from 'hono'
import {handle} from 'hono/vercel'

import steamFamilyGroup from "./_routes/familygroup";
import steamCommon from "./_routes/common";
import steamHelper from "./_routes/helper";
import steamAuth from "./_routes/auth";
import cron from "@/app/api/[[...routes]]/cron";
import {CommonExtractor} from "./_middlewares/query-extractor";

export const runtime = 'edge';

const app = new Hono()

app.use(CommonExtractor)
app.route('/', steamFamilyGroup)
app.route('/', steamCommon)
app.route('/', steamAuth)
app.route('/', steamHelper)
app.route('/', cron)

app.get('/api/ping', async(c) => {
  return c.json({data: "pong"})
})


export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)