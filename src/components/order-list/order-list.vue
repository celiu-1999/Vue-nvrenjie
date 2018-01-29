<template>
  <div class="orderList" ref="wrapper">
    <div class="orderList_center">
      <header>
        <router-link to="/" tag="span" class="iconfont icon-shangxiazuoyou-2 fh"></router-link>
        订单管理
      </header>
      <!-- NAV -->
      <ul class="orderList_nav">
        <li class="orderList_nav_li active AllorderList" @click="AllorderList($event.currentTarget)">
          全部
        </li>
        <li class="orderList_nav_li GetUnpaid" @click="GetUnpaid($event.currentTarget)">
          待付款
        </li>
        <li class="orderList_nav_li" @click="Getpayment($event.currentTarget)">
          待发货
        </li>
        <li class="orderList_nav_li" @click="GetAlreadyShipped($event.currentTarget)">
          待收货
        </li>
        <li class="orderList_nav_li" @click="GetNotAppraised($event.currentTarget)">
          待评价
        </li>
      </ul>
      <!-- 未付款 -->
      <ul class="orderList_list Unpaid">
        <li class="orderList_list_item" v-for="item in Unpaid">
          <h1 class="orderList_list_item_top clearfix"><span class="OrderNumber fl">订单号：{{item.OrderNumber}}</span><span class="payment fr">{{item.state}}</span></h1>
          <div class="orderList_list_item_center" v-for="commodityItem in item.commodity">
            <div class="orderList_list_item_center_left">
              <img :src="commodityItem.img" alt="">
            </div>
            <div class="orderList_list_item_center_right">
              <h2>{{commodityItem.title}}</h2>
              <h3>{{commodityItem.option}}</h3>
            </div>
            <div class="orderList_list_item_center_float">
              <h3>￥{{commodityItem.Price}}</h3>
              <h4><s>￥{{commodityItem.OriginalPrice}}</s></h4>
              <h5><span>x</span>{{commodityItem.num}}</h5>
            </div>
          </div>
          <div class="orderList_list_item_bottom clearfix">
            <span class="num fr">(含运费￥<i>{{item.freight}}</i>)</span>
            <span class="num fr">合计：￥<i>{{item.AllPrice}}</i></span>
            <span class="num fr">共<i>{{item.allNum}}</i>件商品</span>
          </div>
          
          <div class="buttonColumn orderList_list_item_unpaid clearfix">
            <button class="paymentBtn red fr" :index="item.OrderNumber" @click="PreparePayment(item.OrderNumber, item.AllPrice)">付款</button>
            <button class="cancel black fr" :index="item.OrderNumber" @click="CancellationOfOrder(item.OrderNumber)">取消订单</button>
          </div>
        </li>
      </ul>
      <!-- 已付款未发货 -->
      <ul class="orderList_list payment">
        <li class="orderList_list_item" v-for="item in payment">
          <h1 class="orderList_list_item_top clearfix"><span class="OrderNumber fl">订单号：{{item.OrderNumber}}</span><span class="payment fr">{{item.state}}</span></h1>
          <div class="orderList_list_item_center" v-for="commodityItem in item.commodity">
            <div class="orderList_list_item_center_left">
              <img :src="commodityItem.img" alt="">
            </div>
            <div class="orderList_list_item_center_right">
              <h2>{{commodityItem.title}}</h2>
              <h3>{{commodityItem.option}}</h3>
            </div>
            <div class="orderList_list_item_center_float">
              <h3>￥{{commodityItem.Price}}</h3>
              <h4><s>￥{{commodityItem.OriginalPrice}}</s></h4>
              <h5><span>x</span>{{commodityItem.num}}</h5>
            </div>
          </div>
          <div class="orderList_list_item_bottom clearfix">
            <span class="num fr">(含运费￥<i>{{item.freight}}</i>)</span>
            <span class="num fr">合计：￥<i>{{item.AllPrice}}</i></span>
            <span class="num fr">共<i>{{item.allNum}}</i>件商品</span>
          </div>
        </li>
      </ul>
      <!-- 已发货 -->
      <ul class="orderList_list AlreadyShipped">
        <li class="orderList_list_item" v-for="item in AlreadyShipped">
          <h1 class="orderList_list_item_top clearfix"><span class="OrderNumber fl">订单号：{{item.OrderNumber}}</span><span class="payment fr">{{item.state}}</span></h1>
          <div class="orderList_list_item_center" v-for="commodityItem in item.commodity">
            <div class="orderList_list_item_center_left">
              <img :src="commodityItem.img" alt="">
            </div>
            <div class="orderList_list_item_center_right">
              <h2>{{commodityItem.title}}</h2>
              <h3>{{commodityItem.option}}</h3>
            </div>
            <div class="orderList_list_item_center_float">
              <h3>￥{{commodityItem.Price}}</h3>
              <h4><s>￥{{commodityItem.OriginalPrice}}</s></h4>
              <h5><span>x</span>{{commodityItem.num}}</h5>
            </div>
          </div>
          <div class="orderList_list_item_bottom clearfix">
            <span class="num fr">(含运费￥<i>{{item.freight}}</i>)</span>
            <span class="num fr">合计：￥<i>{{item.AllPrice}}</i></span>
            <span class="num fr">共<i>{{item.allNum}}</i>件商品</span>
          </div>  
          <div class="buttonColumn orderList_list_item_unpaid clearfix">
            <button class="red fr" :index="item.OrderNumber" @click="GoodsReceipt(item.OrderNumber)">确认收货</button>
            <button class="black fr" :index="item.CourierNumber" @click="GetLogistics(item.CourierNumber)">查看物流</button>
          </div>
        </li>
      </ul>
      <!-- 未评价 -->
      <ul class="orderList_list NotAppraised">
        <li class="orderList_list_item" v-for="item in NotAppraised">
          <h1 class="orderList_list_item_top clearfix"><span class="OrderNumber fl">订单号：{{item.OrderNumber}}</span><span class="payment fr">{{item.state}}</span></h1>
          <div class="orderList_list_item_center" v-for="commodityItem in item.commodity">
            <div class="orderList_list_item_center_left">
              <img :src="commodityItem.img" alt="">
            </div>
            <div class="orderList_list_item_center_right">
              <h2>{{commodityItem.title}}</h2>
              <h3>{{commodityItem.option}}</h3>
            </div>
            <div class="orderList_list_item_center_float">
              <h3>￥{{commodityItem.Price}}</h3>
              <h4><s>￥{{commodityItem.OriginalPrice}}</s></h4>
              <h5><span>x</span>{{commodityItem.num}}</h5>
            </div>
          </div>
          <div class="orderList_list_item_bottom clearfix">
            <span class="num fr">(含运费￥<i>{{item.freight}}</i>)</span>
            <span class="num fr">合计：￥<i>{{item.AllPrice}}</i></span>
            <span class="num fr">共<i>{{item.allNum}}</i>件商品</span>
          </div>
          <div class="buttonColumn orderList_list_item_unpaid clearfix">
            <button class="red fr" :index="item.OrderNumber" @click="GetEvaluate(item.OrderNumber)">评价</button>
            <button class="black fr" :index="item.OrderNumber">售后</button>
          </div>
        </li>
      </ul>
      <!-- 已评价 全部操作都完成的 -->
      <ul class="orderList_list HaveBeenEvaluated">
        <li class="orderList_list_item" v-for="item in HaveBeenEvaluated">
          <h1 class="orderList_list_item_top clearfix"><span class="OrderNumber fl">订单号：{{item.OrderNumber}}</span><span class="payment fr">{{item.state}}</span></h1>
          <div class="orderList_list_item_center" v-for="commodityItem in item.commodity">
            <div class="orderList_list_item_center_left">
              <img :src="commodityItem.img" alt="">
            </div>
            <div class="orderList_list_item_center_right">
              <h2>{{commodityItem.title}}</h2>
              <h3>{{commodityItem.option}}</h3>
            </div>
            <div class="orderList_list_item_center_float">
              <h3>￥{{commodityItem.Price}}</h3>
              <h4><s>￥{{commodityItem.OriginalPrice}}</s></h4>
              <h5><span>x</span>{{commodityItem.num}}</h5>
            </div>
          </div>
          <div class="orderList_list_item_bottom clearfix">
            <span class="num fr">(含运费￥<i>{{item.freight}}</i>)</span>
            <span class="num fr">合计：￥<i>{{item.AllPrice}}</i></span>
            <span class="num fr">共<i>{{item.allNum}}</i>件商品</span>
          </div>
          <div class="buttonColumn orderList_list_item_unpaid clearfix">
            <button class="red fr" :index="item.OrderNumber" @click="SeeEvaluate(item.evaluate)">查看评价</button>
            <button class="black fr" :index="item.OrderNumber" @click="OrderDeletion(item.OrderNumber)">删除订单</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 没有商品显示 -->
    <div class="no" v-show="!show.length">
      <img src="static/imgs/404.png" alt="">
      <h5>没有啦!</h5>
    </div>
    <!-- 阴影 -->
    <div class="shadow" @click="HideActiveShadow();HideLogistics();HideorderListGoodsReceipt();HideEvaluate();HideSeeEvaluate()"></div>
    <!-- 付款 -->
    <div class="orderList_fk">
      <div class="header">确定付款 <span class="iconfont icon-guanbi" @click="HideActiveShadow()"></span></div>
      <div class="Price">
        ￥{{price}}
      </div>
      <div class="input">
        <input type="password" placeholder="请输入支付密码">
      </div>
      <button @click="OkPayment()">确定付款</button>
    </div>
    <!-- 确认收货 -->
    <div class="orderList_GoodsReceipt">
      <div class="header">确认收货 <span class="iconfont icon-guanbi" @click="HideorderListGoodsReceipt()"></span></div>
      <div class="Price">
        确认收货后，金额会打入对方账户
      </div>
      <div class="input">
        <input type="password" placeholder="请输入支付密码">
      </div>
      <button @click="OkGoodsReceipt()">确认收货</button>
    </div>
    <!-- 快递显示 -->
    <div class="logistics">
      <div class="header">
        快递单号：{{logistics}} <span class="iconfont icon-guanbi" @click="HideLogistics()"></span>
      </div>
      <div class="logistics_list">
        暂无物流
      </div>
    </div>
    <!-- 评价 -->
    <div class="evaluate">
      <div class="header">
        评价 <span class="iconfont icon-guanbi" @click="HideEvaluate()"></span>
      </div>
      <div class="evaluateInput">
        <input type="text" placeholder="请输入评价内容" class="evaluateInputValue">
      </div>
      <button @click="SetEvaluate()">提交</button>
    </div>
    <!-- 查看评价 -->
    <div class="SeeEvaluate">
      <div class="header">
        评价 <span class="iconfont icon-guanbi" @click="HideSeeEvaluate()"></span>
      </div>
      <div class="SeeEvaluate_center">
        {{SeeEvaluateCenter}}
      </div>
    </div>
    <!-- 提醒 -->
    <tx ref="tx"></tx>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import {mapGetters} from 'vuex'
import Tx from '@/base/tx/tx'

export default {
  data () {
    return {
      show: [],
      AlreadyShipped: [],
      HaveBeenEvaluated: [],
      NotAppraised: [],
      payment: [],
      Unpaid: [],
      term: '',
      price: 0,
      PendingPayment: 0,
      logistics: 0,
      GoodsReceiptId: 0,
      evaluateId: 0,
      SeeEvaluateCenter: ''
    }
  },
  computed: {
    ...mapGetters([
      'signIn'
    ])
  },
  components: {
    Tx
  },
  watch: {
    signIn () {
      var dom = document.getElementsByClassName('orderList_nav_li')[0]
      if (this.signIn) {
        this.AllorderList(dom)
      } else {
        this.show = []
        this.Unpaid = []
        this.payment = []
        this.AlreadyShipped = []
        this.NotAppraised = []
        this.HaveBeenEvaluated = []
        this.AllorderList(dom)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.initSlider()
    }, 20)
  },
  created () {
    this.getOrderList()
  },
  methods: {
    initSlider () {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true
      })
    },
    getOrderList () {
      axios.post('/users/orderList')
      .then((res) => {
        this.show = res.data.result.payment
        this.Unpaid = res.data.result.Unpaid
        this.payment = res.data.result.payment
        this.NotAppraised = res.data.result.NotAppraised
        this.HaveBeenEvaluated = res.data.result.HaveBeenEvaluated
        this.AlreadyShipped = res.data.result.AlreadyShipped
      })
      .catch((err) => {
        console.log(err)
      })
    },
    NavActive (e) {
      var dom = document.getElementsByClassName('orderList_nav')[0].children
      for (var i = 0; i < dom.length; i++) {
        dom[i].classList.remove('active')
      }
      e.classList.add('active')
    },
    AllorderList (e) {
      this.getOrderList()
      this.NavActive(e)
    },
    GetUnpaid (e) {
      this.orderListItem('Unpaid')
      this.NavActive(e)
    },
    Getpayment (e) {
      this.orderListItem('payment')
      this.NavActive(e)
    },
    GetAlreadyShipped (e) {
      this.orderListItem('AlreadyShipped')
      this.NavActive(e)
    },
    GetNotAppraised (e) {
      this.orderListItem('NotAppraised')
      this.NavActive(e)
    },
    orderListItem (term) {
      axios.post('/users/orderListItem', {
        term: term
      })
      .then((res) => {
        this.Unpaid = []
        this.payment = []
        this.AlreadyShipped = []
        this.NotAppraised = []
        this.HaveBeenEvaluated = []
        this[term] = res.data.result
        this.show = res.data.result
      })
      .catch((err) => {
        console.log(err)
      })
    },
    PreparePayment (id, price) {
      this.ShowActiveShadow()
      this.PendingPayment = id
      this.price = price
    },
    OkPayment () {
      this.SetPayment()
    },
    SetPayment () {
      axios.post('/users/payment', {
        OrderNumber: this.PendingPayment
      })
      .then((res) => {
        var dom = document.getElementsByClassName('orderList_nav_li')[0]
        if (res.data.result === '付款成功') {
          this.HideActiveShadow()
          this.$refs.tx.tx(res.data.result)
          this.AllorderList(dom)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    OkGoodsReceipt () {
      this.SetGoodsReceipt()
    },
    SetGoodsReceipt () {
      axios.post('/users/GoodsReceipt', {
        OrderNumber: this.GoodsReceiptId
      })
      .then((res) => {
        var dom = document.getElementsByClassName('orderList_nav_li')[0]
        if (res.data.result === '确认收货成功') {
          this.HideorderListGoodsReceipt()
          this.$refs.tx.tx(res.data.result)
          this.AllorderList(dom)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    GetEvaluate (id) {
      this.evaluateId = id
      this.ShowEvaluate()
    },
    SetEvaluate () {
      var value = document.getElementsByClassName('evaluateInputValue')[0].value
      axios.post('/users/SubmitEvaluate', {
        OrderNumber: this.evaluateId,
        EvaluationContent: value
      })
      .then((res) => {
        var dom = document.getElementsByClassName('orderList_nav_li')[0]
        if (res.data.result === '提交评价成功') {
          this.HideEvaluate()
          this.$refs.tx.tx(res.data.result)
          this.AllorderList(dom)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    CancellationOfOrder (id) {
      var dom = document.getElementsByClassName('GetUnpaid')[0]
      axios.post('users/CancellationOfOrder', {
        OrderNumber: id
      })
      .then((res) => {
        if (res.data.result === '取消订单成功') {
          this.$refs.tx.tx(res.data.result)
          this.GetUnpaid(dom)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    OrderDeletion (id) {
      console.loh(id)
      var dom = document.getElementsByClassName('orderList_nav_li')[0]
      axios.post('users/OrderDeletion', {
        OrderNumber: id
      })
      .then((res) => {
        if (res.data.result === '订单删除成功') {
          this.$refs.tx.tx(res.data.result)
          this.AllorderList(dom)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    GoodsReceipt (id) {
      this.GoodsReceiptId = id
      this.ShoworderListGoodsReceipt()
    },
    GetLogistics (id) {
      this.logistics = id
      this.ShowLogistics()
    },
    SeeEvaluate (data) {
      this.SeeEvaluateCenter = data
      this.ShowSeeEvaluate()
    },
    shadowShow () {
      var shadow = document.getElementsByClassName('shadow')[0]
      shadow.classList.add('active')
    },
    shadowHide () {
      var shadow = document.getElementsByClassName('shadow')[0]
      shadow.classList.remove('active')
    },
    ShowSeeEvaluate () {
      this.shadowShow()
      var SeeEvaluate = document.getElementsByClassName('SeeEvaluate')[0]
      SeeEvaluate.classList.add('active')
    },
    HideSeeEvaluate () {
      this.shadowHide()
      var SeeEvaluate = document.getElementsByClassName('SeeEvaluate')[0]
      SeeEvaluate.classList.remove('active')
    },
    ShowEvaluate () {
      this.shadowShow()
      var Evaluate = document.getElementsByClassName('evaluate')[0]
      Evaluate.classList.add('active')
    },
    HideEvaluate () {
      this.shadowHide()
      var Evaluate = document.getElementsByClassName('evaluate')[0]
      Evaluate.classList.remove('active')
    },
    ShowLogistics () {
      this.shadowShow()
      var logistics = document.getElementsByClassName('logistics')[0]
      logistics.classList.add('active')
    },
    HideLogistics () {
      this.shadowHide()
      var logistics = document.getElementsByClassName('logistics')[0]
      logistics.classList.remove('active')
    },
    ShoworderListGoodsReceipt () {
      this.shadowShow()
      var orderListGoodsReceipt = document.getElementsByClassName('orderList_GoodsReceipt')[0]
      orderListGoodsReceipt.classList.add('active')
    },
    HideorderListGoodsReceipt () {
      this.shadowHide()
      var orderListGoodsReceipt = document.getElementsByClassName('orderList_GoodsReceipt')[0]
      orderListGoodsReceipt.classList.remove('active')
    },
    ShowActiveShadow () {
      this.shadowShow()
      var fk = document.getElementsByClassName('orderList_fk')[0]
      fk.classList.add('active')
    },
    HideActiveShadow () {
      this.shadowHide()
      var fk = document.getElementsByClassName('orderList_fk')[0]
      fk.classList.remove('active')
    }
  }
}
</script>

<style scoped>
  .orderList {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
  }
  header {
    display: block;
    width: 100%;
    height: 120px;
    color: #464646;
    background-color: #fff;
    border-bottom: 1px solid #d8d8d8;
    text-align: center;
    line-height: 120px;
    font-size: 45px;
    font-weight: 400;
    z-index: 500;
  }
  header span {
    position: absolute;
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: #fff;
    line-height: 120px;
    color: #888;
  }
  header .fh {
    top: 0;
    left: 0;
    font-size: 50px;
  }
  .orderList_nav {
    display: flex;
    height: 120px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  .orderList_nav .orderList_nav_li {
    flex: 1;
    font-size: 38px;
    font-weight: 400;
    color: #000;
    text-align: center;
    line-height: 120px;
  }
  .orderList_nav_li.active {
    color: #f84056;
    border-bottom: 10px solid #f84056;
  }
  .orderList_list {
    margin: 20px 0 0 0;
  }
  .orderList_list_item {
    display: block;
    margin: 0 0 20px 0;
  }
  .orderList_list_item .orderList_list_item_top {
    display: block;
    height: 100px;
    font-size: 35px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    line-height: 100px;
    color: #808080;
  }
  .orderList_list_item_top .OrderNumber {
    margin-left: 30px;
    color: #000;
  }
  .orderList_list_item_top .payment {
    margin-right: 30px;
    color: #f84056;
  }
  .orderList_list_item_center {
    display: flex;
    position: relative;
    border-bottom: 1px solid #fff;
    background-color: #fff;
  }
  .orderList_list_item_center:last-child {
    border-bottom: none;
  }
  .orderList_list_item_center_left {
    width: 260px;
  }
  .orderList_list_item_center_left img {
    width: 200px;
    height: 200px;
    margin: 20px 30px 20px 30px;
  }
  .orderList_list_item_center_right {
    flex: 1;
  }
  .orderList_list_item_center_right h2 {
    margin: 25px 0 0 0;
    font-size: 35px;
    line-height: 40px;
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .orderList_list_item_center_right h3 {
    font-size: 30px;
    line-height: 35px;
    color: #808080;
    margin: 20px 0 0 0;
    height: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .orderList_list_item_center_float {
    width: 180px;
    padding: 0 20px 0 0;
  }
  .orderList_list_item_center_float h3 {
    font-size: 35px;
    color: #464646;
    font-weight: 800;
    line-height: 40px;
    text-align: right;
    margin: 20px 0 0 0;
  }
  .orderList_list_item_center_float h4 {
    font-size: 35px;
    color: #808080;
    font-weight: 800;
    text-align: right;
    line-height: 40px;
  }
  .orderList_list_item_center_float h5 {
    font-size: 35px;
    color: #808080;
    font-weight: 400;
    text-align: right;
  }
  .orderList_list_item_center_float h5 span {
    font-size: 25px;
  }
  .orderList_list_item_bottom {
    height: 103px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    line-height: 100px;
    font-size: 30px;
  }
  .orderList_list_item_bottom span {
    margin-right: 30px;
  }
  .orderList_list_item_bottom span i {
    font-weight: 800;
    font-size: 35px;
  }

  .buttonColumn {
    display: block;
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: right;
  }
  .buttonColumn button {
    margin: 10px 0 0 0;
    height: 80px;
    padding: 0 30px;
    font-size: 30px;
    margin-right: 30px;
    border-radius: 15px;
  }
  .buttonColumn .black {
    color: #808080;
    background-color: #fff;
    border: 1px solid #808080;
  }
  .buttonColumn .red {
    color: #f84056;
    background-color: #fff;
    border: 1px solid #f84056;
  }
  .no {
    width: 100%;
    text-align: center;
  }
  .no img {
    margin: 250px 0 0 0;
    width: 50%;
  }
  .no h5 {
    font-size: 80px;
    color: #ff2832;
    line-height: 100px;
    font-weight: 400;
  }
  .shadow {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 99;
    opacity: 0;
    transition: all .5s;
  }
  .shadow.active {
    top: 0;
    opacity: 1;
  }
  .orderList_fk, .orderList_GoodsReceipt  {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 530px;
    background-color: #fff;
    z-index: 100;
    transition: all .5s;
    transform: translateY(100%)
  }
  .orderList_fk.active,.orderList_GoodsReceipt.active {
    transform: translateY(0%)
  }
  .orderList_fk .header, .orderList_GoodsReceipt .header {
    position: relative;
    line-height: 100px;
    height: 100px;
    text-align: center;
    color: #808080;
    border-bottom: 1px solid #ccc;
    font-size: 40px;
    font-weight: 400;
  }
  .orderList_fk .header span, .orderList_GoodsReceipt .header span {
    position: absolute;
    top: 5px;
    right: 30px;
    font-size: 50px;
    line-height: 100px;
  }
  .orderList_fk .Price, .orderList_GoodsReceipt .Price {
    text-align: center;
    padding: 10px 30px;
    color: #464646;
    font-size: 50px;
    line-height: 100px;
    font-weight: 400;
  }
  .orderList_fk .input, .orderList_GoodsReceipt .input {
    height: 100px;
    padding: 0 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .orderList_fk .input input, .orderList_GoodsReceipt .input input {
    height: 100px;
    width: 100%;
    font-size: 50px;
    color: #808080;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .orderList_fk button, .orderList_GoodsReceipt button {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 150px;
    width: 100%;
    color: #fff;
    font-size: 50px;
    background-color: #ff2832;
    border: none;
  }
  .logistics {
    position: absolute;
    width: 70%;
    height: 300px;
    background-color: #fff;
    z-index: 100;
    top: 50%;
    left: 50%;
    margin-left: -35%;
    margin-top: -150px;
    border-radius: 15px;
    opacity: 0;
    display: none;
    transition: all .5s;
  }
  .logistics .header {
    position: relative;
    line-height: 100px;
    height: 100px;
    border-bottom: 1px solid #ccc;
    font-size: 40px;
    margin: 0 0 0 30px;
  }
  .logistics .header span {
    position: absolute;
    font-size: 50px;
    line-height: 100px;
    right: 30px;
    top: 5px;
  }
  .logistics .logistics_list {
    font-size: 40px;
    margin: 30px 0 0 30px;
  }
  .logistics.active {
    opacity: 1;
    display: block;
  }
  .evaluate,.SeeEvaluate {
    position: absolute;
    width: 70%;
    height: 330px;
    background-color: #fff;
    z-index: 100;
    top: 50%;
    left: 50%;
    margin-left: -35%;
    margin-top: -165px;
    border-radius: 15px;
    padding: 0 30px;
    opacity: 0;
    display: none;
    transition: all .5s;
  }
  .SeeEvaluate {
    height: auto;
    padding-bottom: 20px;
  }
  .evaluate .header, .SeeEvaluate .header {
    position: relative;
    line-height: 100px;
    height: 100px;
    border-bottom: 1px solid #ccc;
    font-size: 40px;
  }
  .evaluate .header span, .SeeEvaluate .header span {
    position: absolute;
    font-size: 50px;
    line-height: 100px;
    right: 0px;
    top: 5px;
  }
  .evaluate.active, .SeeEvaluate.active {
    opacity: 1;
    display: block;
  }
  .evaluate .evaluateInput, .SeeEvaluate .evaluateInput {
    width: 100%;
    height: 100px;
  }
  .SeeEvaluate .SeeEvaluate_center {
    width: 100%;
    height: 100%;
    font-size: 50px;
    color: #464646;
  }
  .evaluate .evaluateInput input {
    width: 100%;
    height: 100%;
    font-size: 50px;
    color: #464646;
  }
  .evaluate button {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: #ff2832;
    color: #fff;
    font-size: 50px;
    border: none;
    border-radius: 15px;
    padding: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
