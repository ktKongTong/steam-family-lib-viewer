import Link from "next/link";
import {Github} from "lucide-react";
import {gitlink} from "@/constant";
import {About} from "@/app/about";
import {TokenSelector} from "@/components/token-pannel/tokenSelector";
import React from "react";

export default function Header({

}:{

}) {
  return (
    <header className={"w-full flex justify-between items-center h-16 px-2 sm:px-20 py-4"}>
      <h1 className={' text-xl'}>steam 赛博家庭库存查看器</h1>
      <div className={'flex items-center space-x-4'}>
        <TokenSelector />
        <About/>
        <Link href={gitlink}  target={'_blank'}>
          <Github className={'h-8 w-8'}/>
        </Link>
      </div>
    </header>
  )
}