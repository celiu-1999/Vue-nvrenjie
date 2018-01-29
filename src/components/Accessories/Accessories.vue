<template>
  <div class="Accessories">
    <div class="Accessories-center">
      <commodity-li>
        <div class="commodity_item" v-for="item in Accessories">
          <div class="commodity_li commodity_li-x">
            <span @click="Jump(item.AccessoriesX.commodity_data)" class="commodity_li_item">
              <div class="commodity_li_item_top">
                <img v-lazy="item.AccessoriesX.imageUrl[0].imgUrl" alt="">
              </div>
              <div class="commodity_li_item_bottom">
                <h3>{{item.AccessoriesX.commodity_title}}</h3>
                <h4>{{item.AccessoriesX.introduce}}</h4>
                <h5>一手价：<span>￥{{item.AccessoriesX.price}}</span></h5>
              </div>
              <span class="ac" v-show="false">热销</span>
            </span>
          </div>
          <div class="commodity_li commodity_li-y">
            <span @click="Jump(item.AccessoriesY1.commodity_data)" class="commodity_li_item">
              <div class="commodity_li_item_top">
                <img v-lazy="item.AccessoriesY1.imageUrl[0].imgUrl" alt="">
              </div>
              <div class="commodity_li_item_bottom">
                <h3>{{item.AccessoriesY1.commodity_title}}</h3>
                <h4>{{item.AccessoriesY1.introduce}}</h4>
                <h5>一手价：<span>￥{{item.AccessoriesY1.price}}</span></h5>
              </div>
              <span class="ac" v-show="false">热销</span>
            </span>
          </div>
          <div class="commodity_li commodity_li-y">
            <span @click="Jump(item.AccessoriesY2.commodity_data)" class="commodity_li_item">
              <div class="commodity_li_item_top">
                <img v-lazy="item.AccessoriesY2.imageUrl[0].imgUrl" alt="">
              </div>
              <div class="commodity_li_item_bottom">
                <h3>{{item.AccessoriesY2.commodity_title}}</h3>
                <h4>{{item.AccessoriesY2.introduce}}</h4>
                <h5>一手价：<span>￥{{item.AccessoriesY2.price}}</span></h5>
              </div>
              <span class="ac" v-show="false">热销</span>
            </span>
          </div>
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
      Accessories: []
    }
  },
  components: {
    commodityLi
  },
  created () {
    this.get_accessories()
  },
  methods: {
    get_accessories () {
      axios.get('/accessories')
        .then((res) => {
          this.Accessories = res.data.result.list[0].Accessories
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
