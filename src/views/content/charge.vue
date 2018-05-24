<template>
  <div class="charge">
    <Menu class="charge-menu" mode="horizontal" theme="primary" active-name="1">
      <MenuItem name="1">
          支出
      </MenuItem>
      <MenuItem name="2">
          收入
      </MenuItem>
      <MenuItem name="3">
          转账
      </MenuItem>
      <MenuItem name="4">
          代付
      </MenuItem>
      <MenuItem name="5">
          借入
      </MenuItem>
      <MenuItem name="6">
          借出
      </MenuItem>
      <MenuItem name="7">
          还款
      </MenuItem>
      <MenuItem name="8">
          收债
      </MenuItem>
    </Menu>
    <div class="form-box">
      <div class="form-left">
        <Upload v-show="!hasUpload"
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          type="drag"
          name="fileByte"
          action="http://139.199.23.31:8080/v1/basis/upload"
          style="display: inline-block;width:58px;">
          <div style="width: 100%;height:100%;line-height: 100%;position:relative;">
              <img class="img-show" id="img-show-add" src="https://res.sui.com/img/tally/default.jpg">
              <h2 style="position:absolute;top:50px;width:100%;text-align:center;color: #999;">点击上传</h2>
          </div>
        </Upload>
        <img class="preUpload" :src="uploadImg" v-show="hasUpload">
      </div>
      <div class="form-right">
        <Form ref="formValidate" :model="formValidate" :label-width="80" inline>
        <FormItem>
          <Row>
                <Col span="11">
                    <FormItem prop="city">
                      <Select v-model="formValidate.city" placeholder="Select your city">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                      </Select>
                      <Select v-model="formValidate.city" placeholder="Select your city">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                      </Select>
                      <Select v-model="formValidate.city" placeholder="Select your city">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                      </Select>
                    </FormItem>
                </Col>
            </Row>
          <Row>
                <Col span="11">
                    <FormItem prop="city">
                      <Select v-model="formValidate.city" placeholder="Select your city">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                      </Select>
                      <Select v-model="formValidate.city" placeholder="Select your city">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                      </Select>
                      <Select v-model="formValidate.city" placeholder="Select your city">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                      </Select>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'charge',
  data () {
    return {
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      hasUpload: false,
      uploadImg: '',
      formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                }
    }
  },
  computed: {
  },
  methods: {
    handleSuccess (res, file) {
      console.log(res)
      this.uploadImg = res.url
      this.hasUpload = true
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },
    handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.charge{
  .charge-menu{
    width: 100%;
    padding-top: 4px;
    padding-left: 2px;
    li{
      width: 80px;
      height: 100%;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      text-align: center;
      &:hover {
        background: #c68f4a;
        background: -webkit-linear-gradient(top,rgba(200,134,44,0.55),rgba(183,117,32,0.55));
        background: -moz-linear-gradient(top,rgba(200,134,44,0.55),rgba(183,117,32,0.55));
        background: linear-gradient(to bottom,rgba(200,134,44,0.55),rgba(183,117,32,0.55));
        color: #fff;
      }
    }
  }
  .form-box{
    width: 100%;
    height: 124px;
    padding: 3px;
    margin: 17px 0 0 27px;
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.15);
    background-color: #fff;
    .form-left{
      position: relative;
      display: inline-block;
      padding: 0;
      width: 118px;
      height: 118px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }
    }
    .form-right{
      width: 500px;
      height: 124px;
      display: inline-block;
    }
  }
}
</style>
