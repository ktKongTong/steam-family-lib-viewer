import {useMediaQuery} from "@uidotdev/usehooks";
import React, {useCallback, useMemo} from "react";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {cn} from "@/lib/utils";
import _ from "lodash";

export const Paging = ({
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
              {
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
              {
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