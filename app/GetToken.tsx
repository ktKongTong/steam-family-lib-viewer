import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import Link from "next/link";

export default function GetToken() {

  return (
    <>
    <Dialog>
      <DialogTrigger className={"text-xs text-blue-400"}>如何获取 AccessToken?</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>如何获取 AccessToken？</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="name" className="text-left  text-xl">
              方式一 steam 网页登陆，请求获取
            </Label>
            <div>
              <p className={'break-all text-xs '}>
                在登陆网页端 steam 之后，新开标签页，直接访问如下链接
                <br/>

                <Link href={"https://store.steampowered.com/pointssummary/ajaxgetasyncconfig"}
                      className={'text-blue-400'}
                      target={'_blank'}>https://store.steampowered.com/pointssummary/ajaxgetasyncconfig</Link>
                <br/>
                提取 webapi_token 部分的内容即为 access_token

                <img src={'/webapi_token.png'} className={'max-h-40 mx-auto'}/>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="name" className="text-left  text-xl">
              方式二 steam 网页登陆，控制台获取
            </Label>
            <div>
              <p>
                在登陆网页端 steam 之后，按下 F12，或通过其他方式打开控制台。
                <br/>
                找到具有 access_token 字段的网络请求，复制access_token 的内容。
                <br/>
                <img src={'/console.png'} className={'w-full mx-auto'}/>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}