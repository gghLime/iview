<template>
  <div class="login">
    <cptHeader :isLogin='true'></cptHeader>
    <div class="login-form-div">
      <Form v-show="formType === 'login'" ref="loginForm" :model="userLogin" :rules="loginline" class="login-form">
          <p class="login-form-title">账号登录</p>
          <FormItem prop="account">
              <Input size="large" type="text" v-model="userLogin.account" placeholder="请输入账号">
                  <label slot="prepend">登录帐号</label>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input size="large" type="password" v-model="userLogin.password" placeholder="请输入密码">
                  <label slot="prepend">用户密码</label>
              </Input>
          </FormItem>
          <FormItem>
              <Button type="primary" class="login-btn" @click="handleSubmit('loginForm')">登录</Button>
          </FormItem>
          <FormItem>
            <div class="login-control">
              <Checkbox v-model="keepLogin">记住密码</Checkbox>
              <p @click="$store.commit('loginFormChange', 'sign')">免费注册</p>
            </div>
          </FormItem>
      </Form>
      <Form v-show="formType === 'sign'" ref="signForm" :model="userSign" :rules="signline" class="login-form">
          <p class="login-form-title">账号登录</p>
          <FormItem prop="account">
              <Input size="large" type="text" v-model="userSign.account" placeholder="请输入账户名">
                  <label slot="prepend">登录帐号</label>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input size="large" type="password" v-model="userSign.password" placeholder="请输入密码">
                  <label slot="prepend">用户密码</label>
              </Input>
          </FormItem>
          <FormItem prop="confirm">
              <Input size="large" type="password" v-model="userSign.confirm" placeholder="请确认密码">
                  <label slot="prepend">重复密码</label>
              </Input>
          </FormItem>
          <FormItem prop="captchaCode">
              <Input size="large" type="text" v-model="userSign.captchaCode" placeholder="验证码">
                <img @click="getCaptchaCode" class="form-captcha" slot="append" :src="captchaBase64"/>>
              </Input>
          </FormItem>
          <FormItem>
              <Button type="primary" class="login-btn" @click="handleSubmit('signForm')">注册</Button>
          </FormItem>
      </Form>
    </div>
    <!-- <cptFooter></cptFooter> -->
  </div>
</template>

<script>
import cptHeader from '../components/header'
import cptFooter from '../components/footer'
export default {
  name: 'login',
  components: { cptHeader, cptFooter },
  data () {
    return {
      userLogin: {
        account: '',
        password: ''
      },
      userSign: {
        account: '',
        password: '',
        confirm: '',
        captchaToken: '',
        captchaCode: ''
      },
      loginline: {
        account: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      signline: {
        account: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        captchaCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: this.validatePass,
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码最少为6位',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            validator: this.validatePassCheck,
            trigger: 'blur'
          }
        ]
      },
      keepLogin: '',
      captchaCode: '',
      captchaCodeCheck: '',
      captchaBase64: ''
    }
  },
  computed: {
    formType () {
      return this.$store.state.formType
    }
  },
  mounted () {
    this.getCaptchaCode()
    if (localStorage.getItem('userinfo') && localStorage.getItem('userinfo') !== '') {
      this.userLogin = JSON.parse(localStorage.getItem('userinfo'))
    }
  },
  watch: {
    keepLogin (n, o) {
      if (!n) {
        localStorage.removeItem('userinfo')
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this[`${name}Submit`]()
        }
      })
    },
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userSign.confirm !== '') {
          this.$refs.signForm.validateField('confirm')
        }
        callback()
      }
    },
    validatePassCheck (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userSign.password) {
        callback(new Error('两次密码不匹配!'))
      } else {
        callback()
      }
    },
    getCaptchaCode () {
      this.$http.get('/basis/captcha').then((res) => {
        if (res.status === 200) {
          this.userSign.captchaToken = res.data.token
          this.captchaBase64 = res.data.imgs
        }
      })
    },
    loginFormSubmit () {
      const _this = this
      this.$http.post('/users/login', this.userLogin).then((res) => {
        localStorage.setItem('curUser', JSON.stringify(res.data))
        if (res.status === 200) {
          _this.$http.get('/users/info').then(res => {
            if (_this.keepLogin) {
              localStorage.setItem('userinfo', JSON.stringify(res.data))
            }
            localStorage.setItem('curUser', JSON.stringify(res.data))
            _this.$router.push('/')
          })
          _this.userLogin.id = res.data.id
          _this.$store.commit('setUserId', res.data.id)
        } else {
          _this.$Message.error(res.message)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.error(error.response.data.message)
      })
    },
    signFormSubmit () {
      this.$http.post('/users', {
        'account': this.userSign.account,
        'password': this.userSign.password,
        'captchaToken': this.userSign.captchaToken,
        'captchaCode': this.userSign.captchaCode
      }).then(() => {
        this.userLogin = {
          'account': this.userSign.account,
          'password': this.userSign.password
        }
        this.loginFormSubmit()
      }).catch(error => {
        this.$Message.error(error.response.data.message)
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.login {
  width: $all;
  height: $all;
  .login-form-div{
    height: calc(100% - 140px);
    .login-form{
      width: 400px;
      height: 100%;
      margin: 120px auto;
      .ivu-form-item{
        margin-bottom: 32px;
      }
      .login-form-title{
        width: $all;
        text-align: center;
        line-height: 64px;
        margin-bottom: 20px;
        color: #2fa0ff;
        font-size: 24px;
        border-bottom: 4px solid #2fa0ff;
      }
      .login-btn {
        border: 0;
        display: inline-block;
        width: 100%;
        height: 36px;
        text-align: center;
        background-color: #2fa0ff;
        color: #fff;
        font-size: 16px;
        border-radius: 3px;
        &:hover{
          background-color: #276fd4;
        }
      }
      .login-control{
        @include flex(row, space-between, center);
        padding: 0 20px;
        p{
          color: #0091d5;
          cursor: pointer;
          &:hover{
            color: #c58534
          }
        }
      }
      .form-captcha{
        height: 32px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}
</style>
