<template>
  <div class="header">
    <div class="header-container">
      <div class="header-right header-right-menu" v-if="!isLogin">
        <Menu mode="horizontal" theme="light" active-name="1">
          <MenuItem name="1">
              <router-link to="/">概览</router-link>
          </MenuItem>
          <MenuItem name="2">
              <router-link to="/charge">记账</router-link>
          </MenuItem>
          <MenuItem name="3">
              <router-link to="/report">报表</router-link>
          </MenuItem>
          <Submenu name="4" style="width: auto;">
            <template slot="title">
                  {{username}}
            </template>
            <MenuItem name="3-1">
              <router-link to="/user">个人中心</router-link></MenuItem>
            <MenuItem name="3-2">
              <p @click="modal = true">退出</p>
              <Modal v-model="modal" @on-ok="logout">
                  <p>退出登录？</p>
              </Modal>
            </MenuItem>
          </Submenu>
        </Menu>
      </div>
      <p @click="typeChange()" class="header-right header-type-btn" v-else>{{formType !== 'login' ? '登录' : '注册'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cptHeader',
  data () {
    return {
      type: 'login',
      username: '',
      modal: false
    }
  },
  props: ['isLogin'],
  computed: {
    formType () {
      return this.$store.state.formType
    }
  },
  methods: {
    typeChange () {
      this.type = this.formType === 'login' ? 'sign' : 'login'
      this.$store.commit('loginFormChange', this.type)
    },
    logout () {
      localStorage.removeItem('curUser')
      this.$router.go('/login')
    }
  },
  mounted () {
    if (localStorage.getItem('curUser')) {
      this.username = JSON.parse(localStorage.getItem('curUser')).nickname
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  height: 70px;
  width: $all;
  z-index: 2;
  border-bottom: $border;
  background: #fff;
  @include shadow(1px, 0px, 8px, rgba(0, 0, 0, 0.28));
  .header-container {
    width: 960px;
    height: $all;
    margin: 0 auto;
    background: url(../assets/logo-s.png) no-repeat 60px 16px;
    background-size: auto 40px;
    position: relative;
    .header-right {
      position: absolute;
      right: 0;
      &.header-right-menu{
        height: $all;
        .ivu-menu{
          height: calc(100% - 1px);
          min-width: 400px;
          margin-top: 2px;
          &>li{
            width: 100px;
            text-align: center;
            font-size: 16px;
            line-height: 64px;
            padding: 0;
            a{
              display: inline-block;
              height: $all;
              width: $all;
            }
          }
        }
      }
      &.header-type-btn {
        right: 20px;
        display: inline;
        top: 26px;
        font-size: 16px;
        color: #2e2e2e;
        cursor: pointer;
        &:hover {
          color: #2fa0ff;
        }
      }
    }
  }
}
</style>
