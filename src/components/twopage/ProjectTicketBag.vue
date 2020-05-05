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
      <div class="projectbag_txt">是否全天票：是</div>
    </div>
    <div class="projectbag_border">
      <div class="at-row">
        <!--        <div class="item">-->
        <!--          <img src="../../assets/project/img.jpg" class="item-img mui-pull-left">-->
        <!--          <p class="mui-pull-left projectbag-p">赠送彩票&nbsp;&nbsp;</p>-->
        <!--          <p class="mui-pull-left projectbag-p">x{{ticketDetailInfoObject.giveLottery}}</p>-->
        <!--        </div>-->
        <!--        <div class="item">-->
        <!--          <img src="../../assets/project/img.jpg" class="item-img mui-pull-left">-->
        <!--          <p class="mui-pull-left projectbag-p">赠送积分&nbsp;&nbsp;</p>-->
        <!--          <p class="mui-pull-left projectbag-p">x{{ticketDetailInfoObject.giveScore}}</p>-->
        <!--        </div>-->
      </div>
      <div class="item">
        <img src="../../assets/project/img.jpg" class="item-img mui-pull-left">
        <p class="mui-pull-left projectbag-p">门票押金&nbsp;&nbsp;</p>
        <p class="mui-pull-left projectbag-p">{{ticketDetailInfoObject.play_deposit}}</p>
      </div>
      <div class="projectbag_buy">
        <div class="projectbag_buy_txt mui-pull-left">购买礼包</div>
        <div class="projectbag_buy_txt mui-pull-right projectbag_buy_right">{{ticketDetailInfoObject.actual_price}}</div>
      </div>
      <button class="mui-pull-right projectbag_btn" @click="paymentClick()">支付</button>
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

  export default {
    name: "ProjectBag",
    data() {
      return {
        cardId: "",
        data: '',
        orderNumber: "",
        ticketDetailInfoObject: "",
        loading:false,
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
        this.commitOrder();
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
              // this.judgePay();
            } else {
              alert("提交订单失败" + res.body.message)
            }
          })
      },

      orderPaymentH5() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/payment/shouqianba`,
            {
              "orderNo": this.orderNumber
            }, {emulateJSON: true})
          .then(res => {

            if (res.body.err_code === 0) {
              // localStorage.setItem("payStatus", "1");
              // 跳转支付
              window.location.href = res.body.data.pay_url;
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
              this.ticketDetailInfoObject.photo_url = this.ticketDetailInfoObject.photo_url === "" ? require("../../assets/project/xiangmu_card5.png") : this.ticketDetailInfoObject.photo_url;
            } else {
              alert("获取门票信息失败" + res.body.message);
              this.$router.go(-1);
            }
          })
      },
    },
    components: {
      backBar
    }
  }
</script>

<style scoped>
  .projectbag_border {
    border-radius: 20px;
    width: 90%;
    margin: 50px auto;
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
    margin: 20px 0;
    text-align: center;
    /*margin: 0 auto;*/
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


</style>



// WEBPACK FOOTER //
// src/components/twopage/ProjectTicketBag.vue
