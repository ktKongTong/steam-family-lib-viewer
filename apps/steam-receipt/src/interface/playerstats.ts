import {InferRespJsonType} from "@repo/steam-proto";

export interface PlayerStats {
  player: InferRespJsonType<'Player', 'GetPlayerLinkDetails'>,
  achievementProgress: InferRespJsonType<'Player', 'GetAchievementsProgress'>['achievementProgress'],
  games: InferRespJsonType<'Player', 'GetOwnedGames'>,
  community: PlayerCommunityData
}


export interface PlayerCommunityData {
  guide: number,
  inventory: number,
  screenshots: number,
  workshopItems: number,
  reviews: number
}
