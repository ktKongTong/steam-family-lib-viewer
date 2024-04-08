import {
  CFamilyGroups_GetFamilyGroupForUser_Request,
  CFamilyGroups_GetFamilyGroupForUser_Response,
  CFamilyGroups_GetSharedLibraryApps_Request,
  CFamilyGroups_GetSharedLibraryApps_Response
} from '@/proto/gen/web-ui/service_familygroups_pb';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import {encodeProtobuf} from '@/lib/steam_utils';
import {CStoreBrowse_GetItems_Request, CStoreBrowse_GetItems_Response} from "@/proto/gen/web-ui/common_pb";
import {
  CPlayer_GetPlayerLinkDetails_Request,
  CPlayer_GetPlayerLinkDetails_Response
} from "@/proto/gen/web-ui/service_player_pb";
import { jwtDecode } from "jwt-decode";
import {
  CAuthentication_BeginAuthSessionViaQR_Request,
  CAuthentication_BeginAuthSessionViaQR_Response,
  CAuthentication_PollAuthSessionStatus_Request,
  CAuthentication_PollAuthSessionStatus_Response
} from "@/proto/gen/web-ui/service_authentication_pb";
import {util} from "protobufjs";
import _ from "lodash";

export const runtime = 'edge';

const app = new Hono()
app.post('/api/hello', async(c) => {
  const {url} = await c.req.json()
  const res = await fetch(url)
  let tmp =await res.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  CFamilyGroups_GetSharedLibraryApps_Response.fromBinary(arr)
  return c.json(JSON.parse(data.toJsonString()))
})
interface Decoder {
  fromBinary:(arr:Uint8Array)=>any
}
interface Encoder {
  toBinary: (opt?:any)=>Uint8Array
}
interface Buf {
  fromJson:(obj:any) => Encoder
}

const encodeRequestProtobuf = async(encoder:Encoder)=>{
  const res = encoder.toBinary()
  return encodeProtobuf(res)
}
const decodeResponseProtobuf = async(resp:Response,decoder:Decoder)=>{
  let tmp =await resp.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  decoder.fromBinary(arr)
  return data
}
const f = async(clazz: Buf,value:any)=> {
  try {
    const req = clazz.fromJson(value)
    let bufParam = await encodeRequestProtobuf(req)
    return bufParam
  }catch(err){
    console.log(err)
  }

  // bufParam = bufParam.replaceAll('+','%2B').replaceAll('=','%3D')

}

app.get('/api/steam/wishlist/:ids', async (c)=> {
  const idParam = c.req.param('ids')
  const wishesByPlayer = await Promise.all(idParam.split(',').map(async (id)=>{
    const url = `https://store.steampowered.com/wishlist/profiles/${id}/wishlistdata/?p=0&v=`
    const res = await fetch(url).then(async (res)=> {
     const text = await res.text()
      console.log(text)
      return JSON.parse(text)
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
  return c.json({
    data: finalWishes,
  })

})

app.get('/api/steam/auth/qr', async (c)=>{
  const bufParam = await f(CAuthentication_BeginAuthSessionViaQR_Request, {
    deviceDetails: {
      deviceFriendlyName: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0",
      platformType: 1
    },
    websiteId: 'Store'
  })
  const form = new FormData()

  form.set("input_protobuf_encoded", bufParam!)
  const url = "https://api.steampowered.com/IAuthenticationService/BeginAuthSessionViaQR/v1"
  const resp = await fetch(url,{method: 'POST', body: form, headers: {
      'Origin':'https://store.steampowered.com',
      'Referer':'https://store.steampowered.com/',
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0'
    }})
  let tmp =await resp.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  CAuthentication_BeginAuthSessionViaQR_Response.fromBinary(arr)
  return c.json({data})
})

app.get('/api/steam/auth/poll', async (c)=>{
  const client_id= c.req.query('client_id')
  const request_id= c.req.query('request_id')
  // base64 to
  // const buf = new Uint8Array(16)
  // base64.decode(request_id!, buf, 0)
  // base64 编码
  const buf = Buffer.from(request_id!, 'base64')
  const arr1 = new Uint8Array(buf)
  const a = new CAuthentication_PollAuthSessionStatus_Request({
    clientId: BigInt(client_id!),
    requestId: arr1
  })
  const bufParam = await encodeRequestProtobuf(a)
  const form = new FormData()
  form.set('input_protobuf_encoded',bufParam!)
  const url = "https://api.steampowered.com/IAuthenticationService/PollAuthSessionStatus/v1"
  const resp = await fetch(url,{method: 'POST', body: form, headers: {
      'Origin':'https://store.steampowered.com',
      'Referer':'https://store.steampowered.com/',
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0'
    }})
  let tmp =await resp.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  CAuthentication_PollAuthSessionStatus_Response.fromBinary(arr)
  return c.json({data})
})
// info self id must be first
app.get('/api/steam/player/:ids',async (c)=>{
  const idParam = c.req.param('ids')
  const tokenParam = c.req.query('access_token')
  const tokenInfo = jwtDecode(tokenParam??"")
  const user = tokenInfo.sub
  if(!user) {
    return c.json({
      data:null
    })
  }
  let ids = idParam.split(',')
    .filter(id=>/[0-9]{17}/.test(id))
    .slice(0,6)
  if(ids.includes(user)){
    ids = ids.filter(id=>id!=user)
  }
  ids = [user].concat(ids)
  const req = CPlayer_GetPlayerLinkDetails_Request.fromJson({
    "steamids":ids,
  })
  let bufParam = await encodeRequestProtobuf(req)
  const baseURL =
    `https://api.steampowered.com/IPlayerService/GetPlayerLinkDetails/v1?access_token=${tokenParam}&spoof_steamid=&origin=https:%2F%2Fstore.steampowered.com&input_protobuf_encoded=`
  bufParam = bufParam.replace('+','%2B').replaceAll('=','%3D')
  let url = baseURL + bufParam
  const resp = await fetch(url)
  let tmp =await resp.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  CPlayer_GetPlayerLinkDetails_Response.fromBinary(arr)

  const converted = data
    // .accounts
  //   .map((account=>({
  //   ...account,
  //   publicData: {
  //     ...account.publicData,
  //     shaDigestAvatar: shaDigestAvatarToStrAvatarHash(account.publicData?.shaDigestAvatar!)
  //   }
  // })))
  return c.json({
    data: converted
  })

})

app.get('/api/steam/family', async (c)=>{
  const tokenParam = c.req.query('access_token')
  const tokenInfo = jwtDecode(tokenParam??"")
  const user = tokenInfo.sub
  if(!user) {
    return c.json({
      data:null
    })
  }
  const req = CFamilyGroups_GetFamilyGroupForUser_Request.fromJson({
    "steamid":user,
    include_family_group_response: true
  })
  let bufParam = await encodeRequestProtobuf(req)
  const baseURL =
    `https://api.steampowered.com/IFamilyGroupsService/GetFamilyGroupForUser/v1?access_token=${tokenParam}&spoof_steamid=&origin=https:%2F%2Fstore.steampowered.com&input_protobuf_encoded=`
  bufParam = bufParam.replace('+','%2B').replaceAll('=','%3D')
  let url = baseURL + bufParam
  const resp = await fetch(url)
  let tmp =await resp.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  CFamilyGroups_GetFamilyGroupForUser_Response.fromBinary(arr)
  return c.json({data})
})

app.get('/api/steam/family/shared/:id', async (c)=> {
  const tokenParam = c.req.query('access_token')
  const familyParam = c.req.param('id')
  const tokenInfo = jwtDecode(tokenParam??"")

  const user = tokenInfo.sub
  if(!user) {
    return c.json({
      data:null
    })
  }
  console.log(familyParam,user)
  const req = CFamilyGroups_GetSharedLibraryApps_Request.fromJson({
    "family_groupid":familyParam,
    include_own: true,
    include_excluded: true,
    language:'schinese',

    // steamid: user,
    // max_apps: 1000,
  })
  let bufParam = await encodeRequestProtobuf(req)
  const baseURL =
    `https://api.steampowered.com/IFamilyGroupsService/GetSharedLibraryApps/v1?access_token=${tokenParam}&spoof_steamid=&origin=https:%2F%2Fstore.steampowered.com&input_protobuf_encoded=`
  bufParam = bufParam.replaceAll('+','%2B').replaceAll('=','%3D')
  let url = baseURL + bufParam
  const resp = await fetch(url)
  let tmp =await resp.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  CFamilyGroups_GetSharedLibraryApps_Response.fromBinary(arr)
  return c.json({
    data:data
  })
})

app.get('/api/steam/items/:ids',async (c)=>{
  const idParam = c.req.param('ids')
  const ids = idParam.split(',').slice(0,30)
    .map(it=> parseInt(it))
    .filter(it => !Number.isNaN(it))
    .map(it=>({
      appid: it
    }))
  const baseURL = "https://api.steampowered.com/IStoreBrowseService/GetItems/v1?origin=https:%2F%2Fstore.steampowered.com&input_protobuf_encoded="
  const req = CStoreBrowse_GetItems_Request.fromJson({
    "ids":ids,
    "context":{
      "language":'schinese',
      "country_code":"US",
      "steam_realm":1
    },
    "data_request":{
      include_assets : true,
      include_release : true,
      include_platforms : true,
      include_screenshots: true,
      include_trailers: true,
      "include_tag_count":20,
    }
  })
  let bufParam = await encodeRequestProtobuf(req)
  bufParam = bufParam.replaceAll('+','%2B').replaceAll('=','%3D')
  let url = baseURL + bufParam
  const resp = await fetch(url)
  let tmp =await resp.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  CStoreBrowse_GetItems_Response.fromBinary(arr)
  return c.json({data})
})

app.get('/api/steam/detail/:ids', async(c) => {
  const idParam = c.req.param('ids')
  const ids = idParam.split(',').slice(0,10)
  let baseURL = "https://store.steampowered.com/api/appdetails?appids="
  console.log('query',ids)
  const res = await Promise.all(
    ids
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
  return c.json({data: res})
})
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)