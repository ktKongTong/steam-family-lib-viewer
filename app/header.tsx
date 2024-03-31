import Link from "next/link";
import {Github} from "lucide-react";
import {gitlink} from "@/constant";
import {About} from "@/app/about";

export default function Header({

}:{

}) {
  return (
    <header className={"w-full flex justify-between items-center h-16 px-20 py-4"}>
      <h1 className={' text-xl'}>steam 赛博家庭库存查看器</h1>

      <div className={'flex items-center space-x-4'}>
        <About/>
        <Link href={gitlink}  target={'_blank'}>
          <Github className={'h-8 w-8'}/>
        </Link>
      </div>
    </header>
  )
}