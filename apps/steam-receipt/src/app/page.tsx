'use client'
import React, { useState, useRef } from 'react'
import {useToast} from "@/hooks/use-toast";
import {useNewPlayerStats, usePlayerCommunityStats} from "@/hooks/usePlayerStats";
import {AccountReceipt} from "@/app/receipt-account";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {AvailableLocales, LocaleProvider} from "@/app/use-locale-ctx";

import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import {ShareButtons} from "@/app/ShareButtons";



export default function Home() {
  const [steamid, setSteamid] = useState('')
  const [loading, setLoading] = useState(false);
  const {fetchPlayerStats, playerStats, error, reset} = useNewPlayerStats("")
  const {fetchPlayerCommunityStats, playerCommunityStats, error:communityError} = usePlayerCommunityStats()
  const receiptRef = useRef<HTMLDivElement>(null);
  const {toast} = useToast()
  const [locale, setLocale] = useState<AvailableLocales>('en-US')

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      reset()
      setLoading(true)
      Promise.all([
        fetchPlayerStats(steamid),
        fetchPlayerCommunityStats(steamid)
      ])
      .then(()=>{
        if(error || communityError) {
          console.error(error, communityError)
          toast({
            title: 'Error',
            description: `Failed to fetch player data ${error ?? communityError}`,
            variant: 'destructive'
          })
        }
        setLoading(false)
      })
      // eslint-disable-next-line
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to fetch player data',
          variant: 'destructive'
        })
        setLoading(false)
      })

  }
  return (
    <LocaleProvider value={locale}>
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
            {/* eslint-disable-next-line */}
            <Select defaultValue={'en-US'} onValueChange={(v) => {setLocale(v as any)}} value={locale}>
              <SelectTrigger className="w-[100px]">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh-CN">中文</SelectItem>
                <SelectItem value="en-US">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-1 max-w-md">
            <Input
              type="text"
              placeholder="Enter Steam ID"
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
          playerStats && playerCommunityStats && (
            <div className="flex flex-col items-center">
              <div className="receipt-container">
              <div className="coffee-stain"/>
                <AccountReceipt
                  ref={receiptRef}
                  playerStats={playerStats}
                  communityStats={playerCommunityStats}
                />
              </div>
            </div>
          )
        }
        {
          playerStats && receiptRef.current && <ShareButtons receiptRef={receiptRef} username={steamid}/>
        }
      </main>
    </LocaleProvider>
  );
}