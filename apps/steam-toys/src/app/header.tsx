import Link from "next/link";
import {Github, MenuIcon} from "lucide-react";
import {gitlink} from "@/constant";
import {About} from "@/app/about";
import {TokenSelector} from "@/components/token-pannel/tokenSelector";
import React, {Suspense} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

export default function Header({

}:{

}) {
  return (
    <header className={"w-full flex justify-between items-center h-16 px-2 sm:px-20 py-4"}>
      <Link href={'/'} className={'animate-underline  text-xl'}>Steam Toys</Link>
      <div className={'flex items-center space-x-4'}>
        <Suspense fallback={<div>Loading...</div>}>
          <TokenSelector />
        </Suspense>
        <div className={'md:flex hidden space-x-2'}>
          <Link href={'/'} className={'animate-underline font-bold'}>家庭库存统计</Link>
          <Link href={'/compare'} className={'animate-underline font-bold'}>库存分组对比</Link>
          <Link href={'/receipt'} className={'animate-underline font-bold'}>RECEIPT</Link>
          <About/>
        </div>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger className={'md:hidden'}><MenuIcon/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><Link href={'/'} className={'font-bold'}>家庭库存统计</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={'/compare'} className={'font-bold'}>库存分组对比</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={'/receipt'} className={'font-bold'}>RECEIPT</Link></DropdownMenuItem>
              <DropdownMenuItem>
                <DialogTrigger  className={'font-semibold'}>关于</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px] text-sm">
            <DialogHeader>
              <DialogTitle>关于</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid items-center gap-4">
                <Label htmlFor="name" className="text-left  text-xl">
                  简单介绍
                </Label>
                <div>
                  <p>
                    这是一个周末出于好玩构建的一个小玩具，可以方便的查看家庭中共享库存（仅共享部分，如免费/隐藏部分均不计入），并进行相关的数据统计展示。
                    只在作者所在的赛博家庭中进行了测试，整个库才200+项，因此算是理想情况，没有触发什么边界情况。
                    对于大库玩家，可能会有些问题，欢迎反馈。
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="items-center gap-4">
                <Label htmlFor="name" className="text-right text-xl">
                  关于使用
                </Label>
                <div>
                  <p>可以查看 <Link href={gitlink} className={'text-blue-500'} target={'_blank'}>github</Link> readme 或图片示例，
                    <Link className={'text-blue-500'} href={'/intro.jpg'} target={'_blank'}>点击查看</Link> </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Link href={gitlink}  target={'_blank'}>
          <Github className={'h-8 w-8'}/>
        </Link>
      </div>
    </header>
  )
}