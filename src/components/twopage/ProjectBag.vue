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
            <div class="item_item" v-show="projectDetailInfoObject.is_number_time===1">有效开始日：111
              {{projectDetailInfoObject.valid_start_date}}
            </div>
            <div class="item_item" v-show="projectDetailInfoObject.is_number_time===1">有效结束日：222
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
            <div class="" v-show="projectDetailInfoObject.activation===0">购买激活</div>
            <!--            {{projectDetailInfoObject.valid_start_date}}-->
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
          <img src="../../assets/project/img.jpg" class="item-img mui-pull-left">
          <p class="mui-pull-left projectbag-p">赠送彩票&nbsp;&nbsp;</p>
          <p class="mui-pull-left projectbag-p">x{{projectDetailInfoObject.giveLottery}}</p>
        </div>
        <div class="item">
          <img src="../../assets/project/img.jpg" class="item-img mui-pull-left">
          <p class="mui-pull-left projectbag-p">赠送积分&nbsp;&nbsp;</p>
          <p class="mui-pull-left projectbag-p">x{{projectDetailInfoObject.giveScore}}</p>
        </div>
      </div>
      <div class="item item-height">
        <img src="../../assets/project/img.jpg" class="item-img mui-pull-left">
        <p class="mui-pull-left projectbag-p">赠送币数&nbsp;&nbsp;</p>
        <p class="mui-pull-left projectbag-p">x{{projectDetailInfoObject.giveCoin}}</p>
      </div>
      <div class="projectbag_buy">
        <div class="projectbag_buy_txt mui-pull-left">购买礼包</div>
        <div class="projectbag_buy_txt mui-pull-right projectbag_buy_right">{{projectDetailInfoObject.actual_price}}
        </div>
      </div>

      <button class="mui-pull-right projectbag_btn" @click="paymentClick()">支付</button>
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

  export default {
    name: "ProjectBag",
    data() {
      return {
        cardId: "",
        bagPhoto: "",
        actualPrice: "",
        sumCoins: "",
        giveLottery: "",
        giveScore: "",
        data: '',
        orderNumber: "",
        projectDetailInfoObject: "",
        shopName: ""

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
        this.commitOrder();
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
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/order/store`,
            {
              "cardId": this.data.cardId,
              "shopId": this.$store.state.selectedShopData.shopId,
              "actualPrice": this.projectDetailInfoObject.actual_price.replace(",", ""),
              "sumcoin": this.projectDetailInfoObject.coin,
              "cardType": 2,
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
        this.commitOrder();
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
              alert("h5获取支付url失败：" + res.body.message);
            }
          })
      },

      orderPaymentMini() {
        this.commitOrder();
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
              let bagData = res.body.data;
              console.log(this.projectDetailInfoObject);
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
      backBar
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
  .total{
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    border-radius:10px;
    margin: 0 auto;
    background-color: #ffffff !important;
  }
  .item_item{
    padding: 5px 20px;
  }

</style>



// WEBPACK FOOTER //
// src/components/twopage/ProjectBag.vue
