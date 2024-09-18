import {SteamToken} from "@/hooks/auth/interface";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface APIKeyStoreAction {
  apiKey: string | null
  clearAPIKey: () => void
  setCurrentAPIKey: (apiKey: string) => void
}


export const useAPIKeyStore = create<APIKeyStoreAction>()(
  persist(
    (set, get) => ({
      apiKey: "",
      clearAPIKey: () => {
        set({apiKey: ""})
      },
      setCurrentAPIKey: (apiKey: string) => {
        set({apiKey: apiKey})
      },
    }),
    {
      name: "apiKeyStore",
      storage: createJSONStorage(() => localStorage),
    },
  )
)


export const useAPIKey = ()=> {
  const apiKey = useAPIKeyStore(state => state.apiKey)
  const clearAPIKey = useAPIKeyStore(state => state.clearAPIKey)
  const setAPIKey = useAPIKeyStore(state => state.setCurrentAPIKey)
  return {
    apiKey,
    clearAPIKey,
    setAPIKey
  }
}