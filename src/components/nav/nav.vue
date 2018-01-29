<template>
  <div class="wrapper" ref="wrapper">
    <ul class="nav center clearfix" id="nav" ref="nav" >
      <li class="nav_li fl">
        <router-link to="/" tag="a">发现</router-link>
      </li>
      <li class="nav_li fl">
        <router-link to="/BeautyCare" tag="a">极致美护</router-link>
      </li>
      <li class="nav_li fl">
        <router-link to="/Accessories" tag="a">个性配饰</router-link>
      </li>
      <li class="nav_li fl">
        <router-link to="/ThisWeek" tag="a">本周热卖</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import axios from 'axios'

  export default {
    data () {
      return {
        navlist: []
      }
    },
    mounted () {
      // setTimeout(() => {
      //   this._setNavWidth()
      //   this.initSlider()
      // }, 20)
    },
    created () {
      // this.getNav()
    },
    methods: {
      _setNavWidth () {
        this.children = this.$refs.nav.children // 获取li的数量

        let width = 0
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]                   // 获取每个li
          var childWidth = child.clientWidth            // 获取每个li宽度
          width += childWidth                              // 叠加每个li宽度，总盒子宽度
        }
        this.$refs.nav.style.width = width + 'px' // 设置总盒子宽度
      },
      initSlider () {
        this.slider = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          click: true
        })
      },
      getNav () {
        axios.get('/navlist')
          .then((res) => {
            if (res.status === 200) {
              this.navlist = res.data.result.list[0].nav
            }
          })
          .catch((err) => {
            if (err) {
              console.log(err)
            }
          })
      }
    }
  }
</script>

<style>
  .wrapper {
    background: #fff;
  }
  .nav {
    background-color: #fff;
    overflow: hidden;
    height: 150px;
    /* transform: translateX(-265px); */
  }
  .nav_li {
    display: inline-block;
    height: 150px;
    text-align: center;
    width: 270px;
  }
  .nav_li .router-link-exact-active.router-link-active{
    border-bottom: 10px solid #ff4f64;
  }
  .nav_li a {
    display: inline-block;
    width: 100%;
    height: 140px;
    font-weight: 400;
    font-size: 42px;
    color: #171717;
    line-height: 140px;
  }
</style>
