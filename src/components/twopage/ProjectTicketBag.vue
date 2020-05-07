<template>
  <div>
    <loading v-if="loading"></loading>
    <backBar title="门票详情"></backBar>
    <div class="projectbag">
      <div class="projectbag_inner">
        <span>门票名称:{{ticketDetailInfoObject.cardName}}</span>
        <!--        <img :src="ticketDetailInfoObject.photo_url" alt="加载错误" class="projectbag_img">-->
      </div>
    </div>
    <div class="projectbag_inner-txt">
      <!--      <div class="projectbag_txt">11</div>-->

      <div class="projectbag_txt" v-show="ticketDetailInfoObject.is_all_day===0">
        门票计时:{{ticketDetailInfoObject.play_time}}
      </div>
      <div class="projectbag_txt" v-show="ticketDetailInfoObject.is_all_day===1">
        有效日开始:{{ticketDetailInfoObject.valid_start_date}}
      </div>
      <div class="projectbag_txt" v-show="ticketDetailInfoObject.is_all_day===1">
        有效日结束:{{ticketDetailInfoObject.valid_end_date}}
      </div>
    </div>
    <div class="projectbag_border">
      <div class="at-row">
      </div>
      <div class="item">
        <img src="../../assets/project/img.png" class="item-img mui-pull-left">
        <p class="mui-pull-left projectbag-p">门票押金&nbsp;&nbsp;</p>
        <p class="mui-pull-left projectbag-p">{{ticketDetailInfoObject.play_deposit}}</p>
      </div>
      <div class="projectbag_buy">
        <div class="projectbag_buy_txt mui-pull-left">购买礼包</div>
        <div class="projectbag_buy_txt mui-pull-right projectbag_buy_right">{{ticketDetailInfoObject.actual_price}}
        </div>
      </div>
      <button class="mui-pull-right projectbag_btn" @click="paymentClick()" id="select_id">支付</button>
      <cell ref="cellChild" select-pay-type0="微信付款" select-pay-type1="预存款付款" select-pay-type2="代币付款"
            :parent-click-method-name="this.commitOrder" :is-display="false"></cell>
    </div>
    <div class="at-row-bottom">
      <div class="jifen_title">看看我的门票可以做什么？</div>
      <div class="jifen_body">门票规则：</div>
      <div class="jifen_txt">1.这里可以写一些门票的规则</div>
      <div class="jifen_txt">2.这里可以写一些门票的规则</div>
      <div class="jifen_txt">3.这里可以写一些门票的规则</div>
    </div>

  </div>
</template>

<script>
  import backBar from "../public/backBar";
  import global_msg from "../js/global";
  import Cell from "../public/cell"


  export default {
    name: "ProjectBag",
    data() {
      return {
        cardId: "",
        data: '',
        orderNumber: "",
        ticketDetailInfoObject: "",
        loading: false,
      }
    },
    mounted() {
      this.data = this.$route.query;
      this.loading = true;
      setTimeout(this.gettickectInformation, 500);
    },
    methods: {
      //点击付款
      paymentClick() {
        document.getElementById("select_id").setAttribute("style", "display:block;"),
          //父组件通过$ref获取到子组件的实例对象并调用子组件的selectPay方法
          //传一个方法，点击支付弹出三个支付方式，点击三个支付方式，直接付款
          this.$refs.cellChild.selectPay()
      },
      //判断支付
      judgePay() {
        if (this.$store.state.type === 1) {
          this.orderPaymentH5();
        } else {
          this.orderPaymentMini();
        }
      },
      //提交订单
      commitOrder() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/order/store`,
            {
              "cardId": this.data.cardId, "shopId": this.$store.state.selectedShopData.shopId,
              "actualPrice": this.ticketDetailInfoObject.actual_price.replace(",", ""),
              "sumcoin": this.ticketDetailInfoObject.sumcoin, "cardType": 3, "notifyUrl": this.$store.state.homeHtml,
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.orderNumber = res.body.data.orderNo;
              this.judgePay();
            } else {
              alert("提交订单失败" + res.body.message)
            }
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
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}` + payUrl,
            {
              "orderNo": this.orderNumber
            }, {emulateJSON: true})
          .then(res => {

            if (res.body.err_code === 0) {
              // localStorage.setItem("payStatus", "1");
              // 跳转支付
              if (this.$refs.cellChild.payType === 1) {
                window.location.href = res.body.data.pay_url;
              } else {
                Toast("支付成功！");
                this.$router.go(-1);
              }
            } else {
              alert("h5获取支付url失败" + res.body.message)
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
      gettickectInformation() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/tickets/information`,
            {
              //从上个页面接口获取键值对
              params: {
                "brand_id": `${global_msg.method.getBrandId()}`,
                "shopId": this.$store.state.selectedShopData.shopId,
                "cardId": this.data.cardId
              }
            }, {emulateJSON: true})
          .then(res => {
            this.loading = false;
            // console.log(res.body.data)
            if (res.body.err_code === 0) {
              this.ticketDetailInfoObject = res.body.data;
              console.log("123")
              console.log(this.ticketDetailInfoObject)
              this.ticketDetailInfoObject.photo_url = this.ticketDetailInfoObject.photo_url === "" ? require("../../assets/project/xiangmu_card5.png") : this.ticketDetailInfoObject.photo_url;
            } else {
              alert("获取门票信息失败" + res.body.message);
              this.$router.go(-1);
            }
          })
      },
    },
    components: {
      backBar,
      Cell
    }
  }
</script>

<style scoped>
  .projectbag_border {
    border-radius: 20px;
    width: 90%;
    margin: 20px auto;
    border: 1px dashed #D3B986;
    background-color: #ffffff !important;
    padding: 10px 10px 30px 10px;
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
  }

  .projectbag_buy_order {
    padding: 30px 0;
  }

  /*.projectbag_img {*/
  /*  width: 60%;*/
  /*  margin-left: -20px;*/
  /*  text-align: center;*/
  /*  height: 120px;*/
  /*  border-radius: 5px;*/
  /*  margin-top: 50px;*/
  /*  position: absolute;*/
  /*}*/

  .projectbag {
    /*height: 100px;*/
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
    margin: 30px 0;
    text-align: center;
    /*margin: 0 auto;*/

  }

  .projectbag_txt {
    padding: 5px 0;
  }

  .at-row {
    display: flex;

  }

  .item {
    flex: 2;
    /*text-align: center;*/
    padding: 5px 0;
  }

  .item-img {
    width: 50px;
    height: 40px;
  }

  .projectbag-p {
    line-height: 40px;
    color: #000000 !important;
  }

  .projectbag_buy {
    border-top: 1px dashed #D3B986;
    padding: 10px 0;
    margin-top: 50px;
  }

  .projectbag_buy_right {
    font-size: 30px;
  }

  .projectbag_btn {
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    height: 50px;
    font-size: 18px;
    background-color: #00ab5f;
    border-radius: 50px;
  }

  .at-row-bottom {
    width: 90%;
    padding: 20px 20px;
    margin: 20px auto;
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


</style>


// WEBPACK FOOTER //
// src/components/twopage/ProjectTicketBag.vue
