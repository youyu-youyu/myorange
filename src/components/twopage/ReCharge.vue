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
        <div class=" recharge_ul" v-for="(item,index) in PrePayPackageList">
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
                <a>
                  <button class="mui-icon mui-icon-closeempty back_txt" @click="cancelEvent"></button>
                </a>
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

              <!--              class: {-->
              <!--              select_class: !0 === t.showClick-->
              <!--              },-->
              <!--              attrs: {-->
              <!--              id: "select_id"-->
              <!--              }-->
              <mt-cell title="赠送彩票">
                <span style="color: green">{{showData.giveLottery}}</span>
              </mt-cell>
            </div>
            <div class="recharge_tabar0">
              <cell ref="cellChild" select-pay-type0="微信付款" select-pay-type2="预存款付款"
                    :parent-click-method-name="changeMoneyWithPayType"></cell>
              <!--              changeMoneyWithPayTypeInShop-->
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block btn" @click="paymentClick">充值</button>
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
  import {Toast} from "mint-ui"

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
        // payTypeText: "微信付款",
        price: "",
        showData: ""
      }
    },
    //1.点击充值时付款 √
    //2.切换付款方式时价格与之对应  √
    //3.预存款只有微信支付-----点击预存款时，禁止点击事件
    mounted() {


      // localStorage.setItem("token","")
      this.getCoinRechargePackages();
      this.getPrePayPackages();
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
    },
    methods: {
      //方法传参
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

        this.commitOrder();
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
          //是套餐：充币
          this.isClickTop = false;
          this.showData = this.coinRechargePackageList[this.selectedIndex];
          //在点击切换时
          this.cardId = this.coinRechargePackageList[this.selectedIndex].cardId;
          this.cardType = 1;
          // this.$refs.cellChild.isDisplay = true;

          this.$refs.cellChild.payTypeText = "微信付款";
        } else {
          this.isClickTop = true;
          // this.showClick = true;
          this.showData = this.PrePayPackageList[this.selectedIndex];
          this.cardId = this.PrePayPackageList[this.selectedIndex].cardId;
          this.price = this.showData.amount;
          this.cardType = 0;
          // this.$refs.cellChild.isDisplay = false;

        }
        this.changeMoneyWithPayType(this.$refs.cellChild.payType);
        console.log(this.price);
      },
      //提交订单
      commitOrder() {
        console.log(this.PrePayPackageList);
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/order/store`,
            {
              "cardId": this.cardId, "shopId": this.$store.state.selectedShopData.shopId,
              "actualPrice": this.price, "sumcoin": this.showData.sumcoin, "cardType": this.cardType,
              "payType": this.$refs.cellChild.payType, "notifyUrl": this.$store.state.homeHtml
            }, {emulateJSON: true})
          .then(res => {
            this.loading = false;
            if (res.body.err_code === 0) {
              this.order = res.body.data.orderNo;
              this.showBox = 0;
              // console.log(this.order);
              this.judgePay();
            } else {
              alert("提交订单失败:" + res.body.message)
            }
          })
      },
      //获取充币套餐
      getCoinRechargePackages() {

        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/coins`,
            {
              params: {
                "brand_id": `${global_msg.method.getBrandId()}`, "shopId": this.$store.state.selectedShopData.shopId
              }
            }, {emulateJSON: true})

          .then(res => {
            if (res.body.err_code === 0) {
              this.coinRechargePackageList = res.body.data;
              console.log("获取充币套餐：")
              console.log(this.coinRechargePackageList)

            } else
              alert("获取支付套餐失败" + res.body.message)
          })
      },
      //获取预存款套餐
      getPrePayPackages() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/prerecharge`,
            {
              params: {
                "brand_id": `${global_msg.method.getBrandId()}`, "shopId": this.$store.state.selectedShopData.shopId,
              }
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.PrePayPackageList = res.body.data;
              console.log("获取预存款套餐")
              console.log(this.PrePayPackageList)
            } else {
              alert("获取预存款套餐失败")
            }
          });
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
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}` + payUrl,
            {
              "orderNo": this.order
            }, {emulateJSON: true})
          .then(res => {
            console.log("payUrl:")
            console.log(payUrl)
            // console.log("cardType:" + this.cardType);
            if (res.body.err_code === 0) {
              localStorage.setItem("payStatus", "1");
              // 跳转支付
              console.log("this.$refs.cellChild.payType:" + this.$refs.cellChild.payType)
              if (this.$refs.cellChild.payType === 1) {
                window.location.href = res.body.data.pay_url;
              } else {
                Toast("支付成功!");
                this.$router.go(-1);
              }
            } else {
              alert("获取支付url失败" + res.body.message)
            }
          })
      },

      orderPaymentMini() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/payment/shouqianbaformini`,
            {
              "orderNo": this.order
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {

            } else
              alert('获取小程序支付参数时错误：' + res.body.message)
          })
      },
      //1.子点击时传参数过来
      changeMoneyWithPayType(payType) {
        payType === 1 ? this.price = this.coinRechargePackageList[this.selectedIndex].actual_price : this.price = this.coinRechargePackageList[this.selectedIndex].balance_price
        console.log(this.coinRechargePackageList[this.selectedIndex].actual_price)
      }
    },
    components: {
      Cell,
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
</style>


// WEBPACK FOOTER //
// src/components/twopage/ReCharge.vue
