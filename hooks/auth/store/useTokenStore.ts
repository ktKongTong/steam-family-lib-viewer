import { create } from 'zustand'
import {SteamToken} from "@/hooks/auth/interface";
import { persist, createJSONStorage } from 'zustand/middleware'


class SteamTokenRegistry {
  private tokens: Record<string, SteamToken> = {}

  addToken(token: SteamToken) {
    this.tokens[token.id] = token
  }

  removeTokenById(token: SteamToken) {
    delete this.tokens[token.id]
  }

  removeOutdateToken() {
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
  removeTokenById: (tokenId: string) => void,
  addAndSetCurrentToken: (token: SteamToken) => void,
  setCurrentToken: (token: SteamToken) => void,
  updateToken: (token: SteamToken) => void,
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
      updateToken: (token: SteamToken) => {
        set((state)=> {
          let ans = {
            ...state.tokens,
          }
          ans[token.id] = token
          if(state.currentToken && state.currentToken.id === token.id) {
            return ({ tokens: ans, currentToken: token })
          }
          return { ...state,tokens: ans }
        })
      },
      addAndSetCurrentToken: (token: SteamToken) => {
        set((s)=>{
          // get().tokens.addToken()
          // s.tokens.addToken(token)
          let ans: Record<string, SteamToken> = {...s.tokens}
          ans[token.id] = token
          return ({ tokens: ans, currentToken: token })
        })
      },
      setCurrentToken: (token: SteamToken) => {
        set((s)=>({...s, currentToken: token }))
      },
      removeTokenById: (tokenId) => {
        set((state) => {
          let tokens = {...state.tokens}
          if(tokens[tokenId]) {
            delete tokens[tokenId]
          }
          let currentToken = null
          if(state.currentToken && state.currentToken.id === tokenId) {
            let tokenArr = Object.values(tokens)
            if(tokenArr.length > 0) {
              currentToken = tokenArr[0]
            }
          }
          return {
            tokens,
            currentToken,
          }
        })
      },
    }),
  {
      name: "tokenStore",
      storage: createJSONStorage(() => localStorage),
    },
  )

  )

