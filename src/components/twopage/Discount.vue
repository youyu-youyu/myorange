<template>
  <div class="record">
    <backbar title="优惠券"></backbar>
    <!-- 顶部滑动条 -->
    <div class="discount">
      <div class="discount-inner" style="text-align: center">
        <!--        <span class="discount-inner-item" @click="discountEvent(0)">可使用({{availableDiscountList.length}})</span>-->
        <span class="discount-inner-item" @click="discountEvent(0)">可使用</span>
        <!--        <span class="discount-inner-item" @click="discountEvent(1)">已过期({{expiredDiscountList.length}})</span>-->
        <span class="discount-inner-item " @click="discountEvent(1)">已过期</span>
        <!--        <span class="discount-inner-item" @click="discountEvent(2)">已使用({{usedDiscountList.length}})</span>-->
        <span class="discount-inner-item" @click="discountEvent(2)">已使用</span>
      </div>

      <div id="item1mobile" class="mui-slider-item mui-control-content mui-active item1">
        <!--                <ul class="mui-table-view mui-table-view-chevron discount_ul" v-for="(item,index) in discountShowList">-->
        <ul id="setNone" class="mui-table-view-chevron discount-ul" v-for="(item,index) in discountShowList">
          <li class="mui-table-view-cell mui-media">
            <!--            <img class="mui-pull-left discount__img" src="../../assets/discount/discount.png"/>-->
            <div class="mui-media-body discount_body" style="padding-left: 10px">
              <div class="mui-ellipsis couponname">{{item.couponName}}</div>
              <div class="deductMoney" style="float: left;padding-left: 10px;font-size: 30px;color: orange;">
                {{item.deductMoney}}
              </div>
            </div>
            <div class="discount_right" @click="clickDiscountEvent(index)">
              <div class="" style="padding: 5px">礼品券</div>
              <div class="">立即兑换</div>
            </div>
            <!--            <button class="mui-pull-right discount_btn">立即使用</button>-->
          </li>
          <li class="mui-table-view-cell mui-media">
            <a style="padding: 10px 10px;">
              <div class="mui-pull-left discount_date">过期时间：{{item.endTime}}</div>
              <div class="mui-media-body discount_txt">满足条件：需满{{item.buyMoney}}</div>
            </a>
            <a style="padding: 10px 10px;">
              <div class="mui-pull-left" style="width: 50%;font-size: 15px">
                使用模块：{{item.useModule===1?"全部":item.useModule===2?"餐饮":"套餐"}}
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import backbar from "../public/backBar.vue";
  import global_msg from "../js/global";
  import myNetUtils from "../js/MyNetUtils.js";
  import {Toast} from "mint-ui"

  export default {
    data() {
      return {
        availableDiscountList: "",
        usedDiscountList: "",
        expiredDiscountList: "",
        discountShowList: "",
        discountIndex: 0,
        //从rechange传过来的金额
        price: 0
      };
    },
    mounted() {
      this.availableDiscount();
      this.expiredDiscount();
      this.usedDiscount();
    },
    methods: {
      clickDiscountEvent(index, type) {
        //如果是可使用
        // if (this.availableDiscountList.length === 0) {
        // }
        //如果点击已过期，禁止，已使用，禁止
        this.discountIndex = index

        // 点击立即兑换之后
        //如果购买的钱数>=需要满足的条件，允许点击
        // 问题：只能点击可使用，其他不可点击
        this.price = this.$route.query.price
        console.log(this.price)
        if (this.price !== undefined) {
          this.$store.commit('setCoupon', this.availableDiscountList[this.discountIndex]);
          if (this.price >= this.$store.state.coupon.buyMoney) {
            Toast("兑换成功！")
            this.$router.go(-1)
          } else {
            alert("兑换失败！您未满足条件！")
          }
        }
      },
      //可使用优惠券
      availableDiscount: function () {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/member/coupons`, {
          _timestamp: (new Date).getTime(),
          shopId: _this.$store.state.selectedShopData.shopId
        }, function (body) {
          _this.availableDiscountList = body.data

          console.log("可使用优惠券")
          console.log(_this.availableDiscountList)
          //如果长度为0

          // console.log(body.data[0].couponId)
          //当点击立即兑换的时候，获取点击的couponId
          _this.discountEvent(0);
        }, function (message) {
          alert("获取优惠券信息错误：" + message)
        })
      },
      //已过期优惠券
      expiredDiscount: function () {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/member/duecoupons`, {
          "_timestamp:": (new Date).getTime(),
          shopId: _this.$store.state.selectedShopData.shopId
        }, function (body) {
          _this.expiredDiscountList = body.data

        }, function (message) {
          alert("获取优惠券信息错误：" + message)
        })
      },
      //已使用优惠券
      usedDiscount: function () {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/member/usedcoupons`, {
          _timestamp: (new Date).getTime(),
          shopId: _this.$store.state.selectedShopData.shopId
        }, function (body) {
          _this.usedDiscountList = body.data
        }, function (message) {
          alert("获取优惠券信息错误：" + message)
        })
      },
      discountEvent(type) {
        this.discountShowList = [];
        if (type === 0) {
          this.discountShowList = this.discountShowList.concat(this.availableDiscountList)
        } else if (type === 1) {
          this.discountShowList = this.discountShowList.concat(this.expiredDiscountList)
          // document.getElementById("setNone").setAttribute("style", "pointer-events:none;")
        } else {
          this.discountShowList = this.discountShowList.concat(this.usedDiscountList)
        }
      }

    },
    components: {
      backbar
    },

  };
</script>
<style lang="less" scoped>
  .mui-active {
    color: #000000 !important;
    border-bottom: 1px solid transparent !important;
  }

  .discount {
    margin-top: 50px;
  }

  .discount-inner {
    display: flex;
    padding: 10px;
    background: #ffffff;
    color: #484848;

    .discount-inner-item {
      flex: 1;

    }
  }

  .mui-scroll {
    // margin-top: 5px;
    background: #e0e0e0;
    width: 100% !important;
    padding: 10px;
  }

  #sliderSegmentedControl {
    background-color: #fff;
  }

  .mui-control-content {
    height: 100%;
  }

  /*button {*/
  /*  width: 100px;*/
  /*  height: 40px;*/
  /*}*/

  /*.discount_btn {*/
  /*  border-radius: 20px;*/
  /*  margin-top: -25px;*/
  /*  margin-right: -55px;*/
  /*  background-color: orange;*/

  /*  // margin-left: 40px;*/
  /*}*/
  .discount_right {
    float: right;
    margin-top: -25px;
    margin-right: -55px;
  }

  .discount__img {
    width: 80px;
    height: 60px;
  }

  .couponname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
    padding-bottom: 10px;

  }


  .discount_date {
    width: 50%;
    font-size: 15px;
    /*line-height: 60px;*/
    /*white-space: initial;*/
    /*qq*/
  }

  .discount_txt {
    font-size: 15px;
    float: right;
  }

  .discount_backer {
    padding-top: 10px;
  }

  .item1 {
    ul {
      /*border-bottom: 1px solid #e0e0e0;*/
      width: 95%;
      margin: 10px auto;
      /*height: 160px !important;*/

      padding-left: 0px;
      border-radius: 15px;
      border: 1px solid transparent !important;
      background: #ffffff;
    }
  }


  /*.discount_xin {*/
  /*  !*  设置为不可点击*!*/
  /*  */
  /*}*/
</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/Discount.vue-->
