'use client'
import React, { useEffect, useMemo, useState} from "react";
import {Check, MoveDown, MoveUp, Plus, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {convertTag, Tags} from "@/lib/tagdict";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Paging} from "@/components/paging";
import {GameItem, GameProps} from "@/app/compare/gameItem";
import {MappedGame} from "@/hooks/data/usePlayerMap";

interface GamesGridProps {
  games: GameProps[]
}
enum Order {
  ASC= -1,
  DESC= 1
}
enum Rule {
  NONE,
  Name,
  Date
}
type OrderFunc = (order:Order, rule:Rule) => (a:MappedGame,b:MappedGame)=>number

const sortFunc:OrderFunc = (order: Order, rule:Rule)=> {
  return (a:MappedGame,b:MappedGame)=> {
    if(Rule.Date == rule) {
      // const diff = ((b.game ?? 0) - (a?.rtTimeAcquired ?? 0))
      // return diff * order
      return 0
    }

    if(Rule.Name == rule) {
      let bn = ( b.game.name)?.toUpperCase() ?? ""
      let an = ( a.game.name)?.toUpperCase() ?? ""
      return (order == Order.ASC) ? (an > bn ? 1 : -1) : (an > bn) ? -1 : 1
    }
    return 0
  }
}

export default function GamesGrid({
                                    games,
                                  }:GamesGridProps
) {
  const [order,setOrder] = useState(Order.DESC)
  const [ruleKey,setRuleKey] = useState(Rule.Date)
  const [keyword, setKeyword] = useState<string>("")
  const [tagFilter,setTagFilter] = useState<number[]>([])
  const filteredApps = useMemo(()=> {
    return games
      .filter(x=>keyword?x.game.name?.toUpperCase()?.includes(keyword?.toUpperCase()) : true)
      // .filter(x=> {
      //   if(tagFilter.length == 0) return true
      //   const tag = tagFilter.find(filter=>!x.detail.tagids.includes(filter))
      //   return !tag;
      // })
      .sort(sortFunc(order, ruleKey))
  },[games, keyword, order, ruleKey, tagFilter])
  // const sm = useMediaQuery("only screen and (max-width : 768px)")
  // const md = useMediaQuery("only screen and (max-width : 1024px)")
  const sm = false
  const md = false
  // const lg = useMediaQuery("only screen and (max-width : 1024px)")
  const pageSize = useMemo(()=>{
    if(sm) return 12
    if(md) return 15
    return 18
  },[sm,md])
  const [currentPage,setCurrentPage] = useState(1)
  const pagingApps = useMemo(()=> {
    return filteredApps.slice((currentPage-1) * pageSize, currentPage*pageSize)
  },[currentPage, filteredApps, pageSize])



  useEffect(()=> {
    setCurrentPage(1)
  },[keyword])
  const switchSortRule = (rule:Rule)=> {
    if(ruleKey == rule) {
      setOrder(order == Order.DESC ? Order.ASC:Order.DESC)
    }else {
      setRuleKey(rule)
      setOrder(Order.DESC)
    }
  }
  const [open,setOpen] = useState(false)

  return (
    <>
      <div className={'grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-2 lg:gap-2 '}>
        <div className={'col-span-full text-xs text-zinc-600 cursor-default flex justify-between flex-col sm:flex-row gap-1'}>
          <div className={'flex items-center px-2'}>共 {filteredApps.length} 部作品</div>
          <div className={'flex gap-1 items-center flex-wrap '}>
            {
              tagFilter.map(tag =>
                <span key={tag}
                      className={'px-1 py-0.5 bg-zinc-200/70 shadow rounded-md flex space-x-1 items-center'}
                      onClick={()=>{
                        setTagFilter([...tagFilter.filter(it=>it != tag)])
                      }}
                >
                  <span>{convertTag(tag)}</span>
                  <span><X className={'h-3 w-3'}/></span>
                </span>
              )
            }
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className={'px-1 py-0.5 bg-zinc-200/70 rounded-md shadow'}><Plus className={'w-4 h-4'}/></button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="搜索标签..." />
                  <CommandEmpty>没有这样的标签哦</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {
                        Tags
                          .map((tag) => (
                            <CommandItem
                              key={tag.id}
                              value={tag.id}
                              onSelect={(currentValue) => {
                                if(tagFilter.includes(parseInt(tag.id))) {
                                  setTagFilter([...tagFilter.filter(tag=>tag != parseInt(currentValue))])
                                }else {
                                  setTagFilter([...tagFilter,parseInt(currentValue)])
                                }
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  tagFilter.includes(parseInt(tag.id)) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {tag.name}
                            </CommandItem>
                          ))}

                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className={'flex space-x-2 items-center ml-auto'}>
            <div className={'flex space-x-1 items-center w-16'} onClick={()=>switchSortRule(Rule.Date)}>
              <span>日期</span>
              <span
                className={cn('visible', ruleKey!=Rule.Date && 'invisible')}
              >
                {order == Order.ASC ? <MoveUp className={'h-3 w-3'}/> : <MoveDown className={'h-3 w-3'}/>} </span>
            </div>
            <div className={'flex space-x-1 items-center w-16'} onClick={()=>switchSortRule(Rule.Name)}>
              <span>A-Z</span>
              <span
                className={cn('visible', ruleKey!=Rule.Name && 'invisible')}
              >{order == Order.ASC ? <MoveUp className={'h-3 w-3'}/> : <MoveDown className={'h-3 w-3'}/>} </span>
            </div>
            <Input type="text" placeholder="搜索"
                   className={'max-w-32 sm:max-w-64 py-0.5 h-auto '}
                   onInput={(e)=> {
                     setKeyword(e.currentTarget.value)
                   }}
            />
          </div>
        </div>
        {
          pagingApps
            .map(app => <GameItem key={app.game.appid} game={app.game} owners={app.owners}/>)
        }
        <div className={'col-span-full'}>
          <Paging curPage={currentPage} onUpdatePage={setCurrentPage} totalPage={Math.ceil(filteredApps.length/pageSize)} />
        </div>
      </div>
    </>
  )
}

