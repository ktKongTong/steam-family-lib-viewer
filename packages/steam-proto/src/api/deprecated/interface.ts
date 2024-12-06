import {Message, type PartialMessage} from "@bufbuild/protobuf";

export interface SteamMessageType<T extends Message<T>> extends Function {
  new (...args: any[]): T;
  fromBinary(...args: any[]):T;
}
export interface ProxiedAPIResponse<T> {
  ok: boolean,
  status: number,
  message: string,
  data:null | T
}

export interface SteamRoutes<REQ extends Message<REQ>, RES extends Message<RES>> {
  method: "GET" | "POST",
  serviceName: string,
  itemName: string,
  token?: string,
  useBuf?: boolean,
  reqClass: SteamMessageType<REQ>,
  respClass: SteamMessageType<RES>,
  param: PartialMessage<REQ>
}
// deprecated
