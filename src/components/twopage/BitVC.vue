<template>
  <div class="bitvc">
    <div class="bitvc_top">
      <div class="bitvc_top_inner">
        <div class="back_top">
          <div class="back_top_inner">
            <div class="back_top_inner_txt" @click="routerBack">
              <a>
                <button class="mui-icon mui-icon-back back_txt"></button>
              </a>
              <div class="back_txt-1" style="font-size: 14px;">返回</div>
            </div>
            <span class="back_center">余币宝</span>
          </div>
        </div>
        <div class="bitvc_content">
          <div class="bitvc_content_txt">余币（宝）</div>
          <div class="bitvc_content_txt1">200</div>
          <div class="at-row">
            <div class="at-col">
              累计收益（币）
              <div class="data">300</div>
            </div>
            <div class="at-col border-col">
              七日年化（%）
              <div class="data">0</div>
            </div>
          </div>
        </div>
        <div class="bitvc_btn">
          <router-link to="/bitvcin" class="btn">
            <button type="button" class="mui-btn mui-btn-warning mui-btn-block warning_in">转出</button>
          </router-link>
          <router-link to="/bitvcout" class="btn">
            <button type="button" class="mui-btn mui-btn-warning mui-btn-block warning_out">转入</button>
          </router-link>
        </div>
      </div>
      <!-- <backbar title="余币宝"></backbar> -->
    </div>
  </div>
</template>
<script>
  import backBar from "../public/backBar.vue";
  export default {
    data() {
      return {};
    },
    methods: {
      routerBack() {
        this.$router.go(-1);
      } //返回上一层
    },
    components: {
      // backBar
    }
  };
</script>
<style lang="less" scoped>
  .bitvc_top {
    height: 150px;
    width: 100%;
    background-image: linear-gradient(to right, #fd769f, #fb8d68);
    position: absolute;
    .bitvc_top_inner {
      border-bottom: 2px solid #fb8d68;
      width: 90%;
      height: 270px;
      border-radius: 20px;
      margin: 20px auto;
      background-color: #fff;
      position: relative;
    }
  }
  .back_top_inner {
    border-radius: 40px;
    background-color: #fff;
    display: flex;
    line-height: 50px;

    // justify-content: space-between;
  }
  .back_top_inner_txt {
    // text-align: center;
    display: flex;
  }
  .back_txt {
    // color: aqua;
    flex: 1;
    border-radius: 40px;
    line-height: 38px;
    border: none;
  }
  .back_txt_1 {
    font-size: 14px !important;
    // color: aqua !important;
    // float: left !important;
    flex: 1;
  }
  .back_center {
    // padding: 0 80px;
    text-align: center;
    width: 55%;
    font-size: 14px;
  }
  .bitvc_content {
    text-align: center;
    font-size: 13px;
    .bitvc_content_txt1 {
      font-size: 18px;
    }
  }
  .at-row {
    text-align: center;
    margin-top: 30px;
    font-size: 16px;
    display: flex;
    color: #62666a;
    //   padding: 30px 0;
    //   background-color: #fff;
    .at-col {
      flex: 1;
      font-size: 16px;
    }
  }
  .data {
    margin-left: -30px;
  }
  .bitvc_btn {
    display: flex;
    justify-content: center;
  }
  .mui-btn-warning {
    height: 50px;
    width: 100px;
    font-size: 15px;
    margin: 20px 10px;
  }

</style>



// WEBPACK FOOTER //
// src/components/twopage/BitVC.vue
