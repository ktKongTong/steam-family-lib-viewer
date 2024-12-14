import {BinaryIO} from "./io";
import {bvdfParse} from "./vdf-serializer";

// pkginfo.vdf
export const pkgMagic = {
  x27: 0x06_56_55_27,
  x28: 0x06_56_55_28,
  end: 0xFF_FF_FF_FF,
}
export const readPackageInfoBinaryVDF = (buf: ArrayBuffer) => {
  const binaryReader = new BinaryIO(buf, "little");
  const magic = binaryReader.readUInt32();
  if (![pkgMagic.x27, pkgMagic.x28].includes(magic)) {
    throw new Error(`Unknown magic header: ${magic}`);
  }
  const universe = binaryReader.readUInt32();
  const appinfos: any[] = [];
  while(true) {
    const packageId = binaryReader.readUInt32();
    if(packageId === pkgMagic.end) {
      break;
    }
    const hash = binaryReader.readBytes(20);
    const changeNumber = binaryReader.readUInt32()
    let steamPackage: {[k: string]: any} = {
      packageId,
      hash: hash,
      changeNumber: changeNumber
    }
    if([pkgMagic.x28].includes(magic)) {
      steamPackage.picsToken = binaryReader.readUInt64()
    }
    const data = bvdfParse(binaryReader)
    appinfos.push(data)
  }
  return appinfos
};


