import { Hono} from 'hono'
import {handle} from 'hono/vercel'

import steamHelper from "./_routes/helper";
import {BizError} from "@/app/api/[[...routes]]/errors";

const app = new Hono()

app.route('/', steamHelper)

app.get('/api/ping', async(c) => {
  return c.json({data: "pong"})
})


app.onError((err, c) => {
  if (err instanceof BizError) {
    return c.json({
      success: false,
      errorType: err.name,
      errorMessage: err.message
    }, 400)
  }
  return c.json({ success: false, errorType: "Unknown Error"}, 500)
})
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)