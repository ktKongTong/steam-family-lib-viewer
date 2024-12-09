
import {useMutation} from "@tanstack/react-query";
import {f as ofetch} from '@/lib/omfetch'
import {PlayerStats} from "@/interface/playerstats";
import {useToast} from "@/hooks/use-toast";

const f = ofetch.extend({
  onResponseError: async ({response, error}) => {
    const bizError = response._data
    throw new BizError(bizError)
  }
})

class BizError extends Error {
  name = 'BizError'
  message: any
  constructor(message: any) {
    super("Biz Error")
    this.message = message
  }
}

export const useNewPlayerStats = (accessToken?: string) => {
  const { toast } = useToast()
  const { mutateAsync:fetchPlayerStatsAsync, mutate: fetchPlayerStats,error, data: playerStats,reset, isPending } = useMutation({
    mutationFn: async (id: string)=>  f.get<PlayerStats>(`/api/steam/player-stats/${id}?access_token=${accessToken}`),
    onError: (error) => {
      if (error instanceof BizError) {
        toast({
          variant: 'destructive',
          title: `${error.message.errorType}`,
          description: error.message.errorMessage
        })
      }else {
        toast({
          variant: 'destructive',
          title: 'Unknown Error',
          description: error.message
        })
      }
      return
    }
  })
  return {
    fetchPlayerStats,
    loading: isPending,
    fetchPlayerStatsAsync,
    reset,
    playerStats,
    error
  }
}