<template>
  <div class="thisweek">
    <div class="thisweek-center">
      <commodity-li>
        <div class="commodity_li commodity_li-y commodity_li_thisweek" v-for="item in thisweek">
          <span @click="Jump(item.thisweek_data)" class="commodity_li_item">
            <div class="commodity_li_item_top">
              <img v-lazy="item.imageUrl[0].imgUrl" alt="">
            </div>
            <div class="commodity_li_item_bottom">
              <h3>{{item.thisweek_title}}</h3>
              <h4>{{item.introduce}}</h4>
              <h5>一手价：<span>￥{{item.price}}</span></h5>
            </div>
            <span class="ac" v-show="false">热销</span>
          </span>
        </div>
      </commodity-li>
    </div>
  </div>
</template>

<script>
import commodityLi from '@/base/commodity-li/commodity-li'
import axios from 'axios'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      thisweek: []
    }
  },
  components: {
    commodityLi
  },
  created () {
    this.get_thisweek()
  },
  methods: {
    get_thisweek () {
      axios.get('/thisweek')
        .then((res) => {
          this.thisweek = res.data.result.list[0].thisweek
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

<style scoped>

</style>
