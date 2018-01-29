<template>
  <div class="column" ref="column">
    <router-link tag="a" to="/PersonalInformation">
      <img src="/static/imgs/nav_1.png" alt="个人信息">
      <span>个人信息</span>
    </router-link>
    <router-link tag="a" to="/orderList">
      <img src="/static/imgs/nav_2.png" alt="订单">
      <span>订单</span>
    </router-link>
    <router-link tag="a" to="/ShoppingCart">
      <img src="/static/imgs/nav_3.png" alt="购物车">
      <span>购物车</span>
    </router-link>
    <router-link tag="a" to="/collection">
      <img src="/static/imgs/nav_4.png" alt="收藏">
      <span>收藏</span>
    </router-link>
  </div>  
</template>

<style>
  .column {
    display: flex;
    height: 220px;
    background-color: #fff;
  }
  .column a {
    flex: 1;
    height: 100%;
    text-align: center;
  }
  .column a img {
    display: inline-block;
    width: 115px;
    height: 115px;
    margin: 40px 0 0 0;
  }
  .column a span {
    font-size: 32px;
    color: #161616;
    text-align: center;
    display: block;
  }
</style>


