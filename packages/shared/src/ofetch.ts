import {$Fetch, createFetch, FetchOptions, ofetch} from "ofetch";
import { logger } from "./logger";

export const rofetch = createFetch({defaults: {
    retryStatusCodes: [400, 408, 409, 425, 429, 500, 502, 503, 504],
    retry: 3,
    retryDelay: 800,
  }}).create({
  onResponseError({ request, response, options }) {
    if (options.retry) {
      logger.warn(`external request ${request} with error ${response.status} remaining retry attempts: ${options.retry}`);
    }
  },
  onRequestError({ request, error }) {
    logger.error(`external request ${request} fail: ${error}`);
  },
});

export type ExtendFetchOptions = {
  form?: Record<string, any>,
  json?: Record<string, any>,
  searchParams?: Record<string, any>,
  raw?: boolean
} & FetchOptions

type ISRawFetch<T extends ExtendFetchOptions> = T extends ExtendFetchOptions ? T['raw'] extends boolean ? T['raw'] : false : never

type FetchReturnType<T, F extends ExtendFetchOptions> = ISRawFetch<F> extends true ? Response : T


export class Fetch {
  private options?: FetchOptions
  private ofetchInstance: $Fetch
  constructor(fetchInstance?:$Fetch, options?: FetchOptions) {
    this.options = options;
    this.ofetchInstance = fetchInstance ?? rofetch;
  }
  private async fetch(request: string, options?: ExtendFetchOptions) {
    if (options?.json && !options.body) {
      options.body = options.json;
      delete options.json;
    }
    if (options?.form && !options.body) {
      options.body = new URLSearchParams(options.form as Record<string, string>).toString();
      if (!options.headers) {
        options.headers = {}
      }

      options.headers = { ...options.headers, 'content-type': 'application/x-www-form-urlencoded' }
      delete options.form;
    }

    if (options?.searchParams) {
      request += '?' + new URLSearchParams(options.searchParams).toString();
      delete options.searchParams;
    }
    if(options?.raw) {
      const res = await this.ofetchInstance.native(request, {
        ...this.options,
        ...options,
      } as any);
      return res
    }
    const res = await this.ofetchInstance(request, {
      ...this.options,
      ...options,
    });
    return res
  }
  get<T extends any = any, F extends ExtendFetchOptions = ExtendFetchOptions>(request: string, options?: F):Promise<FetchReturnType<T,F>> {
    return this.fetch(request, { ...options, method: 'GET' })
  }
  post<T extends any = any, F extends ExtendFetchOptions = ExtendFetchOptions>(request: string, options?: ExtendFetchOptions):Promise<FetchReturnType<T,F>> {
    return this.fetch(request, { ...options, method: 'POST' })
  }
  put<T extends any = any, F extends ExtendFetchOptions = ExtendFetchOptions>(request: string, options?: ExtendFetchOptions):Promise<FetchReturnType<T,F>> {
    return this.fetch(request, { ...options, method: 'PUT' })
  }
  patch<T extends any = any, F extends ExtendFetchOptions = ExtendFetchOptions>(request: string, options?: ExtendFetchOptions):Promise<FetchReturnType<T,F>> {
    return this.fetch(request, { ...options, method: 'PATCH' })
  }
  delete<T extends any = any, F extends ExtendFetchOptions = ExtendFetchOptions>(request: string, options?: ExtendFetchOptions):Promise<FetchReturnType<T,F>> {
    return this.fetch(request, { ...options, method: 'DELETE' })
  }
  head<F extends ExtendFetchOptions = ExtendFetchOptions>(request: string, options?: ExtendFetchOptions):Promise<FetchReturnType<any,F>> {
    return this.fetch(request, { ...options, method: 'HEAD' })
  }

  extend(options: FetchOptions) {
    return new Fetch(this.ofetchInstance,{...this.options, ...options})
  }
}
export const f = new Fetch()
export { createFetch } from 'ofetch'