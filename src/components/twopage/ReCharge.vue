<template>
  <div class="recharge">
    <loading v-if="loading"></loading>

    <div class="recharge_CoinPack">
      <div class="recharge_cz mui-icon mui-icon-back" @click="Back">充值
      </div>
    </div>
    <div class="recharge_content">
      <div class="recharge_yu">预存款余额：{{parseInt($store.state.userAccountData.userMoney)}}元</div>
      <div class="recharge_total">
        <div class="recharge_1">请选择预存款套餐</div>
        <div class="recharge_ul" v-for="(item,index) in PrePayPackageList">
          <li class="mui-media  recharge_li" @click="clickEvent(index,false)">
            <div class="mui-media-body cardName1">{{item.actual_price}}￥</div>
          </li>
        </div>
      </div>

    </div>
    <div class="recharge_content">
      <div class="recharge_yu">余币：{{$store.state.userAccountData.userTotalCoin}}</div>
      <div class="recharge_total">
        <div class="recharge_1">请选择充币套餐</div>
        <div class=" recharge_ul" v-for="(item,index) in coinRechargePackageList">
          <li class="mui-media  recharge_li" @click="clickEvent(index,true)">
            <div class="total_cardname">
              <div class="mui-media-body cardName">{{item.cardName}}</div>
              <div class="mui-media-body giveCoin">金额:{{item.actual_price}}</div>
            </div>
          </li>
        </div>
      </div>
    </div>

    <div id="Prover_1" class="mui-popover mui-popover-action
    mui-popover-bottom  recharge_bottom" :class="{'mui-active':showBox===0}">
      <div class="recharge_middle">
        <div class="backBar font">
          <div class="back_top">
            <div class="back_top_inner">
              <div class="back_top_inner_txt">
                <button class="mui-icon mui-icon-closeempty back_txt" @click="cancelEvent"></button>
              </div>
            </div>
          </div>
        </div>

        <div class="recharge_all">
          <!--   //获得点击的下标的金额-->
          <div class="recharge_tabar">

            <div class="recharge_tabar_txt1">{{price}}</div>
          </div>
          <div class="recharge_tabar">
            <div class="recharge_tabar0">
              <mt-cell :title='isClickTop ? "预存款":"币数"'>
                <span style="color: green">{{showData.coin}}</span>
              </mt-cell>
            </div>
            <div class="recharge_tabar0">
              <mt-cell title="赠送币数">
                <span style="color: green">{{showData.giveCoin}}</span>
              </mt-cell>
            </div>
            <div class="recharge_tabar0">
              <mt-cell title="赠送积分">
                <span style="color: green">{{showData.giveScore}}</span>
              </mt-cell>
            </div>
            <div class="recharge_tabar0">
              <mt-cell title="赠送彩票">
                <span style="color: green">{{showData.giveLottery}}</span>
              </mt-cell>
            </div>
            <div class="recharge_tabar0" @click="toDiscount">
              <mt-cell title="优惠券">
                <!--                  <span style="color: green">可用:</span>-->
                <span class="mui-icon mui-icon-forward"></span>
              </mt-cell>
            </div>
            <div class="recharge_tabar0">
              <cell ref="cellChild" select-pay-type0="微信付款" select-pay-type2="预存款付款"
                    :parent-click-method-name="changeMoneyWithPayType"></cell>
              <!--                    :parent-click-method-name="changeMoneyWithPayType"></cell>-->
              <!--              changeMoneyWithPayTypeInShop-->
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block btn" @click="paymentClick()">充值</button>
    </div>
    <!--卡片-->
    <div class="mui-card" v-show="baseBox">
      <!--    //成功卡片-->
      <div class="recharge_success" v-show="successPay">
        <div class="mui-card-content ">
          <div class="mui-card-content-inner">
            <img src="../../assets/pay/success.jpg" class="recharge_img-success"/>
          </div>
        </div>
        <div class="mui-card-footer">
          <div class="" @click="totalEvent(0)">
           <span class="mui-content-padded mui-icon mui-icon-arrowthinleft">
           </span>返回主页
          </div>
          <div class="mui-card-link" @click="totalEvent(1)">
            <span class="mui-content-padded mui-icon mui-icon-extra mui-icon-extra-cart">
            </span>继续购买
          </div>
        </div>
      </div>
      <!--    成功或失败  //-->
      <div class="recharge-fail" v-show="failPay">
        <!--    //失败卡片-->
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <img src="../../assets/pay/fail.png" class="recharge_img-fail"/>
          </div>

        </div>
        <div class="mui-card-footer">
          <div class="recharge-back" @click="totalEvent(0)">
           <span class="mui-content-padded mui-icon mui-icon-arrowthinleft">
           </span>返回主页
          </div>
          <div class="mui-card-link" @click="totalEvent(1)">
            <span class="mui-content-padded mui-icon mui-icon-extra mui-icon-extra-cart">
            </span>
            继续购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import global_msg from '../js/global.js'
  import Cell from "../public/cell";
  import {Toast, MessageBox} from "mint-ui";
  import loading from "../public/loading/loading"
  import myNetUtils from "../js/MyNetUtils.js";

  export default {
    name: "ReCharge",
    data() {
      return {
        coinRechargePackageList: [],
        order: "",
        selectedIndex: -1,
        cardId: "",
        showClick: false,
        showBox: 1,//1隐藏，0显示
        loading: false,
        successPay: false,//1隐藏，0显示
        failPay: false,//1隐藏，0显示
        baseBox: false,
        orderStore: "",
        PrePayPackageList: [],
        cardType: -1,
        isClickTop: false,
        price: "",
        showData: "",
        miniInfo: "",
        couponId: ""
      }
    },
    //1.点击充值时付款 √
    //2.切换付款方式时价格与之对应  √
    //3.预存款只有微信支付-----点击预存款时，禁止点击事件
    mounted() {
      // localStorage.setItem("token","")

      this.getCoinRechargePackages();
      this.getPrePayPackages();
      // console.log(this.$store.state.coupon)
      //拿到携带的充值成功或失败的状态
      let result = localStorage.getItem("payStatusResult")
      if (result === "1") {//状态1支付失败
        this.baseBox = true;
        this.failPay = true

      } else if (result === "0") {//状态0支付成功
        this.baseBox = true;
        this.successPay = true
      }
      localStorage.setItem("payStatusResult", "-1")
      if (this.$store.state.coupon !== undefined) {
        this.loading = true
        this.showData = this.$store.state.reChangeShowData
        this.price = this.$store.state.reChangeShowData.actual_price - this.$store.state.coupon.deductMoney
        this.showBox = 0
        this.loading = false
        // this.clickEvent(index, isPackage)
        //点击优惠券返回时候，默认点击上次点击的

      }
      // this.availableDiscount()
    },
    methods: {
      //
      //方法传参
      toDiscount() {
        this.$router.push({path: '/discount', query: {price: this.price}})
      },
      totalEvent(type) {
        //自定义如果参数=0
        //返回上一页
        if (type === 0) {
          this.$router.go(-1)
        } else {
          this.successPay = false;
          this.failPay = false;
          this.baseBox = false
        }
      },
      Back() {
        this.$router.go(-1); //返回上一层
      },
      //点击消失
      cancelEvent() {
        this.showBox = 1;
        this.loading = false;
      },
      paymentClick() {
        MessageBox({
          title: '提示',
          message: "确定在" + this.$store.state.selectedShopData.shopName + "店消费?",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(action => {
          if (action === 'confirm') {
            this.commitOrder();
          } else {
            this.showBox = 1;
            this.loading = false;
          }
        });

      },
      //点击付款
      judgePay() {
        if (this.$store.state.type === 1) {
          this.orderPaymentH5();
        } else {
          this.orderPaymentMini();
        }
      },
      clickEvent(index, isPackage) {
        this.order = "";
        this.loading = true;
        this.showBox = 0;
        this.selectedIndex = index;
        if (isPackage) {
          //true：充币套餐
          this.$refs.cellChild.clickable1 = true;

          this.isClickTop = false;
          this.showData = this.coinRechargePackageList[this.selectedIndex];
          console.log("币存款")
          //在点击切换时
          this.cardId = this.coinRechargePackageList[this.selectedIndex].cardId;
          this.cardType = 1;
          this.changeMoneyWithPayType(this.$refs.cellChild.payType);
          // this.$refs.cellChild.isDisplay = true;


        } else {
          //预存款套餐
          this.$refs.cellChild.clickable1 = false;
          this.$refs.cellChild.payTypeText = "微信付款";
          this.$refs.cellChild.payType = 1;
          // this.showClick = true;
          this.showData = this.PrePayPackageList[this.selectedIndex];
          console.log("预存款")

          this.cardId = this.PrePayPackageList[this.selectedIndex].cardId;

          this.price = this.showData.amount;
          // console.log(this.showData.amount - this.$store.state.coupon.deductMoney)
          this.cardType = 0;
        }
        console.log(this.showData)
        this.$store.commit('setReChangeShowData', this.showData);
      },
      //提交订单
      commitOrder() {
        if (this.$store.state.coupon) {
          this.couponId = this.$store.state.coupon.couponId
        } else {
          this.couponId = ""
        }
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/order/store`, {
          "cardId": this.cardId,
          "shopId": this.$store.state.selectedShopData.shopId,
          "actualPrice": this.price,
          "sumcoin": this.showData.sumcoin,
          "cardType": this.cardType,
          "payType": this.$refs.cellChild.payType,
          "notifyUrl": this.$store.state.homeHtml,
          "couponId": this.couponId,
        }, function (body) {
          _this.loading = false;
          _this.order = body.data.orderNo;
          _this.showBox = 0;
          // console.log(this.order);
          _this.judgePay();
        }, function (message) {
          alert("提交订单失败:" + message)
        })
      },
      //获取充币套餐
      getCoinRechargePackages() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/coins`, {
          "brand_id": `${global_msg.method.getBrandId()}`, "shopId": this.$store.state.selectedShopData.shopId
        }, function (body) {
          _this.coinRechargePackageList = body.data;
        }, function (message) {
          alert("获取支付套餐失败" + message)
        })

      },
      //获取预存款套餐
      getPrePayPackages() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/prerecharge`, {
          "brand_id": `${global_msg.method.getBrandId()}`, "shopId": this.$store.state.selectedShopData.shopId,
        }, function (body) {
          _this.PrePayPackageList = body.data;
        }, function (message) {
          alert("获取预存款套餐失败" + message)
        })
      },
      orderPaymentH5() {
        let payUrl;
        let prePay = "/api/payment/predeposit";
        let wxPay = '/api/payment/shouqianba';
        if (this.$refs.cellChild.payType === 1) {
          payUrl = wxPay;
        } else if (this.$refs.cellChild.payType === 4) {
          payUrl = prePay
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
            _this.$router.go(-1);
          }
        }, function (message) {
          alert("获取支付url失败" + message)
        })
      },
      mini() {
      },
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
      //1.子点击时传参数过来
      changeMoneyWithPayType(payType) {
        //使用优惠券之后的显示价格
        // console.log(this.$store.state.coupon)
        if (this.$store.state.coupon !== undefined) {
          if (this.$store.state.coupon.deductMoney > 0) {
            // 如果点击了兑换
            //则显示的价格扣除优惠券的
            payType === 1 ? this.price = this.coinRechargePackageList[this.selectedIndex].actual_price - this.$store.state.coupon.deductMoney
              : this.price = this.coinRechargePackageList[this.selectedIndex].balance_price - this.$store.state.coupon.deductMoney
            console.log(this.coinRechargePackageList[this.selectedIndex])
            return;
          }
        }
        //没用优惠券之前的显示价格
        payType === 1 ? this.price = this.coinRechargePackageList[this.selectedIndex].actual_price : this.price = this.coinRechargePackageList[this.selectedIndex].balance_price
        // console.log(this.coinRechargePackageList[this.selectedIndex])
      }
    },
    components: {
      Cell,
      loading,
    }
  }
</script>

<style lang="less" scoped>
  .mui-icon-back:before {
    font-size: 20px;
    /*margin-top: 5px;*/
    padding-right: 10px;
  }


  .recharge_img-success {

    width: 100%;
    height: 100%;
    /*margin-top: 30px;*/
  }

  .recharge_success {
  }

  .mui-card {
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    /*left:20%;*/
    top: 0 !important;
    /*opacity: 0;*/
  }

  .recharge_img-fail {
    width: 100%;
  }

  .recharge {
    width: 100%;

    /*background-color: #ffffff;*/
    min-height: 1100px;

    .recharge_CoinPack {
      padding: 20px 5px;
      width: 100%;
      font-size: 16px;
      color: #ffffff;
      background-image: linear-gradient(to right, rgba(125, 130, 250), rgba(22, 168, 254));

      .recharge_cz {
        padding-left: 10px;
        font-size: 16px;
      }
    }

    .recharge_CoinPack1 {
      float: right;
      /*margin-top: -20px;*/
    }

    .recharge_content {
      /*position: absolute;*/
      background-color: #ffffff;

      .recharge_yu {
        border-radius: 10px 10px 0 0;
        margin-top: 20px;
        font-size: 13px;
        color: #fed08b;
        background-color: #ffffff;
        padding: 10px 10px;
        border-bottom: 1px solid #e0e0e0;
      }

      .cardName {
        font-size: 15px;
        color: blue;
        /*position: absolute;*/
      }

      .giveCoin {
        font-size: 13px;
      }
    }

    .total_cardname {
      padding: 10px 10px;
    }

    .btn {
      position: fixed;
      bottom: 0;
    }
  }

  .temp {
    background-color: #D3B986;
  }

  .recharge_total {
    width: 100%;
    overflow-y: auto;
    background-color: #ffffff !important;
    margin-top: 10px;

    .recharge_1 {
      padding: 10px 5px;
      font-size: 15px;
    }
  }

  .recharge_ul {
    display: flex !important;
    text-align: center;

    /*border-bottom: 1px solid #e0e0e0;*/
    width: 33.33% !important;
    float: left;

    .recharge_li {
      flex: 1 !important;
      margin: 10px 5px;
      border: 1px solid #007aff;
      border-radius: 10px;
      list-style: none;
      /*border: 1px solid #e0e0e0;*/
    }
  }

  .price {
    float: right;
    padding-right: 20px;
  }

  .recharge_bottom {
    height: 450px;
    background-color: #ffffff !important;

  }

  .recharge_tabar_txt1 {
    font-size: 30px;
    color: #000000 !important;
    text-align: center;
    padding: 20px 0;
  }

  .recharge_tabar_txt {
  }

  .recharge_tabar0 {
    left: 0;
  }

  .recharge_middle_inner_txt {
    text-align: center;
    padding-top: 20px;
  }

  .back_top_inner {
    background: #D3B986;
    display: flex !important;
    border-bottom: 1px solid #e0e0e0;

    .back_txt {
      background: #D3B986;
      border: none;
      flex: 1 !important;
    }

    .back_center {
      text-align: center;
      width: 75%;
      line-height: 40px;
    }
  }

  .cardName1 {
    padding: 20px;
    color: #00a1fe;
  }

  .mint-cell-value {
    padding-right: 20px;
  }

  .base_div {
    .cover_selectPay {
      pointer-events: none;
    }
  }
</style>


WEBPACK FOOTER //
src/components/twopage/ReCharge.vue
