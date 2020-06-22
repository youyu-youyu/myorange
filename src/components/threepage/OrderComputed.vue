<template>
  <div class="orderComputed">
    <div class="orderComputed-header">
      {{this.$store.state.userInfoData.userName}}用户，你还剩{{this.$store.state.userAccountData.userCoin}}币
    </div>
    <div class="orderInfo">
      <span class="orderInfo_text">订单资料</span>
      <div class="orderInfo_slider">
        <table class="bgT">
          <tr>
            <td>商品名称</td>
            <td>数量</td>
            <td>金额</td>
          </tr>
        </table>
      </div>
      <div>
        <table>
          <tr v-for="(item,index) in restaurantList.restaurantList">
            <td>{{item.cateringName}}</td>
            <td>{{item.count}}</td>
            <td>{{item.selling_price}}</td>
          </tr>
        </table>
      </div>
      <div class="orderby">
        支付方式
        <div class="zhifu">
          <button class="wxbtn" @click="paymentMethod(1)">微信支付</button>
          <button class="dbbtn" @click="paymentMethod(2)">代币支付</button>
        </div>
      </div>
      <button class="btn" @click="restaurantOrder">确定兑换</button>
    </div>

  </div>
</template>

<script>
  import record from "../public/record";
  import myNetUtils from "../js/MyNetUtils";
  import global_msg from "../js/global";

  export default {
    name: "orderComputed",
    data() {
      return {
        restaurantList: [],
        payType: 1,
        totalPrice: 0,
        order: ""
      }
    },
    mounted() {
      this.restaurantList = this.$route.query
      console.log(this.restaurantList)
    },
    methods: {
      //支付方式，默认微信支付
      paymentMethod(paymentMethodType) {
        if (paymentMethodType === 1) {
          this.payType = 1
        } else {
          this.payType = 4
        }
        console.log(this.payType)
      },
      //点餐
      restaurantOrder() {
        console.log(this.restaurantList.tableNumber)
        let _this = this
        // this.restaurantList.restaurantList = (this.restaurantList.restaurantList)
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/restaurant`, {
          "shopId": this.$store.state.selectedShopData.shopId,
          "orders": JSON.stringify(this.restaurantList.restaurantList),
          "tableNumber": this.restaurantList.tableNumber,
          "money": this.restaurantList.totalPrice,
          "payType": this.payType
        }, function (body) {
          _this.order = body.data.orderNo
          _this.judgePay()
          console.log(body.data)
        }, function (message) {
          alert("付款失败:" + message)
        })
      },
      //点击付款
      judgePay() {
        if (this.$store.state.type === 1) {
          this.orderPaymentH5();
        } else {
          this.orderPaymentMini();
        }
      },
      orderPaymentH5() {
        let payUrl;
        let coinPay = "/api/payment/bycoin";
        let wxPay = '/api/payment/shouqianba';
        if (this.payType === 1) {
          payUrl = wxPay;
        } else if (this.payType === 4) {
          payUrl = coinPay
        }
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}` + payUrl, {
          "orderNo": this.order
        }, function (body) {
          localStorage.setItem("payStatus", "1");
          // 跳转支付
          if (_this.$refs.cellChild.payType === 1) {
            window.location.href = body.data.pay_url;
          } else {
            Toast("支付成功!");
            // _this.$router.go(-1);
          }
        }, function (message) {
          alert("获取支付url失败" + message)
        })
      },
      //小程序付款
      orderPaymentMini() {
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/payment/shouqianbaformini`, {
          "orderNo": this.order
        }, function (body) {
          _this.mini();
          _this.miniInfo = body.data
        }, function (message) {
          alert('获取小程序支付参数时错误:' + message)
        })
      },
    },
    components: {
      record,
    }
  }
</script>

<style lang="less" scoped>
  .orderComputed {
    width: 100%;
    height: 100%;
    background: #ffffff;

    .orderComputed-header {
      width: 100%;
      margin: 0px auto;
      padding: 10px 10px;
      border-bottom: 1px solid #bbbbbb;


    }
  }

  .orderInfo {
    width: 90%;
    margin: 0 auto;
    line-height: 30px;

    .orderInfo_slider {
      display: flex;
      width: 100%;

      .orderInfo_item {
        width: 33.3% !important;
      }
    }
  }

  .bgT {
    background: #bbbbbb;
    width: 100%;

    tr {
      td {
        padding: 2px 0 !important;
      }
    }
  }

  table {
    width: 100%;

    tr {
      td {
        width: 33.3%;
        text-align: center;
        border: 1px solid #cccccc;
        padding: 5px 0;
      }
    }
  }

  .btn {
    margin: 20px 0;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background: #1684c2;
    border-radius: 10px;
    color: #ffffff;
  }

  .zhifu {
    margin-top: 10px;

    .wxbtn {
      padding: 10px;
    }

    .dbbtn {
      margin-left: 20px;
      padding: 10px;
    }
  }
</style>
