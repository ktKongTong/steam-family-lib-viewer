
# steam-family-lib-viewer

这是一个获取 steam 家庭共享库存的小玩具。
可以统计一些数据，看看库存成分。
效果如图

![img.png](doc/img.png)

## Prerequisites

- 需要一个已加入新版测试家庭的 steam 账号。

## Getting Started

1. 在 web 端登陆 steam。
2. 按下 F12，或右键检查打开调试面板

![img_1.png](doc/start_1.png)

3.找到类型如图所示带有 access_token的网络请求，复制。

![img_1.png](doc/start_2.png)

4. 打开本站点，填入access_token

![img_2.png](doc/start_3.png)
5. 点击提交，不出意外，数据已经开始获取啦。

![img_2.png](doc/start_4.png)

6. 查看结果

![img_2.png](doc/start_5.png)

## Deploy
这是用 Next.js 构建的页面，你可很方便的使用 vercel 自行部署。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FktKongTong%2Fsteam-family-lib-viewer)

## Todo
- [ ] more filter
- [ ] more data panel
- [ ] ui improve

## Sponsor
如果觉得这个玩具还不错，可以考虑赞助一杯快乐水哦。

<img src="doc/wechat_pay_qrcode.png" width="256">

<img src="doc/alipay_qrcode.png" width="256">


