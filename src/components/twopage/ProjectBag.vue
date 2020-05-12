<template>
  <div class="projectbag-total">
    <backBar title="项目详情"></backBar>

    <div class="projectbag">
      <div class="projectbag_inner">
        <span>项目名称:{{projectDetailInfoObject.cardName}}</span>
        <!--        <img :src="projectDetailInfoObject.photo_url" alt="加载错误" class="projectbag_img">-->
      </div>
    </div>
    <div class="projectbag_inner-txt">
      <div class="projectbag_txt">购买币数：{{projectDetailInfoObject.coin}}</div>
    </div>
    <div class="total">
      <div class="projectrecord_footer">
        <div class="user_top_bottom1">
          <div class="projectbag_bottom">
            <div class="item_item" v-show="projectDetailInfoObject.is_number_time===1">有效开始日:
              {{projectDetailInfoObject.valid_start_date}}
            </div>
            <div class="item_item" v-show="projectDetailInfoObject.is_number_time===1">有效结束日:
              {{projectDetailInfoObject.valid_end_date}}
            </div>
          </div>
          <div class="projectbag-time" v-show="projectDetailInfoObject.is_number_time===1">有效次数：
            {{projectDetailInfoObject.times}}
          </div>
          <div class="item_item" v-show="projectDetailInfoObject.is_number_time===0">
            当天可进场次数：{{projectDetailInfoObject.day_times}}
          </div>
          <div class="item_item" v-show="projectDetailInfoObject.is_number_time===0">
            有效天数：{{projectDetailInfoObject.valid_days}}
          </div>
        </div>
      </div>
      <div class="activationMethod">
        <div class="projectbag_top_bottom">
          <div class="projectbag-item1">
            <div class="" v-show="projectDetailInfoObject.activation===0">激活方式:购买激活</div>
          </div>
          <div class="item_item item_times" v-show="projectDetailInfoObject.activation===1">指定日期激活:
            {{projectDetailInfoObject.activation_date}}
          </div>
        </div>
      </div>
    </div>
    <div class="projectbag_border">
      <div class="at-row">
        <div class="item">
          <img src="../../assets/project/img.png" class="item-img mui-pull-left">
          <p class="mui-pull-left projectbag-p">赠送彩票&nbsp;&nbsp;</p>
          <p class="mui-pull-left projectbag-p">x{{projectDetailInfoObject.giveLottery}}</p>
        </div>
        <div class="item">
          <img src="../../assets/project/img.png" class="item-img mui-pull-left">
          <p class="mui-pull-left projectbag-p">赠送积分&nbsp;&nbsp;</p>
          <p class="mui-pull-left projectbag-p">x{{projectDetailInfoObject.giveScore}}</p>
        </div>
      </div>
      <div class="item item-height">
        <img src="../../assets/project/img.png" class="item-img mui-pull-left">
        <p class="mui-pull-left projectbag-p">赠送币数&nbsp;&nbsp;</p>
        <p class="mui-pull-left projectbag-p">x{{projectDetailInfoObject.giveCoin}}</p>
      </div>
      <div class="projectbag_buy">
        <div class="projectbag_buy_txt mui-pull-left">购买礼包</div>
        <div class="projectbag_buy_txt mui-pull-right projectbag_buy_right">{{price}}
        </div>
      </div>

      <button class="mui-pull-right projectbag_btn" @click="paymentClick()" id="select_id">支付</button>
      <cell ref="cellChild" select-pay-type0="微信付款" select-pay-type1="预存款付款" select-pay-type2="代币付款"
            :parent-click-method-name="this.commitOrder" :is-display="false"></cell>
    </div>
    <div class="at-row-bottom">
      <div class="jifen_title">看看我的项目可以做什么？</div>
      <div class="jifen_body">项目规则：</div>
      <div class="jifen_txt">1.这里可以写一些项目的规则</div>
      <div class="jifen_txt">2.这里可以写一些项目的规则</div>
      <div class="jifen_txt">3.这里可以写一些项目的规则</div>
    </div>

  </div>
</template>

<script>
  import backBar from "../public/backBar";
  import global_msg from "../js/global";
  import Cell from "../public/cell"
  import {Toast} from "mint-ui"

  export default {
    name: "ProjectBag",
    data() {
      return {
        cardId: "",
        data: '',
        orderNumber: "",
        projectDetailInfoObject: "",
        shopName: "",
        price: "",
      }
    },
    mounted() {
      this.shopName = this.$store.state.selectedShopData.shopName;
      this.data = this.$route.query;
      this.getProjectInformation();

    },
    methods: {
      //点击付款
      paymentClick() {
        document.getElementById("select_id").setAttribute("style", "display:block;"),
          //父组件通过$ref获取到子组件的实例对象并调用子组件的selectPay方法
          //传一个方法，点击支付弹出三个支付方式，点击三个支付方式，直接付款
          this.$refs.cellChild.selectPay()
      },
      judgePay() {
        if (this.$store.state.type === 1) {
          this.orderPaymentH5();
        } else {
          this.orderPaymentMini();
        }
      },
      //提交订单
      commitOrder() {
        if (this.$refs.cellChild.payType === 1) {
          this.price = this.projectDetailInfoObject.actual_price.replace(",", "");
        } else if (this.$refs.cellChild.payType === 3) {
          this.price = this.projectDetailInfoObject.balance_price;
          if (this.price < 0) {
            alert("您的预存款支付余额不足")
          }
        } else if (this.$refs.cellChild.payType === 4) {
          this.price = this.projectDetailInfoObject.coin_money;
          if (this.price < 0) {
            alert("您的币支付余额不足")
          }
        }
        console.log(this.price)
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/order/store`,
            {
              "cardId": this.data.cardId,
              "shopId": this.$store.state.selectedShopData.shopId,
              "actualPrice": this.price,
              "sumcoin": this.projectDetailInfoObject.coin,
              "cardType": 2,
              "payType": this.$refs.cellChild.payType,
              "notifyUrl": this.$store.state.homeHtml,

            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.orderNumber = res.body.data.orderNo;
              this.judgePay();
            } else {
              alert("提交订单失败：" + res.body.message);
            }
            //
          })
      },
      orderPaymentH5() {
        let payUrl = ""
        let wxPay = '/api/payment/shouqianba';
        let prePay = "/api/payment/predeposit";
        let coinPay = '/api/payment/bycoin';
        if (this.$refs.cellChild.payType === 1) {
          payUrl = wxPay;
        } else if (this.$refs.cellChild.payType === 3) {
          payUrl = prePay
        } else if (this.$refs.cellChild.payType === 4) {
          payUrl = coinPay
        }
        console.log("payUrl" + payUrl)
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}` + payUrl,
            {
              "orderNo": this.orderNumber
            }, {emulateJSON: true})
          .then(res => {
            // console.log(res.body)
            if (res.body.err_code === 0) {
              // localStorage.setItem("payStatus", "1");
              // 跳转支付
              if (this.$refs.cellChild.payType === 1) {
                window.location.href = res.body.data.pay_url;
              } else {
                Toast("支付成功！");
                this.$router.push("/");
              }
            } else {
              alert("h5获取支付url失败：" + res.body.message);
            }
          })
      },

      orderPaymentMini() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/payment/shouqianbaformini`,
            {
              "orderNo": this.orderNumber
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {

            } else
              alert('获取小程序支付参数时错误：' + res.body.message)
          })
      },
      //获取项目详细信息
      getProjectInformation() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/projects/information`,
            {
              //从上个页面接口获取键值对
              params: {
                "brand_id": `${global_msg.method.getBrandId()}`,
                "shopId": this.$store.state.selectedShopData.shopId,
                "cardId": this.data.cardId
              }
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.projectDetailInfoObject = res.body.data;
              this.price = this.projectDetailInfoObject.actual_price
              let bagData = res.body.data;
              this.projectDetailInfoObject.photo_url = this.projectDetailInfoObject.photo_url
              === "" ? require("../../assets/project/xiangmu_card1.png") : bagData.photo_url;

            } else {
              alert("获取项目信息失败" + res.body.message);
              this.$router.go(-1);
            }
          })
      },
    },
    components: {
      backBar,
      Cell,
    }
  }
</script>

<style lang="less" scoped>
  .projectbag_border {
    border-radius: 20px;
    width: 90%;
    margin: 50px auto;
    border: 1px dashed #D3B986;
    background-color: #ffffff !important;
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
    padding: 5px 10px 30px 10px;
  }

  .projectbag-total {
    min-height: 1100px;

  }

  .projectbag {
    /*background-color: #e3e3e3;*/
    margin-top: 80px;
    /*width: 100%;*/

  }

  .projectbag_inner {
    text-align: center;
    font-size: 25px;
    font-weight: 800;
  }

  .projectbag_inner-txt {
    width: 100%;
    margin: 30px 0px;
    text-align: center;
    /*margin: 0 auto;*/
  }

  .at-row {
    display: flex;

  }

  .item {
    flex: 2;
    /*text-align: center;*/
    padding: 10px 0;
  }

  .item-img {
    width: 50px;
    height: 40px;
  }

  .mui-pull-right {
    /*margin-top: -20px;*/
  }

  .projectbag-p {
    line-height: 40px;
    color: #000000 !important;
  }

  .projectbag_buy {
    border-top: 1px dashed #D3B986;
    padding: 20px 0;
  }

  .projectbag_buy_right {
    font-size: 30px;
  }

  .projectbag-time {
    padding-left: 20px;
  }

  .projectbag_btn {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 18px;
    background-color: #00ab5f;
    border-radius: 50px;
  }

  .item-height {
    height: 70px;
  }

  .activationMethod {
    padding: 10px 20px;
  }

  .at-row-bottom {
    width: 90%;
    padding: 20px 20px;
    margin: 50px auto;
    line-height: 30px;
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fff;
  }

  /*margin-top: 20px;*/

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

  .projectbag_bottom {

    display: flex;

    .item_item {
      flex: 2;
      /*width: 90%;*/
      /*margin: 10px 20px;*/
      font-size: 15px;
    }
  }

  .total {
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    border-radius: 10px;
    margin: 0 auto;
    background-color: #ffffff !important;
  }

  .item_item {
    padding: 5px 20px;
  }

</style>


// WEBPACK FOOTER //
// src/components/twopage/ProjectBag.vue
