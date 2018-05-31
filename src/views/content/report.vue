<template>
  <div class="report">
    <div class="left">
      <div class="menu-box">
        <Menu mode="vertical" theme="light" @on-select="reportChange" active-name="1" style="width: 100%;">
          <MenuItem name="1">收支趋势图
          </MenuItem>
          <MenuItem name="2">分类支出饼状图
          </MenuItem>
        </Menu>
      </div>
    </div>
    <div class="right">
      <div class="rTit">
        <div class="exchange-date">
          <span class="e-date-label">汇率日期:</span>
          <a class="e-date" href="/currency/index.do"> {{dateTip}} </a>
          <span class="e-unit">(单位：元)</span>
        </div>
      </div>
      <div class="report-box" v-show="reportType === '1'">
        <div class="filter-bar">
          <Button @click="reset(1)" style="width: 100px;margin-right:20px;">全部</Button>
          从<DatePicker format="yyyy-MM-dd" @on-change="search1.startRecordTime=$event" type="date" :placeholder="dateTipS" style="width: 120px;margin:0 8px;"></DatePicker>
          到<DatePicker format="yyyy-MM-dd" @on-change="search1.endRecordTime=$event" type="date" :placeholder="dateTip" style="width: 120px;margin:0 8px;"></DatePicker>
          <Button @click="handleSearch1" style="margin-left: auto;margin-right: 20px;">确定</Button>
        </div>
        <div id="chart1"></div>
        <div id="table1">
          <Table highlight-row ref="currentRowTable" :columns="columns1" :data="data1"></Table>
        </div>
      </div>
      <div class="report-box" v-show="reportType === '2'">
        <div class="filter-bar">
          <Button @click="reset(2)" style="width: 60px;">全部</Button>
          <Dropdown @on-visible-change="dropChanging = 1" @on-click="dropChange" trigger="click" style="width: 76px;margin-left: 4px">
            <Button href="javascript:void(0)" style="width: 76px;">
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
          <Dropdown @on-visible-change="dropChanging = 2" @on-click="dropChange" trigger="click" style="width: 76px;">
            <Button href="javascript:void(0)" style="width: 76px;">
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
          <Dropdown @on-visible-change="dropChanging = 3" @on-click="dropChange" trigger="click" style="width: 76px;">
            <Button href="javascript:void(0)" style="width: 76px;">
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
          <Dropdown @on-visible-change="dropChanging = 4" @on-click="dropChange" trigger="click" style="width: 76px;">
            <Button href="javascript:void(0)" style="width: 76px;">
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
          <Dropdown @on-visible-change="dropChanging = 5" @on-click="dropChange" trigger="click" style="width: 76px;">
            <Button href="javascript:void(0)" style="width: 76px;">
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
            <Button href="javascript:void(0)" style="width: 170px;">
              {{dateRange}}
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list" style="padding: 4px;">
              从<DatePicker format="yyyy-MM-dd" @on-change="dpChangeStart" type="date" :placeholder="dateTipS" style="width: 120px;margin: 4px;"></DatePicker>
              到<DatePicker format="yyyy-MM-dd" @on-change="dpChangeEnd" type="date" :placeholder="dateTip" style="width: 120px;margin: 4px;"></DatePicker>
            </DropdownMenu>
          </Dropdown>
          <Input placeholder="搜索备注关键字" v-model="search2.remark" style="width: 100px;"></Input>
          <Button @click="handleSearch2" style="flex: 0.5;margin-left: auto;margin-right: 10px;">确定</Button>
        </div>
        <div id="chart2" v-show="chartsData2.length > 0"></div>
        <img src="../../assets/report-pie-demo.png" v-show="chartsData2.length <= 0" class="report-demo"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'report',
  data () {
    return {
      dropChanging: 1,
      reportType: '1',
      filter1: {city: ''},
      chartsData1: {
        xAxisData: [],
        incomeData: [],
        expensesData: [],
        balanceData: []
      },
      search1: {
        startRecordTime: '',
        endRecordTime: ''
      },
      search2: {
        type: 2,
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
      dateTip: '',
      dateTipS: '',
      dateRange: '',
      chartsData2: [],
      chartsNameData2: [],
      columns1: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '收入',
          key: 'income'
        },
        {
          title: '支出',
          key: 'expenses'
        },
        {
          title: '结余',
          key: 'balance'
        }
      ],
      data1: [
        {
          title: 'income',
          income: 18,
          expenses: 28,
          balance: 28
        }
      ]
    }
  },
  computed: {
  },
  mounted () {
    if (!localStorage.getItem('curUser')) return
    let dateT = new Date()
    this.dateTipS = `${dateT.getFullYear()}-${dateT.getMonth() < 10 ? '0' + String(dateT.getMonth()) : dateT.getMonth()}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()}`
    this.dateTip = `${dateT.getFullYear()}-${dateT.getMonth() + 1 < 10 ? '0' + String(dateT.getMonth() + 1) : dateT.getMonth() + 1}-${dateT.getDate() < 10 ? '0' + String(dateT.getDate()) : dateT.getDate()}`
    this.dateRange = `从${this.dateTipS} 到${this.dateTip}`
    this.reset(1)
    this.reset(2)
    let $ = require('jquery')
    this.getCharts1()
    this.getCharts2()
    $('.ivu-menu-item').eq(2).click()
  },
  methods: {
    dpChangeStart ($event) {
      this.search2.startRecordTime = $event
      this.dateRange = `从${this.search2.startRecordTime} 到${this.search2.endRecordTime}`
    },
    dpChangeEnd ($event) {
      this.search2.endRecordTime = $event
      this.dateRange = `从${this.search2.startRecordTime} 到${this.search2.endRecordTime}`
    },
    dropChange (name) {
      let dropArr = ['categoryList', 'accountList', 'businessList', 'projectList', 'memberList']
      let dropArrAll = ['全部分类', '全部账户', '全部商家', '全部项目', '全部成员']
      this.drops[dropArr[this.dropChanging - 1]] = name === '' ? dropArrAll[this.dropChanging - 1] : name
      this.search2[dropArr[this.dropChanging - 1]] = name === '' ? [] : [name]
    },
    reportChange: function (name) {
      this.reportType = name
    },
    handleSearch1 () {
      this.$http.post('/reports/incomeExpensesLinear', this.search1).then(res => {
        this.data1 = res.data.data
        this.chartsData1 = res.data.report
        this.getCharts1()
      })
    },
    handleSearch2 () {
      this.$http.post('/reports/categoryPie', this.search2).then(res => {
        console.log(res)
        this.chartsData2 = res.data.report
        this.chartsNameData2 = []
        this.chartsData2.forEach(item => {
          this.chartsNameData2.push(item.name)
        })
        this.getCharts2()
      })
    },
    reset (n) {
      if (n === 1) {
        this.search1 = {
          startRecordTime: this.dateTipS,
          endRecordTime: this.dateTip
        }
        this.handleSearch1()
      } else if (n === 2) {
        this.search2 = {
          'type': 2,
          'remark': '',
          'categoryList': [],
          'accountList': [],
          'memberList': [],
          'projectList': [],
          'businessList': [],
          'startRecordTime': this.dateTipS,
          'endRecordTime': this.dateTip
        }
        this.handleSearch2()
      }
    },
    getCharts2 () {
      let $ = require('jquery')
      let echarts = require('echarts')
      let chart2 = echarts.init($('#chart2')[0])
      let option2 = {
        title: {
          text: '分类支出饼状图',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br> 金额: {c}<br> 占比: {d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: this.chartsNameData2
        },
        series: [
          {
            name: '分类',
            type: 'pie',
            radius: '70%',
            center: ['45%', '50%'],
            label: {
              normal: {
                formatter: '{d}%',
                position: 'inner'
              }
            },
            data: this.chartsData2,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        color: ['#87CEFA', '#7FFFAA', '#FFB6C1', '#FF7F50', '#556B2F', '#D3D3D3', '#FF4500']
      }
      chart2.setOption(option2)
    },
    getCharts1 () {
      let $ = require('jquery')
      let echarts = require('echarts')
      let chart1 = echarts.init($('#chart1')[0])
      let option1 = {
        title: {
          text: '收支趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['收入数据', '支出数据', '结余数据'],
          bottom: '0'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '40px',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartsData1.xaxisData
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: '收入数据',
            type: 'line',
            label: {
              show: true
            },
            data: this.chartsData1.incomeData
          },
          {
            name: '支出数据',
            type: 'line',
            label: {
              show: true
            },
            data: this.chartsData1.expensesData
          },
          {
            name: '结余数据',
            type: 'line',
            label: {
              show: true
            },
            data: this.chartsData1.balanceData
          }
        ],
        color: ['#87CEFA', '#7FFFAA', '#FFB6C1', '#FF7F50', '#556B2F', '#D3D3D3', '#FF4500']
      }
      chart1.setOption(option1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.report{
  min-height: 950px;
  background: #fff;
  .left{
    float: left;
    width: 185px;
    min-height: 950px;
    .menu-box{
      width: 100%;
    }
  }
  .right{
    float: right;
    width: calc(100% - 185px);
    padding: 0 23px 50px 23px;
    border-left: 1px solid #e7e7e7;
    min-height: 950px;
    .rTit{
      margin-bottom: 12px;
      padding-top: 25px;
      text-align: right;
      .exchange-date {
        font-size: 12px;
        color: #72767e;
        .e-date-label {
          color: #72767e;
        }
        .e-date {
          color: #2e2e2e;
        }
        .e-unit {
          margin-left: 15px;
        }
      }
    }
    .report-box{
      width: 100%;
      .filter-bar{
        height: 42px;
        background: #f6f6f6;
        background: -webkit-linear-gradient(top,#f6f6f6,#f1f1f1);
        background: -moz-linear-gradient(top,#f6f6f6,#f1f1f1);
        background: linear-gradient(to bottom,#f6f6f6,#f1f1f1);
        box-shadow: 0 1px 1px rgba(0,0,0,0.02);
        @include flex(row, start);
      }
      #chart1, #chart2{
        width: 750px;
        height: 400px;
        margin: 0 auto;
        margin-top: 40px;
        &>div{
          width: 100% !important;
        }
      }
      #table1, #table2{
        width: 100%;
        min-height: 300px;
        float: left;
        margin-top: 60px;
      }
      .report-demo{
        display: block;
        margin: 40px auto;
        width: 600px;
      }
    }
  }
}
</style>
