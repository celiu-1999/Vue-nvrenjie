<template>
  <div class="commodity">
    <div class="commodity_center_top">
      <div class="commodity_center_top_nav clearfix">
        <span @click="onActive('left', $event.currentTarget)" ref="Oneli" class="nav_li active">基本信息</span>
        <span @click="onActive('center', $event.currentTarget)" class="nav_li">商品详情</span>
        <span @click="onActive('right', $event.currentTarget)" class="nav_li pj">评价</span>
      </div>
    </div>
    <div class="commodity_center" ref="Center">
      <div class="commodity_center_left fl t_1" ref="Ct1">
        <div class="commodity_center_left_nr">
            <div class="commodity_center_left_top_banner">
            <banner ref="banner">
              <li class="fl" v-for="item in banner">
                <img class="needclick" v-lazy="item" alt="" >
              </li>
            </banner>
          </div>
          <div class="commodity_center_left_top_title">
            <h3>{{title}}</h3>
            <h4><span>￥</span> {{price}}</h4>
            <h5>价格: <s>￥{{OriginalPrice}}</s></h5>
            <h6>
              <span>快递：{{express}}</span>
              <span>月销量 {{SalesVolume}}件</span>
              <span>{{address}}</span>
            </h6>
          </div>
          <div class="commodity_center_left_center">
            <ul class=" commodity_center_left_li">
              <li class="clearfix">
                <span class="center">          
                  {{ensure}}
                </span>
                <span class="iconfont icon-gengduo2 fr gd"></span></li>
            </ul>
            <ul class="commodity_center_left_option commodity_center_left_li">
              <li class="clearfix">
                <span class="center">
                  <span>颜色:<i>亮银</i></span>
                  <span>尺寸:<i>38</i></span>
                  <span>套餐:<i>买二送一</i></span>
                  <span>套餐:<i>买二送一</i></span>
                  <span>套餐:<i>买二送一</i></span>
                  <span>套餐:<i>买二送一</i></span>
                </span>
                <span class="iconfont icon-gengduo2 fr gd"></span></li>
            </ul>
          </div>
          <div class="commodity_center_left_bottom">
            <div class="commodity_center_left_bottom_evaluate">
              <h4>商品评价 (<i>5150</i>)</h4>
              <ul class="evaluate">
                <li class="evaluate_item">
                  <div class="evaluate_item_top clearfix">
                    <img :src="oneEvaluate.pics[0]" class="fl" alt="">
                    <span class="title fl">{{oneEvaluate.displayUserNick}}</span>
                  </div>
                  <div class="evaluate_item_center">
                    <h3>{{oneEvaluate.rateContent}}</h3>
                    <h4>{{oneEvaluate.rateDate}} {{oneEvaluate.auctionSku}}</h4>
                  </div>
                </li>
                <div class="evaluate_item_bottom">
                  <button class="evaluate_item_more"  @click="onActive('right')" >查看更多评价</button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="commodity_center_center fl t_2" ref="Ct2">
        <div class="commodity_center_center_nr">
          <!-- 模块 未来要是把这个网站完整后台做出来，可以用模块堆叠图文减少 -->
          <div class="modular">
            <!-- 全宽图片模块 img_modular-->
            <div class="img_modular" v-for="item in imgText">
              <img :src="item" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="commodity_center_right fr t_3" ref="Ct3">
        <div class="commodity_center_right_nr">
          <ul class="evaluate">
            <li class="evaluate_item" v-for="item in evaluate">
              <div class="evaluate_item_top clearfix">
                <img :src="item.pics[0]" class="fl" alt="">
                <span class="title fl">{{item.displayUserNick}}</span>
              </div>
              <div class="evaluate_item_center">
                <h3>{{item.rateContent}}</h3>
                <h4>{{item.rateDate}} {{item.auctionSku}}</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="commodity_actionBar">
      <div class="actionBar_left">
        <span class="sc" @click="AddCollection()"><span class="iconfont icon-shoucang1"></span><i>收藏</i></span>
        <span class="gwc"><span class="iconfont icon-gouwuchekong"></span><i>购物车</i></span>
      </div>
      <div class="actionBar_right">
        <button @click="ShowActiveShadow('gm')">立刻购买</button>
        <button @click="ShowActiveShadow('gwc')">加入购物车</button>
      </div>
    </div>
    <div class="commodity_shadow" @click="HideActiveShadow" ></div>
    <div class="commodity_option_content">
      <div class="option_content">
        <div class="header ">
          <div class="header_content clearfix">
            <div class="header_img fl">
              <img v-lazy="img" class="headerImgChange" alt="">
            </div>
            <div class="header_price fl">
              <h3>¥89-99</h3>
              <h4>库存1862件</h4>
              <h5>请选择: 颜色分类</h5>
            </div>
            </div>
        </div>
        <div class="xx">
          <div class="option_item" v-for="item in option">
            <div class="center">
              <div class="option_title">
                {{item.title}}
              </div>
              <ul class="option_xx">
                <li v-for="xx in item.option_item" @click="setShoppingCartOption(xx.id, $event.currentTarget)" :img="xx.img" :index="xx.id">{{xx.option_title}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="number">
          <div class="center clearfix">
            <span class="num_title fl">购买数量</span>
            <span class="num_input fr"><i class="iconfont icon-jiajian-1" @click="NumberModification(true)"></i><input type="text" :value="CommodityNum"><i class="iconfont icon-jiajian-" @click="NumberModification(false)"></i></span>
          </div>
        </div>
        <div class="ok">
          <button @click="OkSubmit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .commodity {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
  }
  .commodity_center_top {
    width: 100%;
    position: relative;
  }
  .commodity_center_top_nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 138px;
    line-height: 138px;
    z-index: 10;
    padding: 0 50px;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .commodity_center_top_nav .nav_li {
    flex: 1;
    display: inline-block;
    height: 128px;
    line-height: 138px;
    text-align: center;
    font-size: 50px;
    color: #666;
  }
  .commodity_center_top_nav .nav_li.active {
    border-bottom: 10px solid #ff4f64;
    color: #ff4f64;
  }
  .commodity_center_top_nav span.ss {
    margin: 0 100px 0 0;
    line-height: 61px;
  }

  .commodity_center {
    position: fixed;
    top: 138px;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 140px;
  }
  .commodity_center .t_1 {
    left: 0;
  }
  .commodity_center .t_2 {
    left: 100%;
  }
  .commodity_center .t_3 {
    left: 200%;
  }
  .commodity_center .t_4 {
    left: -100%;
  }
  .commodity_center .t_5 {
    left: -200%;
  }
  .commodity_center_left {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transition: all .5s;
    width: 100%;
  }
  .commodity_center_left_nr {
    width: 100%;
  }
  .commodity_center_center {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transition: all .5s;
    background-color: #fff;
    width: 100%;
  }
  .commodity_center_center_nr {
    width: 100%;
  }
  .commodity_center_right {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transition: all .5s;
    background-color: #fff;
    width: 100%;
  }
  .commodity_center_right_nr {
    width: 100%;
    padding: 20px 0;
  }
  .commodity_center_left_top_banner {
    width: 100%;
  }
  .commodity_center_left_top_banner img {
    width: 100%;
  }
  .commodity_center_left_top_title {
    background-color: #fff;
  }
  .commodity_center_left_top_title h3 {
    padding: 30px 10px 0px 30px;
    margin: 0 0 20px 0;
    font-size: 42px;
    color: #3e403f;
    line-height: 50px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
  }
  .commodity_center_left_top_title h4 {
    padding: 0 0 0 30px;
    font-size: 50px;
    color: #FF0036;
    line-height: 50px;
  }
  .commodity_center_left_top_title h4 span {
    padding: 20px 0;
    font-size: 30px;
    color: #FF0036;
    line-height: 50px;
  }
  .commodity_center_left_top_title h5 {
    padding: 0 10px 30px 30px;
    font-size: 35px;
    color: rgb(150,150,150);
    line-height: 50px;
    font-weight: 400;
  }
  .commodity_center_left_top_title h6 {
    display: flex;
    padding: 0 10px 30px 30px;
    font-size: 30px;
    color: rgb(150,150,150);
    line-height: 50px;
    font-weight: 400;
  }
  .commodity_center_left_top_title h6 span {
    flex: 1;
    text-align: center;
  }
  .commodity_center_left_top_title h6 span:nth-child(1) {
    flex: 1;
    text-align: left;
  }
  .commodity_center_left_top_title h6 span:nth-child(3) {
    flex: 1;
    text-align: right;    
  }

  .commodity_center_left_li {
    margin: 10px 0 0 0;
    background-color: #fff;
    font-weight: 800;
  }
  .commodity_center_left_li li {
    display: block;
    padding: 30px 30px;
    font-size: 40px;
    color: #444;
  }
  .commodity_center_left_li li span.center {
    display: inline-block;
    width: 85%;
    overflow: hidden; 
    text-overflow:ellipsis;
    white-space:nowrap;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; 
  }
  .commodity_center_left_li li span.gd {
    display: inline-block;
    line-height: 60px;
    transform: rotate(90deg);
    font-size: 40px;
  }

  .commodity_center_left_bottom {
    margin: 10px 0 0 0;
    background-color: #fff;
    padding: 20px 30px;
  }
  .commodity_center_left_bottom_evaluate h4 {
    font-size: 50px;
    color: #444;
    line-height: 50px;
    font-weight: 400;
    margin: 0 0 20px 0;
  }

  .evaluate {
    margin: 30px 0 0 0;
  }
  .evaluate_item {
    padding: 0 30px;
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid #ccc;
  }
  .evaluate_item .evaluate_item_top {
    display: block;
  }
  .evaluate_item .evaluate_item_top img {
    width: 90px;
    height: 90px;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .evaluate_item .evaluate_item_top .title {
    display: inline-block;
    margin: 0 0 0 20px;
    font-size: 50px;
    line-height: 90px;
  }
  .evaluate_item .evaluate_item_center {
    margin: 20px 0 0 0;
  }
  .evaluate_item .evaluate_item_center h3 {
    overflow: hidden; 
    text-overflow:ellipsis;
    /* white-space:nowrap; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; 
    font-size: 35px;
    color: #444;
  }
  .evaluate_item .evaluate_item_center h4 {
    overflow: hidden; 
    text-overflow:ellipsis;
    /* white-space:nowrap; */
    color: #999;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; 
    font-size: 30px;
    margin: 20px 0 0 0;
  } 
  .evaluate_item_bottom {
    margin: 20px 0 0 0;
    text-align: center;
    height: 200px;
    line-height: 200px;
  }
  .evaluate_item_bottom .evaluate_item_more {
    width: 300px;
    height: 100px;
    line-height: 70px;
    text-align: center;
    font-size: 30px;
    border: 1px solid #ccc;
    color: #666;
    background: #fff;
    border-radius: 2px;
  }
  .modular{
  }
  .img_modular {
    width: 100%;
  }
  .img_modular img {
    width: 100%;
  }
  .commodity_actionBar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 140px;
    background-color: #fff;
    z-index: 10;
    border-top: 1px solid rgba(229,229,229,0.93);
  }
  .commodity_actionBar .actionBar_left {
    width: 400px;
    text-align: center;
    display: flex;
  }
  .commodity_actionBar .actionBar_left span {
    flex: 1;
    font-weight: 400;
  }
  .commodity_actionBar .actionBar_left span span {
    display: inline-block;
    font-size: 55px;
    line-height: 55px;
    margin: 30px 0 0 0;
    color: #808080;
  }
  .commodity_actionBar .actionBar_left span i {
    display: block;
    text-align: center;
    font-size: 35px;
    line-height: 40px;
  }
  .commodity_actionBar .actionBar_right {
    flex: 1;
    display: flex;
    font-size: 0;
  }
  .commodity_actionBar .actionBar_right button {
    flex: 1;
    border: none;
    font-size: 40px;
    color: #fff;
  }
  .commodity_actionBar .actionBar_right button:nth-child(1) {
    background-color: rgb(255,190,35);
  }
  .commodity_actionBar .actionBar_right button:nth-child(2) {
    background-color: #ff4f64;
  }
  .commodity_option_content {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 102;
    transition: all .5s;
    transform: translateY(110%);
    background-color: #fff;
  }
  .commodity_option_content.active {
    transform: translateY(0px);
  }
  .option_content {
    margin: 0 0 100px 0;
  }
  .option_content .header {
    padding: 0 30px 0 30px;
  }
  .option_content .header .header_content {
    border-bottom: 1px solid #ccc;
    padding: 0 0 35px 0;
  }
  .option_content .header .header_img {
    margin-top: -80px;
    width: 300px;
    height: 300px;
    border-radius: 10px;
    border: 1px solid #ccc;
    display: inline-block;
  }
  .option_content .header .header_img img {
    width: 100%;
    border-radius: 10px;
    height: 100%;
    border: 2px solid #fff;
  }
  .option_content .header .header_price {
    display: inline-block;
    margin: 0 0 0 30px;
  }
  .option_content .header .header_price h3 {
    font-size: 45px;
    line-height: 45px;
    margin: 30px 0 0 0;
    color: #f84056;
    font-family: arial;
  }
  .option_content .header .header_price h4 {
    font-size: 40px;
    line-height: 50px;
    color: #051b28;
    font-weight: 400;
  }
  .option_content .header .header_price h5 {
    font-size: 40px;
    line-height: 40px;
    color: #051b28;
    font-weight: 400;
  }
  .option_xx li{
    font-size: 40px;
    padding: 10px 20px;
    margin: 0 20px 15px 0;
    border-radius: 15px;
    background-color: #f5f5f5;
    color: #555;
    display: inline-block;
  }
  .option_xx li.active {
    background-color:#ff2832;
    color: #fff;
  }
  .option_item {
    padding: 30px 30px 0 30px;
  }
  .option_item .center {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .option_item .option_title {
    font-size: 40px;
    margin-bottom: 30px;
    color: #666;
  }
  .option_content .number {
    padding: 30px;
    position: relative;
  }
  .number .center {
    color: #666;
    font-size: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
  }
  .number .center .num_title {
    line-height: 100px;
  }

  .number .center .num_input {
    display: flex;
    width: 300px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 0 10px 0 0;
  }
  .number .center .num_input i {
    flex: 1;
    font-size: 70px;
    line-height: 100px;
    text-align: center;
  }
  .number .center .num_input input {
    flex: 1;
    width: 100px;
    text-align: center;
    border-left: 1px solid #ccc; 
    border-right: 1px solid #ccc; 
  }
  .option_content .ok {
    position: absolute;
    width: 100%;
    height: 120px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .option_content .ok button {
    width: 100%;
    height: 100%;
    background-color: #f84056;
    border: none;
    color: #fff;
    font-size: 40px;
  }

  .commodity_shadow {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 100;
    transition: all .5s;
    opacity: 0;
  }
  .commodity_shadow.active {
    top: 0;
    opacity: 1;
  }
</style>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import banner from '@/base/banner/banner'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      commodityItem: [],
      title: '',
      img: '',
      price: 0,
      OriginalPrice: 0,
      id: 0,
      express: 0,
      SalesVolume: 0,
      Stock: 0,
      address: '',
      ensure: '',
      imgText: [],
      evaluate: [],
      oneEvaluate: {
        pics: []
      },
      option: [],
      banner: [],
      active: true,
      optionItemId: 0,
      optionId: 0,
      PurchaseOptions: '',
      CommodityNum: 1,
      OptionItemImg: ''
    }
  },
  watch: {
    commodityId () {
      if (this.commodityId === 0) {
        this.$router.push('/')
      } else {
        this.getCommodityItem()
        this.$refs.banner.com()
      }
    }
  },
  created () {
    if (this.commodityId === 0) {
      this.$router.push('/')
    } else {
      this.getCommodityItem()
      setTimeout(() => {
        this.$refs.banner.com()
      }, 20)
    }
  },
  mounted () {
    setTimeout(() => {
      // this.initSlider()
      // this.onActive('left', this.$refs.Oneli)
    }, 20)
  },
  methods: {
    initSlider (ref) {
      this.slider = new BScroll(this.$refs.Ct1, {
        scrollX: true,
        click: true
      })
    },
    getCommodityItem () {
      axios.get('/commodityItem', {
        params: {
          id: this.commodityId
        }
      })
      .then((res) => {
        this.commodityItem = res.data.result.list
        this.title = res.data.result.list[0].title
        this.img = res.data.result.list[0].img
        this.price = res.data.result.list[0].price
        this.OriginalPrice = res.data.result.list[0].OriginalPrice
        this.id = res.data.result.list[0].id
        this.express = res.data.result.list[0].express
        this.SalesVolume = res.data.result.list[0].SalesVolume
        this.Stock = res.data.result.list[0].Stock
        this.address = res.data.result.list[0].address
        this.ensure = res.data.result.list[0].ensure
        this.imgText = res.data.result.list[0].imgText
        this.evaluate = res.data.result.list[0].evaluate
        this.oneEvaluate = res.data.result.list[0].oneEvaluate
        this.option = res.data.result.list[0].option
        this.banner = res.data.result.list[0].banner
        this.CommodityNum = 1
        setTimeout(() => {
          this.onActive('left', this.$refs.Oneli)
        }, 20)
      })
    },
    ShowActiveShadow (Options) {
      this.optionId = this.option[0].id
      this.optionItemId = this.option[0].option_item[0].id
      if (this.option[0].id === this.optionId) {
        document.getElementsByClassName('headerImgChange')[0].src = this.option[0].option_item[0].img
      }
      var shadow = document.getElementsByClassName('commodity_shadow')[0]
      var option = document.getElementsByClassName('commodity_option_content')[0]
      shadow.classList.add('active')
      option.classList.add('active')
      this.PurchaseOptions = Options
      var _this = this
      setTimeout(function () {
        _this.setShoppingCartOption(_this.optionItemId, document.getElementsByClassName('option_xx')[0].firstChild)
      }, 20)
    },
    OkSubmit () {
      this.HideActiveShadow()
      if (!this.signIn) {
        this.$router.push('/login')
        return
      }
      // 判断是否为加入购物车
      if (this.PurchaseOptions === 'gwc') {
        this.AddToCart()
      } else if (this.PurchaseOptions === 'gm') {
        // 购买
        this.Getpurchase()
      }
    },
    HideActiveShadow () {
      var shadow = document.getElementsByClassName('commodity_shadow')[0]
      var option = document.getElementsByClassName('commodity_option_content')[0]
      shadow.classList.remove('active')
      option.classList.remove('active')
    },
    Getpurchase () {
      var temporary = {}
      temporary.commodityId = this.commodityId
      temporary.CommodityNum = this.CommodityNum
      temporary.optionId = this.optionId
      temporary.optionItemId = this.optionItemId
      this.set_purchase(temporary)
      this.$router.push('/purchase')
      this.set_orderOption(false)
      this.set_shoppingCartPurchase([])
    },
    AddToCart () {
      axios.post('/users/AddToCart', {
        commodityId: this.commodityId,
        commodityNumber: this.CommodityNum,
        commodityOptionId: this.optionId,
        commodityOptionItemId: this.optionItemId,
        commodityOptionItemImg: this.OptionItemImg,
        commodityOptionIdSelected: false
      })
      .then((res) => {
        if (res.data.msg === '未登录' && res.data.status === '1') {
          this.$router.push('/login')
        }
      })
      .catch((err) => {
        caches.log(err)
      })
    },
    AddCollection () {
      if (!this.signIn) {
        this.$router.push('/login')
        return
      }
      axios.post('/users/AddCollection', {
        commodityId: this.commodityId
      })
      .then((res) => {
        if (res.data.msg === '未登录' && res.data.status === '1') {
          this.$router.push('/login')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    NumberModification (bolen) {
      if (!bolen && this.CommodityNum <= 1) {
        return
      }
      if (bolen) {
        this.CommodityNum++
      } else {
        this.CommodityNum--
      }
    },
    onActive (active, e) {
      if (!e) {
        e = document.getElementsByClassName('pj')[0]
      }
      var dom = `commodity_center_${active}`
      var ren = this.$refs.Center.children
      if (active === 'left') {
        this.addActive(dom, ren, 't_1', 't_2', 't_3')
        this.addClass(e)
        this.slider = new BScroll(this.$refs.Ct1, {
          scrollY: true
        })
      } else if (active === 'center') {
        this.addActive(dom, ren, 't_4', 't_1', 't_2')
        this.addClass(e)
        this.slider = new BScroll(this.$refs.Ct2, {
          scrollY: true
        })
      } else if (active === 'right') {
        this.addActive(dom, ren, 't_5', 't_4', 't_1')
        this.addClass(e)
        this.slider = new BScroll(this.$refs.Ct3, {
          scrollY: true
        })
      }
    },
    addClass (e) {
      var father = e.parentNode
      var son = father.children
      for (var i = 0; i < son.length; i++) {
        son[i].classList.remove('active')
      }
      e.classList.add('active')
    },
    addActive (dom, ren, class1, class2, class3) {
      for (var i = 0; i < ren.length; i++) {
        ren[i].classList.remove('t_1')
        ren[i].classList.remove('t_2')
        ren[i].classList.remove('t_3')
        ren[i].classList.remove('t_4')
        ren[i].classList.remove('t_5')
      }
      document.getElementsByClassName('commodity_center_left')[0].classList.add(class1)
      document.getElementsByClassName('commodity_center_center')[0].classList.add(class2)
      document.getElementsByClassName('commodity_center_right')[0].classList.add(class3)
    },
    setShoppingCartOption (id, e) {
      for (var i = 0; i < this.option[0].option_item.length; i++) {
        if (this.option[0].option_item[i].id === id) {
          document.getElementsByClassName('headerImgChange')[0].src = this.option[0].option_item[i].img
          this.OptionItemImg = this.option[0].option_item[i].img
        }
      }
      var dom = document.getElementsByClassName('option_xx')[0].children
      for (var j = 0; j < dom.length; j++) {
        dom[j].classList.remove('active')
      }
      e.classList.add('active')
      this.optionItemId = id
    },
    ...mapMutations({
      set_purchase: 'SET_PURCHASE',
      set_orderOption: 'SET_ORDER_OPTION',
      set_shoppingCartPurchase: 'SET_SHOPPING_CART_PURCHASE'
    })
  },
  computed: {
    ...mapGetters([
      'commodityId',
      'signIn'
    ])
  },
  components: {
    banner
  }
}
</script>
