<template>
  <div class="search">
    <div class="search_center" ref="wrapper">
        <div class="search_nav clearfix">
        <span class="search_nav_left fl">
          <router-link tag="span" class="iconfont icon-fanhui" to="/"></router-link>
        </span>
        <span class="search_nav_right fl">
          <span class="iconfont icon-sousuo"></span>
          <input type="search" placeholder="搜索商品" @keyup.enter="getSearch($event.currentTarget)">
        </span>
      </div>
      <ul class="historicalSearch Search">
        <div class="Search_title">
          <span class="iconfont icon-shoucang fl"></span>
          <h3>历史搜索</h3>
          <span class="iconfont icon-iconfontlajitong sc fr"></span>
        </div>
        <li>欧诗兰</li>
        <li>香奈儿</li>
        <li>好书每满100减40</li>
        <li>肖秀荣四套卷2018</li>
        <li>致我们单纯的小美好</li>
        <li>123</li>
        <li>美好</li>
        <li>致我们单纯的小美好</li>
      </ul>
      <ul class="hotSearch Search" v-show="hotSearch.length">
        <div class="Search_title">
          <span class="iconfont icon-shoucang"></span>
          <h3>热门搜索</h3>
        </div>
        <li v-for="item in hotSearch" @click="getSearchLi($event.currentTarget)">{{item}}</li>
      </ul>
      <router-view></router-view>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      hotSearch: []
    }
  },
  created () {
    this.getHotSearch()
  },
  mounted () {
    setTimeout(() => {
      this.initSlider()
    }, 20)
  },
  methods: {
    getHotSearch () {
      axios.get('/hotsearch')
        .then((res) => {
          this.hotSearch = this.recommends = res.data.result.list[0].hotSearch
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initSlider () {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true
      })
    },
    getSearch (e) {
      this.$router.push({
        path: `/search/${e.value}`
      })
      var value = e.value
      this.setSerach(value)
      this.set_page(1)
    },
    getSearchLi (e) {
      this.$router.push({
        path: `/search/${e.innerHTML}`
      })
      var value = e.innerHTML
      this.setSerach(value)
      this.set_page(1)
    },
    ...mapMutations({
      setSerach: 'SET_SERACH',
      set_page: 'SET_PAGE'
    })
  }
}
</script>

<style scoped>
  .search {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
  }
  .search_center {
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .search_nav {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 145px;
    background-color: #f84056;
    color: #feecee;
  }
  .search_nav_left {
    width: 142px;
    height: 145px;
  }
  .search_nav_left span{
    width: 100%;
    display: inline-block;
    font-size: 50px;
    color: #fff4f5;
    line-height: 140px;
    text-align: center;
  }
  .search_nav_right {
    display: inline-block;
    flex: 1;
    width: 893px;
    height: 67px;
    background-color: #c8051c;
    margin: 39px 39px 0 0;
    display: flex;
  }
  .search_nav_right span {
    display: inline-block;
    height: 67px;
    color: #e99ba4;
    width: 70px;
    text-align: center;
    line-height: 60px;
    font-size: 43px;
  }
  .search_nav_right input {
    color: #eab8bb;
    line-height: 67px;
    height: 67px;
    font-size: 32px;
    width: 80%;
    flex: 1;
    margin-right: 10px;
  }


  .hotSearch, .historicalSearch {
  }
  .historicalSearch {
    margin: 30px 0 0 0 ;
  }
  .historicalSearch .sc {
    color: #646464;
  }
  .hotSearch {
    margin: 40px 0 0 0;
  }
  .Search {
    display: block;
    width: 1020px;
    padding: 0 30px 0 30px;
  }
  .Search_title {
    color: #646464;
    font-size: 44px; 
    height: 100px;
    line-height: 100px;
  }
  .Search_title span {
    font-size: 50px;
    color: #f84056;
  }
  .Search_title h3 {
    font-size: 50px;
    display: inline-block;
  }

  .Search li {
    display: inline-block;
    height: 90px;
    line-height: 90px;
    color: #464646;
    font-size: 40px;
    background-color: #fff;
    border-radius: 10px;
    padding: 0px 30px;
    margin: 0 10px 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
</style>
