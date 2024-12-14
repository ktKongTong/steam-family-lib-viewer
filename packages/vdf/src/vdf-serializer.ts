import {BinaryIO} from "./io";

// https://developer.valvesoftware.com/wiki/Binary_VDF
const VDFType = {
  NESTED: 0x00,
  STRING: 0x01,
  INT32: 0x02,
  FLOAT32: 0x03,
  POINTER: 0x04,
  // string wide, 16bit int, 表示字符串中的字符数（不包括 null 终止符）后跟许多 little-endian UCS-2 代码点。（注意：Valve 在 Source SDK 2013 中实现的 KeyValues 不支持此功能。
  WSTRING: 0x05,
  // RGBA8888
  RGBCOLOR: 0x06,
  UINT64: 0x07,
  // COMPILED_INT_BYTE 一个 8 位有符号整数，读取时转换为 INT32。
  // 无数据字节;表示设置为 0 的INT32
  COMPILED_INT_0: 0x09,
  // 无数据字节;表示设置为 1 的INT32
  COMPILED_INT_1: 0x0A,

  // https://github.com/ValvePython/vdf/blob/master/vdf/__init__.py
  END: 0x08,
  END_ALT: 0x0B,
}

export const bvdfParse = (reader: BinaryIO, stringPool: string[] = [], useStringPool = false) => {
  let result: [string, BVDFField][] = []

  // 拼接为对象，重复名称+1
  const combineResultToObject = (arr: [string, any][]) => {
    let nameDict: Record<string, number> = {}
    let obj:Record<string, BVDFField> = {}
    for (let i = 0; i < result.length; i++) {
      const key = result[i][0] as string
      if (nameDict[key]) {
        nameDict[key] += 1
      } else {
        nameDict[key] = 1
      }
      const suffix = nameDict[key] > 1 ? nameDict[key] - 1 : ''
      obj[key + suffix] = result[i][1]
    }
    return obj
  }
  let order = 0
  while (true) {
    const type = reader.readUInt8()
    if([VDFType.END, VDFType.END_ALT].includes(type)) {
      return combineResultToObject(result)
    }
    let name: string = ''
    if(!useStringPool) {
      name = readNullTerminatedString(reader,false);
    } else {
      const index = reader.readUInt32();
      name = stringPool[index];
    }
    order++
    switch (type) {
      case VDFType.NESTED: // nested
        const nested = bvdfParse(reader, stringPool, useStringPool)
        // const fields =
        result.push([name, {
          name: name,
          data: nested,
          type: 'object',
          order
        }])
        continue
      case VDFType.STRING: // string
        const value = readNullTerminatedString(reader, false)

        result.push([name, {
          name: name,
          data: value,
          type: 'str',
          order
        }])
        continue
      case VDFType.INT32:
        const VN = reader.readInt32()
        result.push([name, {
          name: name,
          data: VN,
          type: 'int32',
          order
        }])
        continue
      // case VDFType.FLOAT32: // string
      //   const VF = reader.readBytes(4)
      //   result.push([name, {
      //     name: name,
      //     data: VF,
      //     type: 'float32'
      //   }])
      //   console.log("float32")
      //   continue
      // case VDFType.POINTER:
      //   const VP = reader.readInt32()
      //   result.push([name, {
      //     name: name,
      //     data: VP,
      //     type: 'pointer'
      //   }])
      //   console.log("pointer")
      //   continue
      // case VDFType.UINT64:
      //   const i64 = reader.readUInt64()
      //   result.push([name, {
      //     name: name,
      //     data: i64,
      //     type: 'uint64'
      //   }])
      //   console.log("uint64")
      //   continue
      // case VDFType.COMPILED_INT_0:
      //   result.push([name, {
      //     name: name,
      //     data: false,
      //     type: 'boolean'
      //   }])
      //   console.log("COMPILED_INT_0")
      //   continue
      // case VDFType.COMPILED_INT_1:
      //   result.push([name, {
      //     name: name,
      //     data: true,
      //     type: 'boolean'
      //   }])
      //   console.log("COMPILED_INT_1")
      //   continue
      // case VDFType.RGBCOLOR:
      //   const color = reader.readInt32()
      //   result.push([name, {
      //     name: name,
      //     data: color,
      //     type: 'rgb_color'
      //   }])
      //   console.log("rgb_color")
      //   continue
      // case VDFType.WSTRING:
      //   const wideStr = readNullTerminatedString(reader, true)
      //   result.push([name, {
      //     name: name,
      //     data: wideStr,
      //     type: 'wide_str'
      //   }])
      //   console.log("wide_str")
      //   continue
      default:
        throw new Error(`Unsupported type 0x${type.toString(16)}`)
    }
  }
}


export const readNullTerminatedString = (binaryReader: BinaryIO, wide: boolean) => {
  const bufferArray: number[] = []
  let zeroCnt = 0
  while(true) {
    let bytes = binaryReader.readBytes(1);
    let byte = bytes[0];
    if (byte == 0) {
      if (!wide || zeroCnt == 1) {
        break;
      }
      zeroCnt++
    }else {
      zeroCnt = 0
    }
    bufferArray.push(byte);
  }
  return new TextDecoder().decode(Uint8Array.from(bufferArray));
}

const BVDFType = {
  NESTED: 'nested' as const,
  STRING: 'string' as const,
  WSTRING: 'wide_str' as const,
  INT32: 'int32' as const,
  FLOAT32: 'float32' as const,
  POINTER: 'pointer' as const,
  UINT64: 'uint64' as const,
  RGBCOLOR: 'rgb_color' as const,
  COMPILED_INT_0: 'boolean' as const,
  COMPILED_INT_1: 'boolean' as const,
} as const

export type BVDFType = 'object' | 'str' | 'wide_str' | 'float32' | 'int32' | 'uint64' | 'rgb_color' | 'boolean' | 'pointer'
export type BVDFDataType =
  { type: 'object', data: Record<string, BVDFField> }
  | { type: 'str', data: string }
  | { type: 'wide_str', data: string }
  | { type: 'float32', data: Uint8Array }
  | { type: 'int32', data: number }
  | { type: 'uint64', data: bigint }
  | { type: 'rgb_color', data: number }
  | { type: 'boolean', data: boolean }
  | { type: 'pointer', data: number}

const t = {
  'object': 0x00, 'str': 0x01, 'int32': 0x02, 'uint64': 0x03,
  'float32': 0x04, 'boolean': 0x05, 'rgb_color': 0x06, 'pointer': 0x07,
}
const strDataTypeToCodeDataType = (type: BVDFType) => {
  return t[type as any as keyof typeof t]
}

export type BVDFField = {
  name: string,
  order: number
} & BVDFDataType



export const vdfToTextFormat = (data: BVDFField, tabcount: number = 0) => {
  let template = ''
  const tab = '\t'
  const name = data.name
    .replaceAll("\\", '\\\\')
  if (data.type === 'object') {
    template += tab.repeat(tabcount) + `"${name}"\n` + tab.repeat(tabcount) + `{\n`
    const sortedEntry = Object.entries(data.data)
      .toSorted((a,b) => a[1].order - b[1].order)
    for (const [key, value] of sortedEntry) {
      template += vdfToTextFormat(value, tabcount + 1)
    }
    return template + (tab.repeat(tabcount) + `}\n`)
  } else if (data.type === 'int32') {
    return template + tab.repeat(tabcount) + `"${name}"\t\t"${data.data}"\n`
  }
  else if (data.type === 'str') {
    const _data = data.data
      .replaceAll("\\", '\\\\')
    return template + tab.repeat(tabcount) + `"${name}"\t\t"${_data}"\n`

  }
  throw new Error(`Unknown type: ${data.type}`)

  // else if (data.type === 'wide_str') {
  //   template += tab.repeat(tabCount) + `"${data.name}"\t\t"${data.data}"\n`
  //   } else if (data.type === 'float32') {
  //     template += tab.repeat(tabCount) + `"${data.name}"\t\t"${data.data}"\n`
  //   }else if (data.type === 'boolean') {
  //     template += tab.repeat(tabCount) + `"${data.name}"\t\t"${data.data ? 1:0}"\n`
  //   }else if (data.type === 'uint64') {
  //     template += tab.repeat(tabCount) + `"${data.name}"\t\t"${data.data}"\n`
  //   }

}



const writeFieldName = (io:BinaryIO, name: string, stringPool: string[], useStringPool: boolean = false) => {
  if (useStringPool) {
    const idx = stringPool.findIndex(it => it === name)
    if (idx === -1) {
      stringPool.push(name)
    }
    const newIdx = idx === -1 ? stringPool.length - 1 : idx
    io.writeUInt32(newIdx)
  } else {
    const text = new TextEncoder().encode(name).buffer
    io.writeBytes(<ArrayBuffer>text)
    io.writeUInt8(0x00)
  }
}





export const vdfToBinaryFormat = (io:BinaryIO, dataArr: BVDFField[], stringPool: string[], useStringPool: boolean = false) => {
  // appinfo
  for (const data of dataArr) {
    // datatype to hex
    io.writeUInt8(strDataTypeToCodeDataType(data.type))
    writeFieldName(io, data.name, stringPool, useStringPool)
    switch (data.type) {
      case "object":
        const _dataArr = Object.entries(data.data)
          .toSorted((a,b) => a[1].order - b[1].order)
          .map(it => it[1])
        vdfToBinaryFormat(io, _dataArr, stringPool, useStringPool)
        break
      case "str":
        const _dataStr = data.data
        let strArr = new TextEncoder().encode(_dataStr).buffer
        io.writeBytes(<ArrayBuffer>strArr)
        io.writeUInt8(0x00)
        break
      case "int32":
        io.writeUInt32(data.data)
        break
      default:
        throw new Error(`Unknown type: ${data.type}`)
    }
  }

  io.writeUInt8(0x08)
}

