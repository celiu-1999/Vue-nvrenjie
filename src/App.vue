<template>
  <div id="app" class="box">
    <m-header>
      <span class="iconfont icon-gengduo cd fl" @click="HideActiveSidebar"></span>
      <span class="title fl">女人街</span>
      <span class="iconfont icon-gengduo2 gd fr"></span>
      <router-link to="/search" tag="span" class="iconfont icon-sousuo sousuo fr">
      </router-link>
    </m-header>
    <m-nav></m-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="shadow" @click="ShowActiveSidebar"></div>
    <div class="sidebar">
      <div class="sidebar_top" v-show="login">
        <div class="sidebar_top_head">
          <img :src="headImg" alt="">
        </div>
        <h1 class="sidebar_top_title">{{name}}</h1>
      </div>
      <div class="sidebar_top" v-show="!login">
        <router-link to="/login" tag="div" class="sidebar_top_head" >
          <img src="/static/imgs/user/login.png" alt="">
        </router-link>
        <h1 class="sidebar_top_title">未登录</h1>
      </div>
      <div class="sidebar_center">
        <span>主页</span>
        <span @click="PersonalInformation()">个人信息</span>
        <span @click="collection()">我的收藏</span>
        <span @click="ShoppingCart()">购物车</span>
        <span @click="orderList()">我的订单</span>
        <span @click="address()">收货地址</span>
        <span v-show="login" @click="logout">退出</span>
      </div>
    </div>
    <!-- 提醒 -->
    <tx ref="tx"></tx>
  </div>
</template>

<script>
import MHeader from './base/m-header/m-header'
import MNav from './components/nav/nav'
import {mapGetters, mapMutations} from 'vuex'
import axios from 'axios'
import Tx from '@/base/tx/tx'

export default {
  name: 'app',
  data () {
    return {
      login: false,
      name: '',
      headImg: ''
    }
  },
  components: {
    MHeader,
    MNav,
    Tx
  },
  watch: {
    user () {
      if (this.user.name || this.user.headImg) {
        this.ShowActiveSidebar()
        this.login = true
        this.name = this.user.name
        this.headImg = this.user.headImg
      }
    }
  },
  created () {
    var user = {}
    if (this.getCookie('Name') || this.getCookie('userId') || this.getCookie('userName')) {
      user.name = this.getCookie('Name')
      user.userId = this.getCookie('userId')
      user.userName = this.getCookie('userName')
      user.headImg = this.getCookie('headImg')
      this.name = user.name
      this.headImg = user.headImg
      this.set_user(user)
      this.set_signIn(true)
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'signIn'
    ])
  },
  methods: {
    getCookie (name) {
      var arr
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)') // 正则匹配
      arr = document.cookie.match(reg)
      if (arr) {
        return decodeURI(arr[2])
      } else {
        return null
      }
    },
    ShowActiveSidebar () {
      var shadow = document.getElementsByClassName('shadow')[0]
      var sidebar = document.getElementsByClassName('sidebar')[0]
      shadow.classList.remove('active')
      sidebar.classList.remove('active')
    },
    HideActiveSidebar () {
      var shadow = document.getElementsByClassName('shadow')[0]
      var sidebar = document.getElementsByClassName('sidebar')[0]
      shadow.classList.add('active')
      sidebar.classList.add('active')
    },
    logout () {
      axios.post('/users/logout')
      .then((res) => {
        if (res.data.status === '0') {
          this.$refs.tx.tx('已退出')
          this.ShowActiveSidebar()
          this.login = false
          this.set_user(this.user)
          this.set_signIn(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    ShoppingCart () {
      this.ShowActiveSidebar()
      this.$router.push('/ShoppingCart')
    },
    collection () {
      this.ShowActiveSidebar()
      this.$router.push('/collection')
    },
    address () {
      this.ShowActiveSidebar()
      this.$router.push('/address')
    },
    PersonalInformation () {
      this.ShowActiveSidebar()
      this.$router.push('/PersonalInformation')
    },
    orderList () {
      this.ShowActiveSidebar()
      this.$router.push('/orderList')
    },
    ...mapMutations({
      set_user: 'SET_USER',
      set_signIn: 'SET_SIGNIN'
    })
  }
}
</script>

<style scoped>
  .shadow {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .5s all;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
  }
  .shadow.active {
    top: 0;
    opacity: 1;
  }
  .sidebar {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 700px;
    bottom: 0;
    transition: .5s all;
    transform: translateX(-700px);
    background-color: #f84056;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }
  .sidebar.active {
    transform: translateX(0px);
  }
  .sidebar_top {
    text-align: center;
    height: 30%;
  }
  .sidebar_top .sidebar_top_head{
    display: inline-block;
    height: auto;
    border-radius: 50%;
    border: 2px solid #fff;
    margin: 100px 0 0 0;
  }
  .sidebar_top_head img {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 50%;
    background-color: #fff;
  }
  .sidebar_top_title {
    font-size: 80px;
    color: #feecee;;
    font-weight: 100;
    line-height: 80px;
    margin: 40px 0 0 0;
  }
  .sidebar_center {
    height: 70%;
    margin: 120px 0 0 0;
  }

  .sidebar_center span {
    width: 100%;
    display: block;
    height: 14%;
    font-size: 50px;
    font-weight: 100;
    color: #fff;
    text-align: center;
  }
  .sidebar_center a:hover {
    color: aqua;
  }
</style>
