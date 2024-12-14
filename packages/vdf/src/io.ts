export class BinaryIO {

  arrayBuffer: ArrayBuffer
  dataview: DataView
  littleEndian: boolean
  encoding: BufferEncoding
  position: number = 0
  private readonly length: number

  constructor(arrBuf: ArrayBuffer, endianness: 'big' | 'little' = 'big', encoding: BufferEncoding = 'utf-8' ) {
    if (arrBuf instanceof ArrayBuffer) {
      this.arrayBuffer = arrBuf
      this.dataview = new DataView(arrBuf)
    } else {
      throw new Error('Invalid buffer input for BinaryReader (' + typeof arrBuf + ')');
    }
    if (endianness !== 'little' && endianness !== 'big') {
      throw new Error('Invalid endianness: ' + endianness);
    }
    this.encoding = encoding
    this.littleEndian = endianness == 'little'
    this.length = arrBuf.byteLength
  }
  readUInt8() {
    return this.dataview.getUint8(this.position++)
  }
  readInt8() {
    return this.dataview.getInt8(this.position++)
  }

  readUInt16() {
    const res = this.dataview.getUint16(this.position, this.littleEndian)
    this.position += 2
    return res
  }
  readInt16() {
    const res = this.dataview.getInt16(this.position, this.littleEndian)
    this.position += 2
    return res
  }
  readUInt32() {
    const res = this.dataview.getUint32(this.position, this.littleEndian)
    this.position += 4
    return res
  }
  readInt32() {
    const res = this.dataview.getInt32(this.position, this.littleEndian)
    this.position += 4
    return res
  }

  readUInt64() {
    const res = this.dataview.getBigUint64(this.position, this.littleEndian)
    this.position += 8
    return res
  }
  readInt64() {
    const res = this.dataview.getBigInt64(this.position, this.littleEndian)
    this.position += 8
    return res
  }
  writeUInt8(val: number, offset?: number) {
    this.scaleIfNeed(1)
    if(offset) {
      this.dataview.setUint8(offset, val)
    }else {
      this.dataview.setUint8(this.position++, val)
    }
  }
  writeInt8(val: number, offset?: number) {
    this.scaleIfNeed(1)
    if(offset) {
      this.dataview.setInt8(offset, val)
    }else {
      this.dataview.setInt8(this.position++, val)
    }
  }

  writeUInt16(val: number, offset?: number) {
    this.scaleIfNeed(2)
    if(offset) {
      this.dataview.setInt16(offset, val, this.littleEndian)
    }else {
      this.dataview.setUint16(this.position, val, this.littleEndian)
      this.position += 2
    }
  }
  writeInt16(val: number, offset?: number) {
    this.scaleIfNeed(2)
    if(offset) {
      this.dataview.setInt16(offset, val, this.littleEndian)
    }else {
      this.dataview.setInt16(this.position, val, this.littleEndian)
      this.position += 2
    }
  }

  writeUInt32(val: number, offset?: number) {
    this.scaleIfNeed(4)
    if(offset) {
      this.dataview.setUint32(offset, val, this.littleEndian)
    }else {
      this.dataview.setUint32(this.position, val, this.littleEndian)
      this.position += 4
    }
  }
  writeInt32(val: number, offset?: number) {
    this.scaleIfNeed(4)
    if(offset) {
      this.dataview.setInt32(offset, val, this.littleEndian)
    }else {
      this.dataview.setInt32(this.position, val, this.littleEndian)
      this.position += 4
    }
  }

  writeUInt64(val: bigint, offset?: number) {
    this.scaleIfNeed(8)
    if(offset) {
      this.dataview.setBigUint64(offset, val, this.littleEndian)
    }else {
      this.dataview.setBigUint64(this.position, val, this.littleEndian)
      this.position += 8
    }
  }
  writeInt64(val: bigint, offset?: number) {
    this.scaleIfNeed(8)
    if(offset) {
      this.dataview.setBigInt64(offset, val, this.littleEndian)
    }else {
      this.dataview.setBigInt64(this.position, val, this.littleEndian)
      this.position += 8
    }
  }
  scaleIfNeed(length: number = 0) {
    if(this.arrayBuffer.byteLength < length + this.position) {
      let scale = 1024
      if(this.arrayBuffer.byteLength < 1024) {
        scale = this.arrayBuffer.byteLength
      }
      if(length > 1024) {
        scale = length + 1024
      }
      this.arrayBuffer = this.arrayBuffer.transfer(scale + this.arrayBuffer.byteLength)
      this.dataview = new DataView(this.arrayBuffer)
    }
  }
  writeBytes(buf: ArrayBuffer, offset?: number) {
    this.scaleIfNeed(buf.byteLength)
    if(offset) {
      const arrView = new Uint8Array(this.arrayBuffer)
      arrView.set(new Uint8Array(buf), offset)
    }else {
      const arrView = new Uint8Array(this.arrayBuffer)
      arrView.set(new Uint8Array(buf), this.position)
      this.position += buf.byteLength
    }
  }
  readBytes(size: number) {
    const res = new Uint8Array(this.dataview.buffer, this.position, size)
    this.position += size
    return res
  }

  adjustOffset(offset: number) {
    this.position += offset
  }


  // writeBuffer(buf: ArrayBuffer) {
  //   const restSize = buf.byteLength - this.position
  //   if(buf.byteLength > restSize) {
  //     this.arrayBuffer.resize(buf.byteLength)
  //   }
  //   new Uint8Array(this.arrayBuffer, this.position, buf.byteLength).set(new Uint8Array(buf))
  // }


  end() {
    return this.position < this.length
  }

  // if (buf instanceof ArrayBuffer) {
  //   const newBuf = new Uint8Array(this.arrayBuffer, this.position, buf.byteLength)
  //   newBuf.set(new Uint8Array(buf))
  // } else {
  //   throw new Error('Invalid buffer input for BinaryReader (' + typeof buf + ')');
  // }
  // this.arrayBuffer.resize()
  // this.position += buf.byteLength
}

//
//
// BinaryReader.prototype = {
//   ReadUInt8: function() {
//     if (this.ByteBuffer.length < 1) {
//       return 0;
//     }
//
//     var s_Val = this.ByteBuffer.readUInt8(0);
//     this.ByteBuffer = this.ByteBuffer.slice(1);
//     ++this.Position;
//     return s_Val;
//   },
//
//   ReadUInt16: function() {
//     if (this.ByteBuffer.length < 2) {
//       return 0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readUInt16LE(0) : this.ByteBuffer.readUInt16BE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(2);
//     this.Position += 2;
//     return s_Val;
//   },
//
//   ReadUInt32: function() {
//     if (this.ByteBuffer.length < 4) {
//       return 0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readUInt32LE(0) : this.ByteBuffer.readUInt32BE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(4);
//     this.Position += 4;
//     return s_Val;
//   },
//
//   ReadUInt64: function() {
//     if (this.ByteBuffer.length < 8) {
//       return 0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readBigUInt64LE(0) : this.ByteBuffer.readBigUInt64BE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(8);
//     this.Position += 8;
//     return s_Val;
//   },
//
//   ReadInt8: function() {
//     if (this.ByteBuffer.length < 1) {
//       return 0;
//     }
//
//     var s_Val = this.ByteBuffer.readInt8(0);
//     this.ByteBuffer = this.ByteBuffer.slice(1);
//     ++this.Position;
//     return s_Val;
//   },
//
//   ReadInt16: function() {
//     if (this.ByteBuffer.length < 2) {
//       return 0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readInt16LE(0) : this.ByteBuffer.readInt16BE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(2);
//     this.Position += 2;
//     return s_Val;
//   },
//
//   ReadInt32: function() {
//     if (this.ByteBuffer.length < 4) {
//       return 0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readInt32LE(0) : this.ByteBuffer.readInt32BE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(4);
//     this.Position += 4;
//     return s_Val;
//   },
//
//   ReadInt64: function() {
//     if (this.ByteBuffer.length < 8) {
//       return 0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readBigInt64LE(0) : this.ByteBuffer.readBigInt64BE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(8);
//     this.Position += 8;
//     return s_Val;
//   },
//
//   ReadFloat: function() {
//     if (this.ByteBuffer.length < 4) {
//       return 0.0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readFloatLE(0) : this.ByteBuffer.readFloatBE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(4);
//     this.Position += 4;
//     return s_Val;
//   },
//
//   ReadDouble: function() {
//     if (this.ByteBuffer.length < 8) {
//       return 0.0;
//     }
//
//     var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readDoubleLE(0) : this.ByteBuffer.readDoubleBE(0);
//     this.ByteBuffer = this.ByteBuffer.slice(8);
//     this.Position += 8;
//     return s_Val;
//   },
//
//   ReadBytes: function(p_Count) {
//     if (p_Count > this.ByteBuffer.length) {
//       return new Buffer(0);
//     }
//
//     var s_Val = new Buffer(p_Count);
//     this.ByteBuffer.copy(s_Val, 0, 0, p_Count);
//
//     this.ByteBuffer = this.ByteBuffer.slice(p_Count);
//
//     this.Position += p_Count;
//     return s_Val;
//   }
// };
//
// ///
//
// var BinaryWriter = function(p_Endianness, p_Encoding) {
//   // Instantiate the buffer
//   this.ByteBuffer = new Buffer(0);
//
//   // Set the endianness
//   this.Endianness = p_Endianness || 'big';
//
//   // Set the encoding
//   this.Encoding = p_Encoding || 'ascii';
//
//   // Set the length to 0
//   this.Length = 0;
// };
//
// BinaryWriter.prototype = {
//   WriteUInt8: function(p_Value) {
//     var s_TempBuffer = new Buffer(1);
//     s_TempBuffer.writeUInt8(p_Value, 0);
//     this.Length += 1;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteUInt16: function(p_Value) {
//     var s_TempBuffer = new Buffer(2);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeUInt16LE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeUInt16BE(p_Value, 0);
//     }
//     this.Length += 2;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteUInt32: function(p_Value) {
//     var s_TempBuffer = new Buffer(4);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeUInt32LE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeUInt32BE(p_Value, 0);
//     }
//     this.Length += 4;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteUInt64: function(p_Value) {
//     var s_TempBuffer = new Buffer(8);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeUInt32LE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeUInt32BE(p_Value, 0);
//     }
//     this.Length += 8;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteInt8: function(p_Value) {
//     var s_TempBuffer = new Buffer(1);
//     s_TempBuffer.writeInt8(p_Value, 0);
//     this.Length += 1;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteInt16: function(p_Value) {
//     var s_TempBuffer = new Buffer(2);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeInt16LE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeInt16BE(p_Value, 0);
//     }
//     this.Length += 2;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteInt32: function(p_Value) {
//     var s_TempBuffer = new Buffer(4);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeInt32LE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeInt32BE(p_Value, 0);
//     }
//     this.Length += 4;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteInt64: function(p_Value) {
//     var s_TempBuffer = new Buffer(8);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeInt32LE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeInt32BE(p_Value, 0);
//     }
//     this.Length += 8;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteFloat: function(p_Value) {
//     var s_TempBuffer = new Buffer(4);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeFloatLE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeFloatBE(p_Value, 0);
//     }
//     this.Length += 4;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteDouble: function(p_Value) {
//     var s_TempBuffer = new Buffer(8);
//     if (this.Endianness == 'little') {
//       s_TempBuffer.writeDoubleLE(p_Value, 0);
//     } else {
//       s_TempBuffer.writeDoubleBE(p_Value, 0);
//     }
//     this.Length += 8;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   },
//
//   WriteBytes: function(p_Value) {
//
//     if (typeof p_Value == 'string') {
//       // Ugly hack
//       var s_BytesArray = [];
//
//       for (var i = 0; i < p_Value.length; ++i) {
//         s_BytesArray.push(p_Value.charCodeAt(i));
//       }
//
//       p_Value = s_BytesArray;
//     }
//
//     if (!p_Value instanceof Buffer && !p_Value instanceof Array) {
//       throw new Error("Invalid Buffer object provided.");
//     }
//
//     var s_TempBuffer = (p_Value instanceof Buffer) ? p_Value : new Buffer(p_Value);
//
//     this.Length += s_TempBuffer.length;
//     this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
//   }
// };
//
// // Export our classes
// module.exports = {
//   BinaryReader: BinaryReader,
//   BinaryWriter: BinaryWriter
// };
