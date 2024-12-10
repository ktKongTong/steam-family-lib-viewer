// import {InferJsonType} from "@repo/steam-proto";
// import {hashKey} from "@tanstack/react-query";
//
// class SteamFamily {
//
//   readonly familyInfo: InferJsonType<'FamilyGroups', 'GetFamilyGroupForUser'>
//   readonly sharedPlayTime: InferJsonType<'FamilyGroups', 'GetPlaytimeSummary'>
//   readonly sharedLibrary: InferJsonType<'FamilyGroups', 'GetSharedLibraryApps'>
//   readonly playerDetails: InferJsonType<'Player', 'GetPlayerLinkDetails'>
//   readonly libraryDetails: InferJsonType<'StoreBrowse', 'GetItems'>[]
//   constructor(
//     familyInfo: InferJsonType<'FamilyGroups', 'GetFamilyGroupForUser'>,
//     sharedPlayTime: InferJsonType<'FamilyGroups', 'GetPlaytimeSummary'>,
//     sharedLibrary: InferJsonType<'FamilyGroups', 'GetSharedLibraryApps'>,
//     playerDetails: InferJsonType<'Player', 'GetPlayerLinkDetails'>,
//     libraryDetails: InferJsonType<'StoreBrowse', 'GetItems'>[]
//   ) {
//     this.familyInfo = familyInfo
//     this.sharedPlayTime = sharedPlayTime
//     this.sharedLibrary = sharedLibrary
//     this.playerDetails = playerDetails
//     this.libraryDetails = libraryDetails
//   }
//   cache: Cache = Cache.getInstance()
//
//   get sharedPlayTimeByApp() {
//     const qk = ['sharedPlayTimeByApp', this.familyInfo.familyGroupid]
//     const key = hashKey(qk)
//     if(this.cache.has(key)) return this.cache.get(key)
//
//     const v = this.sharedPlayTime.entries.reduce((acc, cur) => {
//       acc[cur.appid!] = cur
//       return acc
//     }, {} as Record<string, any>)
//     this.cache.set(key, v)
//     return v
//   }
// }
//
//
// class Cache {
//   static instance: Cache | undefined
//   static getInstance() {
//     if(!Cache.instance) {
//       Cache.instance = new Cache()
//     }
//     return Cache.instance
//   }
//
//   cache: Record<string, any> = {}
//   has(key: string) {
//     return this.cache[key] !== undefined
//   }
//   get<T = any>(key: string) {
//     return this.cache[key] as T
//   }
//
//   set<T>(key: string, value: T) {
//     this.cache[key] = value
//   }
// }