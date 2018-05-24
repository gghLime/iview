<template>
  <div class="overview">
    <div class="ov-left">
      <div class="ov-box">
        <h3 class="item-title">资产概况</h3>
        <div class="asset clearfix">
          <div class="o-i-item o-i-1">
            <p class="txt">资产</p>
            <p class="amount" id="assetAbsAmount" title="69045.40">69,045.40</p>
          </div>
          <div class="o-i-item o-i-2">
            <p class="txt">负债</p>
            <p class="amount" id="debtAmount" title="0.00">0.00</p>
          </div>
          <div class="o-i-item o-i-3">
            <p class="txt">净资产</p>
            <p class="amount" id="netAmount" title="69045.40">69,045.40</p>
          </div>
        </div>
      </div>
      <div class="ov-box">
        <h3 class="item-title">收支表</h3>
        <div class="out-in-info">
          <div class="out-in-head clearfix">
            <div class="float-left o-i-1">本周</div>
            <div class="float-left o-i-2">本月</div>
            <div class="float-left o-i-3">本年</div>
          </div>
          <div class="in-detail clearfix">
            <div class="float-left d-i-1">
              <i class="fd-iconfont fd-income"></i>
              收入
            </div>
            <div class="float-left d-i-2">
              <a class="money" href="javascript:void(0)">¥25,000.00</a>
            </div>
            <div class="float-left d-i-3">
              <a class="money" href="javascript:void(0)">¥143,200.00</a>
            </div>
            <div class="float-left d-i-4">
              <a class="money" href="javascript:void(0)">¥143,200.00</a>
            </div>
          </div>
          <div class="out-detail clearfix">
            <div class="float-left d-i-1">
              <i class="fd-iconfont fd-expenditure"></i>
              支出
            </div>
            <div class="float-left d-i-2">
              <a class="money" href="javascript:void(0)">¥13,854.60</a>
            </div>
            <div class="float-left d-i-3">
              <a class="money" href="javascript:void(0)">¥74,154.60</a>
            </div>
            <div class="float-left d-i-4">
              <a class="money" href="javascript:void(0)">¥74,154.60</a>
            </div>
          </div>
        </div>
      </div>
      <div class="ov-box">
        <h3 class="item-title">2018年5月财务简报</h3>
        <div class="brief-report">
          <p class="day-info">
            <i class="fd-iconfont fd-calender"></i>
             今天是您记账的第 <strong>23</strong> 天，  此账本共记录 <strong>53</strong> 笔流水。
          </p>
          <div class="month-info-wrap">
            <p class="month-info">
              <i class="fd-iconfont fd-budget"></i>
              本月预算额度 <strong title="80,000.00">80,000.00</strong> 元 ，已使用 <strong class="green" title="74,154.60">74,154.60</strong> 元，还剩 <strong title="5,845.40">5,845.40</strong> 元可用。
            </p>
          </div>
        </div>
      </div>
      <div class="ov-box clearfix">
        <div class="float-left out-report"></div>
        <div class="float-right trend-report">
          <h3 class="item-title float-left">本月支出趋势图</h3>
          <a class="txt float-right" href="javascript:void(0)">更多 &gt;&gt;</a>
          <div class="report-chart" style="overflow-x: auto;overflow-y: hidden;">
            <div id="divMonthLine" style="width: 775px; left: -297px;">
              <div id="divMonthLine_sub" data-highcharts-chart="0" style="width: 775px; right: 0px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ov-right">
      <div class="r-content">
        <div id="riHead">
          <div id="touxiang">
            <div class="avatar">
              <a class="tx-a" href="javascript:void(0)" title="个人中心">
                <img src="https://res.sui.com/img/common/photo_default.png" alt="头像" style="width: 100%; height: 100%; margin: 0px;">
              </a>
            </div>
            <div class="user-info">
              <a href="javascript:void(0)" class="username">体验用户</a>
            </div>
          </div>
        </div>
        <div class="m-l-t">
          <div class="title clearfix">
            <p class="float-left">最新消息</p>
          </div>
        </div>
        <div class="m-l-c">
          <p class="empty-info">还米有收到消息哦~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'overview',
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    let echarts = require('echarts')
    let outChart = echarts.init(document.getElementsByClassName('out-report')[0])
    let trendChart = echarts.init(document.getElementById('divMonthLine_sub'))
    let outOption = {
      title: {
        text: '本月分类支出',
        x: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br> 金额: {c}<br> 占比: {d}%'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          center: ['38%', '50%'],
          label: {
            normal: {
              formatter: '{d}%',
              position: 'inner'
            }
          },
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    let trendOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        height: '200px',
        top: '20px'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
    outChart.setOption(outOption)
    trendChart.setOption(trendOption)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.overview{
  box-sizing: border-box;
  .ov-left{
    width: 692px;
    min-height: 948px;
    float: left;
    padding-top: 13px;
    .ov-box{
      width: 624px;
      margin: 40px auto 0 auto;
      a {
        font-size: 16px;
        color: #ff5051;
        &:hover {
          text-decoration: underline;
        }
      }
      .item-title{
        font-size: 16px;
        font-weight: normal;
        -webkit-font-smoothing: subpixel-antialiased;
      }
      .asset {
        margin-top: 10px;
        padding: 18px 0 26px 0;
        border-top: 1px solid #eee;
        .o-i-item {
          float: left;
          width: 270px;
          &.o-i-2 {
            width: 175px;
            p.amount {
              color: #229d89;
            }
          }
          &.o-i-3 {
            float: right;
            width: 158px;
            text-align: right;
            p.amount {
              color: #2e2e2e;
            }
          }
          p.txt {
            font-size: 12px;
            color: #6c6c6c;
          }
          p.amount {
            margin: 10px 0 0 -1px;
            font-size: 32px;
            color: #ff5051;
            font-family: Helvetica,sans-serif,Arial,tahoma,"Hiragino Sans GB",Mingliu;
          }
        }
      }
      .out-in-info {
        margin-top: 10px;
        border-top: 1px solid #eee;
        padding-bottom: 12px;
        .out-in-head {
          .o-i-1 {
            width: 208px;
            height: 41px;
            line-height: 41px;
            text-align: right;
          }
          .o-i-2 {
            height: 40px;
            width: 208px;
            line-height: 40px;
            text-align: right;
          }
          .o-i-3 {
            height: 40px;
            line-height: 40px;
            width: 208px;
            text-align: right;
          }
        }
        .in-detail {
          height: 41px;
          line-height: 41px;
          border-top: 1px dashed #f6f6f6;
          overflow: hidden;
          .fd-iconfont {
            color: #ff5051;
          }
        }
        .out-detail {
          height: 41px;
          line-height: 41px;
          border-top: 1px dashed #f6f6f6;
          overflow: hidden;
          a {
            font-size: 16px;
            color: #229d89;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .d-i-1 {
          width: 57px;
          .fd-iconfont {
            font-size: 19px;
            vertical-align: middle;
            position: relative;
            top: -2px;
            margin-right: 6px;
          }
        }
        .d-i-2 {
          width: 156px;
          text-align: right;
        }
        .d-i-3 {
          width: 205px;
          text-align: right;
        }
        .d-i-4 {
          width: 205px;
          text-align: right;
        }
      }
      .brief-report {
        margin-top: 12px;
        padding: 12px 0 60px 0;
        border-top: 1px solid #eee;
        .fd-iconfont {
          position: relative;
          top: 3px;
          color: #72767e;
          margin-right: 3px;
        }
        p {
          font-size: 12px;
          color: #2e2e2e;
          strong {
            position: relative;
            font-size: 18px;
            display: inline-block;
            font-weight: bold;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: Helvetica,sans-serif,Arial,tahoma,"Hiragino Sans GB",Mingliu;
            vertical-align: bottom;
          }
        }
      }
      .month-info-wrap {
        position: relative;
        .month-info {
          margin-top: 15px;
        }
      }
      .green {
        color: #229d89;
      }
      .report-chart {
        position: relative;
        height: 270px;
        width: 300px;
        #divMonthLine{
          height: 270px;
          div{
            height: 270px;
          }
        }
      }
    }
    .out-report, .trend-report {
      width: 300px;
      height: 300px;
    }
  }
  .ov-right{
    position: relative;
    float: right;
    width: 312px;
    min-height: 948px;
    background: #fafafa url(../../assets/report_index_bg.png) repeat;
    #riHead {
      margin-top: 65px;
      #touxiang {
        position: relative;
        .avatar {
          position: relative;
          width: 110px;
          height: 110px;
          margin: 0 auto;
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
          .username {
            display: block;
            color: #2e2e2e;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
