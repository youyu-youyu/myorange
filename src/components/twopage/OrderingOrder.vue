<template>
  <div class="myorder">
    <loading v-if="loading"></loading>
    <backbar title="点餐订单列表"></backbar>
    <div class="myorder_inner">
      <div class="record">
        <!-- 顶部滑动条 -->
        <div class="record_slider">
          <div class="myorder_1">
            <span class="myorder-item" @click="allClickEvent(0)" :class="{active:isClick}">全部
              <!--  显示全部支付和未支付-->
            </span>
            <span class="myorder-item" @click="allClickEvent(1)" :class="{active:isClick1}">未支付
              <!--  只显示没付款的-->
            </span>
            <span class="myorder-item" @click="allClickEvent(2)" :class="{active:isClick2}">已支付
              <!-- 显示已付款未发货-->
            </span>
            <span class="myorder-item" @click="allClickEvent(3)" :class="{active:isClick3}">已完成
            </span>
          </div>
          <div class="myorder_padding" v-for="(item,index) in orderShowList"
               @click="orderInfoClickEvent(index)">
            <span class=" myorder_txt">订单号：{{item.orderNo}}</span>
            <h5>创建订单时间:{{item.createdAt}}</h5>
            <p class="color_p">支付状态:
              {{item.orderStatus===0?"未支付":(item.orderStatus===1?"已支付":
              (item.orderStatus===2?"已完成":(item.orderStatus===3?"失败":"关闭")))}}</p>
            <p class="color_p">支付方式:
              {{item.payType===0?"现金":(item.payType===1?"微信":
              (item.payType===2?"支付宝":(item.payType===3?"预存款":"币数")))}}
            </p>
            <p class="color_p">
              排队状态:{{item.queuingState===0?"未排队":(item.queuingState===1?
              "排队中":(item.queuingState===2?"已取餐":"已完成"))}}
            </p>
            <div class="">排队号:{{item.queueNumber}}</div>
            <span class="">{{ item.payType===1?item.money+'￥':parseInt(item.money)+'币'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import backbar from "../public/backBar";
  import global_msg from "../js/global";
  import loading from "../public/loading/loading";
  import myNetUtils from "../js/MyNetUtils.js";

  export default {
    data() {
      return {
        orderShowList: [],//显示列表
        orderList: [],
        orderingOrderItemList: [],//字列表
        SelectedOrderIndex: 0,
        loading: false,
        isClick: true,
        isClick1: false,
        isClick2: false,
        isClick3: false,
      };
    },
    mounted() {
      this.loading = true;
      this.orderOrderList();
    },
    methods: {
      //点击全部
      //点击切换选项卡时，清空上一个点击的，并且重新赋值
      //首先定义点击事件
      allClickEvent(paramName) {
        let _this = this
        this.orderShowList = [];
        if (paramName === 0) {
          this.isClick = true
          this.isClick1 = false
          this.isClick2 = false
          this.isClick3 = false
          //全部
          _this.orderShowList = _this.orderShowList.concat(_this.orderList);
        } else if (paramName === 1) {
          _this.loading = true;
          this.isClick = false
          this.isClick1 = true
          this.isClick2 = false
          this.isClick3 = false
          //进来if，说明点击未支付
          for (let data of _this.orderList) {
            //循环总订单的每条数据
            //当订单状态为0时，添加进要渲染的List
            if (data.orderStatus === 0) {//未支付
              _this.orderShowList.push(data);
            }
          }
          _this.loading = false;
          //
        } else if (paramName === 2) {
          this.isClick = false
          this.isClick1 = false
          this.isClick2 = true
          this.isClick3 = false
          for (let data of _this.orderList) {
            if (data.orderStatus === 1) {//已支付
              _this.orderShowList.push(data);
            }
          }
          //待收货
        } else if (paramName === 3) {
          this.isClick = false
          this.isClick1 = false
          this.isClick2 = false
          this.isClick3 = true
          for (let data of _this.orderList) {
            if (data.orderStatus === 2) {//已完成
              _this.orderShowList.push(data);
            }
          }
          //待收货
        } else if (paramName === 4) {
          for (let data of _this.orderList) {
            if (data.orderStatus === 3) {//失败
              _this.orderShowList.push(data);
            }
          }
        } else {
          for (let data of _this.orderList) {
            if (data.orderStatus === 4) {//关闭
              _this.orderShowList.push(data);
            }
          }
        }

      },

      orderOrderList() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/restaurant/order`, {
          "shopId": this.$store.state.selectedShopData.shopId,
          "_timestamp": new Date().getTime()
        }, function (body) {
          _this.loading = false;
          _this.orderList = body.data;
          for (let data of _this.orderList) {
            //循环把所有的子内容加进orderingOrderItemList里面
            _this.orderingOrderItemList = _this.orderingOrderItemList.concat(JSON.parse(data.orderInfo))
          }
          console.log(_this.orderList)
          console.log(_this.orderingOrderItemList)
          _this.orderShowList = _this.orderShowList.concat(_this.orderList);
        }, function (message) {
          alert("获取订单列表失败：" + message);
        })
      },
      //进入订单详情
      orderInfoClickEvent(index) {
        this.SelectedOrderIndex = index;
        //点击哪个订单号进去就显示哪个订单号的详细信息
        //把详细信息传过去orderdetails页面
        console.log(this.orderShowList[this.SelectedOrderIndex].orderInfo)
        this.$router.push({
          path: '/orderorderdetails', query: {orderInfo: this.orderShowList[this.SelectedOrderIndex].orderInfo}
        });
      },
    },
    components: {
      backbar,
      loading
    }
  };
</script>
<style lang="less" scoped>
  .myorder_inner {
    overflow-y: auto;
  }

  .record_slider {
    margin-top: 50px;
  }


  .record_content_img {
    width: 100px;
    height: 71px;
  }

  .myorder_txt {
    font-size: 16px;
    font-weight: 600;
  }

  .myorder_padding {
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 10px;
  }

  .color_p {
    color: #8f8f94 !important;
  }

  .myorder_1 {
    /*display: flex;*/
    width: 100%;

    .myorder-item {
      /*flex: 1;*/
      width: 25% !important;
      /*只设置width：25%还不行，还得设置float: left;*/
      float: left;
      text-align: center;
      background-color: #b6b6b6;
      padding: 10px 0;
    }
  }

  .active {
    color: #007aff;
  }
</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/MyOrder.vue-->
