
import {f as ofetch, } from "@repo/shared";
import { isServerSide } from "@/lib/utils";
import { logger } from "@/lib/logger";



const f = ofetch.extend({
  onRequestError: async ({request}) => {
    if(!isServerSide()) {
      logger.error("request error")
      logger.error(request)
    }
  },
  onResponseError: async ({response, error}) => {
    if(!isServerSide()) {
      const bizError = response._data
      throw new BizError(bizError)
    }
  }
})

export class BizError extends Error {
  name = 'BizError'
  message: any
  constructor(message: any) {
    super("Biz Error")
    this.message = message
  }
}


export { f }