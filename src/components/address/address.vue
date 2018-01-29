<template>
  <div class="address">
    <div class="address_center">
      <header>
        <router-link to="/" tag="span" class="iconfont icon-shangxiazuoyou-2 fh"></router-link>
        收货地址
        <span class="iconfont icon-jiajian-1 tj" @click="AddAddress" v-show="signIn"></span>
      </header>
      <ul class="address_center_list">
        <li class="address_center_list_li clearfix" v-for="item in address">
          <span class="iconfont icon-roundcheck checkbox fl address_center_list_li_left Default" @click="DefaultAddress(item.addressId, $event.currentTarget)" :class="{'active': item.isDefault}"></span>
          <span class="address_center_list_li_right fl xg" @click="ModifyAddress(item.addressId)">
            <h2 class="userName fl">收货人：<span>{{item.userName}}</span></h2>
            <h5 class="tel fr"><span>{{item.tel}}</span></h5>
            <h3 class="streetName fl">收货地址：<span>{{item.streetName}}</span></h3>
          </span>
          <span class="iconfont icon-lajitong sc" @click="DelectAddress(item.addressId)"></span>
        </li>
      </ul>
    </div>
    <!-- 阴影 -->
    <div class="shadow" @click="HideActiveShadow()"></div>
    <!-- 选项 -->
    <div class="dropDownCenter">
      <h1 class="header">{{optionTitle}}</h1>
      <h3 class="SetUserName"><span>收货人：&emsp;</span><input type="text" :value="optionAddress.userName"></h3>
      <h3 class="SetTel"><span>电话号码：</span><input type="text" :value="optionAddress.tel"></h3>
      <h3 class="SetStreetName"><span>收货地址：</span><input type="text" :value="optionAddress.streetName"></h3>
      <button @click="OkAddress()">确定</button>
    </div>
    <!-- 没有商品显示 -->
    <div class="no" v-show="!address.length">
      <img src="static/imgs/404.png" alt="">
      <h5>真的没有啦</h5>
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
      address: [],
      optionTitle: '地址修改',
      optionAddress: [],
      ModifyAdd: false,
      addressId: 0
    }
  },
  created () {
    this.getAddress()
  },
  components: {
    Tx
  },
  computed: {
    ...mapGetters([
      'signIn'
    ])
  },
  watch: {
    signIn () {
      if (this.signIn) {
        this.getAddress()
      } else {
        this.address = []
      }
    }
  },
  methods: {
    getAddress () {
      this.address = []
      axios.post('/users/getAddress')
      .then((res) => {
        if (res.data.msg === '未登录' && res.data.status === '1') {
          this.$router.push('/login')
          return
        }
        this.address = res.data.result
      })
      .catch((err) => {
        console.log(err)
      })
    },
    DefaultAddress (id, e) {
      var dom = document.getElementsByClassName('Default')
      for (var i = 0; i < dom.length; i++) {
        dom[i].classList.remove('active')
      }
      e.classList.add('active')
      axios.post('/users/DefaultAddress', {
        addressId: id
      })
      .then((res) => {
        this.$refs.tx.tx('默认地址设置成功')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    AddAddress () {
      this.ModifyAdd = true
      this.optionAddress = []
      this.ShowActiveShadow()
      this.optionTitle = '添加地址'
    },
    ModifyAddress (id) {
      this.addressId = id
      this.ModifyAdd = false
      this.optionAddress = []
      axios.post('/users/getAddressItem', {
        addressId: id
      })
      .then((res) => {
        this.optionAddress = res.data.result
      })
      .catch((err) => {
        console.log(err)
      })
      this.optionTitle = '地址修改'
      this.ShowActiveShadow()
    },
    DelectAddress (id) {
      axios.post('/users/DelectAddress', {
        addressId: id
      })
      .then((res) => {
        if (res.data.msg === '未登录' && res.data.status === '1') {
          this.$router.push('/login')
          return
        }
        this.$refs.tx.tx('地址删除成功')
        this.getAddress()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    OkAddress () {
      // 修改
      if (!this.ModifyAdd) {
        this.ModifyOk()
      } else {
        // 添加
        this.addOk()
      }
    },
    ModifyOk () {
      var UserName = document.getElementsByClassName('SetUserName')[0].children[1].value
      var Tel = document.getElementsByClassName('SetTel')[0].children[1].value
      var StreetName = document.getElementsByClassName('SetStreetName')[0].children[1].value
      axios.post('/users/addressModifyOk', {
        addressId: this.addressId,
        UserName: UserName,
        Tel: Tel,
        StreetName: StreetName
      })
      .then((res) => {
        this.HideActiveShadow()
        this.$refs.tx.tx(res.data.result)
        this.getAddress()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    addOk () {
      var UserName = document.getElementsByClassName('SetUserName')[0].children[1].value
      var Tel = document.getElementsByClassName('SetTel')[0].children[1].value
      var StreetName = document.getElementsByClassName('SetStreetName')[0].children[1].value
      if (!UserName || !Tel || !StreetName) {
        return
      }
      axios.post('/users/addressAddOk', {
        UserName: UserName,
        Tel: Tel,
        StreetName: StreetName
      })
      .then((res) => {
        this.HideActiveShadow()
        this.$refs.tx.tx(res.data.result)
        this.getAddress()
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
    }
  }
}
</script>

<style scoped>
  .address {
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
  .tj {
    right: 0;
    top: 0;
    font-size: 90px;
  }
  .address_center_list_li {
    border-bottom: 1px solid #ccc;
  }
  .checkbox {
    display: inline-block;
    width: 120px;
    color: #d8d8d8;
    height: 100px;
    text-align: center;
    font-size: 80px;
    margin: 40px 0;
    line-height: 100px;
  }
  .checkbox.active {
    color: #ff2832;
  }
  .address_center_list_li {
    position: relative;
    padding: 20px 20px 20px 0;
    display: flex;
  }
  .address_center_list_li_right {
    flex: 1;
  }
  .address_center_list_li .userName {
    display: inline-block;
    height: 50px;
    font-size: 45px;
    line-height: 50px;
    font-weight: 400;
  }
  .address_center_list_li .userName span {
    color: #888;
  }
  .address_center_list_li .tel {
    display: inline-block;
    height: 50px;
    font-size: 45px;
    line-height: 50px;
    font-weight: 400;
  }
  .address_center_list_li .tel span {
    color: #888;
  }
  .address_center_list_li .streetName {
    display: inline-block;
    width: 80%;
    font-size: 30px;
    line-height: 50px;
    font-weight: 400;
    margin: 20px 0 0 0;
  }
  .address_center_list_li .streetName span {
    color: #888;
  }
  .address_center_list_li .sc {
    position: absolute;
    display: inline-block;
    font-size: 70px;
    bottom: 30px;
    right: 30px;
    z-index: 20;
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
    transform: translateY(120%);
  }
  .dropDownCenter.active {
    transform: translateY(0%)
  }
  .dropDownCenter .header {
    text-align: center;
    font-size: 50px;
    border-bottom: 1px solid #ccc;
  }
  .dropDownCenter h3 {
    display: flex;
    height: 100px;
    font-size: 45px;
    width: 90%;
    padding: 20px 30px 0 30px;
  }
  .dropDownCenter h3 input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 0 20px;
  }
  .dropDownCenter button {
    margin: 20px 0 0 0;
    display: block;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 50px;
    color: #fff;
    background-color: #ff2832;
    border: none;
    height: 120px;
  }
  .no {
    width: 100%;
    text-align: center;
  }
  .no img {
    margin: 350px 0 0 0;
    width: 50%;
  }
  .no h5 {
    font-size: 80px;
    color: #ff2832;
    line-height: 100px;
    font-weight: 400;
  }
</style>
