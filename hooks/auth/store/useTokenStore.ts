import { create } from 'zustand'
import {SteamToken} from "@/hooks/auth/interface";
import { persist, createJSONStorage } from 'zustand/middleware'


class SteamTokenRegistry {
  private tokens: Record<string, SteamToken> = {}

  addToken(token: SteamToken) {
    this.tokens[token.steamId] = token
  }

  removeTokenById(token: SteamToken) {
    delete this.tokens[token.steamId]
  }

  removeOutdateToken() {
  }

  getTokenById(steamId: string): SteamToken|undefined {
    return this.tokens[steamId]
  }

}

interface TokenStore {
  // steamId to SteamToken
  tokens: Record<string, SteamToken>
  currentToken: SteamToken | null

}

interface TokenStoreAction {
  // addToken: (token: SteamToken) => void,
  // setCurrentToken: (token: SteamToken) => void,
  addAndSetCurrentToken: (token: SteamToken) => void,
}

//todo 1. store in localstorage
//todo 2. crypto
export const useTokenStore = create<TokenStore & TokenStoreAction>()(
  persist(
    (set, get) => ({
      tokens: {},
      currentToken: null,
      //refresh token
      addToken: (token: SteamToken) => {
        // if exist, replace it
        set((state)=> {
          return state
        })
      },
      addAndSetCurrentToken: (token: SteamToken) => {
        set((s)=>{
          // get().tokens.addToken()
          // s.tokens.addToken(token)
          let ans: Record<string, SteamToken> = {...s.tokens}
          ans[token.steamId] = token
          return ({ tokens: ans, currentToken: token })
        })
      },
      setCurrentToken: (token: SteamToken) => {
        set((s)=>({...s, currentToken: token }))
      },
      nothing: () => {
        set((state) => ({ ...state }))
      },
    }),
  {
      name: "tokenStore",
      storage: createJSONStorage(() => localStorage),
    },
  )

  )

