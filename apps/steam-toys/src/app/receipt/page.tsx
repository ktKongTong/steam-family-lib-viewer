'use client'
import React, { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {AccountReceipt} from "@/app/receipt/receipt-account";
import { Info } from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";
import {useMutate} from "@/hooks/data/query/use-mutate";
import {APIService} from "@/hooks/data/query/api";
import {I18nSelector} from "@/app/receipt/i18n-selector";




export default function Home() {
  const token = useTokenStore(state => state.currentToken)

  const [steamid, setSteamid] = useState(token?.steamId ?? '');

  const { mutateAsync:fetchPlayerStatsAsync, mutate: fetchPlayerStats,error, data: playerStats,reset, isPending } = useMutate(APIService.getPlayerStats)
  const loading = isPending

  const receiptRef = useRef<HTMLDivElement>(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset()
    fetchPlayerStats({accessToken: token?.accessToken ?? "", id: steamid})
  }
  return (
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
                    It should work without steam token. If it fails, try adding your Steam Community token.
                    <div> <Link className={'text-blue-500'} href={'https://steamcommunity.com/pointssummary/ajaxgetasyncconfig'}>Get Community Token</Link></div>
                  </p>
                </PopoverContent>
              </Popover>

            </p>
          </div>

        </div>
        <form onSubmit={handleSubmit} className="mb-12 flex items-center flex-col sm:flex-row gap-2">
          <div className={'flex items-center gap-2'}>
            <I18nSelector/>
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
          playerStats && (
            <div className="flex flex-col items-center">
              <div className="receipt-container">
              <div className="coffee-stain"/>
                <AccountReceipt
                  ref={receiptRef}
                  playerStats={playerStats}
                />
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
  );
}