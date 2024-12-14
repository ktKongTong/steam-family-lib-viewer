import {BinaryIO} from "./io";
import {bvdfParse} from "./vdf-serializer";
import {appMagic, readAppInfoBinaryVDF} from "./appinfo";
import {pkgMagic, readPackageInfoBinaryVDF} from "./package-info";






export const readBVDF = (buf: ArrayBuffer) => {
  const view = new DataView(buf);
  const magic = view.getUint32(0, true);
  switch (magic) {
    case appMagic.x27:
    case appMagic.x28:
    case appMagic.x29:
      return readAppInfoBinaryVDF(buf)
    case pkgMagic.x27:
    case pkgMagic.x28:
      return readPackageInfoBinaryVDF(buf)
    default:
      try {
        const reader = new BinaryIO(buf, "little");
        const res = bvdfParse(reader)
        return res
      }catch (e) {}
      throw new Error(`Unknown magic header: 0x${magic.toString(16)}`);
  }
}