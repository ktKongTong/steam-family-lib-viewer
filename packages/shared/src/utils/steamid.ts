import SteamID from "steamid";

const FRIEND_CODE_REPLACEMENTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 't', 'v', 'w'];

export const createFriendCodeFromSteamId = (steamId: string) => {
  const id = new SteamID(steamId);
  let acctIdHex = id.accountid.toString(16);
  let friendCode = '';

  for (let i = 0; i < acctIdHex.length; i++) {
    let char = parseInt(acctIdHex[i], 16);
    friendCode += FRIEND_CODE_REPLACEMENTS[char];
  }

  let dashPos = Math.floor(friendCode.length / 2);
  return friendCode.substring(0, dashPos) + '-' + friendCode.substring(dashPos);
};

export const isValidSteamId = (input: string) => {
  let sid: SteamID|undefined = undefined
  try {
    sid = new SteamID(input)
    //todo may nickname
  }catch (e) {

  }
  if(!sid?.isValidIndividual()) {
    sid = SteamID.fromIndividualAccountID(Number(input))
  }
  const steamid = sid?.getSteamID64()
  const valid = sid?.isValid() ?? false
  return {steamid, valid}
}