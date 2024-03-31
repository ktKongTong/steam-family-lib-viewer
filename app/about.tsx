import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {gitlink} from "@/constant";

export function About() {
  return (
    <Dialog>
      <DialogTrigger  className={'font-semibold'}>About</DialogTrigger>
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
            <div className="grid items-center gap-4">
              <Label htmlFor="name" className="text-left text-xl">
                赞赏
              </Label>
              <div className={'flex flex-col'}>
                <p>如果你觉得这个玩具有意思，可以考虑赞赏作者一杯快乐水哦🍺</p>
                <div className={'flex justify-evenly mx-auto w-full'}>
                  <img src={'/wechat_pay_qrcode.png'} className={'max-h-40 mx-auto'}/>
                  <img src={'/alipay_qrcode.png'} className={'max-h-40 mx-auto'}/>
                </div>

              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  )
}