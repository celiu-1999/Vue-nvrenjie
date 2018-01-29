<template>
  <div>
    <slot name="Mheight"></slot>
  </div>
</template>

<style>
  #height {
    width: 100%;
  }
  .x-5 {
    height: 5px;
  }
  .x-10 {
    height: 10px;
  }
  .x-20 {
    height: 20px;
  }
  .x-25 {
    height: 25px;
  }
  .x-30 {
    height: 30px;
  }
</style>

<script>
  export default {
    data () {
      return {
        height: 0
      }
    }
  }
</script>