import React, {forwardRef, useEffect} from "react";
import {
  createFriendCodeFromSteamId,
  createCSFriendCodeFromSteamId
} from "@repo/shared";
import SteamID from "steamid";
import QRCode from "react-qr-code";
import {PlayerCommunityData, PlayerStats} from "@/app/receipt/interface";
import {useToast} from "@/components/ui/use-toast";
import {useTrans} from "@/components/providers/i18n";

interface ReceiptV2Props {
  playerStats: PlayerStats
}
const useNewComputedPlayerStats = (playerStats: PlayerStats) => {
  const now = Math.floor(Date.now()/1000)
  const isPrivate = playerStats.player.accounts[0].publicData?.visibilityState !== 3
  const res = {
    isPrivate,
    age: (now - (playerStats.player.accounts[0].privateData!.timeCreated ?? now)) / 60/60/24/365,
    id: playerStats.player.accounts[0].publicData!.steamid!.toString(),
    name: playerStats.player.accounts[0].publicData!.personaName!,
    totalGameCount: playerStats.games.gameCount ?? 0,
    playedGameCount: playerStats.games.games.filter(it => it.playtimeForever! > 0).length,
    unlockedAchievements: playerStats.achievementProgress
      .reduce((acc,cur) => acc +(cur.unlocked ?? 0), 0),
    totalAchievements: playerStats.achievementProgress
      .reduce((acc,cur) => acc + (cur.total ?? 0), 0),
    fullAchievementGameCount: playerStats.achievementProgress
      .reduce((acc,cur) => acc + (cur.allUnlocked ? 1 : 0), 0),
    fullAchievementGameAchievementCount: playerStats.achievementProgress
      .reduce((acc,cur) => acc + (cur.allUnlocked ? cur.total ?? 0 : 0), 0),
    totalPlaytimeInMinutes: playerStats.games.games.reduce((acc, game) => acc + game.playtimeForever!, 0),
    recentPlaytimeInMinutes: playerStats.games.games
      .reduce((acc, cur) => acc + (cur?.playtime2weeks ?? 0), 0),
    recentPlayedGames: playerStats.games.games
      .filter(it=>(it.playtime2weeks ?? 0) > 0).length,
    top10Games: playerStats.games.games
      .toSorted((a,b) => b.playtimeForever! - a.playtimeForever!)
      .slice(0, 10)
  }
  return res
}

const calculateSteamScore = (data: ReturnType<typeof useNewComputedPlayerStats>, communityStats: PlayerCommunityData) => {
  const steamScore =
    (data.recentPlaytimeInMinutes/60) * 2 + (data.totalPlaytimeInMinutes/60) + data.totalGameCount
    // community
    + communityStats.guide * 50
    + communityStats.reviews * 20
    + communityStats.workshopItems * 30
    + communityStats.screenshots * 5
    + communityStats.inventory * 2
  return steamScore
}

export const AccountReceipt = forwardRef<HTMLDivElement, ReceiptV2Props>(({playerStats}, ref) => {
  const data = useNewComputedPlayerStats(playerStats)
  const communityStats = playerStats.community
  const id = new SteamID(data.id)
  const toast = useToast()

  useEffect(()=> {
    if(data.isPrivate) {
      toast.toast({
        title: 'his/her profile is private 🥲',
        variant: 'destructive'
      })
    }
  }, [data.isPrivate])

  const age = data.age
  const community = communityStats
  const steamScore = calculateSteamScore(data, community)
  const csFriendCode = createCSFriendCodeFromSteamId(id.getSteamID64())
  const friendCode = createFriendCodeFromSteamId(data.id)
  const {t, locale} = useTrans({ prefix: 'receipt' })

  return <div ref={ref} className="receipt-content w-full max-w-[144mm] bg-white text-black">
    <div className="p-4 pb-3 sm:p-6 font-mono text-[11px] sm:text-xs leading-relaxed">
      <div className="text-center mb-6">
        <h2 className="text-base sm:text-lg font-bold">STEAM RECEIPT</h2>
        <p>{new Date().toLocaleDateString(locale(), {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }).toUpperCase()}</p>
        <p className="mt-1 opacity-75">{t('order')} #{String(Math.floor(Math.random() * 9999)).padStart(4, '0')}</p>
      </div>


      <div className="mb-4 flex justify-between items-center">
        <div>
          <p>{t('customer')}: {data.name || data.id}</p>
          <p>{t('type')}: {t('type-overview')}</p>
        </div>
        <div className={'flex flex-col items-end'}>
          <p className="opacity-45">@{id.accountid}</p>
          <p className="opacity-45">#{id.getSteamID64()}</p>
        </div>
      </div>
      <div className="border-t border-b border-dashed py-3 mb-4">
        <p className={'font-bold text-md'}>{t('overview')}</p>
        <table className="w-full">
          <tbody>
          <tr>
            <td>{t('game-cnt')}</td>
            <td className="text-right w-[100px]">{data.playedGameCount}/{data.totalGameCount}</td>
          </tr>
          <tr>
            <td>{t('perfect-game-cnt')}</td>
            <td className="text-right w-[100px]">{data.fullAchievementGameCount}</td>
          </tr>
          <tr>
            <td>{t('achievement-cnt')}</td>
            <td className="text-right w-[100px]">{data.unlockedAchievements}/{data.totalAchievements}</td>
          </tr>
          <tr>
            <td>{t('hours-on-record')}</td>
            <td className="text-right w-[100px]">{(data.totalPlaytimeInMinutes / 60).toFixed(1)} H</td>
          </tr>
          <tr>
            <td>{t('account-age')}</td>
            <td className="text-right w-[100px]">{age.toFixed(1)} {t('account-age-unit')}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <p className={'font-bold text-md'}>{t('top-played-game')}</p>
        <div>{
          data.top10Games.map(game => {
            return <div key={game.appid} className={'flex justify-between items-center'}>
              <p>{game.name}</p>
              <p className={'w-[100px] text-right'}>{(game.playtimeForever! / 60).toFixed(1)} H</p>
            </div>
          })
        }</div>
      </div>

      <div className="border-t border-dashed pt-3 mb-4">
        <p className={'font-bold text-md'}>{t('community')}</p>
        <div className="flex justify-between">
          <span>{t('community-review')}</span>
          <span>{community.reviews}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('community-guide')}</span>
          <span>{community.guide}</span>
        </div>

        <div className="flex justify-between">
          <span>{t('community-screenshot')}</span>
          <span>{community.screenshots}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('community-workshop')}</span>
          <span>{community.workshopItems}</span>
        </div>
      </div>

      <div className="border-t border-dashed pt-3 mb-4">
        <p className={'font-bold text-md'}>{t('recent')}</p>
        <div className="flex justify-between">
          <span>{t('recent-played-game')}</span>
          <span>{data.recentPlayedGames}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('recent-playtime')}</span>
          <span>{(data.recentPlaytimeInMinutes / 60).toFixed(1)} H</span>
        </div>
      </div>

      <div className="flex justify-between font-bold mt-2">
        <span>{t('steam-score')}</span>
        <span>{steamScore.toFixed(0)}</span>
      </div>

      <div className="border-t border-dashed pt-4 mb-4 text-center">
        {/*<p>COUPON CODE: {Math.random().toString(36).substring(2, 8).toUpperCase()}</p>*/}
        <p className="text-xs opacity-75">{t('labels.save-tip')}</p>
        <div className="opacity-75 mb-4">
          <p>{t('labels.serve-provider')}</p>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="mb-6 opacity-75 grid grid-cols-2 gap-x-2">
        <p>{t('card')} #: **** **** {new Date().getFullYear()}</p>
        <p>{t('friend-code')}: {id.accountid}</p>
        <p>{t('card-holder')}: {data.name}</p>
        <p>{t('cs-friend-code')}: {csFriendCode}</p>
      </div>

      <div className="text-center mb-6">
        <p>{t('labels.thanks')}</p>

      </div>

      <div className={'w-full relative h-32'}>
        <div className={'absolute left-0 bottom-0'}>
          <p>{t('info.inspired-by')}</p>
          <p>{t('info.made-by')}</p>
          <p>{t('info.powered-by')}</p>
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
            <p className="mt-0 opacity-75">{t('labels.qr-find-me')}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="receipt-fade"/>
  </div>
})

AccountReceipt.displayName = 'AccountReceipt'