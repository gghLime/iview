<template>
  <div class="user">
    <div class="ov-right">
      <div class="r-content">
        <div id="riHead">
          <div id="touxiang">
            <div class="avatar">
              <a class="tx-a" href="javascript:void(0)">
                <img v-show="uploadImg && uploadImg.length > 0" :src="uploadImg" alt="头像" style="width: 100%; height: 100%; margin: 0px;">
                <img v-show="!uploadImg" src="../../../static/photo_default.png" alt="头像" style="width: 100%; height: 100%; margin: 0px;">
                <Upload
                  ref="upload"
                  name="fileByte"
                  action="http://47.106.128.201/v1/basis/upload"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']">
                  <span class="modify-ava">点击修改</span>
                </Upload>
              </a>
            </div>
            <div class="user-info">
              <p :name="username" v-show="!isEdit" class="username">{{username}}&nbsp;&nbsp;<Icon type="edit" @click="isEdit = true"></Icon></p>
              <div class="name-edit-box" v-show="isEdit">
                <input class="username" v-model="infoModify.nickname"></input><Icon type="checkmark" @click="userinfoModify"></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="r-content">
        <h3 class="item-title">安全设置</h3>
        <div class="modify-pw"></div>
        <Form ref="modifyForm" :model="modifyPw" :rules="signline" class="login-form">
          <FormItem prop="old">
              <Input size="large" type="password" v-model="modifyPw.old" placeholder="请输入密码">
                  <label slot="prepend">旧密码</label>
              </Input>
          </FormItem>
          <FormItem prop="new">
              <Input size="large" type="password" v-model="modifyPw.new" placeholder="请输入密码">
                  <label slot="prepend">新密码</label>
              </Input>
          </FormItem>
          <FormItem prop="confirm">
              <Input size="large" type="password" v-model="modifyPw.confirm" placeholder="请确认密码">
                  <label slot="prepend">重复密码</label>
              </Input>
          </FormItem>
          <FormItem>
              <Button type="primary" style="width: 100px;float: left;" class="login-btn" @click="handleSubmit('modifyForm')">修改</Button>
              <!-- <Input size="large" style="width: 400px;float:right;" type="text" v-model="captchaCode" placeholder="验证码">
                <img @click="getCaptchaCode" class="form-captcha" slot="append" :src="captchaBase64"/>>
              </Input> -->
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      signline: {
        old: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }
        ],
        new: [
          {
            validator: this.validatePass,
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
      modifyPw: {
        old: '',
        new: '',
        confirm: ''
      },
      captchaCode: '',
      captchaCodeCheck: '',
      captchaBase64: '',
      uploadImg: '',
      username: '',
      infoModify: {
        nickname: '',
        avatar: ''
      },
      isEdit: false
    }
  },
  computed: {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (!localStorage.getItem('curUser')) return
      this.$http.get('/users/info').then(res => {
        if (localStorage.getItem('userinfo')) {
          localStorage.setItem('userinfo', JSON.stringify(res.data))
        }
        localStorage.setItem('curUser', JSON.stringify(res.data))
        this.username = res.data.nickname
        this.infoModify.nickname = res.data.nickname
        this.uploadImg = res.data.avatar
      })
    },
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.modifyPw.confirm !== '') {
          this.$refs.modifyForm.validateField('confirm')
        }
        callback()
      }
    },
    validatePassCheck (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modifyPw.new) {
        callback(new Error('两次密码不匹配!'))
      } else {
        callback()
      }
    },
    handleSuccess (res, file) {
      this.uploadImg = res.url
      this.infoModify.avatar = this.uploadImg
      this.userinfoModify()
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(123)
          this.$http.put('/users/changePwd', {
            'oldPwd': this.modifyPw.old,
            'password': this.modifyPw.new
          }).then(() => {
            this.init()
            this.modifyPw = {
              old: '',
              new: '',
              confirm: ''
            }
            this.$Message.success('密码修改成功!')
          }).catch(error => {
            this.$Message.error(error.response.data.message)
          })
        }
      })
    },
    userinfoModify () {
      this.isEdit = false
      this.$http.put('/users', this.infoModify).then(res => {
        this.init()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user{
  .ov-right{
    width: 600px;
    min-height: 948px;
    margin: 0 auto;
    #riHead {
      margin-top: 65px;
      #touxiang {
        position: relative;
        .avatar {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 0 auto;
          .cur-avator{
            display: block;
            width: 100%;
            height: 100%;
          }
          .tx-a {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 4px solid #fff;
            box-shadow: 0 0 27px #e9e5e5;
            overflow: hidden;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            position: relative;
            .modify-ava{
              display: block;
              position: absolute;
              left: auto;
              bottom: 0;
              z-index: 2;
              background: rgba(0,0,0,0.1);
              width: 160px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #333;
              cursor: pointer;
            }
          }
          img {
            width: 110px;
            height: 110px;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
        }
        .user-info {
          margin-top: 15px;
          .name-edit-box{
            @include flex;
            input{
              border:0;
              border-bottom: 1px solid #ccc;
            }
            i{
              cursor: pointer;
            }
          }
          .username {
            display: block;
            color: #2e2e2e;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            i{
              cursor: pointer;
            }
          }
        }
      }
    }
      .item-title{
        font-size: 16px;
        font-weight: normal;
        -webkit-font-smoothing: subpixel-antialiased;
        margin-top: 20px;
      }
      .modify-pw{
        margin: 0 auto;
        width: 600px;
        border-top: 1px solid #eee;
        margin-top: 20px;
        padding-top: 20px;
      }
      .form-captcha{
        height: 32px;
        vertical-align: middle;
        cursor: pointer;
      }
  }
}
</style>
