import {Message} from "@bufbuild/protobuf";
import {ProxiedAPIResponse, SteamRoutes} from "@/app/api/[[...routes]]/(api)/interface";
import {encodeProtobuf} from "@/lib/steam_utils";


interface Decoder {
  fromBinary:(arr:Uint8Array)=>any
}
interface Encoder {
  toBinary: (opt?:any)=>Uint8Array
}
interface Buf {
  fromJson:(obj:any) => Encoder
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




export async function SteamAPICall<REQ extends Message<REQ>,RES extends Message<RES>>(route:SteamRoutes<REQ,RES>):Promise<ProxiedAPIResponse<RES>> {
  try {
    return await RawSteamAPICall(route)
  }catch (e) {
    return {
      ok: false,
      status: 500,
      message: "unknown error" + e?.toString(),
      data: null
    }
  }
}


async function RawSteamAPICall<REQ extends Message<REQ>,RES extends Message<RES>>(route:SteamRoutes<REQ,RES>) {
  let useProto = route.useBuf == undefined ? true : route.useBuf
  let url = `https://api.steampowered.com/${route.serviceName}/${route.itemName}/v1`
  let req = new route.reqClass(route.param)
  let bufParam = await encodeRequestProtobuf(req)
  let body:undefined|FormData = undefined
  if(route.method === "GET") {
    let param =  new URLSearchParams()
    if(route.token) {
      param.set("access_token", route.token)
    }
    param.set("spoof_steamid","")
    param.set("origin", "https://store.steampowered.com")
    if(!useProto) {
      const obj = req.toJson({useProtoFieldName: true}) as Object
      let keys = Object.keys(obj)
      for(const key of keys) {
        // todo not work for nested object now
        param.set(key,obj[key as keyof object])
      }
    }else {
      param.set("input_protobuf_encoded", bufParam)
    }



    url += `?${param.toString()}`
  }else if (route.method === "POST") {
    const form = new FormData()
    if(route.token) {
      form.append("access_token",route.token)
    }
    form.append("input_protobuf_encoded", bufParam)
    body = form
  }
  //
  // CeRjDQAAAAAAEAEYASoIc2NoaW5lc2U%3D
  // https://api.steampowered.com/IFamilyGroupsService/GetSharedLibraryApps/v1
    // ?access_token=eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEVGOV8yNDUxRDkzOV83NDBCQSIsICJzdWIiOiAiNzY1NjExOTgzMzk5ODY1NDQiLCAiYXVkIjogWyAid2ViOnN0b3JlIiBdLCAiZXhwIjogMTcxNTk4ODE5NSwgIm5iZiI6IDE3MDcyNjEzMjksICJpYXQiOiAxNzE1OTAxMzI5LCAianRpIjogIjBFRUJfMjQ2RDg5MTNfRTcxNkIiLCAib2F0IjogMTcxNDQ5MDMzNSwgInJ0X2V4cCI6IDE3MzI0OTM5MDMsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICIxOC4xNjIuOTYuOTciLCAiaXBfY29uZmlybWVyIjogIjE4LjE2Mi45Ni45NyIgfQ.vQOc168_uCa7sOEs1ckdP9X4_haf9Q_tbe8iITy_xnefNS4-5jDmlVVSVW27CGacowjmYx3db3L545fYKw3ODA
    // &spoof_steamid=&origin=https:%2F%2Fstore.steampowered.com&input_protobuf_encoded=CeRjDQAAAAAAEAEYASoIc2NoaW5lc2U%3D
  const resp = await fetch(url, {
    method: route.method,
    body: body,
    headers: {
      'Origin':'https://store.steampowered.com',
      'Referer':'https://store.steampowered.com/',
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0'
    }
  })
  if(useProto) {
    let tmp =await resp.arrayBuffer()
    const arr = new Uint8Array(tmp);
    return {
      ok: resp.ok,
      status: resp.status,
      message: "ok",
      data: route.respClass.fromBinary(arr)
    }
  }
  let data = await resp.json() as JsonResponse<RES>
   return  {
    ok: resp.ok,
    status: resp.status,
    message: "ok",
    data: data.response
  }
}

interface JsonResponse<T> {
  "response": T
}