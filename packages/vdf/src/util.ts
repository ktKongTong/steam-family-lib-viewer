
export const hashToUint8Array = (hash: string) => {
  let result = [];

  for(let i = 0; i < hash.length; i+=2)
  {
    result.push(parseInt(hash.substring(i, i + 2), 16));
  }
  return Uint8Array.from(result)
}

export const getTextCheckSum = async (text: string) => {
  const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text))
  return toHashHex(hash)
}
export const getTextSHA1CheckSum = async (text: string) => {
  const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text))
  return hash
}
export const uint8ArrayToHashHex = (hash: Uint8Array) => {
  return Array.from(hash)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
const toHashHex = (hash: ArrayBuffer ) => {
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const getBinaryCheckSum = async (data: Uint8Array) => {
  const hash = await crypto.subtle.digest('SHA-1', data)
  return toHashHex(hash)
}



export const getBinarySHA1CheckSum = async (data: Uint8Array) => {
  const hash = await crypto.subtle.digest('SHA-1', data)
  return hash
}
