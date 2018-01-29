<template>
  <div class="commodity">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    rx: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.rxShow()
  },
  methods: {
    rxShow () {
    }
  }
}
</script>

<style>
  .commodity {
    margin: 0 0 30px 0;
  }
  .commodity_li {
    margin: 35px 35px 35px 35px;
  }
  .commodity_li_item {
    display: block;
    border: 1px solid #e7e7e7;
    background: rgb(255,255,255);
    -webkit-border-radius: 15px;
    border-radius: 15px;
    position: relative;
  }
  .commodity_li-x {
    width: 1005px;
  }
  .commodity_li-y {
    width: 480px;
    display: inline-block;
    margin: 0px 10px 0px 35px;
  }
  .commodity_li_thisweek {
    margin: 40px 0px 0px 40px;
  }
  .commodity_li_item_top {
    height: 568px;
    width: 100%;
    border-style: none;
    background-color: #fff;
    -webkit-border-radius: 15px;
    border-radius: 15px;
  }
  .commodity_li_item_top img{
    width: 100%;
    height: 568px;
    text-align: center;
    border-radius: 10px;
  }
  .commodity_li_item_bottom {
    height: 160px;
    width: 100%;
    background-color: #fff;   
    -webkit-border-radius: 15px;
    border-radius: 15px;
  }
  .commodity_li_item_bottom h3 {
    font-size: 35px;
    color: #121212;
    font-weight: 400;
    line-height: 66px;
    margin: 2px 0 0 23px; 
    white-space:nowrap; 
	  overflow:hidden; 
    text-overflow:ellipsis
  }
  .commodity_li_item_bottom h4 {
    font-size: 32px;
    color: #56464a;
    font-weight: 400;
    line-height: 32px;
    margin: 0 0 0 23px; 
    white-space:nowrap; 
	  overflow:hidden; 
    text-overflow:ellipsis
  }
  .commodity_li_item_bottom h5 {
    font-size: 32px;
    color: #373434;
    font-weight: 400;
    line-height: 32px;
    margin: 20px 0 0 23px;
  }
  .commodity_li_item_bottom h5 span {
    font-size: 32px;
    color: #f0372e;
    font-weight: 400;
  }

  .ac {
    position: absolute;
    display: inline-block;
    width: 176px;
    height: 70px;
    line-height: 70px;
    background-color: #f0283f; 
    color: #fff;
    font-size: 48px;
    text-align: center;
    top: 0;
    right: 30px;
  }
</style>
