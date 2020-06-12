<template>
  <div class="bitvcin">
    <backbar title="转入余币宝"></backbar>
    <div class="bitvcin_top">
<!--      <img src="../../assets/bitvc/bitvcout.jpg" class="mui-pull-left bitvcin_left" />-->
      <div class="mui-media-body bitvc_body">
        余币宝
        <p class="mui-ellipsis">3200</p>
      </div>
      <div class="mui-pull-right bitvcin_right">
        <span class="mui-icon mui-icon-forward"></span>
      </div>
    </div>
    <div class="bitvc_content">
      <form id="login-form" class="mui-input-group">
        <div class="bitvc_txt">转出余币宝</div>
        <div class="mui-input-row">
          <label>￥</label>
          <input id="account" type="text" class="mui-input-clear mui-input" placeholder="请输入转出余币宝" />
          <div class="mui-pull-right bitvcin_right bitvcin_right_1">全部</div>
        </div>
        <div class="bitvcin_now">立马到账</div>
      </form>
    </div>
    <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary quereng">确认转入</button>
  </div>
</template>
<script>
  import backbar from "../public/backBar.vue";
  export default {
    data() {
      return {};
    },
    methods: {},
    components: {
      backbar
    }
  };
</script>
<style lang="less" scoped>
  .bitvcin_top {
    padding-top: 60px;
    background-color: #fff;
  }
  .bitvcin_left {
    width: 50px;
    height: 50px;
  }
  .bitvc_body {
    margin: 10px 20px;
    padding-bottom: 5px;
    // padding:0 20px;
  }
  .bitvcin_right {
    margin-top: -50px;
  }
  .bitvcin_right_1 {
    padding-top: 20px;
    padding-right: 10px;
  }
  .bitvc_txt {
    padding: 20px 20px;
    color: #e0e0e0;
  }
  .bitvcin_now {
    padding: 20px 20px;
    color: #e0e0e0;
  }
  .quereng{
    margin-top: 30px;
  }
</style>



// WEBPACK FOOTER //
// src/components/threepage/BitVCin.vue
