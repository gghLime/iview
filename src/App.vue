<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
#app {
  width: $all;
  min-height: $all;
  box-sizing: border-box;
  padding-top: 70px;
}
body{
  background: url(./assets/body_bg.png);
}
</style>
