import {ua} from "../utils/ua";

export class SteamCommonApi {
  private readonly accessToken: string|undefined
  constructor(accessToken?:string) {
    this.accessToken = accessToken
  }
  async getWishlistBySteamIds(ids:string) {
    const wishesByPlayer = await Promise.all(ids.split(',').map(async (id)=>{
      const url = `https://store.steampowered.com/wishlist/profiles/${id}/wishlistdata/?p=0&v=`
      const res = await fetch(url, {
        headers: {
          'User-Agent': ua.edge,
        }
      }).then((res)=> res.json() as Promise<any>)
      const appIds = Object.keys(res)
      return appIds.map(appId=>({
        wisher: id,
        item:res[appId],
        appId:appId
      })).filter(app=>app.appId !== "success")
    }))

    const wishes = wishesByPlayer.flatMap(wish=>wish)
    const groupedWishes = Object.groupBy(wishes, (it) => it.appId)
    // const groupedWishes = _.groupBy(wishes,'appId')
    const appIds = Object.keys(groupedWishes)
    const finalWishes = appIds.map(appId => {
      const items = groupedWishes[appId]!
      return {
        wishers: items.map(item=>item.wisher),
        appId: appId,
        itemInfo: items[0].item
      }
    })
    return {
      data: finalWishes
    }
  }

  async getSteamItemsDetailsByIds(ids: string) {
    const idArr = ids.split(',').slice(0,10)
    let baseURL = "https://store.steampowered.com/api/appdetails?appids="
    const res = await Promise.all(
      idArr
        .map(
          id=> fetch(baseURL+id)
            .then(it=>it.json()  as Promise<any>)
            .catch(e=>{
              console.log("e",e)
              return{'status':'error' + e}}
            )
            .then(it=>it?.[id]?.['data'])
            .catch(e=>{
              console.log("e",e)
              return{'status':'error' + e}}
            )
        )
    )
    return {data: res}
  }
}