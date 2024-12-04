'use client'
import React, { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import {useToast} from "@/components/ui/use-toast";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {usePlayerCommunityStats, usePlayerStats} from "@/hooks/data/query/usePlayerStats";
import {ReceiptV1} from "@/app/receipt/receipt-v1";
import {AccountReceipt} from "@/app/receipt/receipt-account";
import {useSteamPlayerSummaries} from "@/hooks/data/query/useSteamPlayerSummaries";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Ellipsis, Info} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {AvailableLocales, LocaleProvider} from "@/app/receipt/use-locale-ctx";
import Link from "next/link";




export default function Home() {
  const token = useTokenStore(state => state.currentToken)
  const [steamid, setSteamid] = useState(token?.steamId ?? '');
  const [loading, setLoading] = useState(false);
  const {fetchPlayerStats, playerStats, error, reset} = usePlayerStats(token?.accessToken ?? "")

  const {fetchPlayerCommunityStats, playerCommunityStats, error:communityError, reset:resetCommunity} = usePlayerCommunityStats()
  const {fetchPlayerSummaries, steamPlayers } = useSteamPlayerSummaries()
  const receiptRef = useRef<HTMLDivElement>(null);
  const {toast} = useToast()
  const playerSummary = steamPlayers?.[0]
  const handleDownload = async () => {
    if (receiptRef.current) {
      const dataUrl = await toPng(receiptRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `steam-receipt-${steamid || 'user'}.png`;
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
          text: `Check out my Steam stats for ${steamid}!`,
          files: [file]
        });
      } else {
        handleDownload();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const [type, setType] = useState('account-v1')
  const [locale, setLocale] = useState<AvailableLocales>('en-US')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset()
    setLoading(true)
    if(type === 'account-v0') {
      fetchPlayerStats(steamid)
        .then(()=>{setLoading(false)})
        .catch(error => {
          toast({
            title: 'Error',
            description: 'Failed to fetch player data',
            variant: 'destructive'
          })
          setLoading(false)
        })
    }else {
      Promise.all([
        fetchPlayerStats(steamid),
        fetchPlayerSummaries([steamid]),
        fetchPlayerCommunityStats(steamid)
      ])
    .then(()=>{
      if(error || communityError) {
        toast({
          title: 'Error',
          description: `Failed to fetch player data ${error ?? communityError}`,
          variant: 'destructive'
        })
      }
      setLoading(false)
    })
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to fetch player data',
          variant: 'destructive'
        })
        setLoading(false)
      })
    }

  }
  return (
    <LocaleProvider value={locale}>
      <main className="min-h-[calc(screen-64px)] mx-auto px-4 py-8 sm:py-16">

        <div className="text-center mb-8">

          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-zinc-900 dark:text-white">
            STEAM RECEIPT
          </h1>
          <div>

            <p className="text-sm sm:text-base text-zinc-600/60 dark:text-zinc-400/60 ">
              Generate a receipt-style summary of your steam profile
              <Popover>
                <PopoverTrigger className={'ml-1  my-auto inline-flex'}><Info className={' w-4 h-4'}/></PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm sm:text-base text-zinc-600/60 dark:text-zinc-400/60">
                    1. add token<br/>
                    2. enter steamid<br/>
                    3. generate<br/>
                  </p>
                </PopoverContent>
              </Popover>
              <div>Login Steam First, Then <Link className={'text-blue-500'} href={'https://steamcommunity.com/pointssummary/ajaxgetasyncconfig'}>Get Community Token</Link></div>
            </p>
          </div>

        </div>
        <form onSubmit={handleSubmit} className="mb-12 flex items-center flex-col sm:flex-row gap-2">
          <div className={'flex items-center gap-2'}>
            <Select defaultValue={'account-v1'} onValueChange={setType} value={type}>
              <SelectTrigger className="w-[110px]">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account-v1">overview</SelectItem>
                <SelectItem value="account-v0">overview(v0)</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={'en-US'} onValueChange={(v) => {setLocale(v as any)}} value={locale}>
              <SelectTrigger className="w-[110px]">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh-CN">中文</SelectItem>
                <SelectItem value="en-US">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={steamid}
              onChange={(e) => setSteamid(e.target.value)}
              placeholder={token?.steamId ?? "Enter Steam ID"}
              autoCapitalize="none"
              autoComplete="off"
              className="flex-1 w-auto max-w-[200px] px-4 py-2 rounded-lg bg-white dark:bg-zinc-800
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"/>
          </div>
        )}
        {
          playerStats && playerCommunityStats && (
            <div className="flex flex-col items-center">
              <div className="receipt-container">
              <div className="coffee-stain"/>

                {
                  type === 'account-v0' && <ReceiptV1 data={playerStats}  ref={receiptRef}/>
                }
                {
                  type === 'account-v1' &&
                    <AccountReceipt
                        ref={receiptRef}
                        playerStats={playerStats}
                        communityStats={playerCommunityStats}
                        playerSummary={playerSummary}/>
                }

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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
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
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                  Share
                </button>
              </div>
            </div>
          )
        }
      </main>
    </LocaleProvider>
  );
}