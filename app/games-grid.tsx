import Game from "@/app/game";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {App, Player} from "@/app/page";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {MoveDown, MoveUp} from "lucide-react";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import _ from "lodash";
import {useMediaQuery} from "@uidotdev/usehooks";

interface GamesGridProps {
  apps: App[],
  players: Player[]
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
type OrderFunc = (order:Order, rule:Rule) => (a:App,b:App)=>number

const sortFunc:OrderFunc = (order: Order, rule:Rule)=> {
  return (a:App,b:App)=> {
    if(Rule.Date == rule) {
      const diff = ((b?.rtTimeAcquired ?? 0) - (a?.rtTimeAcquired ?? 0))
      return diff * order
    }
    if(Rule.Name == rule) {
      let bn = (b.sortAs ?? b.name)?.toUpperCase() ?? ""
      let an = (a.sortAs ?? a.name)?.toUpperCase() ?? ""
      return (order == Order.ASC) ? (an > bn ? 1 : -1) : (an > bn) ? -1 : 1
    }
    return 0
  }
}

export default function GamesGrid({
  apps,
  players
}:GamesGridProps
) {
  const [order,setOrder] = useState(Order.DESC)
  const [ruleKey,setRuleKey] = useState(Rule.Date)
  const [keyword, setKeyword] = useState<string>("")
  const filteredApps = useMemo(()=> {
    return apps.filter(x=>keyword?x.name?.toUpperCase()?.includes(keyword?.toUpperCase()) : true)
      .sort(sortFunc(order, ruleKey))
  },[apps, keyword, order, ruleKey])


  const sm = useMediaQuery("only screen and (max-width : 768px)")
  const md = useMediaQuery("only screen and (max-width : 1024px)")
  // const lg = useMediaQuery("only screen and (max-width : 1024px)")
  const pageSize = useMemo(()=>{
    if(sm) return 12
    if(md) return 15
    return 18
  },[sm,md])
  const [currentPage,setCurrentPage] = useState(1)
  const pagingApps = useMemo(()=> {
        return filteredApps.slice((currentPage-1)*pageSize, currentPage*pageSize)
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

  return (
    <>
      <div className={'grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-1 md:gap-1 lg:gap-2 '}>
        <div className={'col-span-full text-xs text-zinc-600 cursor-default flex justify-between flex-col sm:flex-row'}>
          <div className={'flex items-center'}>共 {filteredApps.length} 部作品</div>
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
            .map(app => <Game key={app.appid} game={app} players={players}/>)
        }
        <div className={'col-span-full'}>
          <Paging curPage={currentPage} onUpdatePage={setCurrentPage} totalPage={Math.ceil(filteredApps.length/pageSize)} />
        </div>
      </div>
    </>
  )
}


const Paging = ({
  curPage,
  totalPage,
  onUpdatePage
}:{
  curPage:number,
  totalPage:number,
  onUpdatePage: (page: number)=>void,
})=> {

  const sm = useMediaQuery("only screen and (max-width : 768px)")
  const md = useMediaQuery("only screen and (max-width : 1024px)")
  console.log('sm',sm)
  // hasNextPage
  const hasNextPage = useMemo(()=>totalPage > curPage,[curPage,totalPage])
  const hasPreviousPage = useMemo(()=>curPage > 1,[curPage])
  const showPreviousEllipsis = useMemo(()=>{
    return curPage > 5 || (sm && curPage > 2)
  },[curPage, sm])
  const showNextPageEllipsis =  useMemo(()=>{
    return (totalPage - curPage > 3) || (sm && totalPage - curPage > 1)
  },[curPage, sm, totalPage])
  const nextPage = useCallback(()=> {
    if(hasNextPage) {
      onUpdatePage(curPage+1)
    }
  },[curPage, hasNextPage, onUpdatePage])
  const previousPage = useCallback(()=> {
    if(hasPreviousPage) {
      onUpdatePage(curPage-1)
    }
  },[curPage, hasPreviousPage, onUpdatePage])
  return (
    totalPage > 1 &&

    <Pagination>
        <PaginationContent>
            <PaginationItem className={cn(!hasPreviousPage && 'opacity-50')}>
                <PaginationPrevious onClick={previousPage}/>
            </PaginationItem>
          {
            hasPreviousPage && <PaginationItem>
              <PaginationLink onClick={()=>{onUpdatePage(1)}}>
                1
              </PaginationLink>
            </PaginationItem>
          }
          {
            !showPreviousEllipsis && hasPreviousPage && !sm &&
            _.range(2,curPage).map(
              page=>
              {                console.log('start', curPage)
                console.log('page', page)
                console.log('end', totalPage-1)
                return (

                  <PaginationItem key={page}>
                    <PaginationLink onClick={()=>{onUpdatePage(page)}}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
            )
          }
          {
            showPreviousEllipsis &&
              <PaginationItem>
                  <PaginationEllipsis />
              </PaginationItem>
          }
            <PaginationItem>
                <PaginationLink isActive>
                  {curPage}
                </PaginationLink>
            </PaginationItem>

          {
            showNextPageEllipsis &&
              <PaginationItem>
                  <PaginationEllipsis />
              </PaginationItem>
          }
          {
            !showNextPageEllipsis && hasNextPage && !sm &&
            _.range(curPage + 1,totalPage).map(
              page=>
              {                console.log('start', curPage)
                console.log('page', page)
                           console.log('end', totalPage-1)
                return (

                  <PaginationItem key={page}>
                    <PaginationLink onClick={()=>{onUpdatePage(page)}}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
            )
          }
          {
            hasNextPage && <PaginationItem>
              <PaginationLink onClick={()=>{onUpdatePage(totalPage)}}>
                {totalPage}
              </PaginationLink>
            </PaginationItem>
          }
            <PaginationItem className={cn(!hasNextPage && 'opacity-50')}>
                <PaginationNext onClick={nextPage}/>
            </PaginationItem>
        </PaginationContent>
    </Pagination>
  )
}