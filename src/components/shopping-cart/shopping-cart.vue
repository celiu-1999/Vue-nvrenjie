<template>
  <div class="ShoppingCart" ref="wrapper">
    <!-- 主体，可滚动 -->
    <div class="ShoppingCart_center" ref="searchResult">
      <header>
        <router-link to="/" tag="span" class="iconfont icon-shangxiazuoyou-2"></router-link>
        购物车
      </header>
      <ul class="commodiy">
        <div class="commodiy_center" >
          <li class="commodiy_item clearfix" v-for="item in ShoppingCartItem">
            <span class="iconfont icon-roundcheck checkbox checkboxItem fl" :class="{'active': item[2]}" :index="item[0].id" @click="OneCheckboxActive(item[0].id, $event.currentTarget)"></span>
            <a href="#" class="fl"><img v-lazy="item[0].img" :index="item[0].id" alt=""></a>
            <div class="option fl" :index="item[0].id" >
              <h3 class="title">{{item[0].title}}</h3>
              <h4 class="modifyOption clearfix" @click="getOption(item[0].id, item[0].optionId)">{{item[3].option_title}}</h4>
              <h5 class="price"><span class="PresentPrice"><span>￥</span>{{item[0].price}}</span><span class="OriginalPrice"><s><span>￥</span>{{item[0].OriginalPrice}}</s></span></h5>
              <span class="number"><span class="iconfont icon-jiajian-1" ref="zj" @click="increaseNum(item[0].id , $event.currentTarget, true)" :index="item[0].id" ></span><input type="Number" :value="item[1]"><span class="iconfont icon-jiajian-" ref="js" @click="increaseNum(item[0].id , $event.currentTarget, false)" :index="item[0].id" ></span></span>
              <span class="iconfont icon-lajitong sc" @click="DeleteShoppingCart(item[0].id)" :index="item[0].id" ></span>
              <span style="display: none" class="allPrice">{{PriceArray = (item[0].price * item[1])}}</span>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <!-- 阴影 -->
    <div class="shadow" @click="HideActiveShadow()"></div>
    <!-- 选项 -->
    <span class="dropDownCenter">
      <div class="option_content">
        <div class="header ">
          <div class="header_content clearfix">
            <div class="header_img fl">
              <img :src="img" class="headerImgChange" alt="">
            </div>
            <div class="header_price fl">
              <h3>¥89-99</h3>
              <h4>库存1862件</h4>
              <h5>请选择: 颜色分类</h5>
            </div>
            </div>
        </div>
        <div class="xx">
          <div class="option_item">
            <div class="center">
              <div class="option_title">
                {{option.title}}
              </div>
              <ul class="option_xx clearfix" >
                <li v-for="item in option.option_item" @click="setShoppingCartOption(item.id, $event.currentTarget)" :img="item.img" class="fl" :index="item.id">{{item.option_title}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="dropDownCenterNumber">
          <div class="center clearfix">
            <span class="num_title fl">购买数量</span>
            <span class="num_input fr"><i @click="increase()" class="iconfont icon-jiajian-1"></i><input type="text" :value="InputNum"><i class="iconfont icon-jiajian-" @click="reduce()"></i></span>
          </div>
        </div>
        <div class="ok">
          <button @click="SetOptionItem()">确定</button>
        </div>
      </div>
    </span>
    <!-- 没有商品显示 -->
    <div class="no" v-show="!ShoppingCartItem.length">
      <img src="static/imgs/404.png" alt="">
      <h5>真的没有啦</h5>
    </div>
    <!-- 结算栏显示 -->
    <div class="settlement clearfix">
      <span class="iconfont icon-roundcheck checkbox fl" :class="{'active': select}" @click="Select($event.currentTarget)"></span>
      <span class="select fl">全选</span>
      <button class="settlement_btn fr" @click="Settlement()">结算</button>
      <span class="AllPrices fr"><span>￥</span>{{ShoppingCartAllPrice}}</span>
      <span class="total fr">合计</span>
    </div>
    <!-- 提醒 -->
    <tx ref="tx"></tx>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations, mapGetters} from 'vuex'
import BScroll from 'better-scroll'
import Tx from '@/base/tx/tx'

export default {
  data () {
    return {
      ShoppingCartItem: [],
      option: {},
      img: '',
      commodityId: 0,
      optionItemId: 0,
      optionId: 0,
      InputNum: 0,
      selected: false,
      optionItemImg: '',
      select: false,
      selectArray: [],
      PriceArray: [],
      ShoppingCartAllPrice: 0
    }
  },
  watch: {
    signIn () {
      if (this.signIn) {
        this.getShoppingCart()
        this.GetSelect()
        this.GetAllPrice()
      } else {
        this.ShoppingCartItem = []
      }
    }
  },
  components: {
    Tx
  },
  mounted () {
    setTimeout(() => {
      this.initSlider()
    }, 20)
  },
  computed: {
    ...mapGetters([
      'signIn'
    ])
  },
  created () {
    this.getShoppingCart()
    this.GetSelect()
    this.GetAllPrice()
  },
  methods: {
    initSlider () {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true
      })
    },
    OneCheckboxActive (id, e) {
      this.commodityId = id
      if (e.classList.contains('active')) {
        e.classList.remove('active')
      } else {
        e.classList.add('active')
      }
      var Selected = e.classList.contains('active')
      axios.post('/users/OptionIdSelected', {
        commodityId: this.commodityId,
        selected: Selected
      })
      .then((res) => {
        this.GetSelect()
        this.GetAllPrice()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getShoppingCart () {
      axios.post('/users/cartList')
      .then((res) => {
        this.ShoppingCartItem = res.data.result
        this.img = res.data.result[0][0].img
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 获取是否为全选
    GetSelect () {
      axios.post('/users/GetSelect')
      .then((res) => {
        this.select = res.data.result.SelectAll
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
    // 设置全选
    Select (e) {
      if (e.classList.contains('active')) {
        e.classList.remove('active')
      } else {
        e.classList.add('active')
      }
      var Selected = e.classList.contains('active')
      var dom = document.getElementsByClassName('checkboxItem')
      if (Selected) {
        for (var i = 0; i < dom.length; i++) {
          dom[i].classList.add('active')
        }
      } else {
        for (var j = 0; j < dom.length; j++) {
          dom[j].classList.remove('active')
        }
      }
      axios.post('users/ShoppingCartSelect', {
        selected: Selected
      })
      .then((res) => {
        this.GetAllPrice()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 修改购物车选项
    getOption (id, optionId) {
      axios.get('/users/ShoppingCartOption', {
        params: {
          id: id
        }
      })
      .then((res) => {
        if (res.data.result[0].id === optionId) {
          document.getElementsByClassName('headerImgChange')[0].src = res.data.commodityNumber.commodityOptionItemImg
        }
        this.commodityId = id  // 设置商品Id
        this.optionId = optionId // 设置商品选项ID
        var _this = this
        var optionItemId = res.data.commodityNumber.commodityOptionItemId  // 获取商品的选项ID
        this.option = res.data.result[0]
        this.InputNum = res.data.commodityNumber.commodityNumber
        this.ShowActiveShadow()
        var children = 0
        for (var i = 0; i < res.data.result[0].option_item.length; i++) {
          if (res.data.result[0].option_item[i].id === optionItemId) {
            children = i
            break
          }
        }
        setTimeout(function () {
          _this.setShoppingCartOption(optionItemId, document.getElementsByClassName('option_xx')[0].children[children])
        }, 20)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    ShowActiveShadow () {
      var shadow = document.getElementsByClassName('shadow')[0]
      var option = document.getElementsByClassName('dropDownCenter')[0]
      shadow.classList.add('active')
      option.classList.add('active')
    },
    HideActiveShadow () {
      var shadow = document.getElementsByClassName('shadow')[0]
      var option = document.getElementsByClassName('dropDownCenter')[0]
      shadow.classList.remove('active')
      option.classList.remove('active')
    },
    setShoppingCartOption (id, e) {
      for (var i = 0; i < this.option.option_item.length; i++) {
        if (this.option.option_item[i].id === id) {
          document.getElementsByClassName('headerImgChange')[0].src = this.option.option_item[i].img
          this.optionItemImg = this.option.option_item[i].img
          break
        }
      }
      var dom = document.getElementsByClassName('option_xx')[0].children
      for (var j = 0; j < dom.length; j++) {
        dom[j].classList.remove('active')
      }
      e.classList.add('active')
      this.optionItemId = id
    },
    SetOptionItem () {
      axios.get('/users/SetOptionItem', {
        params: {
          commodityId: this.commodityId,
          optionId: this.optionId,
          optionItemId: this.optionItemId,
          selected: this.selected,
          InputNum: this.InputNum
        }
      })
      .then((res) => {
        this.HideActiveShadow()
        this.$refs.tx.tx('修改成功')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    increase () {
      this.InputNum++
    },
    reduce () {
      if (this.InputNum <= 1) {
        return
      }
      this.InputNum--
    },
    increaseNum (id, e, Blen) {
      var num = e.parentNode.childNodes[1].value
      if (!Blen && num <= 1) {
        return
      }
      if (Blen) {
        num++
      } else {
        num--
      }
      e.parentNode.childNodes[1].value = num
      this.commodityId = id
      axios.get('/users/SetShoppingCartNum', {
        params: {
          commodityId: this.commodityId,
          Num: num
        }
      })
      .then((res) => {
        this.GetAllPrice()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    DeleteShoppingCart (id) {
      axios.post('/users/cartDel', {
        commodityId: id
      })
      .then((res) => {
        this.$refs.tx.tx('删除成功')
        this.getShoppingCart()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    Settlement () {
      axios.post('/users/TheShoppingCartWasSelected')
      .then((res) => {
        if (res.data.result.length <= 0) {
          return
        }
        this.set_shoppingCartPurchase(res.data.result)
        this.$router.push('/purchase')
        this.set_orderOption(true)
        this.set_purchase(null)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    ...mapMutations({
      set_orderOption: 'SET_ORDER_OPTION',
      set_shoppingCartPurchase: 'SET_SHOPPING_CART_PURCHASE',
      set_purchase: 'SET_PURCHASE'
    })
  }
}
</script>

<style scoped>
  .no {
    width: 100%;
    text-align: center;
  }
  .no img {
    margin: 0px 0 0 0;
    width: 50%;
  }
  .no h5 {
    font-size: 80px;
    color: #ff2832;
    line-height: 100px;
    font-weight: 400;
  }
  .ShoppingCart {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    margin-bottom: 150px;
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
    top: 0;
    left: 0;
    line-height: 120px;
    color: #888;
    font-size: 50px;    
  }
  .commodiy {
    margin: 0px 0 400px 0;
  }
  .commodiy_item {
    display: flex;
    padding: 20px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .commodiy_item:last-child {
    margin: 0 0 200px 0;
  }
  .commodiy_item .checkbox {
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    font-size: 80px;
    margin: 90px 0 ;
    color: #000;
    line-height: 120px;
  }
  .commodiy_item .checkbox.icon-roundcheck {
    color: #d8d8d8;
  }
  .commodiy_item .checkbox.active {
    color: #ff2832;
  }
  .commodiy_item .checkbox.icon-roundcheckfill {
    color: #ff2832;
  }
  .commodiy_item a {
    display: inline-block;
    width: 300px;
    height: 300px;
    margin: 0 30px 0 0;
  }
  .commodiy_item a img {
    width: 100%;
    height: 100%;
  }
  .commodiy_item .option {
    flex: 1;
    position: relative;
    display: inline-block;
  }
  .commodiy_item .option .title {
    font-size: 45px;
    line-height: 45px;
    color: #444;
    height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin: 10px 0 0 0 ;
  }
  .commodiy_item .option .modifyOption {
    font-size: 40px;
    font-weight: 400;
    line-height: 50px;
    color: #808080;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin: 10px 0 0 0;
    padding: 0 20px 0 0;
  }
  .commodiy_item .option .price {
    font-size: 40px;
    font-weight: 400;
    margin: 0px 0 0 0;
  }
  .commodiy_item .option .price .PresentPrice {
    color: #ff2832;
  }
  .commodiy_item .option .price .OriginalPrice {
    color: #b8b8b8;
    margin: 0 0 0 10px;
  }
  .commodiy_item .option .number {
    display: flex;
    width: 400px;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin: 20px 0 0 0;
  }
  .commodiy_item .option .number input{
    flex: 1;
    width: 200px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    font-size: 50px;
    color: #444;
    text-align: center;
  }
  .commodiy_item .option .number span{
    flex: 1;
    font-size: 70px;
    line-height: 100px;
    text-align: center;
    width: 100px;
    color: #444;
  }
  .commodiy_item .option .sc {
    position: absolute;
    font-size: 70px;
    color: #444;
    right: 50px;
    bottom: 10px;
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
  .dropDownCenter {
    position: fixed;
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
    transition: all .5s;
    transform: translateY(120%)
  }
  .dropDownCenter.active {
    transform: translateY(0%)
  }
  
  .settlement {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
  }
  .settlement .checkbox {
    display: inline-block;
    margin: 0;
    height: 150px;
    width: 150px;
    text-align: center;
    font-size: 80px;
    color: #000;
    line-height: 160px;
  }
  .settlement .checkbox.icon-roundcheck {
    color: #d8d8d8;
  }
  .settlement .checkbox.active {
    color: #ff2832;
  }
  .settlement .select {
    display: inline-block;
    height: 150px;
    font-size: 50px;
    color: #b8b8b8;
    line-height: 150px;
  }
  .settlement .total {
    font-size: 50px;
    color: #808080;
    line-height: 150px;
    margin: 0 20px 0 0;
  }
  .settlement .AllPrices {
    font-size: 45px;
    color: #ff2832;
    line-height: 150px;
    margin: 0 20px 0 0;
  }
  .settlement .settlement_btn {
    height: 150px;
    border: none;
    color: #fff;
    font-size: 50px;
    width: 300px;
    background-color: #ff2832;
  }
  .option_content {
    margin: 0 0 150px 0;
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
  .option_content .dropDownCenterNumber {
    padding: 30px;
    position: relative;
  }
  .dropDownCenterNumber .center {
    color: #666;
    font-size: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
  }
  .dropDownCenterNumber .center .num_title {
    line-height: 100px;
  }

  .dropDownCenterNumber .center .num_input {
    display: flex;
    width: 300px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 0 10px 0 0;
  }
  .dropDownCenterNumber .center .num_input i {
    flex: 1;
    font-size: 70px;
    line-height: 100px;
    text-align: center;
  }
  .dropDownCenterNumber .center .num_input input {
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
  .select.active {
    background-color: #ff2832; 
  }
</style>
