<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-desc">
        <p>Designed by XXXX</p>
        <p>2018年5月</p>
      </div>
      <span class="footer-qrcode"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cptFooter',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer{
  width: $all;
  height: 140px;
  background: #2d2f3c;
  position: relative;
  float: left;
  bottom: 0;
  left: 0;
  .footer-container{
    width: 960px;
    height: $all;
    margin: 0 auto;
    position: relative;
    .footer-desc{
      color: #7a7b7f;
      position: absolute;
      top: 40px;
      left: 160px;
      p{
        font-size: 16px;
        line-break: 32px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 600;
      }
    }
    .footer-qrcode{
      position: absolute;
      display: block;
      right: 20px;
      top: 10px;
      width: 120px;
      height: 120px;
      background: lightblue;
    }
  }
}
.login{
  .footer{
    background: url(../assets/body_bg.png);
    .footer-container{
      border-top: 1px solid #ccc;
    }
  }
}
</style>
