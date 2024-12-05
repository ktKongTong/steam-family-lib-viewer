
import {Md5} from "ts-md5";
const makeU64 = (hi: number, lo: number): bigint => {
  return (BigInt(hi) << BigInt(32)) | BigInt(lo);
};

const toU32 = (hi: bigint): bigint => {
  return (BigInt(hi) << BigInt(32)) >> BigInt(32);
};

class SteamFriendCode {
  private static readonly ALNUM = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  private static readonly DEFAULT_STEAM_ID = BigInt('0x110000100000000');

  private static readonly RALNUM: { [key: string]: bigint } = {
    'A': BigInt(0), 'B': BigInt(1), 'C': BigInt(2), 'D': BigInt(3), 'E': BigInt(4),
    'F': BigInt(5), 'G': BigInt(6), 'H': BigInt(7), 'J': BigInt(8), 'K': BigInt(9),
    'L': BigInt(10), 'M': BigInt(11), 'N': BigInt(12), 'P': BigInt(13), 'Q': BigInt(14),
    'R': BigInt(15), 'S': BigInt(16), 'T': BigInt(17), 'U': BigInt(18), 'V': BigInt(19),
    'W': BigInt(20), 'X': BigInt(21), 'Y': BigInt(22), 'Z': BigInt(23),
    '2': BigInt(24), '3': BigInt(25), '4': BigInt(26), '5': BigInt(27),
    '6': BigInt(28), '7': BigInt(29), '8': BigInt(30), '9': BigInt(31)
  };

  /**
   * Converts a 64-bit unsigned integer to a custom base32 encoding
   * @param input - The input number to encode
   * @returns Encoded string with dashes
   */

  private static b32(input: bigint): string {
    let result: string[] = [];
    // Reverse bytes (equivalent to bits.ReverseBytes64 in Go)
    input = this.reverseBigInt(input);

    for (let i = 0; i < 13; i++) {
      if (i === 4 || i === 9) {
        result.push('-');
      }
      result.push(this.ALNUM[Number(input & BigInt(0x1F))]);
      input >>= BigInt(5);
    }

    return result.join('');
  }

  /**
   * Reverse byte order of a BigInt
   * @param value - The BigInt to reverse
   * @returns Reversed BigInt
   */
  private static reverseBigInt(value: bigint): bigint {
    const bytes = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
      bytes[i] = Number((value >> BigInt(i * 8)) & BigInt(0xFF));
    }
    return bytes.reverse().reduce((acc, byte, index) =>
      acc | (BigInt(byte) << BigInt(index * 8)), BigInt(0));
  }

  /**
   * Decodes a custom base32 encoded string back to a number
   * @param input - The encoded string
   * @returns Decoded number
   */
  private static rb32(input: string): bigint {
    let result = BigInt(0);
    for (let i = 0; i < 13; i++) {
      if (i === 4 || i === 9) {
        input = input.slice(1);
      }
      result |= (this.RALNUM[input[0]] << BigInt(5 * i));
      input = input.slice(1);
    }
    return this.reverseBigInt(result);
  }

  /**
   * Simple hash function to replace cryptographic hash
   * @param id - Steam ID to hash
   * @returns Hashed Steam ID
   */
  private static hashSteamID(id: bigint): number {
    const accountID = Number(id & BigInt(0xFFFFFFFF));
    const strangeSteamID = BigInt(accountID) | BigInt('0x4353474F00000000');
    const buffer = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
      buffer[i] = Number((strangeSteamID >> BigInt(i * 8)) & BigInt(0xFF));
    }
    let md5 = new Md5();
    const res = md5.appendByteArray(buffer).end() as string
    return res.slice(0,8) as any
  }

  /**
   * Generate friend code from Steam ID
   * @param id - Steam ID
   * @returns Friend code
   */

  static encode(id: bigint): string {
    const h = this.hashSteamID(id);
    let r = BigInt(0);

    for (let i = 0; i < 8; i++) {
      const idNibble = id & BigInt(0xF);
      id >>= BigInt(4);
      const hashNibble = BigInt((h >> i) & 1);

      let a = (r << BigInt(4)) | idNibble;
      r = (r >> BigInt(28)) << BigInt(32) | a;
      r = (r >> BigInt(31)) << BigInt(32) | (a << BigInt(1) | hashNibble);
    }

    let fc = this.b32(r);
    if (fc.startsWith('AAAA-')) {
      fc = fc.slice(5);
    }
    return fc;
  }

  /**
   * Decode friend code to Steam ID
   * @param friendCode - Friend code to decode
   * @returns Steam ID
   */
  static decode(friendCode: string): bigint {
    if (friendCode.length !== 10) {
      return BigInt(0);
    }

    const fc = 'AAAA-' + friendCode;
    let val = this.rb32(fc);

    let id = BigInt(0);
    for (let i = 0; i < 8; i++) {
      val >>= BigInt(1);
      const idNibble = val & BigInt(0xF);
      val >>= BigInt(4);
      id = (id << BigInt(4)) | idNibble;
    }

    return id | this.DEFAULT_STEAM_ID;
  }
}
export const createCSFriendCodeFromSteamId = (id: string) => {
  return SteamFriendCode.encode(BigInt(id))
}

