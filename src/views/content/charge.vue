<template>
  <div class="charge">
    <Menu class="charge-menu" mode="horizontal" theme="primary" @on-select="typeModel" active-name="1.1">
      <MenuItem name="2.1">
          支出
      </MenuItem>
      <MenuItem name="1.1">
          收入
      </MenuItem>
      <MenuItem name="2.2">
          转账
      </MenuItem>
      <MenuItem name="2.3">
          代付
      </MenuItem>
      <MenuItem name="1.2">
          借入
      </MenuItem>
      <MenuItem name="2.4">
          借出
      </MenuItem>
      <MenuItem name="2.5">
          还款
      </MenuItem>
      <MenuItem name="1.3">
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
        <Form ref="saveForm" :model="formValidate" :rules="ruleValidate" inline :label-width="80">
          <Row>
            <Col span="6">
              <FormItem prop="category" label="分类">
                <Select v-model="formValidate.category" placeholder="选择分类" style="width: 140px;">
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
                <Select v-model="formValidate.account" placeholder="选择账户" style="width: 140px;">
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
                <input v-model="formValidate.price" placeholder="计算金额" class="ivu-input" id="moneyIpt" style="width: 140px;"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="member" label="成员">
                <Select v-model="formValidate.member" placeholder="选择成员" style="width: 140px;">
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
                <DatePicker format="yyyy-MM-dd HH:mm:ss" @on-change="formValidate.recordTime = $event" style="width: 140px;" type="datetime" :placeholder="dateTipAll"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="project" label="项目">
                <Select v-model="formValidate.project" placeholder="选择项目" style="width: 140px;">
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
                <Select v-model="formValidate.business" placeholder="选择商家" style="width: 140px;">
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
                <Button type="primary" style="width: 120px;" @click="handleSubmit('saveForm')">保存</Button>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="备注" prop="remark">
            <Input class="remark" style="width:400px;" v-model="formValidate.remark" :autosize="{minRows: 2,maxRows: 5}" placeholder="填写备注"></Input>
          </FormItem>
        </Form>
      </div>
      <div id="filter-tit" class="clearfix">
        <ul class="ft-date clearfix" id="ft-date">
          <li class="account-list-title">账目清单</li>
          <li id="ft-date-begin">{{monthVal}}</li>
        </ul>
        <ul class="ft-total">
          <li>
            总支出：<span class="green number" id="ft-payout">{{monthlyData.expenses}}</span>&nbsp;&nbsp;
            总收入：<span class="orange number" id="ft-income">{{monthlyData.income}}</span>&nbsp;&nbsp;
            结余：<span class="number gray" id="ft-remain">{{monthlyData.balance}}</span>&nbsp;&nbsp;
            <span class="normal">（单位：元）</span>
          </li>
        </ul>
      </div>
      <div class="filter-bar">
        <Button style="width: 100px;" @click="chargeAll">全部</Button>
        <Dropdown @on-visible-change="dropChanging = 1" @on-click="dropChange" trigger="click" style="width: 96px;margin-left: 20px">
          <Button href="javascript:void(0)" style="width: 96px;">
            {{drops.categoryList}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="">全部分类</DropdownItem>
            <DropdownItem name="衣服饰品">衣服饰品</DropdownItem>
            <DropdownItem name="食品酒水">食品酒水</DropdownItem>
            <DropdownItem name="居家物业">居家物业</DropdownItem>
            <DropdownItem name="行车交通">行车交通</DropdownItem>
            <DropdownItem name="交流通讯">交流通讯</DropdownItem>
            <DropdownItem name="休闲娱乐">休闲娱乐</DropdownItem>
            <DropdownItem name="学习进修">学习进修</DropdownItem>
            <DropdownItem name="人情往来">人情往来</DropdownItem>
            <DropdownItem name="医疗保健">医疗保健</DropdownItem>
            <DropdownItem name="金融保险">金融保险</DropdownItem>
            <DropdownItem name="其他杂项">其他杂项</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown @on-visible-change="dropChanging = 2" @on-click="dropChange" trigger="click" style="width: 96px;">
          <Button href="javascript:void(0)" style="width: 96px;">
            {{drops.accountList}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="">全部账户</DropdownItem>
            <DropdownItem name="现金">现金</DropdownItem>
            <DropdownItem name="银行卡">银行卡</DropdownItem>
            <DropdownItem name="支付宝">支付宝</DropdownItem>
            <DropdownItem name="饭卡">饭卡</DropdownItem>
            <DropdownItem name="公交卡">公交卡</DropdownItem>
            <DropdownItem name="微信钱包">微信钱包</DropdownItem>
            <DropdownItem name="应付款项">应付款项</DropdownItem>
            <DropdownItem name="信用卡">信用卡</DropdownItem>
            <DropdownItem name="公司报销">公司报销</DropdownItem>
            <DropdownItem name="应收款项">应收款项</DropdownItem>
            <DropdownItem name="股票账户">股票账户</DropdownItem>
            <DropdownItem name="余额宝">余额宝</DropdownItem>
            <DropdownItem name="基金账户">基金账户</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown @on-visible-change="dropChanging = 3" @on-click="dropChange" trigger="click" style="width: 96px;">
          <Button href="javascript:void(0)" style="width: 96px;">
            {{drops.businessList}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="">全部商家</DropdownItem>
            <DropdownItem name="其他">其他</DropdownItem>
            <DropdownItem name="饭堂">饭堂</DropdownItem>
            <DropdownItem name="银行">银行</DropdownItem>
            <DropdownItem name="商场">商场</DropdownItem>
            <DropdownItem name="超市">超市</DropdownItem>
            <DropdownItem name="公交">公交</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown @on-visible-change="dropChanging = 4" @on-click="dropChange" trigger="click" style="width: 96px;">
          <Button href="javascript:void(0)" style="width: 96px;">
            {{drops.projectList}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="">全部项目</DropdownItem>
            <DropdownItem name="红包">红包</DropdownItem>
            <DropdownItem name="过年买票">过年买票</DropdownItem>
            <DropdownItem name="回家过年">回家过年</DropdownItem>
            <DropdownItem name="公司报销">公司报销</DropdownItem>
            <DropdownItem name="旅游">旅游</DropdownItem>
            <DropdownItem name="出差">出差</DropdownItem>
            <DropdownItem name="装修">装修</DropdownItem>
            <DropdownItem name="娱乐">娱乐</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown @on-visible-change="dropChanging = 5" @on-click="dropChange" trigger="click" style="width: 96px;">
          <Button href="javascript:void(0)" style="width: 96px;">
            {{drops.memberList}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="">全部成员</DropdownItem>
            <DropdownItem name="本人">本人</DropdownItem>
            <DropdownItem name="老公">老公</DropdownItem>
            <DropdownItem name="老婆">老婆</DropdownItem>
            <DropdownItem name="子女">子女</DropdownItem>
            <DropdownItem name="父母">父母</DropdownItem>
            <DropdownItem name="家庭公用">家庭公用</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown trigger="click">
          <Button href="javascript:void(0)" style="width: 200px;">
            {{dateRange}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list" style="padding: 4px;">
            从<DatePicker format="yyyy-MM-dd" @on-change="dpChangeStart" type="date" :placeholder="dateTipS" style="width: 120px;margin: 4px;"></DatePicker>
            到<DatePicker format="yyyy-MM-dd" @on-change="dpChangeEnd" type="date" :placeholder="dateTip" style="width: 120px;margin: 4px;"></DatePicker>
            <Button @click="resetDate">重置</Button>
          </DropdownMenu>
        </Dropdown>
        <Input placeholder="搜索备注关键字" v-model="financeSearch.remark" style="width: 120px;margin-left: 40px;"></Input>
        <Button @click="handleSearch" style="flex: 0.5;margin-left: auto;margin-right: 20px;">确定</Button>
      </div>
      <div class="charge-form">
        <div class="filter-timeline">
          <div id="fc-year"><div id="fcy-box">选择月份</div></div>
          <div id="fc-month">
            <div id="fc-month-box">
              <div class="fc-item-box" v-for="(item, index) in monthData" :key="index">
                <div class="fc-title-year">{{item.year}}年</div>
                <div v-for="(mItem, mIndex) in item.months" :key="mIndex" :name="`${item.year}-${mItem}`" class="fc-months" @click="monthChange(`${item.year}-${mItem}`)">{{mItem}}月</div>
              </div>
            </div>
          </div>
        </div>
        <Table style="width: 872px;float: right;" @on-row-click="rowClick" highlight-row ref="currentRowTable" :columns="columns3" :data="data1"></Table>
      </div>
      <!-- <div style="margin: 10px;overflow: hidden;float: right;">
        <div style="float: right;">
          <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </div> -->
    </div>
    <div class="jcalculator-modal"></div>
  </div>
</template>
<script>
import '../../../static/jcalculator/jcalculator.js'
import expandRow from '../../components/row-extend'
export default {
  name: 'charge',
  components: { expandRow },
  data () {
    return {
      filter1: {},
      financeSearch: {
        'month': '',
        'remark': '',
        'categoryList': [],
        'accountList': [],
        'memberList': [],
        'projectList': [],
        'businessList': [],
        'startRecordTime': '',
        'endRecordTime': ''
      },
      drops: {
        'categoryList': '全部分类',
        'accountList': '全部账户',
        'businessList': '全部商家',
        'projectList': '全部项目',
        'memberList': '全部成员'
      },
      dropChanging: 1,
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      hasUpload: false,
      uploadImg: '',
      formValidate: {
        'type': 1,
        'img': '',
        'category': '',
        'account': '',
        'price': '',
        'member': '',
        'recordTime': '',
        'project': '',
        'business': '',
        'remark': ''
      },
      ruleValidate: {
        price: [
          { required: true, message: '请输入金额', trigger: 'blur' }
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
      },
      columns3: [
        {
          type: 'expand',
          width: 20,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              },
              on: {
                saveSuc: () => {
                  this.tableSearch()
                }
              }
            })
          }
        },
        {
          title: '日期',
          key: 'recordTime',
          width: 100
        },
        {
          title: '图片',
          key: 'img',
          render: (h, params) => {
            if (params.row.img === '' || !params.row.img) return
            return h('img', {
              attrs: {
                src: params.row.img,
                class: 'table-img'
              }
            })
          }
        },
        {
          title: '分类',
          key: 'category'
        },
        {
          title: '类型',
          key: 'type',
          render: (h, params) => {
            return h('i', params.row.type === 1 ? '收入' : '支出')
          }
        },
        {
          title: '金额',
          key: 'price'
        },
        {
          title: '账户',
          key: 'account'
        },
        {
          title: '商家/对方账户',
          key: 'business',
          width: 120
        },
        {
          title: '项目',
          key: 'project'
        },
        {
          title: '备注',
          key: 'remark'
        }
      ],
      data1: [],
      monthData: [
        {
          year: '2019',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2018',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2017',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2016',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2015',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2014',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2013',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2012',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2011',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2010',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2009',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2008',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        },
        {
          year: '2007',
          months: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
        }
      ],
      monthVal: '2018-05',
      dateTip: '',
      dateTipS: '',
      dateTipAll: '',
      dateRange: '',
      monthlyData: {
        income: 0,
        expenses: 0,
        balance: 0
      }
    }
  },
  computed: {
  },
  watch: {
    'uploadImg': function (n, o) {
      if (n !== '') {
        this.formValidate.img = n
      }
    }
  },
  mounted () {
    if (!localStorage.getItem('curUser')) return
    let $ = require('jquery')
    let dateT = new Date()
    this.dateTipS = `${dateT.getFullYear()}-${dateT.getMonth() < 10 ? '0' + String(dateT.getMonth()) : dateT.getMonth()}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()}`
    this.dateTip = `${dateT.getFullYear()}-${dateT.getMonth() + 1 < 10 ? '0' + String(dateT.getMonth() + 1) : dateT.getMonth() + 1}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()}`
    this.financeSearch.startRecordTime = this.dateTipS
    this.financeSearch.endRecordTime = this.dateTip
    this.dateTipAll = `${dateT.getFullYear()}-${dateT.getMonth() + 1 < 10 ? '0' + String(dateT.getMonth() + 1) : dateT.getMonth() + 1}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()} ${dateT.getHours() < 10 ? '0' + String(dateT.getHours()) : dateT.getHours()}:${dateT.getMinutes() < 10 ? '0' + String(dateT.getMinutes()) : dateT.getMinutes()}:${dateT.getSeconds() < 10 ? '0' + String(dateT.getSeconds()) : dateT.getSeconds()}`
    this.formValidate.recordTime = this.dateTipAll
    this.dateRange = `从${this.dateTipS} 到${this.dateTip}`
    $('#moneyIpt').calculator()
    this.tableSearch()
    let _this = this
    $('.jcalculator-modal').on('click', function (e) {
      _this.formValidate.price = $('#moneyIpt').val()
      $(this).hide()
      $('.jcalculator').hide()
    })
    $('.ivu-menu-item').eq(1).click()
    this.monthChange(`${dateT.getFullYear()}-${dateT.getMonth() + 1 < 10 ? '0' + String(dateT.getMonth() + 1) : dateT.getMonth() + 1}`)
    this.$nextTick(() => {
      setTimeout(() => {
        $('#fc-month')[0].scrollTop = 700
      }, 0)
    })
  },
  methods: {
    dpChangeStart ($event) {
      this.financeSearch.startRecordTime = $event
      this.dateRange = `从${this.financeSearch.startRecordTime} 到${this.financeSearch.endRecordTime}`
    },
    dpChangeEnd ($event) {
      this.financeSearch.endRecordTime = $event
      this.dateRange = `从${this.financeSearch.startRecordTime} 到${this.financeSearch.endRecordTime}`
    },
    tableSearch () {
      this.$http.post('/finance/search', this.financeSearch).then((res) => {
        this.data1 = res.data.data
        this.monthlyData = {
          income: res.data.income,
          expenses: res.data.expenses,
          balance: res.data.balance
        }
      })
    },
    dropChange (name) {
      let dropArr = ['categoryList', 'accountList', 'businessList', 'projectList', 'memberList']
      let dropArrAll = ['全部分类', '全部账户', '全部商家', '全部项目', '全部成员']
      this.drops[dropArr[this.dropChanging - 1]] = name === '' ? dropArrAll[this.dropChanging - 1] : name
      this.financeSearch[dropArr[this.dropChanging - 1]] = name === '' ? [] : [name]
    },
    handleSearch () {
      this.tableSearch()
    },
    cancleImg () {
      this.hasUpload = false
      this.uploadImg = ''
    },
    handleSuccess (res, file) {
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
          console.log(this.formValidate)
          this.$http.post('/finance', this.formValidate).then(res => {
            this.$Message.success('Success!')
            this.chargeAll()
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    typeModel (name) {
      this.formValidate.type = parseInt(Number(name)).toString()
    },
    monthChange (month) {
      let $ = require('jquery')
      $('.charge-form #fc-month-box .fc-item-box .fc-months').removeClass('fc-month-selected')
      $(`.charge-form #fc-month-box .fc-item-box div[name=${month}]`).addClass('fc-month-selected')
      this.financeSearch.month = month
      this.financeSearch.startRecordTime = ''
      this.financeSearch.endRecordTime = ''
      this.dateRange = `${month}`
      this.tableSearch()
    },
    chargeAll () {
      let $ = require('jquery')
      $('.charge-form #fc-month-box .fc-item-box .fc-months').removeClass('fc-month-selected')
      let dropArrAll = ['全部分类', '全部账户', '全部商家', '全部项目', '全部成员']
      let dropArr = ['categoryList', 'accountList', 'businessList', 'projectList', 'memberList']
      for (let i = 0; i < dropArrAll.length; i++) {
        this.drops[dropArr[i]] = dropArrAll[i]
      }
      this.dateRange = '全部日期'
      this.financeSearch = {
        'month': '',
        'remark': '',
        'categoryList': [],
        'accountList': [],
        'memberList': [],
        'projectList': [],
        'businessList': [],
        'startRecordTime': '',
        'endRecordTime': ''
      }
      this.tableSearch()
    },
    resetDate () {
      let $ = require('jquery')
      $('body').click()
      this.financeSearch.month = ''
      this.financeSearch.startRecordTime = ''
      this.financeSearch.endRecordTime = ''
      this.dateRange = '全部日期'
    },
    rowClick (row, index) {
      // console.log(row)
      // console.log(index)
      // let $ = require('jquery')
      // let rowContent = $('.charge-form .ivu-table .ivu-table-body').find('.ivu-table-row').eq(index).html()
      // $('.row-operate').remove()
      // console.log($('.charge-form .ivu-table .ivu-table-body').find('.ivu-table-row').eq(index).find('.row-operate'))
      // $('.charge-form .ivu-table .ivu-table-body').find('.ivu-table-row').eq(index).html(rowContent + '<td class="row-operate"><h3>123</h3></td>')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../static/jcalculator/jcalculator.css';
.charge{
  position: relative;
  .jcalculator{
    top: 36px;
    box-sizing: content-box;
    z-index: 3;
  }
  .jcalculator-modal{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    display: none;
  }
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
        background: #2fa0ff;
        background: -webkit-linear-gradient(top,rgba(200,134,44,0.55),rgba(183,117,32,0.55));
        background: -moz-linear-gradient(top,rgba(200,134,44,0.55),rgba(183,117,32,0.55));
        background: linear-gradient(to bottom,rgba(200,134,44,0.55),rgba(183,117,32,0.55));
        color: #fff;
      }
    }
  }
  .form-box{
    box-shadow: inset 0 1px 0 0 #fff, inset -1px 0 0 0 #fff, inset 1px 0 0 0 #fff;
    background-color: #fff;
    .form-left{
      height: 124px;
      padding: 3px;
      margin: 17px 0 0 27px;
      position: relative;
      display: inline-block;
      width: 124px;
      img{
        width: 100%;
        height: 100%;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }
    }
    .form-right{
      width: 800px;
      min-height: 124px;
      margin-top: 28px;
      margin-left: 15px;
      display: inline-block;
    }
    .filter-bar{
      height: 42px;
      background: #f6f6f6;
      background: -webkit-linear-gradient(top,#f6f6f6,#f1f1f1);
      background: -moz-linear-gradient(top,#f6f6f6,#f1f1f1);
      background: linear-gradient(to bottom,#f6f6f6,#f1f1f1);
      box-shadow: 0 1px 1px rgba(0,0,0,0.02);
      @include flex(row, start);
    }
    .charge-form{
      width: 100%;
      .row-operate{
        width: 800px;
        float: left;
        height: 60px;
      }
      .table-img{
        height: 45px;
      }
      .filter-timeline{
        position: relative;
        float: left;
        width: 120px;
        margin-left: 10px;
        background: #fff;
        height: 600px;
        #fc-month {
          border: 1px solid #2fa0ff;
          height: 560px;
          cursor: default;
          overflow: auto;
          position: relative;
          -moz-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          #fc-month-box{
            width: 100%;
            height: auto;
            float: left;
            .fc-item-box{
              width: 100%;
              height: 504px;
              float: left;
              .fc-title-year{
                width: 100%;
                height: 24px;
                font-size: 16px;
                color: #2fa0ff;
                line-height: 24px;
                padding: 4px 4px 0 20px;
              }
              .fc-months{
                width: 100%;
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                text-align: right;
                margin-bottom: 8px;
                border-bottom: 1px dashed #ccc;
                padding: 0px 30px 4px 0;
                cursor: pointer;
                &.fc-month-selected{
                  color: red;
                }
              }
            }
          }
        }
        #fcy-box {
          position: relative;
          height: 34px;
          line-height: 34px;
          color: #2e2e2e;
          text-align: center;
          font-size: 15px;
          background: #fafafa;
          border-bottom: 1px solid #e7e7e7;
          border-radius: 6px 0 0 0;
        }
        #fcy-box, #fc-tit {
          background: -webkit-linear-gradient(top,#fafafa,#f4f3f3);
          background: -moz-linear-gradient(top,#fafafa,#f4f3f3);
          background: linear-gradient(to bottom,#fafafa,#f4f3f3);
        }
      }
    }
  }
  #filter-tit{
    height: 60px;
    clear: both;
    position: relative;
    background: -webkit-linear-gradient(top,#fdfdfd 50%,#fff);
    background: -moz-linear-gradient(top,#fdfdfd 50%,#fff);
    background: linear-gradient(to bottom,#fdfdfd 50%,#fff);
    #ft-date {
      float: left;
      display: inline-block;
      height: 60px;
      line-height: 60px;
      li{
        float: left;
        font-size: 12px;
        font-weight: bold;
        line-height: 70px;
        &.account-list-title {
          font-size: 17px;
          margin-right: 12px;
          line-height: 65px;
          padding-left: 14px;
        }
      }
    }
    .ft-total {
      float: right;
      height: 60px;
      line-height: 68px;
      font-size: 12px;
      li {
        float: right;
        &.normal {
          font-weight: normal;
          color: #2e2e2e;
        }
      }
      .number {
        font-size: 17px;
        font-weight: bold;
        font-family: Helvetica,sans-serif,Arial,tahoma,"Hiragino Sans GB",Mingliu;
      }
    }
  }
}
</style>
