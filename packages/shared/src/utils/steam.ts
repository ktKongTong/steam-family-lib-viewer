import {base64ToUint8Array} from "@/utils/coder";

export function shaDigestAvatarBase64ToStrAvatarHash(base64:string) {
  const arr = base64ToUint8Array(base64)
  return shaDigestAvatarToStrAvatarHash(arr)
}

const n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

export function shaDigestAvatarToStrAvatarHash(e:Uint8Array) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    t += n[i >>> 4] + n[15 & i]
  }
  return t
}