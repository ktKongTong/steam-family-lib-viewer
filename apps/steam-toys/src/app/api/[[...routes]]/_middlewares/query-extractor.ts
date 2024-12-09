import { createMiddleware } from 'hono/factory'
import {Context} from "hono";
import { handlerAccessToken, type ReturnTypeOfHandlerSteamJWTToken } from "@repo/shared";
import { InvalidTokenError } from "@/app/api/[[...routes]]/errors";


declare module 'hono' {
  interface ContextVariableMap {
    apiKey: string,
    accessToken: ReturnTypeOfHandlerSteamJWTToken<boolean>
  }
}
export const getAPIKey = (c: Context) => {
  return c.get('apiKey')
}

export const getAccessToken = <T extends boolean = false>(c: Context, mustValid?: T): ReturnTypeOfHandlerSteamJWTToken<T> => {
  const t = c.get('accessToken') as ReturnTypeOfHandlerSteamJWTToken<T>
  if(!mustValid || t.valid) {
    return t
  }
  if (t?.expired) {
    throw new InvalidTokenError('Token Has Expired')
  }

  if (!t?.steamid) {
    throw new InvalidTokenError('Not a valid token, can\'t extract userinfo from token')
  }

  throw new InvalidTokenError('Invalid token')

}

export const CommonExtractor = createMiddleware(async (c, next) => {
  let apiKey = c.req.query('key')
  if(!apiKey) {
    apiKey = process.env.STEAM_API_KEY as string
  }
  c.set('apiKey', apiKey)
  let access_token = c.req.query('access_token')
  if(!access_token) {
    access_token = c.req.query('accessToken')
  }
  const token = handlerAccessToken(access_token)
  c.set('accessToken', token)
  await next()
})