
# steam-family-lib-viewer

这是一个获取 steam 家庭共享库存的小玩具。
可以统计一些数据，看看库存成分。
效果如图

![img.png](doc/img.png)

## Prerequisites

- 需要一个已加入新版测试家庭的 steam 账号。

## Getting Started

### 1. 在浏览器中登陆 Steam

### 2.1 获AccessToken （控制台方式）
- 按下 F12，或右键检查打开调试面板

![img_1.png](doc/start_1.png)
- 
- 找到类型如图所示带有 access_token的网络请求，复制。

![img_1.png](doc/start_2.png)

### 2.2 获取 AccessToken （直接访问请求）

在登陆了 steam 之后直接访问 https://store.steampowered.com/pointssummary/ajaxgetasyncconfig
。提取 `webapi_token` 部分的内容即为 `access_token`

![img.png](doc/start_6.png)
### 3. 打开本站点，填入access_token

![img_2.png](doc/start_3.png)

### 4. 点击提交，不出意外，数据已经开始获取啦。

![img_2.png](doc/start_4.png)

### 5.查看结果

![img_2.png](doc/start_5.png)

## Deploy
这是用 Next.js 构建的页面，你可很方便的使用 vercel 自行部署。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FktKongTong%2Fsteam-family-lib-viewer)

## Todo
- [x] more filter
- [ ] more data panel
- [ ] ui improve




