<template>
  <div class="searchResult" ref="wrapper">
    <div class="searchResult_center" ref="searchResult">
      <div class="searchResult_nav clearfix">
        <span class="searchResult_nav_left fl">
          <router-link tag="span" class="iconfont icon-fanhui" to="/"></router-link>
        </span>
        <span class="searchResult_nav_right fl">
          <span class="iconfont icon-sousuo"></span>
          <input type="search" placeholder="搜索商品" class="search" ref="search" :value="serach" @keyup.enter="onSearchResult($event.currentTarget)">
        </span>
        <span class="searchResult_nav_screen" @click="screenShow">
          筛选
        </span>
      </div>
      <div class="searchResult_screening_nav" ref="screening_nav">
        <li class="searchResult_screening_nav_li active moren" @click="Onsold($event.currentTarget)">默认</li>
        <li class="searchResult_screening_nav_li" @click="Onsold($event.currentTarget)">销量</li>
        <li class="searchResult_screening_nav_li" @click="Onprice($event.currentTarget)">价格</li>
        <li class="searchResult_screening_nav_li" @click="Onpraise($event.currentTarget)">好评</li>
        <li class="searchResult_screening_nav_li" @click="Onsold($event.currentTarget)">综合</li>
      </div>
      <div class="searchResult_list searchResult_listX">
        <li v-for="item in list">
          <span class="searchResult_list_item" @click="JumpCommodity(item.item_id)">
            <div class="searchResult_list_item_left">
              <img v-lazy="item.img" alt="">
            </div>
            <div class="searchResult_list_item_right">
              <h3 class="title">{{item.title}}</h3>
              <h4><span class="price">￥{{item.price}}</span><span class="original"><s>{{item.originalPrice}}</s></span><span class="discount">{{item.priceWap}}折</span></h4>
              <h5><span class="praise">{{item.praise}}%</span>好评(<span class="people">{{item.sold}}</span>人)</h5>
            </div>
          </span>
        </li>
      </div>
      <div class="searchResult_no" ref="sx" v-show="!list.length && listYes">
        <img :src="require('static/svg-loaders/loaders.svg')" alt="">
      </div>
      <div class="searchResult_no" v-show="listNo">
        <img :src="require('static/imgs/404.png')" alt="">
        很抱歉！没有找到相关商品
      </div>
      <div class="searchResult_Obtain" v-show="loader">
        <img :src="require('static/svg-loaders/loaders.svg')" alt="">
      </div>
    </div>
    <div class="searchResult_shadow" :class="{'active': shadow}" @click="shadow=false;screen=false">
    </div>
    <div class="searchResult_screen" :class="{'active': screen}">
      <h3 class="clearfix"><span class="iconfont icon-guanbi1 gb fl" @click="shadow=false;screen=false"></span><span class="title">筛选</span></h3>
      <span class="jg">价格区间(元)： <input type="number" placeholder="最低价" ref="low"> - <input type="number" placeholder="最高价" ref="hign"></span>
      <div class="no">
        <img :src="require('static/imgs/no.png')" alt="">
        真的没有了
      </div>
      <div class="btn">
        <button @click="Reset">重置</button><button @click="OkScreen">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  data () {
    return {
      pageSize: 20,
      priceLevel: 'all',
      priceGt: 0,
      priceLte: 0,
      price: '',
      praise: 1,
      sold: '',
      list: [],
      listNo: false,
      listYes: true,
      screen: false,
      shadow: false,
      loader: false
    }
  },
  computed: {
    ...mapGetters([
      'serach'
    ])
  },
  created () {
    if (this.serach === '') {
      this.$router.push('/')
    }
    this.getSearchResult(true, false)
  },
  mounted () {
    setTimeout(() => {
      this.initSlider()
    }, 20)
    document.getElementsByClassName('search')[0].value = this.serach
  },
  watch: {
    serach () {
      this.list = []
      this.getSearchResult(true, false)
      document.getElementsByClassName('search')[0].value = this.serach
      this.classAcrive(document.getElementsByClassName('moren')[0])
    }
  },
  methods: {
    initSlider () {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        // 滚动到底部
        if (this.slider.y <= (this.slider.maxScrollY + 50)) {
          this.loader = true
          if (this.list.length === 0) {
            this.loader = false
            return
          }
          var page = this.page + 1
          this.setPage(page)
          this.getSearchResult(false, true)
        }
      })
    },
    JumpCommodity (id) {
      // 只有商品ID，没有商品，毕竟商品从天猫往下扣很麻烦的
      // this.set_commodityId(id)
      var random = (Math.random()) * 10
      if (random <= 3) {
        this.set_commodityId(201712150001)
      } else if (random > 3 && random <= 6) {
        this.set_commodityId(201712150002)
      } else {
        this.set_commodityId(201712150003)
      }
      this.$router.push('/commodity')
    },
    getSearchResult (One, N) {
      axios.get('/search', {
        params: {
          page: this.page,
          pageSize: this.pageSize,
          priceLevel: this.priceLevel,
          priceGt: this.priceGt,
          priceLte: this.priceLte,
          price: this.price,
          name: this.serach,
          praise: this.praise,
          sold: this.sold
        }
      })
      .then((res) => {
        this.loader = false
        if (One) {
          if (res.data.result.list.length === 0) {
            this.listYes = false
            this.listNo = true
            this.setPage(1)
          }
        }
        if (N) {
          if (res.data.result.list.length === 0) {
            this.listYes = false
            this.listNo = false
            return
          }
        }
        // this.listYes = false
        // this.listNo = false
        this.list = this.list.concat(res.data.result.list)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    onSearchResult (e) {
      this.setSerach(e.value)
      this.setPage(1)
      this.list = []
      this.getSearchResult(true, false)
    },
    classAcrive (e) {
      var dom = this.$refs.screening_nav.children
      for (var i = 0; i < dom.length; i++) {
        dom[i].classList.remove('active')
      }
      e.classList.add('active')
    },
    Onsold (e) {
      this.price = ''
      this.praise = ''
      this.sold = -1
      this.list = []
      this.classAcrive(e)
      this.setPage(1)
      this.getSearchResult(true, false)
    },
    Onprice (e) {
      this.sold = ''
      this.praise = ''
      this.price = -1
      this.list = []
      this.classAcrive(e)
      this.setPage(1)
      this.getSearchResult(true, false)
    },
    Onpraise (e) {
      this.price = ''
      this.sold = ''
      this.praise = -1
      this.list = []
      this.classAcrive(e)
      this.setPage(1)
      this.getSearchResult(true, false)
    },
    screenShow () {
      this.screen = true
      this.shadow = true
    },
    OkScreen () {
      this.priceLevel = 'no'
      this.priceGt = this.$refs.low.value || 0
      this.priceLte = this.$refs.hign.value || 0
      this.list = []
      this.screen = false
      this.shadow = false
      this.setPage(1)
      this.getSearchResult(true, false)
    },
    Reset () {
      this.$refs.low.value = ''
      this.$refs.hign.value = ''
      this.priceLevel = 'all'
      this.priceGt = 0
      this.priceLte = 0
    },
    ...mapMutations({
      setSerach: 'SET_SERACH',
      setPage: 'SET_PAGE',
      set_commodityId: 'SET_COMMODITYID'
    })
  }
}
</script>

<style scoped>
  .searchResult {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
  }
  .searchResult_nav {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 145px;
    background-color: #f84056;
    color: #feecee;
  }
  .searchResult_nav_left {
    width: 142px;
    height: 145px;
  }
  .searchResult_nav_left span{
    width: 100%;
    display: inline-block;
    font-size: 50px;
    color: #fff4f5;
    line-height: 140px;
    text-align: center;
  }
  .searchResult_nav_right {
    display: inline-block;
    flex: 1;
    width: 893px;
    height: 67px;
    background-color: #c8051c;
    margin: 39px 0 0 0;
    display: flex;
  }
  .searchResult_nav_right span {
    display: inline-block;
    height: 67px;
    color: #fff;
    width: 70px;
    text-align: center;
    line-height: 60px;
    font-size: 43px;
  }
  .searchResult_nav_right input {
    color: #fff;
    line-height: 67px;
    height: 67px;
    font-size: 32px;
    width: 80%;
    flex: 1;
    margin-right: 10px;
  }
  .searchResult_nav_screen {
    width: 142px;
    height: 145px;
    text-align: center;
    line-height: 145px;
    font-size: 40px;
    color: #fff;
  }

  .searchResult_screening_nav {
    display: flex;
  }
  .searchResult_screening_nav li {
    flex: 1;
    height: 100px;
    text-align: center;
    background-color: #fff;
    line-height: 100px;
    font-size: 40px;
    color: #777f86;
    font-weight: 400;
  }
  .searchResult_screening_nav li.active {
    color: #f84056;
  }
  .searchResult_screening_nav li i {
    font-size: 40px;
    color: #777f86;
    line-height: 100px;
    margin: 0 0 0 10px; 
  }
  .searchResult_screening_nav li i.active {
    color: #f84056;
  }
  .searchResult_listX .searchResult_list_item{
    display: block;
    width: 100%;
    height: 340px;
    display: flex;
    background-color: #fff;
    border: 1px solid #e8e8e8;
  }
  .searchResult_listX .searchResult_list_item_left {
    float: left;
    display: inline-block;
    margin: 20px 20px 20px 20px;
    width: 300px;
    height: 300px;
  }
  .searchResult_listX .searchResult_list_item_left img {
    width: 300px;
    height: 300px;
  }
  .searchResult_listX .searchResult_list_item_right {
    display: inline-block;
    float: left;
    flex: 1;
  }
  .searchResult_listX .searchResult_list_item_right h3 {
    font-size: 40px;
    line-height: 50px;
    color: #444;
    height: 100px;
    width: 100%;
    margin: 25px 0 80px 0;    
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .searchResult_listX .searchResult_list_item_right h4 span {
    color: #a1a1a1;
    font-size: 35px;
    font-weight: 400;
    margin-right: 20px;
  }
  .searchResult_listX .searchResult_list_item_right h4 .price{
    color: #f84056;
    font-size: 50px;
    line-height: 50px;
  } 
  .searchResult_listX .searchResult_list_item_right h5 {
    color: #999;
    font-size: 35px;
    line-height: 40px;
    font-weight: 400;
  }
  .searchResult_no {
    font-size: 60px;
    width: 568px;
    height: 745px;
    text-align: center;
    color: #f84056;
    position:relative;
    top:50%;
    left:50%;
    margin-top: 322px;
    margin-left: -284px;
  }
  .searchResult_no img {
    width: 100%;
    display: block;
    margin:0 auto;
    text-align: center;
  }
  .searchResult_shadow {
    transition: .5s all;
    position: fixed;
    top: 0;
    left: 0;
  }
  .searchResult_shadow.active {
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
  }
  .searchResult_screen {
    transition: .5s all;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80%;
    transform: translateX(100%);
    background-color: #fff;
  }
  .searchResult_screen.active {
    transform: translateX(0%);
  }
  .searchResult_screen h3 {
    height: 120px;
    background-color: #fff;
    text-align: center;
    line-height: 120px;
    font-size: 50px;
    color: #000;
    border-bottom: 2px solid #eee;
  }
  .searchResult_screen h3 .title {
    margin-left: -60px;
  }
  .searchResult_screen .gb {
    font-size: 60px;
    margin: 0 0 0 40px;
    line-height: 130px;
  }
  .searchResult_screen .jg {
    display: block;
    font-size: 40px;
    padding: 40px 0 40px 40px;
    border-bottom: 2px solid #eee;
  }
  .searchResult_screen .jg input {
    width: 150px;
    height: 70px;
    padding: 0 20px;
    border-radius: 10px;
    background-color: #eee;
    font-size: 40px;
    line-height: 70px;
  }
  .searchResult_screen .btn {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 150px;
  }
  .searchResult_screen .btn button {
    width: 50%;
    border: none;
    padding: 0;
    height: 150px;
    font-size: 50px;
    color: #fff;
  }
  .searchResult_screen .btn button:nth-child(1) {
    background-color: #ccc;
  }
  .searchResult_screen .btn button:nth-child(2) {
    background-color: #f84056;
  }
  .searchResult_screen .no {
    /* margin: 0 auto; */
    width: 80%;
    text-align: center;
    color: #f84056;
    font-size: 80px;
    line-height: 100px;
    margin: 250px 90px 0 90px; 
  }
  .searchResult_screen .no img{
    width: 100%;
  }
  .searchResult_Obtain {
    margin: 0 auto;
  }
  .searchResult_Obtain img {
    width: 200px;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -100px;
  }
</style>
