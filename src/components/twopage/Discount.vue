<template>
  <div class="record">
    <backbar title="优惠券"></backbar>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider discount">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll discount-inner">
          <a class="mui-control-item mui-active" @click="discountEvent(0)">可使用({{availableDiscountList.length}})</a>
          <a class="mui-control-item" @click="discountEvent(1)">已过期({{expiredDiscountList.length}})</a>
          <a class="mui-control-item" @click="discountEvent(2)">已使用({{usedDiscountList.length}})</a>
        </div>
        <div id="item1mobile" class="mui-slider-item mui-control-content mui-active item1">
          <ul class="mui-table-view mui-table-view-chevron" v-for="(item,index) in discountShowList">
            <li class="mui-table-view-cell mui-media">
              <img class="mui-pull-left discount__img" src="../../assets/discount/discount.png"/>
              <div class="mui-media-body discount_body" style="padding-left: 10px">
                <div class="mui-ellipsis couponname">{{item.couponName}}</div>
                <div class="deductMoney" style="float: left;padding-left: 10px;font-size: 30px;color: orange;">
                  {{item.deductMoney}}
                </div>
              </div>
              <button class="mui-pull-right discount_btn">立即使用</button>
            </li>
            <li class="mui-table-view-cell mui-media">
              <a style="padding: 10px 0;">
                <div class="mui-pull-left discount_date">过期时间：{{item.endTime}}</div>
                <div class="mui-media-body discount_txt">满足条件：需满{{item.buyMoney}}</div>
              </a>
              <a style="padding: 10px 0;">
                <div class="mui-pull-left" style="width: 50%">
                  使用模块：{{item.useModule===1?"全部":item.useModule===2?"餐饮":"套餐"}}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import backbar from "../public/backBar.vue";
  import global_msg from "../js/global";

  export default {
    data() {
      return {
        availableDiscountList: "",
        usedDiscountList: "",
        expiredDiscountList: "",

        discountShowList: "",


      };
    },
    mounted() {
      this.availableDiscount();
      this.expiredDiscount();
      this.usedDiscount();

    },
    methods: {
      //可使用优惠券
      availableDiscount: function () {
        this.$http.get(`${global_msg.method.getBaseUrl()}` + "/api/member/coupons", {
          params: {
            _timestamp: (new Date).getTime(),
            shopId: this.$store.state.selectedShopData.shopId
          }
        }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.availableDiscountList = res.body.data
              this.discountEvent(0);
            } else {
              alert("获取优惠券信息错误：" + res.body.message)
            }
          })
      },
      //已过期优惠券
      expiredDiscount: function () {
        this.$http.get(`${global_msg.method.getBaseUrl()}` + "/api/member/usedcoupons", {
          params: {
            _timestamp: (new Date).getTime(),
            shopId: this.$store.state.selectedShopData.shopId
          }
        }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.usedDiscountList = res.body.data
              console.log("已过期优惠券")
              console.log(this.expiredDiscountList)
            } else {
              alert("获取优惠券信息错误：" + res.body.message)
            }
          })
      },
      //已使用优惠券
      usedDiscount: function () {
        this.$http.get(`${global_msg.method.getBaseUrl()}` + "/api/member/duecoupons", {
          params: {
            "_timestamp:": (new Date).getTime(),
            shopId: this.$store.state.selectedShopData.shopId
          }
        }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {

              this.expiredDiscountList = res.body.data
              console.log("已使用优惠券")
              console.log(this.usedDiscountList)
            } else {
              alert("获取优惠券信息错误：" + res.body.message)
            }
          })
      },
      discountEvent(type) {
        this.discountShowList = [];
        if (type === 0) {
          this.discountShowList = this.discountShowList.concat(this.availableDiscountList)
        } else if (type === 1) {
          this.discountShowList = this.discountShowList.concat(this.expiredDiscountList)
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
  .discount {
    margin-top: 50px;
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
    // position: absolute !important;
    margin-top: 40px;
    height: 100%;
  }

  button {
    width: 100px;
    height: 40px;
  }

  .discount_btn {
    border-radius: 20px;
    margin-top: -45px;
    margin-right: -65px;
    background-color: orange;

    // margin-left: 40px;
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
    /*line-height: 60px;*/
    /*white-space: initial;*/
  }

  .discount_backer {
    padding-top: 10px;
  }

  .item1 {
    ul {
      border-bottom: 1px solid #e0e0e0;
    }
  }
</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/Discount.vue-->
