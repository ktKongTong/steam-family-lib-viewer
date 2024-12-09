import {InferRespType} from "@repo/steam-proto";

export interface PlayerStats {
  player: InferRespType<'Player', 'GetPlayerLinkDetails'>,
  achievementProgress: InferRespType<'Player', 'GetAchievementsProgress'>['achievementProgress'],
  games: InferRespType<'Player', 'GetOwnedGames'>,
  community: PlayerCommunityData
}


export interface PlayerCommunityData {
  guide: number,
  inventory: number,
  screenshots: number,
  workshopItems: number,
  reviews: number
}
