<template>
  <div class="myorder">
    <loading v-if="loading"></loading>
    <backbar title="订单列表"></backbar>
    <div class="myorder_inner">
      <div class="record">
        <!-- 顶部滑动条 -->
        <div class="record_slider">
          <div class="myorder_1">
            <span class="myorder-item" @click="allClickEvent(0)" :class="{active:isClick}">全部
              <!--  显示全部支付和未支付-->
            </span>
            <span class="myorder-item" @click="allClickEvent(1)" :class="{active:isClick1}">待付款
              <!--  只显示没付款的-->
            </span>
            <span class="myorder-item" @click="allClickEvent(2)" :class="{active:isClick2}">待发货
              <!-- 显示已付款未发货-->
            </span>
            <span class="myorder-item" @click="allClickEvent(3)" :class="{active:isClick3}">待收货
            </span>
          </div>
          <div class="myorder_padding" v-for="(item,index) in orderShowList"
               @click="orderInfoClickEvent(index)">
            <span class=" myorder_txt ">订单号：{{item.order_sn}}</span>
            <h5>创建订单时间：{{item.create_time}}</h5>
            <p class=" color_p">支付状态：{{item.status}}</p>
            <span class="">{{item.order_money}}￥</span>
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
        orderShowList: [],
        orderList: [],
        SelectedOrderIndex: 0,
        loading: false,
        isClick: true,
        isClick1: false,
        isClick2: false,
        isClick3: false
      };
    },
    mounted() {
      this.loading = true;
      this.orederList();
    },
    methods: {
      //点击全部
      //点击切换选项卡时，清空上一个点击的，并且重新赋值
      //首先定义点击事件
      allClickEvent(paramName) {
        let _this = this
        this.orderShowList = [];
        if (paramName === 0) {
          //全部
          this.isClick = true
          this.isClick1 = false
          this.isClick2 = false
          this.isClick3 = false
          _this.orderShowList = _this.orderShowList.concat(_this.orderList);

          //待付款
        } else if (paramName === 1) {
          this.isClick = false
          this.isClick1 = true
          this.isClick2 = false
          this.isClick3 = false

          _this.loading = true;
          //进来if，说明点击待付款
          for (let data of _this.orderList) {
            //循环总订单的每条数据
            //当订单状态为0时，添加进要渲染的List
            if (data.order_status === 0) {
              _this.orderShowList.push(data);
            }
          }
          _this.loading = false;
          //待发货
        } else if (paramName === 2) {
          this.isClick = false
          this.isClick1 = false
          this.isClick2 = true
          this.isClick3 = false
          for (let data of _this.orderList) {
            if (data.order_status === 2) {
              _this.orderShowList.push(data);
            }
          }
          //待收货
        } else {
          this.isClick = false
          this.isClick1 = false
          this.isClick2 = false
          this.isClick3 = true
          for (let data of _this.orderList) {
            if (data.order_status === 3) {
              _this.orderShowList.push(data);
            }
          }
        }

      },
      // 点击待付款
      //点击待收货
      //点击待发货
      //点击待收货
      //订单列表
      orederList() {
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/mall/orderlist`, {
          "brand_id": `${global_msg.method.getBrandId()}`
        }, function (body) {
          _this.loading = false;
          _this.orderList = body.data;
          for (let i = 0; i < _this.orderList.length; i++) {
            //定义data接收某个产品(产品列表下标)
            let data = _this.orderList[i];
            //如果没有count属性
            if (!data.hasOwnProperty("status"))
              //自行设置data中的count的值为0
              if (data.order_status === 0)
                data["status"] = "待支付";
              else if (data.order_status === 2) {
                data["status"] = "待发货";
              } else if (data.order_status === 3) {
                data["status"] = "待收货";
              }
          }
          _this.orderShowList = _this.orderShowList.concat(_this.orderList);

        }, function (message) {
          alert("获取订单列表失败：" + message);
        })
      },
      //订单详情
      orderInfoClickEvent(index) {
        this.SelectedOrderIndex = index;
        this.$router.push({
          path: '/orderInfo', query: {orderId: this.orderShowList[this.SelectedOrderIndex].id}
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
