import {i18nRecord} from "./interface";

const availableThankTips = [
  '感谢游玩，Gaben 爱你呦 😘！',
  '感谢游玩，Ciallo～(∠・ω< )⌒☆！',
]

const zh: i18nRecord = {
  receipt: {
    'order': '订单编号',
    'customer': '消费者',
    'type': '类型',
    'type-overview': '账户概览',
    'overview': '概览',
    'game-cnt': '游戏',
    'perfect-game-cnt': '完美通关',
    'achievement-cnt': '成就',
    'hours-on-record': '记录时长',
    'account-age': '账户年龄',
    'account-age-unit': '年',
    'top-played-game':'最多游玩时长',
    'community': '社区贡献',
    'community-review': '评测',
    'community-guide': '指南',
    'community-screenshot': '截图',
    'community-workshop': '创意工坊',
    'recent': '最近游玩',
    'recent-played-game': '最近游玩 (14d)',
    'recent-playtime': '最近游玩时长 (14d)',
    'steam-score': 'STEAM 分数',
    'card': '卡号',
    'card-holder': '持有者',
    'friend-code': '好友码',
    'cs-friend-code': 'CS 码',
    'labels': {
      'save-tip': '好好保存!',
      'serve-provider': '本次服务由 ktkongtong 提供',
      'thanks': () => {
        const random = Math.floor(Math.random() * availableThankTips.length);
        return availableThankTips[random]
      },
      'qr-find-me': 'find me on steam'
    },
    'info': {
      'inspired-by':'inspired by ankit',
      'made-by':'made with ❤️ by ktkongtong',
      'powered-by':' powered by sflv.ktlab.io'
    }
  }
}

export default zh