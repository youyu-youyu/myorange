<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="添加卡片"></back-bar>
    <div class="addcard">
      <input type="text" placeholder="请输入卡号" ref="userNameInput" readonly="readonly">
      <input type="text" placeholder="请输入密码" ref="userBirthdayInput">
      <button class="addcard_btn" @click="submitAddCard()">提交</button>
      <button class="addcard_btn" @click="scanAddCard()">扫码绑定</button>
    </div>
  </div>
</template>

<script>
  import BackBar from "../public/backBar";
  import loading from "../public/loading/loading";
  import global_msg from "../js/global";

  export default {
    name: "AddCard",
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      scanAddCard() {
        ///扫码
        let local = window.location.href;
        localStorage.setItem(global_msg.isProcessQrCode, "false");
        window.location.href = `http://sao315.com/w/api/saoyisao?redirect_uri=${local}`;
      },
      //该方法的作用是从页面url里面处理回调过来的二维码信息
      getUrlParam(name) {
        let reg = new RegExp("\\b" + name + "=([^&]*)");
        let r = location.href.match(reg);
        if (r != null) return decodeURIComponent(r[1]);
      },
      getUrlQrCode(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] === variable) {
            return pair[1];
          } else {
          }
        }
        return "";
      },
      //扫码完成
      scanCodeComplete() {
        //如果卡号的长度为八位数，跳出请输入密码，请确认密码
        //点击确认密码之后，调用服务器
      }

    },
    components: {
      BackBar,
      loading
    }
  }
</script>

<style lang="less" scoped>
  .addcard {
    padding: 10px 20px;
    margin-top: 50px;
  }
</style>
