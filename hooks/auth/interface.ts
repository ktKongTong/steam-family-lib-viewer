
export interface AuthBasicInfo {
  qrInfo: {
    clientId: bigint,
    requestId: string,
    challengeUrl: string
  },
  sessionInfo: {
    sessionId: string,
    ak_bmsc?: string
  }
}



export interface SteamToken {
  id: string
  steamId: string
  accessToken: string
  // getBasicInfo
  accountName: string
  avatarUrl: string
  username: string
  addedAt: number
  refreshToken?: string
  authType: AuthType
  valid?: boolean
  other?: any
}
export enum AuthType {
  QR = "QR",
  InputToken = "InputToken",
}
export enum PollStatus {
  loadQR = "LoadingQR",
  notScan  = "Not Scanned",
  interactButNotAccept = "Interact ButNotAccept",
  accept = "Accept",
  // reject,
  outdated = "Outdated",
}