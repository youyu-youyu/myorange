<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="添加卡片"></back-bar>
    <div class="addcard">
      <input type="text" placeholder="请输入卡号" ref="cardNumber">
      <input type="text" placeholder="请输入密码" ref="cardPassword">
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
      //直接提交卡号和密码
      submitAddCard() {
        this.addEntityCards();
      },
      // 添加实体卡(绑定)
      addEntityCards() {
        let cardNumber = this.$refs.cardNumber.value;
        let cardPassword = this.$refs.cardPassword.value;
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/entitycards/bind`,
            {
              "shopId": this.$store.state.selectedShopData.shopId,
              "cardNo": cardNumber,
              "password": cardPassword,

            }, {emulateJSON: true})
          .then(res => {
            console.log(res.body.data)
            if (res.body.err_code === 0) {
              alert("添加成功！")
            } else {
              alert("添加实体卡失败:" + res.body.message)
            }

          });
      },
      scanAddCard() {
        ///扫码绑定
        let local = window.location.href;
        alert(local);
        localStorage.setItem(global_msg.isProcessQrCode, "false");
        window.location.href = `http://sao315.com/w/api/saoyisao?redirect_uri=${local}`;
        alert(window.location.href)
        //扫码完成回到homeContainer页面处理信息
      },

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
