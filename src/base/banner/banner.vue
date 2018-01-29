<template>
  <div class="slider" ref="slider">
    <div class="slider-group clearfix" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}" ></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()   // 设置父元素，子元素，滚动条的宽度
      this._inirDots()         // 设置小圆点的个数为轮播图数量
      this._initSlider()       // 设置一系列参数
      if (this.autoPlay) {
        this._play()           // 设置执行轮播
      }
    }, 20)
    window.addEventListener('resize', () => {   // 监听窗口大小改变
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)                // 重新设置父元素，子元素，滚动条的宽度
      this.slider.refresh()                     // 重新计算
    })
  },
  methods: {
    com () {
      setTimeout(() => {
        this.destroyed()            // 停止轮播
        this.currentPageIndex = 0   // 设置起始页为0
        this._setSliderWidth()      // 设置父元素，子元素，滚动条的宽度
        this._inirDots()            // 设置小圆点的个数为轮播图数量
        this._initSlider()          // 设置一系列参数
        if (this.autoPlay) {
          this._play()              // 设置执行轮播
        }
      }, 20)
    },
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children // 获取全部子元素
      // console.log(this.children.length)
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth   // 获取盒子显示宽度
      for (let i = 0; i < this.children.length; i++) {  // 循环全部子元素
        let child = this.children[i]                    // 获取每个子元素

        child.style.width = sliderWidth + 'px'          // 设置每个子元素的宽度为总盒子显示的宽度
        width += sliderWidth                            // 叠加每个盒子的宽度
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'  // 设置轮播图滚动条宽度
    },
    _inirDots () {
      this.dots = new Array(this.children.length)       // 设置小圆点的个数为轮播图数量
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {    // 设置参数
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

      this.slider.on('scrollEnd', () => {         // 设置滚动结束干的事
        let pageIndex = this.slider.getCurrentPage().pageX  // 获取当前页
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex         // 设置当前页的

        if (this.autoPlay) {                      // 判断是否自动播放
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play () {
      let pageIndex = this.currentPageIndex + 1     // 设置pageIndex为当前页的页码
      if (this.loop) {                              // 判断是否无缝轮播
        pageIndex += 1
      }
      this.timer = setTimeout(() => {               // 计算器多少秒轮播一回
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    },
    destroyed () {    // 停止轮播
      clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped>
  .slider {
    position: relative;
    overflow: hidden;
  }
  .slider-group {
    position: relative;
    transition: .5s all;
    width: 100%;
    overflow: hidden;
    /* transform: translateX(-1080px); */
  }
  .slider-group li {
    display: block;
    /* height: 478px; */
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }
  .slider-group li .banner_a {
    display: block;
    width: 100%;
    height: 100%;
  }
  .slider-group li img {
    display: block;
    width: 100%;
    /* height: 478px; */
    text-align: center;
  }
  .dots {
    position: absolute;
    display: block;
    width: 100%;
    bottom: 75px;
    text-align: center;
  }
  .dots .dot {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-color:  rgba(0,0,0,.5);
    border-radius: 25px;
    margin-right: 10px;
    transition: .1s all;
  }
  .dots .dot.active {
    border-radius: 25px;
    background-color:  rgba(0,0,0,.7);
    width: 50px;
  }
  .dots .dot:last-child {
    margin-right: 0;
  }
</style>
