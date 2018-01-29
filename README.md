# 技术栈

前端Vue2.0 + vue-router + vuex + axios + ES6 + less
后端Node.js + Express + Mongoose
数据库MongoDB
## 简介

> 该项目使用Vue + Node + MongoDB搭建而成
> Node后台在当前文件夹的 server 目录下

> 数据库下载链接：https://pan.baidu.com/s/1o8VFG4U

> demo地址: http://www.哈士奇.top
> * 手机扫一扫

![](./static/imgs/QRCode.png)

## 功能

用户
    
    登录

    注册
    
    退出
    
    加入购物车
    
    加入收藏
    
    立刻购买
    

搜索
    
    搜索商品
    
    价格筛选
    
    排序
    
        默认排序
    
        销量排序

        价格排序

        好评排序

        综合排序

商品

    基本信息

    商品详情

    商品评价



收藏

    加入收藏

    删除收藏

购物车

    加入购物车

        修改商品选项

        修改默认数量

    删除购物车

    购物车全选

        全选计算价格

    修改购物车商品数量

收货地址

    添加收货地址 (该账户第一个添加的收货地址为默认地址)

    修改收货地址

        修改收货人姓名

        修改收货电话号码

        修改收货地址

    设置默认收货地址

    删除收货地址

订单

    创建订单

        购物车选中商品下订单

            修改商品选项

            修改默认数量

        单件商品下订单

            修改商品选项

            修改默认数量

        给卖家留言

    订单分类

        全部订单

        待付款订单

        待发货订单

        待收货订单

        待评价订单

    取消订单

    删除订单

    订单付款

    订单确认收货

    订单查看物流

    订单评价

    订单查看评价

修改个人信息

    修改网名

    修改邮箱





## 预览

* 登录 - 退出

![](./static/imgs/Gif/SignIn.gif)


* 注册 - 登录

![](./static/imgs/Gif/login.gif)


* 搜索 - 排序 - 筛选

![](./static/imgs/Gif/search.gif)


* 基本信息 - 商品详情 - 评价 - 加入购物车

![](./static/imgs/Gif/commodity.gif)


* 修改商品选项 - 修改商品数量 - 下订单

![](./static/imgs/Gif/CommodityPurchase.gif)


* 创建收货地址 - 设置默认地址 - 删除地址 - 修改地址

![](./static/imgs/Gif/ReceivingAddress.gif)


* 购物车下订单 - 给卖家留言

![](./static/imgs/Gif/ShoppingCartPayment.gif)


* 购物车修改数量 - 购物车全选

![](./static/imgs/Gif/ShoppingCart.gif)


* 修改个人信息 - 修改网名 - 修改email

![](./static/imgs/Gif/Personal.gif)


## 目录结构

<pre>
├─build
├─config
├─server               // node后台
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├─src
│  ├─api
│  ├─assets
│  ├─base
│  ├─common
│  ├─components
│  ├─router
│  └─store
├─static                // 静态资源 img CSS JS Gif font loaders
│  ├─font
│  ├─imgs
│  ├─js
│  └─svg-loaders
└─test
</pre>

## 前端

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:1322
npm run dev

# build for production with minification
npm run build

```
## 后台
``` bash
# node
npm install
node server/bin/www

# Mongoose
mongod --dbpath "数据库文件绝对路径"

```