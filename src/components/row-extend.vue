<template>
  <div class="form-box expand-row">
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
        action="http://47.106.128.201/v1/basis/upload"
        style="display: inline-block;width:58px;">
        <div style="width: 100%;height:100%;line-height: 100%;position:relative;">
            <img class="img-show" id="img-show-add" src="https://res.sui.com/img/tally/default.jpg">
            <h2 style="position:absolute;top:50px;width:100%;text-align:center;color: #999;">点击上传</h2>
        </div>
      </Upload>
      <span @click="cancleImg()" style="position:absolute;top:2px;right: -10px;color: #2fa0ff;display: block;width: 12px;height: 12px;z-index: 2;cursor:pointer;" v-show="hasUpload">X</span>
      <img class="preUpload" :src="uploadImg" v-show="hasUpload">
    </div>
    <div class="form-right">
      <Form :ref="rowData.id" :model="rowData" :rules="rowRuleValidate" inline :label-width="80">
        <Row>
          <Col span="6">
            <FormItem prop="category" label="分类">
              <Select v-model="rowData.category" placeholder="选择分类" style="width: 120px;">
                <Option value="衣服饰品">衣服饰品</Option>
                <Option value="食品酒水">食品酒水</Option>
                <Option value="居家物业">居家物业</Option>
                <Option value="行车交通">行车交通</Option>
                <Option value="交流通讯">交流通讯</Option>
                <Option value="休闲娱乐">休闲娱乐</Option>
                <Option value="学习进修">学习进修</Option>
                <Option value="人情往来">人情往来</Option>
                <Option value="医疗保健">医疗保健</Option>
                <Option value="金融保险">金融保险</Option>
                <Option value="其他杂项">其他杂项</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="account" label="账户">
              <Select v-model="rowData.account" placeholder="选择账户" style="width: 120px;">
                <Option value="现金">现金</Option>
                <Option value="银行卡">银行卡</Option>
                <Option value="支付宝">支付宝</Option>
                <Option value="饭卡">饭卡</Option>
                <Option value="公交卡">公交卡</Option>
                <Option value="微信钱包">微信钱包</Option>
                <Option value="应付款项">应付款项</Option>
                <Option value="信用卡">信用卡</Option>
                <Option value="公司报销">公司报销</Option>
                <Option value="应收款项">应收款项</Option>
                <Option value="股票账户">股票账户</Option>
                <Option value="余额宝">余额宝</Option>
                <Option value="基金账户">基金账户</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="price" label="金额">
              <input v-model="rowData.price" placeholder="计算金额" class="ivu-input" id="moneyRowIpt" style="width: 120px;"/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="member" label="成员">
              <Select v-model="rowData.member" placeholder="选择成员" style="width: 120px;">
                <Option value="本人">本人</Option>
                <Option value="老公">老公</Option>
                <Option value="老婆">老婆</Option>
                <Option value="子女">子女</Option>
                <Option value="父母">父母</Option>
                <Option value="家庭公用">家庭公用</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem prop="recordTime" label="时间">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" @on-change="rowData.recordTime = $event" style="width: 120px;" type="datetime" :placeholder="rowData.recordTime"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="project" label="项目">
              <Select v-model="rowData.project" placeholder="选择项目" style="width: 120px;">
                <Option value="红包">红包</Option>
                <Option value="过年买票">过年买票</Option>
                <Option value="回家过年">回家过年</Option>
                <Option value="公司报销">公司报销</Option>
                <Option value="旅游">旅游</Option>
                <Option value="出差">出差</Option>
                <Option value="装修">装修</Option>
                <Option value="娱乐">娱乐</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="business" label="商家">
              <Select v-model="rowData.business" placeholder="选择商家" style="width: 120px;">
                <Option value="其他">其他</Option>
                <Option value="饭堂">饭堂</Option>
                <Option value="银行">银行</Option>
                <Option value="商场">商场</Option>
                <Option value="超市">超市</Option>
                <Option value="公交">公交</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="warning" style="width: 80px;" @click="delModal = true">删除</Button>
              <Modal v-model="delModal" @on-ok="handleDelete(rowData.id)">
                  <p>确定删除？</p>
              </Modal>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18">
            <FormItem label="备注" prop="remark">
              <Input class="remark" style="width: 400px;" v-model="rowData.remark" :autosize="{minRows: 2,maxRows: 5}" placeholder="填写备注"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="primary" style="width: 80px;" @click="handleSubmit(rowData.id)">保存</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  data () {
    return {
      delModal: false,
      dateTip: '',
      dateTipS: '',
      dateTipAll: '',
      uploadImg: '',
      imgName: '',
      rowData: {},
      visible: false,
      uploadList: [],
      hasUpload: false,
      defaultList: [],
      rowRuleValidate: {
        price: [
          {
            required: true,
            validator: this.validatePrice,
            trigger: 'blur'
          }
        ],
        category: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请选择账户', trigger: 'blur' }
        ],
        member: [
          { required: true, message: '请选择成员', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        business: [
          { required: true, message: '请选择商家', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let $ = require('jquery')
    this.rowData = this.row
    if (this.rowData.img !== '') {
      this.uploadImg = this.rowData.img
      this.hasUpload = true
    }
    this.uploadImg = this.rowData.img
    let dateT = new Date()
    $('#moneyRowIpt').calculator()
    this.dateTipS = `${dateT.getFullYear()}-${dateT.getMonth() < 10 ? '0' + String(dateT.getMonth()) : dateT.getMonth()}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()}`
    this.dateTip = `${dateT.getFullYear()}-${dateT.getMonth() + 1 < 10 ? '0' + String(dateT.getMonth() + 1) : dateT.getMonth() + 1}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()}`
    this.dateTipAll = `${dateT.getFullYear()}-${dateT.getMonth() + 1 < 10 ? '0' + String(dateT.getMonth() + 1) : dateT.getMonth() + 1}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()} ${dateT.getHours() < 10 ? '0' + String(dateT.getHours()) : dateT.getHours()}:${dateT.getMinutes() < 10 ? '0' + String(dateT.getMinutes()) : dateT.getMinutes()}:${dateT.getSeconds() < 10 ? '0' + String(dateT.getSeconds()) : dateT.getSeconds()}`
  },
  methods: {
    validatePrice (rule, value, callback) {
      let $ = require('jquery')
      if (this.rowData.price === '' || $('#moneyRowIpt').val() === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
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
    handleSuccess (res, file) {
      this.uploadImg = res.url
      this.hasUpload = true
    },
    handleDelete (id) {
      this.$http.delete(`/finance/${id}`).then(res => {
        this.$Message.success('删除成功!')
        this.$emit('saveSuc')
      })
    },
    cancleImg () {
      this.hasUpload = false
      this.uploadImg = ''
    },
    handleSubmit (id) {
      let _this = this
      this.$refs[id].validate((valid) => {
        if (valid) {
          let rowDataTemp = {
            'type': _this.rowData.type,
            'img': _this.uploadImg,
            'category': _this.rowData.category,
            'account': _this.rowData.account,
            'price': _this.rowData.price,
            'member': _this.rowData.member,
            'recordTime': _this.rowData.recordTime,
            'project': _this.rowData.project,
            'business': _this.rowData.business,
            'remark': _this.rowData.remark
          }
          // for (var k in rowDataTemp) {
          //   if ((rowDataTemp[k] === '' || rowDataTemp[k] === []) && k !== 'img') return
          // }
          _this.$http.put(`/finance/${id}`, rowDataTemp).then(res => {
            _this.$Message.success('修改成功!')
            _this.$emit('saveSuc')
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.expand-row {
  margin-bottom: 16px;
  &.form-box{
    .form-left{
      margin: 0;
      width: 100px;
      height: 100px;
      float: left;
    }
    .form-right{
      margin: 0;
      width: 680px;
    }
  }
}
</style>
