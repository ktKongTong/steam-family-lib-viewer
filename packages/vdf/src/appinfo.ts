import {BinaryIO} from "./io";
import {
  BVDFField,
  bvdfParse,
  BVDFType,
  readNullTerminatedString,
  vdfToBinaryFormat,
  vdfToTextFormat
} from "./vdf-serializer";
import {getBinarySHA1CheckSum, getTextSHA1CheckSum, hashToUint8Array, uint8ArrayToHashHex} from "./util";

// appinfo.vdf
export const appMagic = {
  x27: 0x07_56_44_27,
  x28: 0x07_56_44_28,
  x29: 0x07_56_44_29,
  end: 0x00_00_00_00
}

export interface AppInfo {
  appid: number,
  infoState: number,
  // a unix timestamp
  lastUpdated: number,
  picsToken: bigint,
  changeNumber: number,
  // 20bytes
  hash: string,
  // 20bytes
  binaryDataHash?: string
  data: {
    appinfo: BVDFField
  }
}


export const readAppInfoBinaryVDF = async (buf: ArrayBuffer) => {
  const binaryReader = new BinaryIO(buf, "little");
  const magic = binaryReader.readUInt32();    // magic     4B
  if (![appMagic.x27, appMagic.x28, appMagic.x29].includes(magic)) {
    throw new Error(`Unknown magic header: ${magic}`);
  }
  const universe = binaryReader.readUInt32();    // universe   4B
  const stringPool: string[] = [];

  const useStringPool = magic == appMagic.x29;
  if (useStringPool) {
    // string_table_offset 8B
    const stringTableOffset = binaryReader.readInt64();
    const stringTableBuf = buf.slice(Number(stringTableOffset));
    const tableReader = new BinaryIO(stringTableBuf, "little");
    // string_table_item_count 4B
    const stringCount = tableReader.readUInt32();
    for(let i=0; i < stringCount; i++) {
      stringPool.push(readNullTerminatedString(tableReader, false))
    }
  }
  const appinfos: AppInfo[] = [];
  while(true) {
    const appid = binaryReader.readUInt32();
    if(appid == appMagic.end) {
      break;
    }
    const size = binaryReader.readUInt32();
    // package end offset
    const end = binaryReader.position + size;
    const infoState = binaryReader.readUInt32();
    const lastUpdated = binaryReader.readUInt32();
    const picsToken = binaryReader.readUInt64();
    const hash = binaryReader.readBytes(20);
    const changeNumber = binaryReader.readUInt32()
    let app: any = {
      appid: appid,
      infoState: infoState,
      lastUpdated: lastUpdated,
      picsToken: picsToken,
      hash: uint8ArrayToHashHex(hash),
      changeNumber: changeNumber
    }
    if([appMagic.x28, appMagic.x29].includes(magic)) {
      const binaryHash = binaryReader.readBytes(20)
      app.binaryDataHash = uint8ArrayToHashHex(binaryHash)
    }
    const data = bvdfParse(binaryReader, stringPool, useStringPool)
    appinfos.push({
      ...app,
      data: data
    } satisfies AppInfo)
    if(binaryReader.position !== end) {
      throw new Error(`Expected ${end} byte offset, but got ${binaryReader.position}`)
    }
  }
  return appinfos
};

// "appid"  4B          // constant: appid, keep it
// "size"   4B          // compute: size of this data package
// "state"  4B          // constant: 1 or 2, keep it
// "last_update"  4B    // compute: a timestamp
// "access_token"  8B   // unknown, most is zero, some other not
// "checksum_text"  20B // compute: text checksum
// "change_number"  4B  // unknown
// "checksum_binary" 20B // compute: binary checksum, only in x29 version
// data item in 27,28, no string pool
// datatype 1B
// variable many bytes, name of data
//  content many bytes, depends on datatype

// data item in 29, use string pool
// datatype 1B
// name 4B string pool index indicate the name of data
// content many bytes, depends on datatype

// interface AppInfoForWrite {
//   appid: number,
//   infoState: number,
//   lastUpdated: number,
//   picsToken: bigint,
//   changeNumber: number,
//   data: {
//     appinfo: BVDFField
//   }
// }


export const writeAppInfoBinaryVDF = async (data: AppInfo[], version: '0x27' | '0x28' | '0x29') => {
  const useStringPool = version === '0x29'
  const result = new BinaryIO(new ArrayBuffer(1024*1024), 'little')
  result.writeUInt32(appMagic.x29)
  result.writeUInt32(1)

  if(useStringPool) {
    // string table offset
    result.adjustOffset(8)
  }
  const stringPool = [] as string[]
  // magic     4B
  // universe   4B
  // string_table_offset 8B
  for (const item of data) {
    const dataPkg = await convertAppInfoItemToBuf(item, stringPool, version)
    result.writeBytes(dataPkg)
  }
  result.writeUInt32(appMagic.end)
  if(version == '0x29') {
    result.writeUInt64(BigInt(result.position), 8)
    result.writeUInt32(stringPool.length)
    for (const str of stringPool) {
      const strBuf = new TextEncoder().encode(str)
      result.writeBytes(<ArrayBuffer>strBuf.buffer)
      result.writeUInt8(0x00)
    }
  }
  return result.arrayBuffer.slice(0, result.position)
}



const convertAppInfoItemToBuf = async (item: AppInfo, stringPool: string[], version: '0x27' | '0x28' | '0x29') => {
  const appinfo = item.data.appinfo
  // const _textHash= hashToUint8Array(item.hash).buffer
  // some text check sum is not correct
  // const newTextCheckSum= hashToUint8Array(item.hash).buffer
  const text = vdfToTextFormat(appinfo)
  const newTextCheckSum = await getTextSHA1CheckSum(text)



  const dataPart = new BinaryIO(new ArrayBuffer(1024*1024), "little")
  const useStringPool = version === '0x29'
  let headerSize = 48
  if(version === '0x28' || version === '0x29') {
    headerSize = 68
  }
  dataPart.writeUInt32(item.appid)
  const sizeOffset = dataPart.position
  dataPart.adjustOffset(4)
  dataPart.writeUInt32(item.infoState)
  dataPart.writeUInt32(item.lastUpdated)
  dataPart.writeUInt64(item.picsToken)
  dataPart.writeBytes(newTextCheckSum)
  dataPart.writeUInt32(item.changeNumber)

  let binaryChecksumOffset = dataPart.position
  if(version === '0x29') {
    dataPart.adjustOffset(20)
  }
  vdfToBinaryFormat(dataPart, [appinfo], stringPool, useStringPool)

  const dataBuf = dataPart.arrayBuffer.slice(headerSize, dataPart.position)
  const size = dataBuf.byteLength + headerSize - 8
  dataPart.writeUInt32(size, sizeOffset)
  if(version === '0x29') {
    const newBinaryCheckSum = await getBinarySHA1CheckSum(new Uint8Array(dataBuf))
    dataPart.writeBytes(newBinaryCheckSum, binaryChecksumOffset)
  }
  const dataPkg = dataPart.arrayBuffer.slice(0, dataPart.position)
  return dataPkg
}


//
// export const collectStringPool = (data: AppInfo[]) => {
//   const stringPool: string[] = []
//   for (const item of data) {
//     collectAllFieldName(item.data.appinfo, stringPool)
//   }
//   return stringPool
// }
// const collectAllFieldName = (data: BVDFField, result: string[] = []) => {
//   const push = (str: string) => {
//     if (!result.includes(str)) {
//       result.push(str)
//     }
//   }
//   push(data.name)
//   if(data.type === 'object') {
//     const dataArr = Object.entries(data.data)
//       .toSorted((a,b) => a[1].order - b[1].order)
//       .map(it => it[1])
//     for (const data of dataArr) {
//       collectAllFieldName(data, result)
//     }
//   }
//   return result
// }
