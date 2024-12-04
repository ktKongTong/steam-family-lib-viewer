import {PlayerStatsData, PlayerCommunityData} from "@/interface/playerStatsData";
import React, {forwardRef} from "react";
import {
  createFriendCodeFromSteamId
} from "@/lib/steamid";
import SteamID from "steamid";
import {createCSFriendCodeFromSteamId} from "@/lib/cs-friend-code";
import QRCode from "react-qr-code";
import {PlayerSummary} from "@/hooks/data/query/useSteamPlayerSummaries";

interface ReceiptV2Props {
  playerStats: PlayerStatsData
  communityStats: PlayerCommunityData
  playerSummary: PlayerSummary
}
const useComputedPlayerStats = (playerStats: PlayerStatsData) => {
  // scores
  const res = {
    id: playerStats.strSteamId,
    name: playerStats.strProfileName,
    totalGameCount: playerStats.rgGames.length,
    playedGameCount: playerStats.rgGames.filter(it => it.playtime_forever > 0).length,
    unlockedAchievements: playerStats.achievement_progress
      .reduce((acc,cur) => acc + cur.unlocked, 0),
    totalAchievements: playerStats.achievement_progress
      .reduce((acc,cur) => acc + cur.total, 0),
    fullAchievementGameCount: playerStats.achievement_progress
      .reduce((acc,cur) => acc + cur.all_unlocked, 0),
    fullAchievementGameAchievementCount: playerStats.achievement_progress
      .reduce((acc,cur) => acc + (cur.all_unlocked ? cur.total : 0), 0),
    totalPlaytimeInMinutes: playerStats.rgGames.reduce((acc, game) => acc + game.playtime_forever, 0),
    recentPlaytimeInMinutes: playerStats.rgRecentlyPlayedGames
      .reduce((acc, cur) => acc + cur.playtime_2weeks, 0),
    recentPlayedGames: playerStats.rgRecentlyPlayedGames
      .filter(it=>it.playtime_2weeks > 0).length,
    top3Games: playerStats.rgGames
      .toSorted((a,b) => b.playtime_forever - a.playtime_forever)
      .slice(0, 10),
    reviews: playerStats.nUserReviewCount,
  }
  return  {
    ...res,
  }
}

export const AccountReceipt = forwardRef<HTMLDivElement, ReceiptV2Props>(({playerStats, communityStats, playerSummary}, ref) => {
  const age = (new Date().getTime()/1000 - (playerSummary?.timecreated ?? 0))/ 60/60/24/365
  const data = useComputedPlayerStats(playerStats)
  const id = new SteamID(data.id)
  const community = communityStats
  const steamScore = (data.recentPlaytimeInMinutes/60) * 2 + (data.totalPlaytimeInMinutes/60) + data.totalGameCount + communityStats.guide * 50 + communityStats.reviews * 20 + communityStats.workshopItems * 30 + communityStats.screenshots * 5 + communityStats.inventory * 2
  // const [csFriendCode, setCsFriendCode] = React.useState('')
  const csFriendCode = createCSFriendCodeFromSteamId(id.getSteamID64())
  const friendCode = createFriendCodeFromSteamId(data.id)
  return <div ref={ref} className="receipt-content w-full max-w-[144mm] bg-white text-black">
    <div className="p-4 pb-3 sm:p-6 font-mono text-[11px] sm:text-xs leading-relaxed">
      <div className="text-center mb-6">
        <h2 className="text-base sm:text-lg font-bold">STEAM RECEIPT</h2>
        <p>{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }).toUpperCase()}</p>
        <p className="mt-1 opacity-75">ORDER #{String(Math.floor(Math.random() * 9999)).padStart(4, '0')}</p>
      </div>


      <div className="mb-4 flex justify-between items-center">
        <div>
          <p>CUSTOMER: {data.name || data.id}</p>
          <p>TYPE: ACCOUNT OVERVIEW</p>
        </div>
        <div className={'flex flex-col items-end'}>
          <p className="opacity-45">@{id.accountid}</p>
          <p className="opacity-45">#{id.getSteamID64()}</p>
        </div>
      </div>
      <div className="border-t border-b border-dashed py-3 mb-4">
        <p className={'font-bold text-md'}>OVERVIEW</p>
        <table className="w-full">
          <tbody>
          <tr>
            <td>GAMES</td>
            <td className="text-right w-[100px]">{data.playedGameCount}/{data.totalGameCount}</td>
          </tr>
          <tr>
            <td>PERFECT GAMES</td>
            <td className="text-right w-[100px]">{data.fullAchievementGameCount}</td>
          </tr>
          <tr>
            <td>ACHIEVEMENTS</td>
            <td className="text-right w-[100px]">{data.unlockedAchievements}/{data.totalAchievements}</td>
          </tr>
          <tr>
            <td>HOURS ON RECORD</td>
            <td className="text-right w-[100px]">{(data.totalPlaytimeInMinutes / 60).toFixed(1)}H</td>
          </tr>
          <tr>
            <td>ACCOUNT AGE</td>
            <td className="text-right w-[100px]">{age.toFixed(1)} YEARS</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p className={'font-bold text-md'}>TOP PLAYED GAMES</p>
        <div>{
          data.top3Games.map(game => {
            return <div key={game.appid} className={'flex justify-between items-center'}>
              <p>{game.name}</p>
              <p className={'w-[100px] text-right'}>{(game.playtime_forever / 60).toFixed(1)} H</p>
            </div>
          })
        }</div>
      </div>

      <div className="border-t border-dashed pt-3 mb-4">
        <p className={'font-bold text-md'}>COMMUNITY</p>
        <div className="flex justify-between">
          <span>REVIEWS</span>
          <span>{data.reviews}</span>
        </div>
        <div className="flex justify-between">
          <span>GUIDES</span>
          <span>{community.guide}</span>
        </div>

        <div className="flex justify-between">
          <span>SCREENSHOTS</span>
          <span>{community.screenshots}</span>
        </div>
        <div className="flex justify-between">
          <span>WORKSHOP ITEMS</span>
          <span>{community.workshopItems}</span>
        </div>
      </div>

      <div className="border-t border-dashed pt-3 mb-4">
        <p className={'font-bold text-md'}>RECENT</p>
        <div className="flex justify-between">
          <span>PLAYED GAMES (14d)</span>
          <span>{data.recentPlayedGames}</span>
        </div>
        <div className="flex justify-between">
          <span>PLAYTIME (14d)</span>
          <span>{(data.recentPlaytimeInMinutes / 60).toFixed(1)} H</span>
        </div>
      </div>

      <div className="flex justify-between font-bold mt-2">
        <span>STEAM SCORE</span>
        <span>{steamScore.toFixed(0)}</span>
      </div>

      <div className="border-t border-dashed pt-4 mb-4 text-center">
        {/*<p>COUPON CODE: {Math.random().toString(36).substring(2, 8).toUpperCase()}</p>*/}
        <p className="text-xs opacity-75">Save for your next play!</p>
        <div className="opacity-75 mb-4">
          <p>Served by: {'ktkongtong'}</p>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="mb-6 opacity-75 grid grid-cols-2 gap-x-2">
        <p>CARD #: **** **** {new Date().getFullYear()}</p>
        <p>FRIEND CODE: {id.accountid}</p>
        <p>CARDHOLDER: {data.name}</p>
        <p>CS CODE: {csFriendCode}</p>
      </div>

      <div className="text-center ">
        <p className="mb-6">THANK YOU FOR GAMING!</p>

      </div>

      <div className={'w-full relative h-32'}>
        <div className={'absolute left-0 bottom-0'}>
          <p>inspired by ankit</p>
          <p>made with ❤️ by ktkongtong </p>
          <p> powered by sflv.ktlab.io</p>
        </div>
        <div className={'flex ml-auto items-end mr-0 justify-end right-0 bottom-0'}>
          <div className={'items-center flex flex-col'}>
            <div className="w-24 h-24">
              <QRCode
                size={256}
                style={{height: "auto", maxWidth: "100%", width: "100%"}}
                value={`https://s.team/p/${friendCode}`}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="mt-0 opacity-75">s.team/p/{friendCode}</p>
            <p className="mt-0 opacity-75">find me on steam</p>
          </div>
        </div>
      </div>
    </div>
    <div className="receipt-fade"/>
  </div>

})

AccountReceipt.displayName = 'AccountReceipt'