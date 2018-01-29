<template>
  <div class="bottom_column">
    <div class="column_top">
      <span @click="active($event.currentTarget, 'z')" class="active">今日上新</span><span @click="active($event.currentTarget, 'f')">每日预告</span>
    </div>
    <shim>
      <div class="x-5" slot="Mheight" id="height"></div>
    </shim>
    <div class="column_bottom clearfix">
      <div class="column_bottom_left fl">
        <li class="column_bottom_left_top">
          <span class="iconfont icon-tongzhi"></span>
          <a href="javascript:;">{{Copy.new_copy}}</a>
        </li>
        <ul class="column_bottom_left_bottom">
          <li v-for="item in newItem" @click="Jump(item.data)">
            <a>
              <img v-lazy="item.imageUrl[0].imgUrl" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="column_bottom_right fl">
        <li class="column_bottom_right_top">
          <span class="iconfont icon-tongzhi"></span>
          <a href="javascript:;">{{Copy.trailer_copy}}</a>
        </li>
        <ul class="column_bottom_right_bottom">
          <li v-for="item in trailerItem" @click="Jump(item.data)">
            <a>
              <img v-lazy="item.imageUrl[0].imgUrl" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>  
</template>

<style>
  .column_top {
    display: flex;
    height: 134px;
    background-color: #fff;
  }
  .column_top span {
    flex: 1;
    height: 100%;
    text-align: center;
    font-size: 42px;
    color: #161616;
    line-height: 134px;
  }
  .column_top span.active {
    color: #f84056;
  }

  .column_bottom {
    transition: .5s all;
    width: 200%;
    /* transform: translateX(-100%) */
  }

  .column_bottom_left_top,.column_bottom_right_top {
    height: 110px;
    width: 1080px;
    background-color: #fff;

  }
  .column_bottom_left_top span,.column_bottom_right_top span {
    font-size: 48px;
    color: #c4c8cf;
    line-height: 30px;
    margin: 0 21px 0 37px;
  }
  .column_bottom_left_top a,.column_bottom_right_top a {
    font-size: 36px;
    color: #aeb4be;
    line-height: 106px;
    margin: 4px 0 0 0;
  }

  .column_bottom_left_bottom,.column_bottom_right_bottom {
    padding: 10px 34px 0 33px;
    background-color: #fff;
  }
  .column_bottom_left_bottom li,.column_bottom_right_bottom li {
    margin-bottom: 10px;
    height: 245px;

  }
  .column_bottom_left_bottom li a,.column_bottom_right_bottom li a {
    display: block;
    height: 245px;
  }
  .column_bottom_left_bottom li a img,.column_bottom_right_bottom li a img {
    width: 100%;
    text-align: center;
    height: 245px;
  }
  .icon-tongzhi {
    display: inline-block;
    animation: shake 1s infinite cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
      transform: rotate(-1deg)
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
      transform: rotate(2deg)
    }
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
      transform: rotate(-4deg)
    }
    40%, 60% {
      transform: translate3d(4px, 0, 0);
      transform: rotate(4deg)
    }
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
      transform: rotate(-1deg)
    }
  }
</style>


<script>
  import shim from '@/base/shim/shim'
  import {mapMutations} from 'vuex'

  export default {
    props: {
      newItem: {
        type: Array,
        default: []
      },
      trailerItem: {
        type: Array,
        default: []
      },
      Copy: {
        type: Object,
        default: {}
      }
    },
    methods: {
      active (e, x) {
        var dom = document.getElementsByClassName('column_top')[0].children
        for (var i = 0; i < dom.length; i++) {
          dom[i].classList.remove('active')
        }
        e.classList.add('active')
        var roll = document.getElementsByClassName('column_bottom')[0]
        if (x === 'z') {
          roll.style.transform = 'translateX(0%)'
        } else {
          roll.style.transform = 'translateX(-50%)'
        }
      },
      Jump (id) {
        this.set_commodityId(id)
        this.$router.push('/commodity')
      },
      ...mapMutations({
        set_commodityId: 'SET_COMMODITYID'
      })
    },
    components: {
      shim
    }
  }
</script>