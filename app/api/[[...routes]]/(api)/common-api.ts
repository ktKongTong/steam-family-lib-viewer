import _ from "lodash";
import {ProxiedAPIResponse} from "./interface";
import {SteamAPICall} from "./steam-request";
import {PartialMessage} from "@bufbuild/protobuf";
import {
  CPlayer_GetPlayerLinkDetails_Request,
  CPlayer_GetPlayerLinkDetails_Response
} from "@/proto/gen/web-ui/service_player_pb";
import {CStoreBrowse_GetItems_Request, CStoreBrowse_GetItems_Response} from "@/proto/gen/web-ui/common_pb";

export class SteamCommonApi {
  private readonly accessToken: string|undefined
  constructor(accessToken?:string) {
    this.accessToken = accessToken
  }

  // todo: decorator still not work on ts5 & nextjs 14
  // check this: https://github.com/vercel/next.js/issues/48360
  // @wrapperAPI()
  async getWishlistBySteamIds(ids:string) {
    const wishesByPlayer = await Promise.all(ids.split(',').map(async (id)=>{
      const url = `https://store.steampowered.com/wishlist/profiles/${id}/wishlistdata/?p=0&v=`
      const res = await fetch(url, {
        headers: {
          'User-Agent':'SteamFamilyLibViewer/0.0.1 (https://steam-family-lib-viewer.ktlab.io)'
        }
      }).then(async (res)=> {
        //  console.log(url)
        // const text = await res.text()
        //  console.log(text)
        return res.json()
      })
      const appIds = Object.keys(res)
      return appIds.map(appId=>({
        wisher: id,
        item:res[appId],
        appId:appId
      })).filter(app=>app.appId !== "success")
    }))
    const wishes = wishesByPlayer.flatMap(wish=>wish)
    const groupedWishes = _.groupBy(wishes,'appId')
    const appIds = Object.keys(groupedWishes)
    const finalWishes = appIds.map(appId => {
      const items = groupedWishes[appId]
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

  // @wrapperAPI()
  async getSteamItemsDetailsByIds(ids: string) {
    const idArr = ids.split(',').slice(0,10)
    let baseURL = "https://store.steampowered.com/api/appdetails?appids="
    const res = await Promise.all(
      idArr
        .map(
          id=> fetch(baseURL+id)
            .then(it=>it.json())
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

  getSteamItemsById(params:PartialMessage<CStoreBrowse_GetItems_Request>) {
    return  SteamAPICall({
      method: "GET",
      serviceName: "IStoreBrowseService",
      itemName: "GetItems",
      reqClass: CStoreBrowse_GetItems_Request,
      respClass: CStoreBrowse_GetItems_Response,
      param: params
    })
  }

  getSteamPlayerLinkDetails(params:PartialMessage<CPlayer_GetPlayerLinkDetails_Request> ,token:string){
    return SteamAPICall({
      method: "GET",
      token: token,
      serviceName: "IPlayerService",
      itemName: "GetPlayerLinkDetails",
      reqClass: CPlayer_GetPlayerLinkDetails_Request,
      respClass: CPlayer_GetPlayerLinkDetails_Response,
      param: params
    })
  }
}

// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//     this.greeting = message;
//   }
//
//   @enumerable(false)
//   greet() {
//     return "Hello, " + this.greeting;
//   }
// }
// function enumerable(value: boolean) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     descriptor.enumerable = value;
//   };
// }

export function wrapperAPI<T>() {
  return function (targetClassPrototype: any, methodName: any, propertyDescriptor: PropertyDescriptor) {
    let method = propertyDescriptor.value
    propertyDescriptor.value = function (...args:any) {
      try {
        return method.call(this, args)
      }catch (e) {
        return {
          ok: false,
          status: 500,
          message: `unknown error during execute ${methodName}, ${e?.toString()}`,
          data: null
        } as ProxiedAPIResponse<T>
      }
    }
  };
}