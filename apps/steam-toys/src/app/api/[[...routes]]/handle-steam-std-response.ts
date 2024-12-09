import {SteamStdResponseType} from "@repo/steam-proto";
import {ServiceDict, ServiceMethodDict} from "@repo/steam-proto";
import {Context} from "hono";

export const handleSteamStdResponse = <
  T extends ServiceDict,
  M extends ServiceMethodDict<T>
>(
  c: Context,
  res: SteamStdResponseType<T, M> & { code: number }
) => {
  if (res.success) {
    return c.json(res.data)
  }
  return c.json({
    success: false,
    errorType: 'Call Steam API Error',
    errorMessage: res.errorMessage
  }, res.code as any)
}