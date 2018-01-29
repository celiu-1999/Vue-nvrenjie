<template>
  <div class="txShow">
    <div class="tx">{{txData}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      txData: ''
    }
  },
  methods: {
    tx (data) {
      this.txData = data
      var tx = document.getElementsByClassName('tx')[0]
      tx.classList.add('active')
      setTimeout(function () {
        tx.classList.remove('active')
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .tx {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 0 30px;
    height: 150px;
    margin-left: -200px;
    margin-top: -75px;
    border-radius: 25px;
    color: #fff;
    font-size: 50px;
    text-align: center;
    line-height: 150px;
    background-color: rgba(0, 0, 0, .5);
    display: inline-block;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    opacity: 0;
    z-index: -1;
  }
  .tx.active {
    opacity: 1;
    z-index: 120;
    animation: shake 1s infinite cubic-bezier(.36, .07, .19, .97) both;
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
