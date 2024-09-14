import useStore from "@/hooks/useStore";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {useEffect, useState} from "react";
import {SteamToken} from "@/hooks/auth/interface";
import * as React from "react";
import {useMediaQuery} from "@uidotdev/usehooks";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {TokenList} from "@/components/token-pannel/tokenList";
import {TokenAdder} from "@/components/token-pannel/tokenGetter";
import {TokenDetail} from "@/components/token-pannel/tokenDetail";


export function TokenManagerDrawerDialog(
  {
    children
  }: {
    children: React.ReactNode,
  }

) {
  const currentToken = useStore(useTokenStore, state => state.currentToken)
  const [curToken, setCurToken] = useState<SteamToken>()
  useEffect(() => {
    if (currentToken) {
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
          {children}
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
                onSelectToken={setCurToken}
                tokens={tokens ?? {}}/>
              <div className={"rounded py-2 flex items-center justify-center"}>
                <Button variant={'ghost'} onClick={()=>setCurToken(undefined)}>新增Token</Button>
              </div>
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
