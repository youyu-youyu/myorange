<template>
  <div class="shopcardetail">
    <loading v-if="loading"></loading>
    <backBar title="购物车" class="backBar" :back-path="'shop'"></backBar>
    <div class="user_top_top">
      <div class="ticket_top" v-for="(item,index) in shopCarList">
        <div class="user_top_inner">
          <ul class="mui-table-view" @click="showImg(index)">
            <img src="../../assets/shop/empty.png" class="shopcardetain_img_empty ">
            <img src="../../assets/shop/click.png" class="shopcardetain_img_empty" v-show="item.isSelected">
            <li class="mui-table-view-cell mui-media shopcardetail_content">
              <img class="mui-media-object mui-pull-left" v-bind:src=item.productImg>
              <div class="mui-media-body user_top_body" style="color: #000;">
                {{item.productName}}
                <div>
                  <div class="mui-ellipsis user_left ">折扣： {{item.good_disc}}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="projectrecord_footer">
            <div class=" mui-pull-left shopcardetail-txt"> {{item.price}}￥</div>
            <div class=" mui-pull-right">
              <div class="mui-numbox " data-numbox-min='0' data-numbox-max='100'>
                <button class="mui-btn mui-btn-numbox-minus" type="button" @click="reduceClick(index,true)">-</button>
                <input id="test" class="mui-input-numbox" type="number" v-model="item.count">
                <button class="mui-btn mui-btn-numbox-plus" type="button" @click="reduceClick(index,false)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="footer">-->
    <div class="mu-card-title-container">

      <div class="mu-card-title" @click="allSelected()">
        <img src="../../assets/shop/empty.png" class="shopcardetain_img_empty ">
        <img src="../../assets/shop/click.png" class="shopcardetain_img_empty" v-show="isAllChecked">
        <div class="shopcardetain-text">全选</div>
      </div>
      <div class="mu-card-sub-title">
        合计：{{sumPrice}}￥
        <button type="button" class="mui-btn mui-btn-primary" @click="submit()">
          结算
        </button>
        <!--        </div>-->
      </div>
    </div>
    <div class="fullscreen">
      <div id="Prover_1" class="mui-popover mui-popover-action
      recharge_bottom" :class="{'mui-active':showBox===true}">
        <div class="recharge_middle">
          <div class="backBar font">
            <div class="back_top">
              <div class="back_top_inner">
                <div class="back_top_inner_txt" @click="closeEvent()">
                  <button class="mui-icon mui-icon-closeempty back_txt"></button>
                </div>
                <span class="back_center">付款详情</span>
              </div>
            </div>
          </div>
          <div class="recharge_all">
            <!--   //获得点击的下标的金额-->
            <div class="recharge_tabar">
              <p class="recharge_tabar_txt1">{{sumPrice}}￥</p>
            </div>
            <div class="recharge_tabar">
              <div class="recharge_tabar0">
                <cell :select-pay-type0="payType0" :select-pay-type1="payType1" :select-pay-type2="payType2"
                      ref="cellChild"></cell>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="mui-btn mui-btn-primary mui-btn-block btn" @click="pay()">付款</button>
      </div>
    </div>
  </div>
</template>
<script>
  import backBar from "../public/backBar.vue";
  import {Toast} from 'mint-ui'
  import global_msg from "../js/global";
  import Cell from "../public/cell";
  import loading from "../public/loading/loading";

  export default {
    name: "CarDetail",
    data() {
      return {
        shopCarList: [],
        isAllChecked: false,//// 正在进行中的数据是否被选中
        sumPrice: 0,
        loading: false,
        showBox: false,//
        //如果是从地址页面回来，一瞬间显示订单编号
        address: "",
        payJSONList: [],
        order_sn: "",
        payMoney: 0,
        payType0: "",
        payType1: "",
        payType2: "",
      }

    },
    //如果收钱吧为1，显示出来付款，如果为2，隐藏
    created() {
      //问题：点击返回时数据被清除
      //返回上一层时，sumPrice被清除
      //解决方案：
      //定义一个数组接收从商城页面传过来的参数
      this.shopCarList = this.$store.state.shopCarList;
      for (let i = 0; i < this.shopCarList.length; i++) {
        //定义data接收某个产品(产品列表下标)
        let data = this.shopCarList[i];
        //如果没有count属性
        if (!data.hasOwnProperty("count"))
          //自行设置data中的count的值为0
          data["count"] = 0;
      }
      this.address = this.$route.query.addressIndex;
      // console.log(this.address);
      if (this.address === "" || this.address === 'undefined' || this.address === undefined) {
        // console.log(this.address);
        // Toast("请先选择地址");
      } else {

        this.showBox = true;
        this.payJSONList = [];
        for (let data of this.shopCarList) {
          let tempString = "";
          tempString = data.id + "|" + data.count;
          if (data.isSelected) {
            this.payJSONList.push(tempString);
          }
        }
      }
    },
    mounted() {
      this.orderReadyPay();

    },
    methods: {
      //生成订单准备支付
      orderReadyPay() {
        this.$http.post(`${global_msg.method.getBaseUrl()}/api/mall/orderbuy`, {
          "addrid": this.address.id, "brand_id": `${global_msg.method.getBrandId()}`,
          "payjson": JSON.stringify(this.payJSONList), "notifyUrl": this.$store.state.homeHtml,
        }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              console.log(res.body.data)
              this.payMoney = res.body.data.paymoney;
              this.sumPrice = this.payMoney;
              this.order_sn = res.body.data.order_sn;
              this.addressList = [];
              this.addressList = this.addressList.concat(res.body.data);
              if (res.body.data.sqbpay === 1) {
                this.payType0 = "微信支付"
              } else if (res.body.data.sqbpay === 2) {
                this.payType0 = ""
              }
              if (res.body.data.jfpay === 1) {
                this.payType1 = "积分支付"
              } else if (res.body.data.jfpay === 2) {
                this.payType1 = ""
              }
              if (res.body.data.cppay === 1) {
                this.payType2 = "彩票支付"
              } else if (res.body.data.cppay === 2) {
                this.payType2 = ""
              }
            } else {
              alert("生成订单准备支付失败" + res.body.message)
            }
          })
      },
      //彩票支付
      lotteryPay() {
        this.$http.post(`${global_msg.method.getBaseUrl()}/api/mall/lotterypay`,
          {
            "order_sn": this.order_sn,
          }, {emulateJSON: true})
          .then(res => {
            console.log(res.body);
            if (res.body.err_code === 0) {

            } else {
              alert("彩票支付失败:" + res.body.message)
            }
          })
      },
      //积分支付
      integralPay() {
        this.$http.post(`${global_msg.method.getBaseUrl()}/api/mall/integralpay`,
          {
            "order_sn": this.order_sn,
          }, {emulateJSON: true})
          .then(res => {
            console.log(res.body);
            if (res.body.err_code === 0) {

            } else {
              alert("积分支付失败:" + res.body.message)
            }
          })
      },
      // //收钱吧支付接口
      shouqianbaPayment() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/mall/payorder`,
            {
              "order_sn": this.order_sn, "shopid": this.$store.state.selectedShopData.shopId,
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              // 跳转支付
              window.location.href = res.body.data.pay_url;
            } else {
              alert("获取支付url失败：" + res.body.message);
            }

          })
      },
      //点击支付生成订单
      pay() {
        if (this.$refs.cellChild.payType === 1) {
          this.shouqianbaPayment();
        } else if (this.$refs.cellChild.payType === 3) {
          this.integralPay();
        } else if (this.$refs.cellChild.payType === 4) {
          this.lotteryPay();
        }
      },
      //点击消失
      closeEvent() {
        this.showBox = false;
      },
      //单选
      showImg(index) {
        if (this.showBox === true)
          return;
        this.shopCarList[index].isSelected = !this.shopCarList[index].isSelected;
        this.sumPrice = 0;
        //调用计算价格方法
        this.computeSumPrice();
        for (let data of this.shopCarList) {
          //如果没有全选
          if (!data.isSelected) {
            this.isAllChecked = false;
            return;
          }
        }
        this.isAllChecked = true;
        //判断每一个isSeclected是否选中，全选中让全选按钮选中
        // 只要有一个isSeclected不选中，让全选按钮不选中
      },
      //全选
      allSelected() {
        console.log("点击了全选")
        //清空价格
        this.sumPrice = 0;
        if (this.isAllChecked) {
          // 定义一个变量，该变量为false时，所有isSelected未选中
          for (let data of this.shopCarList) {
            //所有isSelected未选中
            data["isSelected"] = false;
          }
          //未选中
          this.isAllChecked = false;
        } else {
          // 该变量为true时，全选
          for (let data of this.shopCarList) {
            data["isSelected"] = true;
          }
          this.isAllChecked = true;
          // 全选时合计价格
          for (let data of this.shopCarList) {
            this.sumPrice += data.count * data.price;
          }
        }

        //点击全选：如果全选时，整个shopCarList列表全部被选中，且显示全部总金额
        //点击所有时同时控制所有的按钮
        //点击时所有被选中true
        //总价
      },
      //结算
      addressClick() {
        this.$router.push({
          path: '/myaddress',
          query: {temp: this.shopCarList}
        })
      },

      //点击结算
      submit() {
        for (let data of this.shopCarList) {
          //只要有一个被选中，就可以去提交订单了
          if (data.isSelected) {
            this.addressClick();
            return;
          }
        }
        //能走到这里说明for循环里面 没走到if，说明没有一个被选中的
        Toast("您至少需要选择购买一件商品！");
      },
      //封装一个方法（超过一个地方需要调用时需要封装一个方法，其他地方直接调用）
      computeSumPrice: function () {
        for (let data of this.shopCarList) {
          if (data.isSelected)
            this.sumPrice += data.count * data.price;
        }
      },
      reduceClick(index, isReduce) {
        if (this.showBox === true)
          return;
        this.sumPrice = 0;
        //定义一���点击事件控制两种方法
        if (isReduce) {
          // 如果true，count--
          this.shopCarList[index].count--;
          //data:当前点击的商品
          for (let data of this.shopCarList) {
            if (data.count === 0) {
              //如果所点击的购物商品的count小于或者等于0，从购物车中移除
              this.shopCarList.splice(index, 1)
              break;
            }
          }
        } else {
          this.shopCarList[index].count++;
        }
        this.updateGlobeShopCarList();
        //调用计算价格方法
        this.computeSumPrice();
        this.$forceUpdate();
      },
      updateGlobeShopCarList() {
        this.$store.commit('setShopCarList', this.shopCarList);
      },
    },

    components: {
      Cell,
      backBar,
      loading,
    },
  }
</script>

<style lang="less" scoped>
  #selectPay_id {
    display: none;
  }

  .projectrecord_footer {
    padding: 10px 10px;

    .shopcardetail-txt {
      padding-top: 5px;
    }
  }

  .ui-dialog-grid {
    background: #007aff !important;
  }

  .user_top_top {
    margin-top: 50px;
    margin-bottom: 500px;
    /*position: fixed;*/
    top: 50px;
    bottom: 50px;
    overflow: scroll;
  }

  .ticket_top {
    width: 100%;
    height: 100% !important;
    background: none;


    .user_top_inner {
      width: 95%;
      margin: 10px auto;
      background: #fff;
      height: 170px;
      border-radius: 5px;
      /*border-bottom: 2Px solid #FB8D68;*/
      position: relative;

      ul {
        padding: 5px 10px;
      }

    }

    .dec-count {
      height: 35px;
    }

    .UserContainer {
      width: 100%;
      min-height: 1100px;
    }

    .mui-table-view {
      position: inherit !important;
      background-color: transparent !important;
    }

    .mui-media-object {
      max-width: 80px !important;
      height: 80px !important;
      border-radius: 20px;
      line-height: 62px !important;
    }

    .user_top-item {
      /*line-height: 40px;*/
    }

    .user_left {
      padding-top: 15px;
      color: #000000;
    }

    .shopcardertail_b {
      margin: 5px;

      .shopcardertail_price {
        font-size: 20px !important;
      }
    }
  }

  .shopcardetain_img_empty {
    width: 30px;
    float: left;
    position: absolute;
    /*opacity: ;*/
    top: 30%;
  }

  .icon_click {
    position: absolute;
  }

  .shopcardetail_content {
    margin-left: 25px;
  }

  .mu-card-title-container {
    position: fixed;
    bottom: 0;
    z-index: 99999 !important;
    display: flex;
    color: #a0acac;
    justify-content: space-between;
    background: #ffffff;
    width: 100%;
    line-height: 70px;


    /*.mu-card-title-container {*/
    /*  !*position: relative;*!*/
    /*}*/
  }

  .mui-btn-primary {
    vertical-align: middle;
  }

  .shopcardetain-text {
    padding: 5px 30px;
  }

  .recharge_bottom {
    height: 450px;
    background-color: #ffffff !important;

  }

  .recharge_tabar_txt1 {
    font-size: 30px;
    color: #000000 !important;
    text-align: center;
    padding: 30px 0;
  }

  .recharge_tabar0 {
    left: 0;
  }

  .back_center {
    text-align: center;
    width: 75%;
    line-height: 40px;
  }

  .back_top_inner {
    display: flex !important;
    background: wheat;

    .back_txt {
      border: none;
      background: wheat;
      flex: 1 !important;
    }
  }

  .btn {
    position: fixed;
    bottom: 0;
  }
</style>


// WEBPACK FOOTER //
// src/components/twopage/ShopCarDetail.vue
