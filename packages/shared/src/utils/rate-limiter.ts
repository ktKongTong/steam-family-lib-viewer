// rate by count
export const createRateLimiter = (max: number, timeout: number = 60 * 1000) => {
  const map = new Map<string, number>()
  return {
    tryLock: (key: string) => {
      const lastCount = map.get(key) ?? 0
      const canExecute = lastCount < max
      if (canExecute) {
        map.set(key, lastCount + 1)
      }else {
        return {
          unlock: () => {},
          ok: false
        }
      }
      let canceled = false
      const cancel = () => {
        if (canceled) return
        canceled = true
        map.set(key,map.get(key)! - 1)
      }

      setTimeout(cancel, timeout)
      return {
        unlock: cancel,
        ok: canExecute
      }
    }
  }
}


