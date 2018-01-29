<template>
  <div class="collection" ref="wrapper">
    <div class="collection_center" ref="collection">
      <header>
        <router-link to="/" tag="span" class="iconfont icon-shangxiazuoyou-2"></router-link>
        收藏
      </header>
      <div class="collection_center_list">
        <a class="collection_center_list_li clearfix" v-for="item in collection">
          <div class="collection_center_list_li_left fl">
            <img :src="item.img" alt="">
          </div>
          <div class="collection_center_list_li_right fl">
            <h3>{{item.title}}</h3>
            <h4><span class="price">￥{{item.price}}</span><span class="original"><s>{{item.OriginalPrice}}</s></span><span class="discount">{{item.discount}}折</span></h4>
            <h5><span class="praise">{{item.Praise}}%</span>好评(<span class="people">{{item.SalesVolume}}</span>人)</h5>
          </div>
          <span class="iconfont icon-iconfontlajitong sc" @click="collectionDel(item.id)"></span>
        </a>
      </div>
    </div>
    <!-- 没有商品显示 -->
    <div class="no" v-show="!collection.length">
      <img src="static/imgs/404.png" alt="">
      <h5>真的没有啦</h5>
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
      collection: []
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
      if (this.signIn) {
        this.getCollection()
      } else {
        this.collection = []
      }
    }
  },
  created () {
    this.getCollection()
  },
  mounted () {
    setTimeout(() => {
      this.initSlider()
    }, 20)
  },
  methods: {
    initSlider () {
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        click: true
      })
    },
    getCollection () {
      this.collection = []
      axios.post('/users/collection')
      .then((res) => {
        this.collection = []
        this.collection = res.data.result
      })
      .catch((err) => {
        console.log(err)
      })
    },
    collectionDel (id) {
      axios.post('/users/collectionDel', {
        commodityId: id
      })
      .then((res) => {
        if (res.data.msg === '未登录' && res.data.status === '1') {
          this.$router.push('/login')
          return
        }
        this.$refs.tx.tx('删除成功')
        this.getCollection()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .collection {
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
    top: 0;
    left: 0;
    line-height: 120px;
    color: #888;
    font-size: 50px;    
  }
  .collection_center_list_li {
    position: relative;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  .collection_center_list_li_left {
    display: inline-block;
    margin: 20px 20px 20px 20px;
    width: 300px;
    height: 300px;
  }
  .collection_center_list_li_left img {
    width: 300px;
    height: 300px;
  }
  .collection_center_list_li_right {
    flex: 1;
  }
  .collection_center_list_li_right h3 {
    font-size: 40px;
    line-height: 50px;
    height: 100px;
    color: #444;
    width: 100%;
    margin: 25px 0 80px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .collection_center_list_li_right h4 span {
    color: #a1a1a1;
    font-size: 35px;
    font-weight: 400;
    margin-right: 20px;
  }
  .collection_center_list_li_right h4 .price{
    color: #f84056;
    font-size: 50px;
    line-height: 50px;
  } 
  .collection_center_list_li_right h5 {
    color: #999;
    font-size: 35px;
    line-height: 40px;
    font-weight: 400;
  }
  .sc {
    position: absolute;
    bottom: 15px;
    right: 50px;
    font-size: 70px;
    color: #888;
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
