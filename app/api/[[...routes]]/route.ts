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
  decode:(arr:Uint8Array)=>any
}
interface Encoder {
  toBinary: (opt?:any)=>Uint8Array
}

const decodeResponseProtobuf = async(res:Response,decoder:Decoder)=>{
  let tmp =await res.arrayBuffer()
  const arr = new Uint8Array(tmp);
  const data =  decoder.decode(arr)
  return data
}

const encodeRequestProtobuf = async(encoder:Encoder)=>{
  const res = encoder.toBinary()
  return encodeProtobuf(res)
}

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