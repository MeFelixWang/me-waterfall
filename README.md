## 介绍

me-waterfall 是一个微信小程序瀑布流组件库，实现简单，侵入性小，贴近 web 端的效果。

## 线上体验

扫描下方的小程序二维码，体验使用效果：

![小程序](./assets/miniprogram.jpg)

## 安装

### 方式一：使用 npm 安装（推荐）

```
npm install me-waterfall
```

### 方式二：下载源码

将源码下载到本地，然后将 `lib` 目录拷贝到自己的项目中。

## 使用方法

在页面的 `json` 文件或 `app.json` 中引入组件：

```json
{
  "usingComponents": {
    "me-waterfall": "/path/to/me-waterfall/waterfall/index",
    "me-waterfall-item": "/path/to/me-waterfall/waterfall-item/index"
  }
}
```

然后就可以在 `wxml` 中直接使用了：

```xml
<me-waterfall>
    <me-waterfall-item wx:for="{{list}}" wx:key="{{index}}">
        <image src="{{item.src}}" style="height:{{item.height}}px;width:100%"/>
    </me-waterfall-item>
</me-waterfall>
```

## API

### waterfall 组件

#### props

| 参数         | 说明             | 类型   | 默认值 | 是否必须 |
| ------------ | ---------------- | ------ | ------ | ----- |
| width       | 容器宽度，传入后将优先使用此值，呈现速度更快 | Number | -  |  否  |
| column       | 列数             | Number | 2      | 否 |
| gap          | 列与列之间的间距 | Number | 15     | 否 |

#### methods

##### reflow

重新排列元素，在某些情形下，你可能希望在完成某些操作后对瀑布流进行重新排列，此时可以调用此方法：

```js
const waterfallInstance = this.selectComponent("#waterfall");

waterfallInstance.reflow();
```

#### 外部样式类

| 参数         | 说明             | 类型   | 默认值 | 是否必须 |
| ------------ | ---------------- | ------ | ------ | ----- |
| custom-class | 外部样式类       | String      | -      | 否 |

### waterfall-item 组件

#### 外部样式类

| 参数         | 说明             | 类型   | 默认值 | 是否必须 |
| ------------ | ---------------- | ------ | ------ | ----- |
| custom-class | 外部样式类       | String      | -      | 否 |

## 关于性能

首先，够用；

其次，由于微信小程序中获取元素尺寸的 api 为回调形式，因此排列内部元素时需要延迟，即等到容器宽度取到之后再进行排列，这会使得瀑布流呈现速度减慢；如果改为传入 `width`，呈现速度会更快。

## 捐赠

如果这个库有帮助，请 Star 这个仓库，让更多人发现它。

当然，也可以鼓励我一下：

![赞赏](./assets/reward.png)

## 开源协议

本项目基于 MIT 协议。
