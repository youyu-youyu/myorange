<template>
  <div class="orderComputed">
    <div class="orderComputed-header">
      {{this.$store.state.selectedShopData.shopName}}
    </div>
    <div class="orderInfo">
      <div class="right_container">
        <div class="right_inner_container" v-for="(item,index) in clickColumnList" :key="index">
          <img class="img_order mui-pull-left" :src="photoUrl">
          <div class="all_left mui-media-body">
            <div class="right_inner_container_name">{{item.cateringName}}</div>
            <div class="right_inner_container_money">x{{item.num}}</div>

          </div>
          <div class="right_inner_container_like mui-pull-right">
            <div class="like-total">{{payType===1?item.num*item.selling_price +'￥':item.coin_money * item.num+'币'}}
            </div>
            <!--  点击微信，显示微信价格，点击币支付，显示币价格    -->
          </div>
        </div>
      </div>
      <div class="orderby">
        <div class="zhifu">
          <button id="wxbtn_id" class="wxbtn" @click="paymentMethod(1)">微信支付</button>
          <button id="dbbtn_id" class="dbbtn" @click="paymentMethod(2)">代币支付</button>
        </div>
      </div>

    </div>
    <button class="btn" @click="restaurantOrder">支付</button>
  </div>
</template>

<script>
  import record from "../public/record";
  import myNetUtils from "../js/MyNetUtils";
  import global_msg from "../js/global";
  import {Toast} from "mint-ui"

  export default {
    name: "orderComputed",
    data() {
      return {
        restaurantList: [],
        payType: 0,
        totalPrice: 0,
        order: "",
        clickColumnList: [],
        photoUrl: ""
      }
    },
    mounted() {

      this.restaurantList = this.$route.query
      this.clickColumnList = this.restaurantList.clickColumnList
      for (let i = 0; i < this.clickColumnList.length; i++) {
        //先循环再判断
        let data = this.clickColumnList[i];
        this.photoUrl = data.photo_url === null ? require('../../assets/order/order.jpg') : data.photo_url
      }
      this.paymentMethod(1)

      console.log("this.restaurantList")
      console.log(this.restaurantList.clickColumnList)

    },
    methods: {
      //支付方式，默认微信支付
      paymentMethod(paymentMethodType) {
        if (paymentMethodType === 1) {
          // alert("tableNumber:" + this.restaurantList.tableNumber)
          this.payType = 1
          document.getElementById("dbbtn_id").setAttribute("style", "background:background: transparent;;");
          document.getElementById("wxbtn_id").setAttribute("style", "background:#D3B986;");
          this.totalPrice = this.restaurantList.totalPrice

        } else {
          this.payType = 4
          this.totalPrice = this.restaurantList.coinTotalPrice
          document.getElementById("wxbtn_id").setAttribute("style", "background:background: transparent;;");
          document.getElementById("dbbtn_id").setAttribute("style", "background:#D3B986;");
        }

        console.log("支付方式：" + this.payType)
      },
      //点餐支付
      restaurantOrder() {
        //
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/restaurant`, {
          "shopId": this.$store.state.selectedShopData.shopId,
          "orders": JSON.stringify(this.restaurantList.restaurantList),
          "tableNumber": this.restaurantList.tableNumber,
          // "tableNumber": "197352464989687808",
          "money": this.totalPrice,
          "payType": this.payType,
          "return_url": this.$store.state.homeHtml
        }, function (body) {
          console.log(_this.totalPrice)
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
        let coinPay = '/api/restaurant/bycoin';
        let wxPay = '/api/restaurant/pay';
        if (this.payType === 1) {
          payUrl = wxPay;
          let _this = this
          myNetUtils.method.post(`${global_msg.method.getBaseUrl()}` + payUrl, {
            "orderNo": this.order,
            "shopId": _this.$store.state.selectedShopData.shopId,

          }, function (body) {
            // 跳转支付

            console.log("支付成功")
            window.location.href = body.data.pay_url;
            // _this.$router.push("/");

          }, function (message) {
            alert("获取支付url失败:" + message)
          })
        } else if (this.payType === 4) {
          payUrl = coinPay
          let _this = this
          myNetUtils.method.post(`${global_msg.method.getBaseUrl()}` + payUrl, {
            "orderNo": this.order,
          }, function (body) {
            Toast("币支付成功!");
            _this.$router.go(-1);
          }, function (message) {
            alert("获取支付url失败:" + message)
          })
        }

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
    height: 1100px;
    background: #ffffff;

    .orderComputed-header {
      width: 100%;
      margin: 0px auto;
      padding: 10px 10px;
      border-bottom: 1px solid #bbbbbb;


    }
  }

  .right_container {
    padding-bottom: 10px;
  }

  .orderInfo {
    width: 90%;
    margin: 0 auto;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;

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
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background: #1684c2;
    border-radius: 10px;
    color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .zhifu {
    margin-top: 10px;
    float: right;

    .wxbtn {
      padding: 10px;
    }

    .dbbtn {
      margin-left: 20px;
      padding: 10px;
    }
  }


  .right_inner_container {
    width: 100%;
    background: #ffffff;
    padding-right: 20px;
    margin-top: 15px;
  }

  .right_inner_container_name {
    line-height: 40px;
    /*float: left;*/
  }

  .img_order {
    float: left;
    margin: 5px 10px;
    width: 80px;
    height: 60px;
  }

  .like-total {
    margin-top: -40px;
  }
</style>
