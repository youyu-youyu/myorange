<template>
  <div class="everydaysign">
    <!--    <backbar title="签到"></backbar>-->
    <loading v-if="loading"></loading>
    <div class="sign-top">
      <div class="sign-innner">
        <div class="sign-text">
          <div class="sign-text1" @click="signEvent(index)">
            <div class="qian">签到</div>
          </div>

        </div>
        <div id="slider" class="mui-slider">
          <div id="sliderSegmentedControl"
               class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
              <a class="mui-control-item mui-active">
                <div class="everysign_tag">
                  <div class="everysign_tag_inner">
                    <ul class="everydaysign_ul">
                      <li v-for="(item,index) in keyList">
                        <div class="eversign_tag_inner_flex">
                          <div class="overlay" :class="{back:valueList[index]===false}">
                            <div>
                            </div>
                            <div class="everysign_text">已签</div>
                          </div>
                          <div>

                            <div class="everysign_text">未签</div>
                          </div>
                        </div>
                        <div class="everysing_txt">{{item}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sign-text2">
      <div class="sign-text2-1">本月已累积签到{{signCount}}天</div>
    </div>
    <div class="at-row">
      <div class="at-col">
        剩余积分
        <div class="data">{{userScore}}</div>
      </div>
      <div class="at-col border-col">
        今日签到
        <div class="data">+1</div>
      </div>
    </div>
    <div class="at-row-bottom">
      <div class="jifen_title">看看我的积分可以做什么？</div>
      <div class="jifen_body">积分规则：</div>
      <div class="jifen_txt">1.这里可以写一些积分的规则</div>
      <div class="jifen_txt">2.这里可以写一些积分的规则</div>
      <div class="jifen_txt">3.这里可以写一些积分的规则</div>
    </div>
  </div>
</template>
<script>
  import backbar from "../public/backBar.vue";
  import global_msg from '../js/global.js'
  import mui from "../../lib/mui/js/mui.js";
  import {Toast} from "mint-ui";
  import loading from "../public/loading/loading";

  export default {
    data() {
      return {
        message: "",
        SignList: "",
        signCount: "",
        currentMonthDays: "",//当前月份的天数
        keyList: [],
        valueList: [],
        selectedSignIndex: -1,
        loading: false,
        userScore: ""
      };
    },
    mounted() {
      // let beforeYesterday = getDateStr(-2);
      // console.log(beforeYesterday)


      this.userScore = this.$store.state.userInfoData.userTotalScore;
      console.log(this.$store.state.userInfoData.userTotalScore)
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
      this.getSign();
    },
    methods: {
      signEvent() {
        this.signDay();
      },
      signDay() {
        this.loading = true;
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/sign`,
            {
              "shopId": this.$store.state.selectedShopData.shopId
            }, {emulateJSON: true})
          .then(response => {
            this.loading = false;
            if (response.body.err_code === 0) {
              Toast("签到成功");
              //签到成功之后重新调用获取 签到列表接口刷新列表
              `${global_msg.method.getUserAccountInfo(this)}`;
              `${global_msg.method.getUserBasicInfo(this)}`
              this.getSign();
            } else {
              Toast("签到失败:" + response.body.message);
            }
          })
      },
      getSign() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/sign/info`,
            {
              "shopId": this.$store.state.selectedShopData.shopId
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              let data = res.body.data;
              // console.log(res.body)
              this.signCount = data.sign_count;
              this.keyList = [];//把keyList置为空，避免累计追加数组
              this.valueList = [];
              let obj = data.sign_list;
              let tempKeyList = [];//新定义数组用来计算
              let tempValueList = [];
              for (let i in obj) {
                tempKeyList.push(i);
                tempValueList.push(obj[i]);
              }
              this.keyList = this.keyList.concat(tempKeyList);
              this.valueList = this.valueList.concat(tempValueList);

              for (let i = 0; i < this.keyList.length; i++) {
                this.keyList[i] = this.keyList[i].split("-")[1] + "." + this.keyList[i].split("-")[2];

                let day1 = new Date();
                //月份
                let date = (day1.getMonth() + 1) < 10 ? "0" + (day1.getMonth() + 1) : (day1.getMonth() + 1);
                //今天
                let currentDay2 = day1.getDate() < 10 ? "0" + day1.getDate() : day1.getDate();
                //昨天
                let preDay = day1.getDate() - 1
                let preDay2 = preDay < 10 ? "0" + preDay : preDay;
                // 明天
                let tomorrowDay = day1.getDate() + 1
                let tomorrowDay1 = tomorrowDay < 10 ? "0" + tomorrowDay : tomorrowDay;
                //小于10，在前面加上0，如5/7变成05/07

                // 如果是昨天day1.getDate()-1
                // 明天day1.getDate()+1
                // 如果数字小于10 ，在前面添加0
                //然后做对比
                if (this.keyList[i] === date + "." + currentDay2) {
                  this.keyList[i] = "今日";
                }
                if (this.keyList[i] === date + "." + preDay2) {
                  this.keyList[i] = "昨日";
                }
                if (this.keyList[i] === date + "." + tomorrowDay1) {
                  this.keyList[i] = "明日";
                }
              }
            } else {
              alert("获取签到列表失败：" + res.body.message);
            }
          })
      },
    },
    components: {
      backbar,
      loading
    }
  };
</script>
<style lang="less" scoped>
  .everydaysign {
    min-height: 1100px;
  }

  .sign-innner {
    height: 370px;
    padding-top: 50px;
    background-image: linear-gradient(to right, rgba(125, 130, 250), rgba(22, 168, 254));
    /*border-radius: 0 0 60% 60%;*/

    .sign-text {
      /*background: #e0e0e0;*/
      box-sizing: border-box;
      width: 180px;
      height: 180px;
      margin: 0 auto;
      /*padding:2px;*/
      border-radius: 100%;
      border: 10px solid rgba(84, 134, 237);
      /*border-image: -webkit-linear-gradient(to right, rgba(142, 178, 253), rgba(100, 190, 253)) 30 30;*/
      /*border-image: -moz-linear-gradient(to right, rgba(142, 178, 253), rgba(100, 190, 253)) 30 30;*/
      /*border-image: linear-gradient(to right, rgba(142, 178, 253), rgba(100, 190, 253)) 30 30;*/

      .sign-text1 {

        font-size: 40px;
        font-weight: 800;
        color: #14aaff;
        //    padding-top:30px;
        line-height: 160px;
        vertical-align: middle;
        text-align: center;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        -webkit-box-shadow: #fff 0px 0px 30px;
        -moz-box-shadow: #fff 0px 0px 30px;
        box-shadow: #fff 0px 0px 30px;
        margin: 0 auto;
        // position: relative;
        /*border: 8px solid #fff;*/

        -webkit-z-index: 999;
        -moz-z-index: 999;
        -ms-z-index: 999;
        -o-z-index: 999;
        z-index: 999;
        background-color: #ffffff;
        //    background: -webkit-gradient(radial,25,25,0,25 25,25, from(#E6DB7E),to(#FCE204)) !important;
        .qian {
          text-align: center;
          font-size: 30px;
          //   line-height: 3.5 !important;
        }
      }

      .sign-text2 {
        width: 100%;
        font-size: 16px;
        color: #62666a;
        z-index: 999;

      }
    }
  }

  .sign-text2-1 {
    text-align: center;
    padding: 20px 0;
  }

  .at-row {
    text-align: center;
    /*margin-top: 120px;*/
    width: 90%;
    margin: 0 auto;
    font-size: 16px;
    display: flex;
    color: #14aaff;
    padding: 20px 0;
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fff;

    .at-col {
      flex: 1;
      line-height: 30px;
    }


    .border-col {
      border-left: 1px solid #f1f1f1;
    }
  }

  .at-row-bottom {
    width: 90%;
    padding: 20px 20px;
    margin: 0 auto;
    line-height: 30px;
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fff;
    margin-top: 20px;

    .jifen_title {
      color: #f6be61;
      padding-bottom: 10px;
    }

    .jifen_body {
      color: #999999;
    }

    .jifen_txt {
      color: #a8adac;
      font-size: 14px;
    }
  }

  .everysign_tag {
    /*width: 90%;*/
    margin: 20px auto;
    padding: 5px 5px;
    /*background-color: #fff;*/
  }

  .everysign_tag_inner {
    display: flex;

    .eversign_tag_inner_flex {
      flex: 1;
      width: 50px;
      height: 50px;
      margin: 0 5px;
      padding: 5px 0;
      border-radius: 50%;
      //   line-height: 50px;
      background-color: rgba(255, 255, 255, 0.3);
      text-align: center;
    }

    .flex1 {
      background-color: #fede4f;
    }
  }

  .icon-plus1 {
    color: darkgray;
  }

  .everysign_text {
    font-size: 13px;
    line-height: 40px;
  }

  .everysing_txt {
    font-size: 13px;
    color: #ffffff;
    margin-left: -2.5px;
  }

  ///
  .eversign_tag_inner_flex {
    position: relative;
    width: 50%;
  }

  .image {
    display: block;
    width: 100%;
    height: auto;
  }

  .back {
    display: none;
  }

  .overlay {
    padding-top: 5px;
    position: absolute;
    top: 0;
    border-radius: 50%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    /*opacity: 1;*/
    transition: 0.5s ease;
    z-index: 999;
    background-color: #ffffff;
  }


  .mui-slider-indicator .mui-icon {
    border: none !important;
    margin-top: -5px;
  }

  .text {
    color: white;
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .mui-slider-indicator .mui-ico {
    border: none !important;
  }

  .everydaysign_ul {
    margin-left: -40px !important;
    margin-right: 5px;
    padding-right: 5px;
    display: flex;

    li {
      list-style: none;
      flex: 1;
    }
  }
</style>


// WEBPACK FOOTER //
// src/components/twopage/EverydaySign.vue
