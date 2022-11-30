const app = getApp()

const defaultArticles = [
  {
    // title: '我的初秋报到妆 | 分享初秋妆容 送唇釉',
    title: '我的初秋报到妆 | 分享初秋妆容 送唇釉',
    coverImage: 'https://dummyimage.com/750x1000/3c91ff/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    },
    topic: {
      title: '我的初秋报到妆'
    }
  },
  {
    title: '科普｜一到换季😭脸就痒痒⁉️别慌，有救的🤜',
    coverImage: 'https://dummyimage.com/750x1000/ff3f50/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '惊现秘密の花园⁉️只要0.1元就能邂逅🧚🏻‍♀️花仙子>>',
    coverImage: 'https://dummyimage.com/750x1000/70c743/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '辟谣第三弹💣黑头可以根除❓',
    coverImage: 'https://dummyimage.com/750x1000/deb43b/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '干燥到掉皮？！3️⃣招，让肌肤远离“多事之秋”‼️',
    coverImage: 'https://dummyimage.com/750x1000/efbf67/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '0623#「小光环」精华使用打卡#中奖名单',
    coverImage: 'https://dummyimage.com/750x1000/c767ef/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    }
  },
  {
    title: '秋季🍂护肤第一步：你的水补够了没？🌊',
    coverImage: 'https://dummyimage.com/750x1000/ef679f/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    },
    topic: {
      title: '三周年，从家出发'
    }
  },
  {
    title: '懒妹妹进！补水💦维稳💡清洁✨靠TA全搞定',
    coverImage: 'https://dummyimage.com/320x180/67d1e2/fff',
    imgHeight: 180,
    imgWidth: 320,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    },
    topic: {
      title: '心选膜力 修护一夏'
    }
  },
  {
    title: '无辜眼镜👓妆～不经意的可爱最为致命！',
    coverImage: 'https://dummyimage.com/750x1000/9b67ef/fff',
    imgHeight: 1080,
    imgWidth: 828,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春姐姐'
    }
  },
  {
    title: '3️⃣步精简护肤💦清爽男友我先get！',
    coverImage: 'https://dummyimage.com/750x1000/6fcc68/fff',
    imgHeight: 1000,
    imgWidth: 750,
    creator: {
      avatar: 'https://dummyimage.com/240x240/e28f48/fff&text=avatar',
      nickname: '小春子'
    },
    topic: {
      title: '心选膜力 修护一夏'
    }
  }
]

let rtp = 0.5
let maxHeight = 238.7
let maxWidth = 179
const coverImgProportion = 0.75 // 封面图宽高比例
const proportion = 0.477 // 瀑布流 封面图高与屏幕的比例
if (App.systemInfo && App.systemInfo.windowWidth) {
  rtp = App.systemInfo.windowWidth / 750
  maxWidth = App.systemInfo.windowWidth * proportion || maxWidth
  maxHeight = (App.systemInfo.windowWidth * proportion) / coverImgProportion || maxHeight
  maxHeight += 1
}

function calcImageHeight (article) {
  // 根据封面原始大小和比例换算成对应的尺寸
  // 超过限制则采用最大限制的高度
  let imageHeight = maxHeight

  if (article.imgHeight && article.imgWidth) {
    imageHeight = (maxWidth * article.imgHeight) / article.imgWidth
  }

  if (imageHeight > maxHeight) {
    imageHeight = maxHeight
  }

  // 先转换成 rpx
  imageHeight = imageHeight / rtp
  
  return imageHeight
}

Page({
  data: {
    articles: [...defaultArticles].map(item => {
      item.realHeight = calcImageHeight(item)
      return item
    })
  },
  
  onReachBottom () {
    if (this.loading) return
    this.loading = true

    this.setData({
      articles: [...this.data.articles, ...defaultArticles]
    }, () => {
      setTimeout(() => {
        this.loading = false
      }, 500)
    })
  },
  
})
