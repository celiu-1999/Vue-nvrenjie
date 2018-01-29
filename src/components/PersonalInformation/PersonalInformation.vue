<template>
  <div class="PersonalInformation">
    <div class="PersonalInformation_center">
      <header>
        <router-link to="/" tag="span" class="iconfont icon-shangxiazuoyou-2 fh"></router-link>
        个人信息
        <span class="iconfont icon-b2 xg" v-show="!set" @click="SetName()"></span>
        <span class="iconfont icon-guanbi1 xg qx" v-show="set" @click="ReturnGet()"></span>
      </header>
      <ul class="PerInf_center_list">
        <div class="img">
          <div class="img_center">
            <img :src="personal.headImg" alt="">
          </div>
        </div>
        <div class="name" v-show="!set">
          <h2><div class="center">用户名：<span>{{personal.username}}</span></div></h2>
          <h2><div class="center">昵称：<span>{{personal.name}}</span></div></h2>
          <h2><div class="center" v-show="personal.email">email：<span>{{personal.email}}</span></div></h2>
        </div>
        <div class="SetName" v-show="set">
          <h2><div class="center">昵称：<span><input type="text" class="nameInput" :value="personal.name"></span></div></h2>
          <h2><div class="center">email：<span><input type="text" class="emailInput" :value="personal.email"></span></div></h2>
          <div class="ok">
            <button @click="SetAdminOk()">确定</button>
          </div>
        </div>
      </ul>
    </div>
    <!-- 提醒 -->
    <tx ref="tx"></tx>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Tx from '@/base/tx/tx'

export default {
  data () {
    return {
      personal: {},
      set: false
    }
  },
  created () {
    this.getName()
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
      if (this.signIn) {
        this.getName()
      } else {
        this.personal = {}
        this.$router.push('/login')
      }
    }
  },
  methods: {
    getName () {
      this.personal = {}
      axios.post('/users/admin')
      .then((res) => {
        if (res.data.msg === '未登录' && res.data.status === '1') {
          this.$router.push('/login')
          return
        }
        this.personal = res.data.result
      })
      .catch((err) => {
        console.log(err)
      })
    },
    SetName () {
      this.set = true
    },
    SetAdminOk () {
      var name = document.getElementsByClassName('nameInput')[0].value
      var email = document.getElementsByClassName('emailInput')[0].value
      axios.post('/users/SetAdminOk', {
        name: name,
        email: email
      })
      .then((res) => {
        if (res.data.msg === '未登录' && res.data.status === '1') {
          this.$router.push('/login')
          return
        }
        this.$refs.tx.tx('用户信息修改成功')
        this.getName()
        this.set = false
      })
      .catch((err) => {
        console.log(err)
      })
    },
    ReturnGet () {
      this.set = false
      document.getElementsByClassName('nameInput')[0].focus()
    }
  }
}
</script>

<style scoped>
  .PersonalInformation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
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
  header .xg {
    right: 0;
    top: 0;
    font-size: 50px;
  }
  header .qx {
    font-size: 70px;
    line-height: 140px;
  }
  .PerInf_center_list .img {
    width: 100%;
    text-align: center;
    margin: 80px 0 0 0;
  }
  .PerInf_center_list .img .img_center {
    border: 1px solid #cccccc;
    display: inline-block;
    border-radius: 50%;
    width: 300px;
    text-align: center;
    height: 300px;
  } 
  .PerInf_center_list .img .img_center img{
    width: 100%;
    height: 100%;
    border: 1px solid #cccccc;
    text-align: center;
    border-radius: 50%;
  } 
  .PerInf_center_list .name,.PerInf_center_list .SetName {
    margin: 80px 0 0 0;
  }
  .PerInf_center_list h2 {
    margin: 50px 0 0 0;
    display: block;
    text-align: left;
    height: 200px;
    font-size: 50px;
    color: #808080;
    padding: 0px 40px;
  }
  .PerInf_center_list h2 .center {
    border-bottom: 1px solid #ccc;
    line-height: 70px;
  }
  .PerInf_center_list h2 .center span {
    display: block;
    color: #464646;
    text-indent:150px;
    line-height: 150px;
  }
  .SetName .ok {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 150px;
  }
  .SetName button {
    width: 100%;
    height: 150px;
    background-color: #ff2832;
    font-size: 50px;
    color: #fff;
    border: none;
  }
</style>
