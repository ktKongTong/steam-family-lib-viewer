import {Message} from "@bufbuild/protobuf";
import {ProxiedAPIResponse, SteamRoutes} from "./interface";
import {uint8ArrayToBase64} from "../../utils";


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
  return uint8ArrayToBase64(res)
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

  let machineName = "Steam赛博家庭库存查看器(store in browser)"

  let refererQuery = {
    IN_CLIENT: 'true',
    WEBSITE_ID: 'Client',
    LOCAL_HOSTNAME: machineName,
    WEBAPI_BASE_URL: 'https://api.steampowered.com/',
    STORE_BASE_URL: 'https://store.steampowered.com/',
    USE_POPUPS: 'true',
    DEV_MODE: 'false',
    LANGUAGE: 'english',
    PLATFORM: 'windows',
    COUNTRY: 'US',
    LAUNCHER_TYPE: '0',
    IN_LOGIN: 'true'
  };

  let param = new URLSearchParams(refererQuery)
  const header = {
    'user-agent': 'Mozilla/5.0 (Windows; U; Windows NT 10.0; en-US; Valve Steam Client/default/1665786434; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      origin: 'https://store.steampowered.com/',
      referer: 'https://store.steampowered.com/'
  }
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

  const resp = await fetch(url, {
    method: route.method,
    body: body,
    headers: header
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