<template>
  <div class="loading">
    <img src="/static/svg-loaders/loaders.svg" alt="loading">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped>
  .loading {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    text-align: center;
  }
  .loading img{
    width: 80%;
    margin-top: 50%;
  }
  .desc {
    background: #fff;
    line-height: 100px;
    font-size: 80px;
    color: #808080;
  }
</style>
