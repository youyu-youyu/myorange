<template>
  <div>
    <back-bar title="商品记录"></back-bar>
    <!--    <div class="shoprecord" style="margin-top: 50px;">-->
    <!--      <div class="shoprecord_inner"></div>-->
    <!--    </div>-->
    <div class="shoprecord" style="margin-top: 50px;">
      <div class="shoprecord_inner">
        <img src="../../assets/home/shuijiao.jpg"
             class="shoprecord_img">
        <div class="body-txt mui-media-body">
          <li class="mui-table-view-cell" style="list-style: none;">
            <div class="mui-table">
              <div class="mui-table-cell mui-col-xs-9"><h4 class="mui-ellipsis">
                猪年图鉴袜子鸭</h4> <h5>-30波波币（广州正佳广场店）</h5> <h5>01.26 18:19:28</h5>
              </div>
              <div class="mui-table-cell mui-col-xs-3 mui-text-right shoprecord_jifen"><span
                class="mui-h5">+6积分</span></div>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import backBar from "../public/backBar.vue";

  export default {
    data() {
      return {};
    },
    methods: {},
    components: {
      backBar
    }
  };
</script>
<style lang="less" scoped>
  .shoprecord_inner {
    background: #fff;
    padding: 10px;

    .shoprecord_img {
      float: left;
      width: 70px;
      height: 50px;
      margin-top: 15px;
    }

  }

  .shoprecord_jifen {
    vertical-align: middle;
  }
  .mui-col-xs-9{
    width: 95% !important;
  }
</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/ShopRecord.vue-->
