import {forwardRef} from "react";
import {Barcode} from "@/app/receipt/BarCode";
import {PlayerStatsData} from "@/interface/playerStatsData";

interface ReceiptV1Props {
  data: PlayerStatsData
}


const useComputedPlayerStats = (playerStats: PlayerStatsData) => {
  // scores
  const res = {
    id: playerStats.strSteamId,
    name: playerStats.strProfileName,
    totalGameCount: playerStats.rgGames.length,
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
    top3Games: playerStats.rgGames
      .toSorted((a,b) => b.playtime_forever - a.playtime_forever)
      .slice(0, 3).map(game => (game.name)),
    reviews: playerStats.nUserReviewCount,
  }
  return  {
    ...res,
    steamScore: (res.recentPlaytimeInMinutes/60) * 2 + res.totalGameCount * 1,
  }
}

export const ReceiptV1 = forwardRef<HTMLDivElement,ReceiptV1Props>(({ data: _data }, ref)=> {

  const data = useComputedPlayerStats(_data)

  return (
    <div ref={ref} className="receipt-content w-full max-w-[102mm] bg-white text-black">
      <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-xs leading-relaxed">
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

        <div className="mb-4">
          <p>CUSTOMER: {data.name || data.id}</p>
          <p className="opacity-75">@{data.id}</p>
        </div>

        <div className="border-t border-b border-dashed py-3 mb-4">
          <table className="w-full">
            <tbody>
            <tr>
              <td>GAMES</td>
              <td className="text-right">{data.totalGameCount}</td>
            </tr>
            <tr>
              <td>ACHIEVEMENTS</td>
              <td className="text-right">{data.unlockedAchievements}/{data.totalAchievements}</td>
            </tr>
            <tr>
              <td>HOURS ON RECORD</td>
              <td className="text-right">{(data.totalPlaytimeInMinutes / 60).toFixed(1)}H</td>
            </tr>
            <tr>
              <td>TOTAL COST</td>
              <td className="text-right">{0} $</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <p>TOP GAMES:</p>
          <p>{data.top3Games.join(', ') || 'NONE'}</p>
        </div>

        <div className="border-t border-dashed pt-3 mb-4">
          <div className="flex justify-between">
            <span>COMMUNITY CONTRIBUTIONS:</span>
            <span>{data.reviews}</span>
          </div>
          <div className="flex justify-between">
            <span>PLAYTIME (14d):</span>
            <span>{(data.recentPlaytimeInMinutes / 60).toFixed(1)}H</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>STEAM SCORE:</span>
            <span>{data.steamScore.toFixed(0)}</span>
          </div>
        </div>

        <div className="text-center opacity-75 mb-4">
          <p>Served by: {'ktkongtong'}</p>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>

        <div className="border-t border-dashed pt-4 mb-4 text-center">
          <p>COUPON CODE: {Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
          <p className="text-xs opacity-75">Save for your next play!</p>
        </div>

        <div className="mb-6 opacity-75">
          <p>CARD #: **** **** **** {new Date().getFullYear()}</p>
          <p>AUTH CODE: {Math.floor(Math.random() * 1000000)}</p>
          <p>CARDHOLDER: {data.name}</p>
        </div>

        <div className="text-center">
          <p className="mb-4">THANK YOU FOR GAMING!</p>
          <div className="w-full h-10">
            <Barcode value={`https://steamcommunity.com/profile/${data.id}`}/>
          </div>
          <p className="mt-2 opacity-75">steamcommunity.com/profile/{data.id}</p>
        </div>

        <div className="text-center">
          <p className="mb-1">https://slfv.ktlab.io/receipt</p>
        </div>
        <div className="flex justify-between mt-3">
          <p className="mb-1">inspired by ankit</p>
          <p className="mb-1">made with ❤️ by ktkongtong </p>
        </div>
      </div>
      <div className="receipt-fade"/>
    </div>
  )
})

ReceiptV1.displayName = "ReceiptV1"