<template>
  <div class="orderinfo">
    <backbar title="订单详情"></backbar>
    <!--    收货地址显示-->
    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
      <li class="mui-table-view-cell">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <img class="mui-media-object mui-pull-left"  src="../../assets/user/address.png">
            <h5 class="mui-ellipsis">{{orderInfoObject.fullname}} &nbsp;&nbsp;{{orderInfoObject.mobile}}</h5>
            <h5>{{orderInfoObject.address}}</h5>
          </div>
        </div>
      </li>
    </ul>
    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed orderinfor_content">
      <li class="mui-table-view-cell">
        <div class="orderifo">订单信息</div>
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <h4 class="mui-ellipsis">订单编号：{{orderInfoObject.id}}</h4>
            <h5>订单创建时间：{{orderInfoObject.create_time}}</h5>
            <div class="mui-h6 mui-ellipsis">付款时间：{{orderInfoObject.pay_time}}</div>
            <div class="mui-h6 mui-ellipsis">总金额：{{orderInfoObject.payment_money}}</div>
          </div>
          <div class="mui-table-cell mui-col-xs-2 mui-text-right">
          </div>
        </div>
      </li>
    </ul>
    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed orderinfor_content">
      <li class="mui-table-view-cell" v-for="(item,index) in orderInfoObject.goods">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <img :src="item.product_img" alt="加载错误" class="mui-media-object mui-pull-left myorder_img" >
            <h4 class="mui-ellipsis">{{item.product_name}}</h4>
            <h5>实付 ￥{{item.product_price*item.num}}</h5>
            <!--            <p class="mui-h6 mui-ellipsis">Hi，李明明，申请交行信息卡，100元等你拿，李明明，申请交行信息卡，100元等你拿，</p>-->
          </div>
          <div class="mui-table-cell mui-col-xs-4 mui-text-right">
            <span class="mui-h5">单价：￥{{item.product_price}}</span>
            <div class="mui-h5">X{{item.num}}</div>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>
<script>
  import backbar from "../public/backBar.vue";
  import global_msg from "../js/global";

  export default {
    data() {
      return {
        orderInfoObject:''
      };
    },
    mounted() {
      this.orderId = this.$route.query.orderId;
      this.orderInfomation();
    },
    methods: {
      //订单详情接口
      orderInfomation() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/mall/orderdata`,
            {
              "brand_id": `${global_msg.method.getBrandId()}`, "orderid": this.orderId
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.orderInfoObject = res.body.data;
              console.log(this.orderInfoList)
            } else {
              alert("获取订单详情失败：" + res.body.message);
            }

          })
      },

    },
    components: {
      backbar
    }
  };
</script>
<style lang="less" scoped>
  .orderinfo{
    margin-top: 60px;
  }
  .myorder_img {
    width: 80px;
    height: 80px !important;
  }

  .mui-media-object {
    max-width: 80px !important;
  }
  .orderinfor_content{
    margin-top: 10px;
  }
  .orderifo{
    font-size: 14px;
    font-weight: 800;
    border-left: 3px solid purple;
    padding-left: 10px;
    margin-bottom: 10px;
  }
</style>



// WEBPACK FOOTER //
// src/components/threepage/orderInfo.vue
