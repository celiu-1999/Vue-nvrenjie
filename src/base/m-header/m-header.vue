<template>
  <!--使用slot设计，多套class-->
  <div>
    <div class="index clearfix" slot="m-header">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  div {
    width: 1080px;
    height: 145px;
    background-color: #f84056;
    color: #feecee;
  }

  .index span {
    display: inline-block;
    line-height: 145px;
    vertical-align: top;
  }

  .index .cd {
    text-align: center;
    font-size: 50px;
    width: 95px;
    height: 145px;
    vertical-align: top;
    margin: 0 20px 0 30px;
  }
  .index .title {
    font-size: 50px;
    line-height: 145px;
  }
  .sousuo {
    display: inline-block;
    font-size: 60px;
    width: 60px;
    height: 100%;
    margin: 0 45px 0 0;
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  .sousuo:hover {
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
  .index .gd {
    font-size: 60px;
    margin: 0 45px 0 0;
  }
</style>
