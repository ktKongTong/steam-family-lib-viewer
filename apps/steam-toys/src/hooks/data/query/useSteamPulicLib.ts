import {useMutation} from "@tanstack/react-query";



export interface OwnedGameResponse {
  count: number,
  games: LibItem[]
}

export interface LibItem {
  appid: number
  name: string
  playtime_forever: number
  img_icon_url: string
  capsule_filename: string
  has_workshop: boolean
  has_market: boolean
  has_dlc: boolean
  has_community_visible_stats?: boolean
  playtime_windows_forever?: number
  playtime_mac_forever?: number
  playtime_linux_forever?: number
  playtime_deck_forever?: number
  rtime_last_played?: number
  playtime_disconnected?: number
  content_descriptorids?: number[]
}


// interface Player {
//
// }

// games []
// {
//                 "appid": 570,
//                 "last_playtime": 1639653934,
//                 "playtime_2weeks": 0,
//                 "playtime_forever": 13327,
//                 "first_playtime": 1500446071,
//                 "playtime_windows_forever": 1520,
//                 "playtime_mac_forever": 0,
//                 "playtime_linux_forever": 4,
//                 "playtime_deck_forever": 0,
//                 "first_windows_playtime": 1567400446,
//                 "first_mac_playtime": 0,
//                 "first_linux_playtime": 1568210311,
//                 "first_deck_playtime": 0,
//                 "last_windows_playtime": 1639653934,
//                 "last_mac_playtime": 0,
//                 "last_linux_playtime": 1568243558,
//                 "last_deck_playtime": 0,
//                 "playtime_disconnected": 0
//             },
async function fetchPlayerGetOwnedGames(apikey:string,steamid:string){


  const data = await fetch(`/api/steam/player/ownedGames?key=${apikey}&steamid=${steamid}&include_appinfo=true&include_extended_appinfo=true`)
    .then(res=>res.json() as any)
    .then(res=>res.response as OwnedGameResponse)

  return data
}


export const usePlayerOwnedGames = () => {



  return useMutation({
    mutationFn: (
      {apikey,steamid}:{apikey:string,steamid:string},
    )=> {
      return fetchPlayerGetOwnedGames(apikey, steamid)
    },
  })
}