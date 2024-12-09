'use client'
import React, { useState, useRef } from 'react'
import { useNewPlayerStats } from "@/hooks/usePlayerStats";
import {AccountReceipt} from "@/app/receipt-account";
import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import {ShareButtons} from "@/app/ShareButtons";
import {I18nSelector} from "@/components/i18n-selector";



export default function Home() {
  const [steamid, setSteamid] = useState('')
  const receiptRef = useRef<HTMLDivElement>(null);
  const {fetchPlayerStats, playerStats, loading, reset} = useNewPlayerStats()
  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      reset()
      fetchPlayerStats(steamid)
  }
  return (
      <main className="min-h-screen mx-auto max-w-4xl px-4 py-8 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-zinc-900 dark:text-white">
            STEAM RECEIPT
          </h1>
          <p className="text-sm sm:text-base text-zinc-600/60 dark:text-zinc-400/60 ">
            Generate a receipt-style summary of your steam profile
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mb-12 flex items-center justify-center flex-col sm:flex-row gap-2">
          <div className={'flex items-center gap-2'}>
            <I18nSelector/>
          </div>
          <div className="flex gap-1 max-w-md">
            <Input
              type="text"
              placeholder="Enter SteamID or nickname"
              value={steamid}
              onChange={e => setSteamid(e.target.value)}
              autoCapitalize={'none'}
              autoComplete={'off'}
              className={'max-w-[160px]'}
            />
            <Button type={'submit'} disabled={!steamid || loading} variant={'ghost'} size={'icon'} className={'bg-primary text-primary-foreground'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   className="lucide lucide-zap">
                <path
                  d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
              </svg>
            </Button>
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
            </div>
          )
        }
        {
          playerStats && receiptRef.current && <ShareButtons receiptRef={receiptRef} username={steamid}/>
        }
      </main>
  );
}