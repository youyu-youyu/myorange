<template>
  <div class="ordering_order">
    <loading v-if="loading"></loading>
    <backBar title="点餐订单详情" class="backBar"></backBar>
    <div class="ordering_order_inner">
      <div class="record">
        <!-- 顶部滑动条 -->
        <div class="record_slider">

          <!--          <div class="scanOrder_ordering">-->
          <div class="scanOrder_ordering_inner">
            <div class="shoprecord_inner" v-for="(item,index) in orderingOrderItemList">
              <img :src="photoUrl"
                   class="shoprecord_img">
              <div class="body-txt mui-media-body">
                <li class="mui-table-view-cell" style="list-style: none;">
                  <div class="mui-table">
                    <div class="mui-table-cell mui-col-xs-9">
                      <div class="mui-ellipsis" style="margin: 25px 0;">
                        {{item.cateringName}}
                      </div>
                    </div>
                    <div class="mui-table-cell mui-col-xs-3 mui-text-right shoprecord_jifen">
                      <span class="mui-h5">￥{{item.selling_price}}</span>
                      <div class="mui-h5">共{{item.num}}件</div>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //点餐订单
  import backBar from "../public/backBar";
  import loading from "../public/loading/loading";
  import myNetUtils from "../js/MyNetUtils.js";
  import global_msg from "../js/global";

  export default {
    name: "OrderingOrder",
    data() {
      return {
        loading: false,
        orderingOrderItemList: [],
        photoUrl: ""
      };
    },
    mounted() {
      this.orderingOrderItemList = JSON.parse(this.$route.query.orderInfo)
      for (let i = 0; i < this.orderingOrderItemList.length; i++) {
        //先循环再判断
        let data = this.orderingOrderItemList[i];
        this.photoUrl = data.photo_url === null ? require('../../assets/order/order.jpg') : data.photo_url
      }
      console.log(this.orderingOrderItemList)
    },
    methods: {},
    components: {
      backBar,
      loading
    }
  }
</script>

<style lang="less" scoped>
  .ordering_order_inner {
    overflow-y: auto;

    .record_slider {
      margin-top: 60px;
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
      color: #adadaf !important;
    }

    .myorder_1 {
      display: flex;
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
  }

  .scanOrder_ordering_inner {
    width: 90%;
    margin: 10px auto;
  }

  .shoprecord_inner {
    background: #fff;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;


    .shoprecord_img {
      float: left;
      width: 100px;
      height: 80px;
      /*margin-top: 15px;*/
      border-radius: 10px;
    }

  }

  .shoprecord_jifen {
    vertical-align: middle;
  }

  .mui-col-xs-9 {
    width: 95% !important;
  }

</style>
