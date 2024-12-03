'use client'
import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import { PlayerStatsData, usePlayerStats } from "@/hooks/data/query/usePlayerStats";
import {useToast} from "@/components/ui/use-toast";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {Barcode} from "@/app/receipt/BarCode";


const useComputedPlayerStats = (playerStats: PlayerStatsData | null | undefined) => {
  if(!playerStats) return undefined
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


export default function Home() {
  const [steamid, setSteamid] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useTokenStore(state => state.currentToken)
  const {fetchPlayerStats, playerStats, error, reset} = usePlayerStats(token?.accessToken ?? "")
  const data = useComputedPlayerStats(playerStats)
  const receiptRef = useRef<HTMLDivElement>(null);
  const {toast} = useToast()

  const handleDownload = async () => {
    if (receiptRef.current) {
      const dataUrl = await toPng(receiptRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `steam-receipt-${data?.id || 'user'}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleShare = async () => {
    if (!receiptRef.current) return;

    try {
      const dataUrl = await toPng(receiptRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'steam-receipt.png', { type: 'image/png' });

      if (navigator.share) {
        await navigator.share({
          title: 'My Steam Receipt',
          text: `Check out my Steam stats for ${data?.name}!`,
          files: [file]
        });
      } else {
        handleDownload();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset()
    setLoading(true)
    fetchPlayerStats(steamid).then(()=>{setLoading(false)})
  }
  return (
    <main className="min-h-screen max-w-2xl mx-auto px-4 py-8 sm:py-16">
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={steamid}
            onChange={(e) => setSteamid(e.target.value)}
            placeholder="Enter Steam ID"
            autoCapitalize="none"
            autoComplete="off"
            className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-zinc-800
                     border border-zinc-200 dark:border-zinc-700
                     text-zinc-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     dark:focus:ring-blue-400 font-mono text-[16px]"
          />
          <button
            type="submit"
            disabled={!steamid || loading}
            className="px-4 sm:px-6 py-2 rounded-lg bg-blue-500 text-white font-medium
                     hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors text-sm sm:text-base"
          >
            Generate
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}

      {data && (
        <div className="flex flex-col items-center">
          <div className="receipt-container">
            <div className="coffee-stain" />
            <div ref={receiptRef} className="receipt-content w-full max-w-[102mm] bg-white text-black">
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
                    <Barcode value={`steamcommunity.com/profile/{data.id}`}/>
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
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg
                       text-zinc-900 dark:text-white
                       hover:bg-zinc-100 dark:hover:bg-zinc-700
                       transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg
                       text-zinc-900 dark:text-white
                       hover:bg-zinc-100 dark:hover:bg-zinc-700
                       transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      )}
    </main>
  );
}