<template>
  <div class="myorder">
    <loading v-if="loading"></loading>
    <backbar title="订单列表"></backbar>
    <div class="myorder_inner">
      <div class="record">
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider record_slider">
          <div
            class="mui-scroll-wrapper  mui-segmented-control
             mui-segmented-control-inverted">
            <div class="mui-scroll">
              <a
                class="mui-control-item mui-active"
                data-wid="tab-top-subpage-1.html" @click="allClickEvent(0)">全部
                <!--  显示全部支付和未支付-->
              </a>
              <a
                class="mui-control-item"
                data-wid="tab-top-subpage-2.html" @click="allClickEvent(1)">待付款
                <!--  只显示没付款的-->
              </a>
              <a
                class="mui-control-item"
                data-wid="tab-top-subpage-3.html" @click="allClickEvent(2)">待发货
                <!-- 显示已付款未发货-->
              </a>
              <a
                class="mui-control-item"
                data-wid="tab-top-subpage-4.html" @click="allClickEvent(3)">待收货
              </a>
            </div>
            <div class=" mui-control-content mui-active">
              <ul class="mui-table-view">
                <li class="mui-table-view-cell myorder_padding" v-for="(item,index) in orderShowList"
                    @click="orderInfoClickEvent(index)">
                  <div class="mui-table">
                    <div class="mui-table-cell ">
                      <span class="mui-ellipsis-2 myorder_txt ">订单号：{{item.order_sn}}</span>
                      <h5>创建订单时间：{{item.create_time}}</h5>
                      <p class="mui-h6 mui-ellipsis color_p">支付状态：{{item.status}}</p>
                      <span class="mui-h5">{{item.order_money}}￥</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
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

  export default {
    data() {
      return {
        orderShowList: [],
        orderList: [],
        SelectedOrderIndex: 0,
        loading: false,
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
        console.log(paramName);
        this.orderShowList = [];
        if (paramName === 0) {
          //全部
          this.orderShowList = this.orderShowList.concat(this.orderList);

          //待付款
        } else if (paramName === 1) {
          this.loading = true;
          //进来if，说明点击待付款
          for (let data of this.orderList) {
            //循环总订单的每条数据
            //当订单状态为0时，添加进要渲染的List
            if (data.order_status === 0) {
              this.orderShowList.push(data);
            }
          }
          this.loading = false;
          //待发货
        } else if (paramName === 2) {
          for (let data of this.orderList) {
            if (data.order_status === 2) {
              this.orderShowList.push(data);
            }
          }
          //待收货
        } else {
          for (let data of this.orderList) {
            if (data.order_status === 3) {
              this.orderShowList.push(data);
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
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/mall/orderlist`,
            {
              "brand_id": `${global_msg.method.getBrandId()}`
            }, {emulateJSON: true})
          .then(res => {
            this.loading = false;
            if (res.body.err_code === 0) {

              this.orderList = res.body.data;
              for (let i = 0; i < this.orderList.length; i++) {
                //定义data接收某个产品(产品列表下标)
                let data = this.orderList[i];
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
              this.orderShowList = this.orderShowList.concat(this.orderList);

            } else {
              alert("获取订单列表失败：" + res.body.message);

            }

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

  .record_slider {

    margin-top: 50px;
  }

  .mui-scroll {
    padding: 10px 0;
    // margin-top: 5px;
    background: #e0e0e0;
    width: 100% !important;
  }

  #sliderSegmentedControl {
    background-color: #fff;
  }

  .mui-scroll {
    text-align: center !important;
  }

  .mui-slider-indicator {
    text-align: left !important;
  }

  .mui-control-content {
    // position: absolute !important;
    margin-top: 50px;
    min-height: 1100px;
    /*height: 200px;*/
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
    padding-left: 30px;
  }

  .color_p {
    color: #8f8f94 !important;
  }
</style>


// WEBPACK FOOTER //
// src/components/twopage/MyOrder.vue
