import {base64ToUint8Array} from "./coder";
import {jwtDecode} from "jwt-decode";

export function shaDigestAvatarBase64ToStrAvatarHash(base64:string) {
  const arr = base64ToUint8Array(base64)
  return shaDigestAvatarToStrAvatarHash(arr)
}

const n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

export function shaDigestAvatarToStrAvatarHash(e:Uint8Array) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    t += n[i >>> 4] + n[15 & i]
  }
  return t
}


type IsMustValid<T extends boolean | undefined | null> = T extends true ? true : false

type SteamJWTToken<T extends boolean = boolean> = {
  valid: T,
  token: string,
  steamid: string,
  remaining: number,
  expired: boolean,
  issueAt: number,
  aud:  string[]
}

export type ReturnTypeOfHandlerSteamJWTToken<T extends boolean | undefined | null> = IsMustValid<T> extends true ?
  SteamJWTToken<true> : (Partial<SteamJWTToken> & { valid: false }) | SteamJWTToken<true>

export const handlerAccessToken = <T extends boolean>(token: string | null | undefined, mustValid?: T): ReturnTypeOfHandlerSteamJWTToken<T> => {
  let mv = mustValid ?? false as const
  try {
    const res = jwtDecode(token ?? "")
    if (mustValid) {
      if (Date.now() / 1000 > (res.exp ?? 0)) {
        throw new Error("Token has Expired")
      }
    }
    return {
      valid: true as const,
      token: token!,
      steamid: res.sub!,
      remaining: (res.exp ?? 0) - Date.now() / 1000,
      expired: Date.now() / 1000 > (res.exp ?? 0),
      issueAt: res.iat!,
      aud: res.aud! as string[],
    }
  }catch (e) {
    if (mustValid) throw e
    return {
      valid: false
    } as any as ReturnTypeOfHandlerSteamJWTToken<T>
  }
}