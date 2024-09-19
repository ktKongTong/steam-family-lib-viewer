import useStore from "@/hooks/useStore";
import {useTokenStore} from "@/hooks/auth/store/useTokenStore";
import {useEffect, useState} from "react";
import {SteamToken} from "@/hooks/auth/interface";
import * as React from "react";
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
import {TokenDetail, TokenDetailHeader} from "@/components/token-pannel/tokenDetail";
import {Separator} from "@/components/ui/separator";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {TokenItem} from "@/components/token-pannel/tokenItem";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Ellipsis, MenuIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";


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
    setCurToken(currentToken ?? undefined)
  }, [currentToken])

  const tokens = useStore(useTokenStore, state => state.tokens)
  const tokensArr = Object.values(tokens??{})
  const [open, setOpen] = React.useState(false)
  // const isDesktop = useMediaQuery("(min-width: 768px)")

  const [mobilePopoverSelectorOpen, setMobilePopoverSelectorOpen] = useState(false)
  // if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className=" flex flex-col min-h-[640px]">
          <DialogHeader className={"shrink grow-0"}>
            <DrawerTitle>Token Manager</DrawerTitle>
          </DialogHeader>
          <div className={"flex w-full grow flex-col sm:flex-row"}>

            <div className={"block sm:hidden"}>
              <DropdownMenu>
                <DropdownMenuTrigger className={'w-full'}>
                  <div className={"w-full p-2 relative"}>
                    <div className={"w-full pr-12 "}>
                      {
                        curToken && <TokenDetailHeader token={curToken}/>
                      }
                      {
                        !curToken &&
                          <div className="flex items-center space-x-2 h-10">
                              <div className={"  font-bold"}>
                                  添加Token
                              </div>
                          </div>
                      }
                    </div>
                    <div className={'absolute top-1/2 right-2 -translate-y-1/2'}>
                      <Ellipsis className={'text-zinc-700'}/>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <ul className={"w-full space-y-2 px-2"}>
                      {
                        tokensArr.map(t => (
                          <DropdownMenuItem key={t.steamId} onClick={() => {
                            setCurToken(t)
                          }} className={"cursor-pointer w-full"}>
                            <TokenDetailHeader token={t} className={'w-full'}/>
                          </DropdownMenuItem>
                        ))
                      }
                    </ul>
                  <DropdownMenuItem>
                    <button className={"w-full p-2 text-sm text-primary"} onClick={() => setCurToken(undefined)}>
                      添加新Token
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator orientation="horizontal" className={"my-2 w-auto block sm:hidden"}/>
            <div className={"hidden sm:block"}>
              <div className={""}>
                <TokenList
                  curToken={curToken}
                  onSelectToken={setCurToken}
                  tokens={tokens ?? {}}/>
              </div>
              <div className={"rounded py-2 flex items-center justify-center"}>
                <Button variant={'ghost'} onClick={() => setCurToken(undefined)}>新增Token</Button>
              </div>
            </div>
            <Separator orientation="vertical" className={"mx-2 h-auto hidden sm:block"}/>
            <div className={"grow"}>
              {
                curToken ? (
                  <div>
                    <TokenDetailHeader token={curToken} className={'hidden sm:flex sm: mb-4'}/>
                    <TokenDetail token={curToken}/>
                  </div>) :
                  <div>
                    <TokenAdder/>
                  </div>
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  // }
  // return (
  //   <Drawer open={open} onOpenChange={setOpen}>
  //     <DrawerTrigger asChild>
  //       {children}
  //     </DrawerTrigger>
  //     <DrawerContent>
  //       <DrawerHeader className="text-left">
  //         <DrawerTitle>Token Manager</DrawerTitle>
  //       </DrawerHeader>
  //       <DrawerFooter className="pt-2">
  //         <DrawerClose asChild>
  //           <Button variant="outline">Close</Button>
  //         </DrawerClose>
  //       </DrawerFooter>
  //     </DrawerContent>
  //   </Drawer>
  // )
}
