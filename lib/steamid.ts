


const FRIEND_CODE_REPLACEMENTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 't', 'v', 'w'];

export const createFriendCodeFromSteamId = (steamId: string) => {
  const id = BigInt(steamId)
  let acctIdHex = id.toString(16);
  let friendCode = '';

  for (let i = 0; i < acctIdHex.length; i++) {
    let char = parseInt(acctIdHex[i], 16);
    friendCode += FRIEND_CODE_REPLACEMENTS[char];
  }

  let dashPos = Math.floor(friendCode.length / 2);
  return friendCode.substring(0, dashPos) + '-' + friendCode.substring(dashPos);
};