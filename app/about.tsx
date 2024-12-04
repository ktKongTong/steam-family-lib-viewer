import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader, DialogOverlay, DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {gitlink} from "@/constant";

export function About() {
  return (
    <Dialog>
      <DialogTrigger  className={'font-semibold'}>关于</DialogTrigger>
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
                    最初是一个周末出于好玩糊的一个小玩具，可以方便的查看家庭中共享库存，并进行相关的数据统计展示。
                    后续断断续续添加了一些其他功能。玩具的问题在于没有考虑边界情况，因此可能会有些问题，欢迎反馈。
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
  )
}