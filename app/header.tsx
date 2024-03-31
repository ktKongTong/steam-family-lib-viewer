import Link from "next/link";
import {Github} from "lucide-react";

export default function Header({

}:{

}) {
  return (
    <header className={"w-full flex justify-between items-center h-16 px-20 py-4"}>
      <h1 className={' text-xl'}>steam 赛博家庭库存查看器</h1>

      <Link href={''}>
        <Github className={'h-8 w-8'}/>
      </Link>
    </header>
  )
}