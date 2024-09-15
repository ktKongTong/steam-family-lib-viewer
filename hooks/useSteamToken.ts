import {jwtDecode, JwtPayload} from "jwt-decode";

enum TokenType {
  RefreshToken = "RefreshToken",
  AccessToken = "AccessToken",
}

enum TokenAudType {
  Web = "web",
  Client = "client",
  Renew = "renew",
  Derived = "derive",
}

export const useSteamToken = (token: string) => {
  let payload:JwtPayload = {}
  let err = null
  try {
    payload = jwtDecode(token)
  }catch(e) {
    err = e
  }

  const validToken = err != null
  const issueAt = payload.iat ?? 0

  const expAt = payload.exp ?? 0

  const steamID = payload.sub

  const isExpired = Date.now() > expAt * 1000

  const ip = (payload as any)['ip_subject']

  const auds = ((payload.aud ?? []) as string[])

  const tokenType = auds.includes("derive") ? TokenType.RefreshToken : TokenType.AccessToken

  return {
    validToken,
    isExpired,
    steamID,
    issueAt,
    expAt,
    ip,
    auds:auds,
    tokenType
  }
}