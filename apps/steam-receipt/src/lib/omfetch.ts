
import {f as ofetch } from "@repo/shared";

const  f = ofetch
  .extend({
    retryStatusCodes: [408, 409, 425, 502, 503, 504],
    retry: 2
})

export { f }