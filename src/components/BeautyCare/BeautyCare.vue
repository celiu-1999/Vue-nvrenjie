<template>
  <div class="BeautyCare">
    <div class="BeautyCare-center">
      <commodity-li>
        <div class="commodity_li" v-for="item in commodity">
          <span class="commodity_li_item commodity_li-x" @click="Jump(item.commodity_data)">
            <div class="commodity_li_item_top">
              <img v-lazy="item.imageUrl[0].imgUrl" alt="">
            </div>
            <div class="commodity_li_item_bottom">
              <h3>{{item.commodity_title}}</h3>
              <h4>{{item.introduce}}</h4>
              <h5>一手价：<span>￥{{item.price}}</span></h5>
            </div>
            <span class="ac" v-show="item.rxShow">热销</span>
          </span>
        </div>
      </commodity-li>
    </div>
  </div>
</template>

<script>
import commodityLi from '@/base/commodity-li/commodity-li'
import axios from 'axios'
import Scroll from '@/base/scroll/scroll'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      commodity: []
    }
  },
  components: {
    commodityLi,
    Scroll
  },
  created () {
    this.get_commodity()
  },
  methods: {
    get_commodity () {
      axios.get('/commodity')
        .then((res) => {
          this.commodity = res.data.result.list[0].commodity
        })
        .catch((err) => {
          console.log(err)
        })
    },
    Jump (id) {
      this.set_commodityId(id)
      this.$router.push('/commodity')
    },
    ...mapMutations({
      set_commodityId: 'SET_COMMODITYID'
    })
  }
}
</script>

<style>
  /* .BeautyCare {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
  .BeautyCare-center {
    height: 100%;
    overflow: hidden;
  } */
</style>
