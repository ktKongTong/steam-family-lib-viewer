
export interface PlayerSummariesResponse {
  response: {
    players?: PlayerSummary[]
  }
}
export interface PlayerSummary {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  lastlogoff?: number
  personastate: number
  primaryclanid?: string
  timecreated?: number
  personastateflags?: number
  loccountrycode?: string
  locstatecode?: string
  loccityid?: number
}

