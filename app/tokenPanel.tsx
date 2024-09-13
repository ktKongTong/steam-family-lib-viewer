import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import useStore from "@/hooks/useStore";

export function TokenPanel() {

  return (
    <div>
      <TokenAddDrawerDialog/>
    </div>
  )
}

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useMediaQuery} from "@uidotdev/usehooks";
import QR from "@/components/qr";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SteamToken} from "@/hooks/auth/interface";
import {useEffect, useMemo, useState} from "react";
import {Plus} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import NewTokenForm from "@/components/tokenForm";

export function TokenItem({token}:{token: SteamToken}) {
  return (
    <div className="rounded-lg p-2 bg-blue-100/70 shadow-sm shadow-border">
      <div className={"flex items-center space-x-2"}>
        <Avatar>
          <AvatarImage src={token.avatarUrl} />
          <AvatarFallback>{token.username}</AvatarFallback>
        </Avatar>
        <div>
          <div>{token.username}</div>
          <div className={"text-sm italic text-zinc-400"}>{dayjs(token.addedAt).format('YY-MM-DD')}</div>
        </div>

      </div>
      <div className={"text-sm italic text-zinc-400"}>{token.steamId}</div>
    </div>
  )
}


export function TokenList(
  {
    onUpdateToken,
    curToken,
    tokens,
    // currentToken
  }:{
    onUpdateToken: (t : SteamToken | undefined) => void
    curToken: SteamToken | undefined
    tokens: Record<string, SteamToken>
  }
) {

  const token = useMemo(()=>Object.values(tokens), [tokens])

  return (
    <ul className={"w-40 space-y-2"}>
      {
        token.map(t => (
          <li key={t.steamId} onClick={()=>{onUpdateToken(t)}}>
            {/*add active */}
            <TokenItem token={t} />
          </li>
        ))
      }
      <li className={""} onClick={()=>{
        console.log("update token to undefined")
        onUpdateToken(undefined)
      }}>
        <div

          className="rounded-lg min-w-40 p-2 bg-blue-100 shadow-sm shadow-border flex items-center justify-center">
          <Plus/>
        </div>
      </li>

    </ul>
  )
}

export function TokenDetail(
{
  token
}:{
  token: SteamToken
}) {
  return (
    <div>
      {token.steamId}
      {token.username}
    </div>
  )
}

export function TokenAddDrawerDialog() {

  const currentToken = useStore(useTokenStore, state => state.currentToken)
  const [curToken, setCurToken] = useState<SteamToken>()
  useEffect(()=> {
    if(currentToken){
      setCurToken(currentToken)
    }
  }, [currentToken])

  const tokens = useStore(useTokenStore, state => state.tokens)

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Token Manager</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[840px] flex flex-col min-h-[600px]">
          <DialogHeader className={"shrink grow-0"}>
            <DrawerTitle>Token Manager</DrawerTitle>
          </DialogHeader>

          <div className={"flex w-full grow"}>
            {/*  左右布局 */}
            <div className={"border-r-2 px-2"}>
              <TokenList
                curToken={curToken}
                onUpdateToken={setCurToken}
                tokens={tokens ?? {}}/>
            </div>
            <div className={"grow"}>
              {
                curToken ? (<TokenDetail token={curToken}/>) :
                  <div>
                  <TokenAdder/>
                  </div>
              }
            </div>

          </div>

        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Token Manager</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function TokenAdder() {
  return (
    <div className={'px-4'}>
      <Tabs defaultValue="input" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="input">Add By Input</TabsTrigger>
          <TabsTrigger value="qr">Add By QR</TabsTrigger>
        </TabsList>
        <TabsContent value="input"><NewTokenForm/></TabsContent>
        <TabsContent value="qr"><QR/></TabsContent>
      </Tabs>
    </div>
  )
}
