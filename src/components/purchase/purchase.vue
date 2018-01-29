<template>
  <div class="purchase" ref="wrapper">
    <div class="purchase_center">
      <!-- 收货地址 -->
      <div class="header Address">
        <span class="iconfont icon-location dw"></span>
        <div class="headerCenter clearfix" :index="DefaultAddress.addressId">
          <h1 class="name fl" :index="DefaultAddress.addressId">收货人：<span>{{DefaultAddress.userName}}</span></h1>
          <h2 class="tel fr" :index="DefaultAddress.addressId">{{DefaultAddress.tel}}</h2>
          <h3 class="CollectAddress fl" :index="DefaultAddress.addressId">收货地址：<span>{{DefaultAddress.streetName}}</span></h3>
        </div>
        <span class="iconfont icon-shangxiazuoyou-3 xyb" :index="DefaultAddress.addressId"></span>
      </div>
      <!-- 商品 -->
      <div class="commodity">
        <li class="commodity_item" v-for="item in OrderCommodity">
          <img :src="item.img" alt="">
          <div class="commodity_item_center">
            <h1>{{item.title}}</h1>
            <h2>{{item.optionItemTitle}}</h2>
            <div class="parameter">
              <span class="price">￥<i>{{item.price}}</i></span>
              <span class="OriginalPrice"><s>￥<i>{{item.OriginalPrice}}</i></s></span>
              <span class="num">X<i>{{item.commodityNumber || num}}</i></span>
              <span style="display: none" class="commodityAllPrice">{{allPriceItem=item.price*num}}</span>
            </div>
          </div>
        </li>
      </div>
      <!-- 选项 -->
      <ul class="option_list">
        <li class="option_list_li Number">
          <div class="center clearfix">
            <span class="title fl">购买数量</span>
            <span class="number fr OneNum" v-if="num"><span class="iconfont icon-jiajian-1 tj" ref="zj" @click="ChangeNumber(true)"></span><input type="Number" :value="num"><span class="iconfont icon-jiajian- js" ref="js" @click="ChangeNumber(false)"></span></span>
            <span class="number fr MultipleNum" v-if="commodityNum">{{commodityNum}}</span>
          </div>
        </li>
        <li class="option_list_li Express">
          <div class="center clearfix">
            <span class="title fl">运费</span>
            <span class="number fr">{{express}}</span>
          </div>
        </li>
        <li class="option_list_li Leaving">
          <div class="center">
            <span class="title" @click="getShoppingCartPurchase()">给卖家留言：</span>
            <span class="number"><input type="text" class="LeavingAMessageInput" placeholder="选填:填写内容已和卖家协商确认"></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="Submit clearfix">
      <button class="SubmitBtn fr" @click="SubmitPurchase()">提交订单</button>
      <span class="allPrice fr">总金额<i>￥{{allPrice}}</i></span>
      <span class="allNumber fr" v-if="num">共<i>{{num}}</i>件</span>
      <span class="allNumber fr" v-if="commodityNum">共<i>{{commodityNum}}</i>件</span>
    </div>
    <!-- 阴影 -->
    <div class="shadow" @click="HideActiveShadow()"></div>
    <!-- 付款 -->
    <div class="orderList_fk">
      <div class="Mheader">确定付款 <span class="iconfont icon-guanbi" @click="HideActiveShadow()"></span></div>
      <div class="Price">
        ￥{{allPrice}}
      </div>
      <div class="input">
        <input type="password" placeholder="请输入支付密码">
      </div>
      <div class="btn">
        <button class="Determine" @click="AlreadyPaid()">确定付款</button>
        <button class="cancel" @click="NoPayment()">暂不付款</button>
      </div>
    </div>
    <!-- 提醒 -->
    <tx ref="tx"></tx>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import BScroll from 'better-scroll'
import Tx from '@/base/tx/tx'

export default {
  data () {
    return {
      DefaultAddress: {},
      OrderCommodity: [],
      num: 0,
      allPriceItem: 0,
      express: 0,
      remarks: '',
      allNum: 0,
      addressId: 0,
      commodityNum: 0,
      ShoppingCartAllPrice: 0,
      Payment: ''
    }
  },
  components: {
    Tx
  },
  watch: {
    purchase () {
      if (!this.OrderOptions) {
        this.GetDefaultAddress()
        this.getCommodityPurchase()
        this.commodityNum = 0
      }
    },
    ShoppingCartPurchase () {
      if (this.OrderOptions) {
        this.getShoppingCartPurchase()
        this.num = 0
      } else if (!(JSON.stringify(this.purchase) === '{}')) {
        this.getCommodityPurchase()
      }
    },
    OrderOptions () {
      if (this.OrderOptions) {
        this.getShoppingCartPurchase()
        this.num = 0
      } else {
        this.getCommodityPurchase()
        this.commodityNum = 0
      }
    },
    signIn () {
      if (!this.signIn) {
        this.$router.push('/')
      } else {
        if (JSON.stringify(this.purchase) !== '{}' && !this.OrderOptions) {
          this.GetDefaultAddress()
          this.getCommodityPurchase()
          this.commodityNum = 0
        } else if (this.ShoppingCartPurchase.length !== 0 && this.OrderOptions) {
          this.getShoppingCartPurchase()
          this.num = 0
        } else {
          this.$router.push('/')
        }
      }
    }
  },
  created () {
    this.GetDefaultAddress()
    if (this.OrderOptions && this.ShoppingCartPurchase.length) {
      this.getShoppingCartPurchase()
      this.num = 0
    } else if (!(JSON.stringify(this.purchase) === '{}')) {
      this.getCommodityPurchase()
      this.commodityNum = 0
    } else {
    }
    if (this.signIn) {
      if (JSON.stringify(this.purchase) !== '{}' && !this.OrderOptions) {
        this.GetDefaultAddress()
        this.getCommodityPurchase()
        this.commodityNum = 0
      } else if (this.ShoppingCartPurchase.length !== 0 && this.OrderOptions) {
        this.getShoppingCartPurchase()
        this.num = 0
      } else {
        this.$router.push('/')
      }
    } else {
      this.$router.push('/')
    }
  },
  computed: {
    allPrice () {
      if (this.OrderOptions) {
        return this.ShoppingCartAllPrice
      }
      return this.allPriceItem + this.express
    },
    ...mapGetters([
      'purchase',
      'OrderOptions',
      'ShoppingCartPurchase',
      'signIn'
    ])
  },
  mounted () {
    setTimeout(() => {
      this.initSlider()
    }, 20)
  },
  methods: {
    initSlider () {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollY: true
        // ,click: true
      })
    },
    // 返回默认收货地址
    GetDefaultAddress () {
      axios.post('/users/GetDefaultAddress', this.purchase)
      .then((res) => {
        this.DefaultAddress = res.data.result
        this.addressId = this.DefaultAddress.addressId
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 根据购物车选中商品返回要下单的商品信息
    getShoppingCartPurchase () {
      axios.post('/users/getShoppingCartPurchase', {
        ShoppingCartPurchase: this.ShoppingCartPurchase
      })
      .then((res) => {
        this.OrderCommodity = res.data.result
        this.commodityNum = res.data.result.length
        this.freight()
        this.GetAllPrice()
        this.Payment = 'gwc'
        this.num = 0
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 根据商品ID返回要下订单的商品信息
    getCommodityPurchase () {
      axios.post('/users/OrderCommodity', this.purchase)
      .then((res) => {
        this.OrderCommodity = res.data.result
        this.num = this.purchase.CommodityNum
        this.freight()
        this.Payment = 'sp'
        this.allNum = res.data.result.length
        this.commodityNum = 0
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 获取价格
    GetAllPrice () {
      axios.post('/users/ShoppingCartAllPrice')
      .then((res) => {
        this.ShoppingCartAllPrice = res.data.result
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 提交订单
    SubmitPurchase () {
      this.ShowActiveShadow()
    },
    // 商品付款
    CommodityPayment () {
      var commodity = []
      commodity.push(this.purchase)
      var val = document.getElementsByClassName('LeavingAMessageInput')[0].value
      axios.post('/users/AlreadyPaid', {
        addressId: this.addressId,
        allNum: this.allNum,
        commodity: commodity,
        LeavingAMessage: val
      })
      .then((res) => {
        this.HideActiveShadow()
        if (res.data.result === '付款成功') {
          this.$refs.tx.tx(res.data.result)
          setTimeout(() => {
            this.$router.push('/orderList')
          }, 1000)
        }
      })
    },
    // 购物车付款
    ShoppingCartPayment () {
      var val = document.getElementsByClassName('LeavingAMessageInput')[0].value
      axios.post('/users/AlreadyPaid', {
        addressId: this.addressId,
        allNum: this.commodityNum,
        commodity: this.ShoppingCartPurchase,
        LeavingAMessage: val
      })
      .then((res) => {
        this.HideActiveShadow()
        if (res.data.result === '付款成功') {
          this.$refs.tx.tx(res.data.result)
          setTimeout(() => {
            this.$router.push('/orderList')
          }, 1000)
        }
      })
    },
    // 提交到已付款订单列表
    AlreadyPaid () {
      if (this.Payment === 'sp') {
        this.CommodityPayment()
      } else if (this.Payment === 'gwc') {
        this.ShoppingCartPayment()
      }
    },
    // 商品未付款
    CommodityNoPayment () {
      var commodity = []
      commodity.push(this.purchase)
      var val = document.getElementsByClassName('LeavingAMessageInput')[0].value
      axios.post('/users/NoPayment', {
        addressId: this.addressId,
        allNum: this.allNum,
        commodity: commodity,
        LeavingAMessage: val
      })
      .then((res) => {
        this.HideActiveShadow()
        if (res.data.result === '加入订单成功') {
          this.$refs.tx.tx(res.data.result)
          setTimeout(() => {
            this.$router.push('/orderList')
          }, 1000)
        }
      })
    },
    ShoppingCartNoPayment () {
      var val = document.getElementsByClassName('LeavingAMessageInput')[0].value
      axios.post('/users/NoPayment', {
        addressId: this.addressId,
        allNum: this.commodityNum,
        commodity: this.ShoppingCartPurchase,
        LeavingAMessage: val
      })
      .then((res) => {
        this.HideActiveShadow()
        if (res.data.result === '加入订单成功') {
          this.$refs.tx.tx(res.data.result)
          setTimeout(() => {
            this.$router.push('/orderList')
          }, 1000)
        }
      })
    },
    // 提交到未付款订单列表
    NoPayment () {
      if (this.Payment === 'sp') {
        this.CommodityNoPayment()
      } else if (this.Payment === 'gwc') {
        this.ShoppingCartNoPayment()
      }
    },
    // 循环计算运费总金额
    freight () {
      var expressNum = []
      for (var i = 0; i < this.OrderCommodity.length; i++) {
        expressNum.push(this.OrderCommodity[i].express)
        expressNum = expressNum.sort()
      }
      this.express = expressNum[0]
    },
    // 循环计算商品价格
    CommodityPrice () {
      for (var i = 0; i < this.OrderCommodity.length; i++) {
        this.price += this.OrderCommodity[i].price
      }
    },
    ChangeNumber (Blan) {
      if (!Blan && this.num <= 1) {
        return
      }
      if (Blan) {
        this.num++
        this.PurchasePlus()
      } else {
        this.num--
        this.PurchaseReduce()
      }
    },
    shadowShow () {
      var shadow = document.getElementsByClassName('shadow')[0]
      shadow.classList.add('active')
    },
    shadowHide () {
      var shadow = document.getElementsByClassName('shadow')[0]
      shadow.classList.remove('active')
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
    },
    ...mapActions([
      'PurchasePlus',
      'PurchaseReduce'
    ])
  }
}
</script>

<style scoped>
  .purchase {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
  .header {
    /* height: 300px; */
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .header .dw {
    display: inline-block;
    width: 120px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-size: 70px;
    margin: 40px 0;
    color: #444;
    line-height: 100px;
  }
  .header .xyb {
    display: inline-block;
    width: 120px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-size: 70px;
    margin: 40px 0;
    color: #444;
    line-height: 100px;
  }
  .headerCenter {
    flex: 1;
    padding: 40px 0 0 0;
  }
  .headerCenter h1 {
    display: inline-block;
    font-size: 37px;
    width: 60%;
    color: #444;
    line-height: 40px;
  }
  .headerCenter h2 {
    display: inline-block;
    font-size: 37px;
    width: 40%;
    color: #444;
    text-align: right;
    line-height: 40px;
  }  
  .headerCenter h3 {
    display: block;
    font-size: 37px;
    color: #444;
    line-height: 40px;
    margin: 20px 0 20px 0;
  }
  .commodity {
    margin: 30px 0 0 0;
    /* border-top: 1px solid #ccc; */
    /* border-bottom: 1px solid #ccc; */
    background: #f5f5f5;
  }
  .commodity .commodity_item {
    padding: 25px;
    display: flex;
  } 
  .commodity .commodity_item img {
    width: 280px;
    height: 280px;
    border: 1px solid #fff;
  }
  .commodity .commodity_item_center {
    flex: 1;
    padding: 0 25px;
  }
  .commodity_item_center h1 {
    font-size: 40px;
    font-weight: 400;
    line-height: 50px;
    color: #444;
    height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 10px 0 0 0;
  }
  .commodity_item_center h2 {
    font-size: 40px;
    font-weight: 400;
    line-height: 50px;
    color: #808080;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin: 10px 0 0 0;
  }
  .commodity .commodity_item_center .parameter {
  }
  .commodity .commodity_item_center .parameter .price {
    display: inline-block;
    font-size: 40px;
    width: auto;
    color: #ff2832;
  }
  .commodity .commodity_item_center .parameter .OriginalPrice {
    display: inline-block;
    font-size: 35px;
    width: auto;
    color: #808080;
    margin-left: 20px;
  }
  .commodity .commodity_item_center .parameter .num {
    font-size: 30px;
    display: block;
    margin: 0 0 0 10px;
  }
  .commodity .commodity_item_center .parameter .num i {
    font-size: 35px;
    margin: 0 0 0 10px;
  }


  .option_list .option_list_li {
    height: 140px;
    padding: 0 30px;
  }
  .option_list .option_list_li .center {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #ccc;
  }
  .option_list .option_list_li .title {
    font-size: 40px;
    color: #808080;
    line-height: 140px;
  }
  .option_list .Number .number {
    display: flex;
    width: 330px;
    margin: 25px 0 0 0;
  }
  .option_list .Number .number input{
    flex: 1;
    width: 150px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    font-size: 50px;
    color: #444;
    text-align: center;
  }
  .option_list .Number .number span{
    flex: 1;
    font-size: 70px;
    line-height: 90px;
    text-align: center;
    width: 90px;
    color: #444;
  }
  .option_list .Number .number span.tj{
    background-color: #808080;
  }
  .option_list .Number .number span.js{
    background-color: #eee;
    color: #808080;
  } 
  .option_list .Express .number{
    font-size: 45px;
    line-height: 140px;
    color: #808080;
    margin: 0px 10px 0 0;
  }
  .option_list .Number .MultipleNum {
    font-size: 45px;
    color: #444;
    line-height: 100px;
    width: auto;
  }
  .Leaving .center {
    display: flex;
  }
  .option_list .Leaving .number{
    color: #808080;
    flex: 1;
  }
  .option_list .Leaving .number input {
    width: 100%;
    height: 140px;
    font-size: 40px;
    color: #444;
  }

  .Submit {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 140px;
    line-height: 140px;
    background-color: #fff;
    border-top: 1px solid #ccc;
  }
  .Submit span {
    font-size: 40px;
    color: #808080;
    margin-right: 20px;
  }
  .Submit span i {
    color: #ff2832;
  }
  .Submit button {
    color: #fff;
    background-color: #ff2832;
    font-size: 45px;
    width: 300px;
    height: 100%;
    border: none;
  }
  .orderList_fk {
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
  .orderList_fk.active {
    transform: translateY(0%)
  }
  .orderList_fk .Mheader {
    position: relative;
    line-height: 100px;
    height: 100px;
    text-align: center;
    color: #808080;
    border-bottom: 1px solid #ccc;
    font-size: 40px;
    font-weight: 400;
  }
  .orderList_fk .Mheader span {
    position: absolute;
    top: 5px;
    right: 30px;
    font-size: 50px;
    line-height: 100px;
  }
  .orderList_fk .Price {
    text-align: center;
    padding: 10px 30px;
    color: #464646;
    font-size: 50px;
    line-height: 100px;
    font-weight: 400;
  }
  .orderList_fk .input {
    height: 100px;
    padding: 0 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .orderList_fk .input input {
    height: 100px;
    width: 100%;
    font-size: 50px;
    color: #808080;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .orderList_fk .btn {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 150px;
    font-size: 50px;
    color: #fff;
    border: none;
  }
  .orderList_fk button {
    width: 100%;
    font-size: 50px;
    color: #fff;
    border: none;
  }
  .orderList_fk .btn .cancel {

  }
  .orderList_fk .btn .Determine {
    background-color: #ff2832;
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
</style>
