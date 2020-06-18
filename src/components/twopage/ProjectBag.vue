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

      <button class="mui-pull-right projectbag_btn" @click="paymentClick()" id="select_id">去结算</button>
      <cell ref="cellChild" select-pay-type0="微信付款" select-pay-type1="预存款付款" select-pay-type2="代币付款"
            :parent-click-method-name="showPayType" :is-display="false"></cell>
    </div>
    <div class="at-row-bottom">
      <div class="jifen_title">看看我的项目可以做什么？</div>
      <div class="jifen_body">项目规则：</div>
      <div class="jifen_txt">1.这里可以写一些项目的规则</div>
      <div class="jifen_txt">2.这里可以写一些项目的规则</div>
      <div class="jifen_txt">3.这里可以写一些项目的规则</div>
    </div>
    <div id="cover"></div>
    <div class="small_car" :class="{'active':showBox===false}">
      <div class="cancel">
        <button class="cancel_inner" @click="projectBagCancel">X</button>
      </div>

      <div class="small_b mui-row">
        <img :src="projectDetailInfoObject.photo_url" class="small_img mui-col-[sm|xs]-4">
        <div class="priceName  mui-col-[sm|xs]-6">
          <div class="small_name">{{projectDetailInfoObject.cardName}}</div>
          <div class="small_price">{{price}}元</div>
        </div>
        <button class="suan mui-col-[sm|xs]-2" @click="this.commitOrder">支付</button>
      </div>
      <div @click="goDiscount">
        <mt-cell title="使用优惠券">
          <!--                  <span style="color: green">可用:</span>-->
          <span class="mui-icon mui-icon-forward"></span>
        </mt-cell>
      </div>
      <cell ref="cellChild"></cell>
    </div>
  </div>
</template>

<script>
  import backBar from "../public/backBar";
  import global_msg from "../js/global";
  import Cell from "../public/cell"
  import {Toast} from "mint-ui"
  import myNetUtils from "../js/MyNetUtils.js";

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
        showBox: false,
        couponId: ""
      }
    },
    mounted() {
      // if (this.$store.state.coupon === undefined) {
      //
      // }
      console.log(232)
      console.log(this.$store.state.coupon)
      this.shopName = this.$store.state.selectedShopData.shopName;
      this.data = this.$route.query;
      this.getProjectInformation();
    },
    methods: {
      //方法传参
      goDiscount() {
        this.$router.push({path: '/discount', query: {price: this.projectDetailInfoObject.actual_price}})
      },
      //取消
      projectBagCancel() {
        document.getElementById("cover").setAttribute("style", "display:none;")
        this.showBox = false
        this.price = this.$store.state.reChangeShowData.actual_price
        console.log(this.price)
        this.$store.commit('setCoupon', undefined);
      },
      //点击付款
      paymentClick() {
        this.loading = true
        document.getElementById("cover").setAttribute("style", "display:block;"),
          //父组件通过$ref获取到子组件的实例对象并调用子组件的selectPay方法
          //传一个方法，点击支付弹出三个支付方式，点击三个支付方式，直接付款
          // this.$refs.cellChild.selectPay()
          this.showBox = true
        this.loading = false
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
          // this.price = this.projectDetailInfoObject.actual_price.replace(",", "");
          // this.price = this.projectDetailInfoObject.actual_price - this.$store.state.coupon.deductMoney
          if (this.price <= 0) {
            alert("该订单不可支付")
            this.showBox = false
            document.getElementById("cover").setAttribute("style", "display:none;")
            this.price = this.$store.state.reChangeShowData.actual_price
            console.log(this.price)
            this.$store.commit('setCoupon', undefined);
            return;
          }
        } else if (this.$refs.cellChild.payType === 3) {
          this.price = this.projectDetailInfoObject.balance_price;
          if (this.price <= 0) {
            alert("您的预存款支付余额不足")
          }
        } else if (this.$refs.cellChild.payType === 4) {
          this.price = this.projectDetailInfoObject.coin_money;
          if (this.price <= 0) {
            alert("您的币支付余额不足")
          }
        }
        let _this = this
        console.log(this.price)
        if (this.$store.state.coupon) {
          this.couponId = this.$store.state.coupon.couponId
        } else {
          this.couponId = ""
        }

        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/order/store`, {
          "cardId": this.data.cardId,
          "shopId": this.$store.state.selectedShopData.shopId,
          "actualPrice": this.price,
          "sumcoin": this.projectDetailInfoObject.coin,
          "cardType": 2,
          "payType": this.$refs.cellChild.payType,
          "notifyUrl": this.$store.state.homeHtml,
          "couponId": this.couponId,
        }, function (body) {
          _this.orderNumber = body.data.orderNo;
          _this.judgePay();
        }, function (message) {
          alert("提交订单失败：" + message);
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
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}` + payUrl, {
          "orderNo": this.orderNumber
        }, function (body) {
          // 跳转支付
          if (_this.$refs.cellChild.payType === 1) {
            window.location.href = body.data.pay_url;
          } else {
            Toast("支付成功！");
            _this.$router.push("/");
          }
        }, function (message) {
          alert("h5获取支付失败:" + message);
        })
      },

      orderPaymentMini() {
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/payment/shouqianbaformini`, {
          "orderNo": this.orderNumber
        }, function (body) {

        }, function (message) {
          alert('获取小程序支付参数时错误：' + message)
        })
      },
      //获取项目详细信息
      getProjectInformation() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/projects/information`, {
          "brand_id": `${global_msg.method.getBrandId()}`,
          "shopId": this.$store.state.selectedShopData.shopId,
          "cardId": this.data.cardId
        }, function (body) {
          _this.projectDetailInfoObject = body.data;
          console.log(_this.projectDetailInfoObject)
          _this.price = _this.projectDetailInfoObject.actual_price
          _this.$store.commit('setReChangeShowData', _this.projectDetailInfoObject);
          //使用优惠券
          if (_this.$store.state.coupon !== undefined && _this.$store.state.coupon !== '') {
            document.getElementById("cover").setAttribute("style", "display:block;"),
              _this.showBox = true
            _this.price = _this.projectDetailInfoObject.actual_price - _this.$store.state.coupon.deductMoney

          }
          console.log("huxu" + _this.price)
          let bagData = body.data;
          _this.projectDetailInfoObject.photo_url = _this.projectDetailInfoObject.photo_url
          === "" ? require("../../assets/project/xiangmu_card1.png") : bagData.photo_url;
        }, function (message) {
          alert("获取项目信息失败" + message);
          _this.$router.go(-1);
        })
      },
      showPayType(payType) {
        if (payType === 1) {
          this.$refs.cellChild.payTypeText = "微信付款"
          console.log(this.$store.state.coupon)
          if (this.$store.state.coupon !== undefined) {
            this.price = this.projectDetailInfoObject.actual_price - this.$store.state.coupon.deductMoney
          }
          this.price = this.projectDetailInfoObject.actual_price
        } else if (payType === 3) {
          this.$refs.cellChild.payTypeText = "预存款付款"
          this.price = this.projectDetailInfoObject.balance_price;
        } else {
          this.$refs.cellChild.payTypeText = "代币付款"
          this.price = this.projectDetailInfoObject.coin_money;
        }
        console.log(payType)
        console.log(this.$refs.cellChild.payTypeText)
      }
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

  .small_car {
    background: #ffffff;
    height: 220px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999999;
    border-radius: 10px 10px 0 0;

    .small_b {
      padding: 20px 20px;
      margin: 0 auto;
      text-align: center;

      .small_img {
        width: 100px;
        height: 50px;

      }

      .suan {
        margin-top: 5px;
        background: #00ab5f;
      }

      .priceName {
        width: 50%;
      }
    }
  }

  .active {
    display: none;
  }

  //遮盖层
  #cover {
    background: #000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    filter: alpha(opacity=50);
    opacity: .5;
    display: none;
    z-index: 99999;
    height: -webkit-fill-available
  }

  .cancel {
    background: #D3B986;
    border-radius: 10px 10px 0 0;

    .cancel_inner {
      border: transparent;
      background: #D3B986;
      color: #8b8888;
      border-radius: 10px 10px 0 0;
    }
  }

</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/ProjectBag.vue-->
