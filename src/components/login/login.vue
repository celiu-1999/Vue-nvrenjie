<template>
  <div class="login">
    <header class="">
      <router-link to="/" tag="span" class="iconfont icon-shangxiazuoyou-2"></router-link>
      登录
    </header>
    <div class="loginInput user" v-show="login">
      <span class="login_input Adminlogin"><span class="iconfont icon-yonghu"></span><input type="text" class="loginAdminInput" placeholder="手机号/邮箱/昵称"></span>
      <span class="login_input Passwordlogin"><span class="iconfont icon-mima"></span><input type="password" class="loginPasswordInput" placeholder="密码"></span>
      <button @click="PostLogin">登录</button>
    </div>
    <div class="registerInput user" v-show="!login">
      <span class="login_input Adminregister"><span class="iconfont icon-yonghu"></span><input type="text" class="registerAdminInput" placeholder="用户名"></span>
      <span class="login_input Passwordregister"><span class="iconfont icon-mima"></span><input type="password" class="registerPasswordInput" placeholder="密码"></span>
      <span class="login_input Phoneregister"><span class="iconfont icon-yonghu"></span><input type="Number" class="registerPhoneInput" placeholder="手机号"></span>
      <button @click="PostRegister">注册</button>
    </div>
    <div class="func clearfix" v-show="login">
      <span class="fr" @click="login=false">注册 <span class="iconfont icon-shangxiazuoyou-3"></span></span>
    </div>
    <div class="func clearfix" v-show="!login">
      <span class="fl" @click="login=true"><span class="iconfont icon-shangxiazuoyou-2"></span> 登录</span>
    </div>
    <!-- 提醒 -->
    <tx ref="tx"></tx>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
import Tx from '@/base/tx/tx'
export default {
  data () {
    return {
      login: true
    }
  },
  components: {
    Tx
  },
  methods: {
    value_empty (dom) {
      dom.style.border = '2px solid red'
      setTimeout(function () {
        dom.style.border = 'none'
      }, 1000)
    },
    PostLogin () {
      var admin = document.getElementsByClassName('loginAdminInput')[0]
      var password = document.getElementsByClassName('loginPasswordInput')[0]
      if (!admin.value) {
        var Adminlogin = document.getElementsByClassName('Adminlogin')[0]
        this.value_empty(Adminlogin)
        return
      }
      if (!password.value) {
        var Passwordlogin = document.getElementsByClassName('Passwordlogin')[0]
        this.value_empty(Passwordlogin)
        return
      }
      axios.post('/users/login', {
        userName: admin.value,
        userPwd: password.value
      })
      .then((res) => {
        if (res.data.status === '1') {
          console.log(res.data.msg)
        } else if (res.data.status === '0') {
          var user = {}
          user.name = res.data.result.name
          user.headImg = res.data.result.headImg
          user.userName = res.data.result.userName
          admin.value = ''
          password.value = ''
          this.set_user(user)
          this.set_signIn(true)
          this.$router.push('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    PostRegister () {
      var admin = document.getElementsByClassName('registerAdminInput')[0]
      var password = document.getElementsByClassName('registerPasswordInput')[0]
      var phone = document.getElementsByClassName('registerPhoneInput')[0]
      if (!admin.value) {
        var Adminregister = document.getElementsByClassName('Adminregister')[0]
        this.value_empty(Adminregister)
        return
      }
      if (!password.value) {
        var Passwordregister = document.getElementsByClassName('Passwordregister')[0]
        this.value_empty(Passwordregister)
        return
      }
      if (!phone.value) {
        var Phoneregister = document.getElementsByClassName('Phoneregister')[0]
        this.value_empty(Phoneregister)
      }
      axios.post('/users/register', {
        userName: admin.value,
        userPwd: password.value,
        phone: phone.value
      })
      .then((res) => {
        if (res.data.status === '1') {
          this.$refs.tx.tx(res.data.msg)
        } else if (res.data.status === '0') {
          this.$refs.tx.tx(res.data.msg)
          admin.value = ''
          password.value = ''
          phone.value = ''
          this.login = true
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    ...mapMutations({
      set_user: 'SET_USER',
      set_signIn: 'SET_SIGNIN'
    })
  }
}
</script>

<style scoped>
  .login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
  }
  header {
    display: block;
    width: 100%;
    height: 150px;
    background-color: #f84056;
    color: #feecee;
    text-align: center;
    line-height: 150px;
    font-size: 50px;
  }
  header span {
    line-height: 65px;
    position: absolute;
    font-size: 65px;
    top: 45px;
    left: 50px;
  }
  .user {
    margin: 80px 0 0 0;
    padding: 0 80px;
  }
  .user .login_input {
    display: flex;
    width: 100%;
    height: 120px;
    background-color: #fafafa;
    border-radius: 15px;
    margin: 0 0 50px 0;
  }
  .user .login_input span {
    display: inline-block;
    width: 100px;
    font-size: 50px;
    line-height: 120px;
    text-align: center;
    color: #888;
  }
  .user .login_input input {
    flex: 1;
    color: #323232;
    font-size: 40px;
  }
  .user button {
    margin: 30px 0 0 0;
    width: 100%;
    height: 120px;
    border: none;
    border-radius: 15px;
    background-color: #f84056;
    color: #fff;
    font-size: 50px;
  }
  .func {
    padding: 0 80px;
    margin: 20px 0 0 0;
  }
  .func span {
    font-size: 35px;
    color: #323232;
  }
  
</style>
