<template>
  <div class="index">
    <cptHeader :isLogin='false'></cptHeader>
    <img class="bcg-img" src="../assets/bcg.png">
    <router-view class="content-view"></router-view>
    <!-- <cptFooter></cptFooter> -->
  </div>
</template>

<script>
import cptHeader from '../components/header'
import cptFooter from '../components/footer'
export default {
  name: 'index',
  components: { cptHeader, cptFooter },
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!localStorage.getItem('curUser') || localStorage.getItem('curUser') === '') {
        vm.$router.push('login')
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index{
  height: 100%;
  .bcg-img{
    width: $all;
    position: absolute;
    z-index: 0;
    top: 70px;
  }
  .content-view{
    position: relative;
    float: left;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 1004px;
    margin: 32px auto 80px;
    background: #fff;
    box-shadow: 0 0 21px rgba(184,112,28,0.05), 0px 0 3px rgba(184,112,28,0.08);
  }
}
</style>
