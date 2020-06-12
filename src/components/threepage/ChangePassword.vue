<template>
  <div class="changepassword">
    <loading v-if="loading"></loading>
    <back-bar title="修改密码"></back-bar>
    <div class="changepassword_inner">
      <div>
        当前密码:<input type="text" placeholder="请输入当前密码" ref="currentPassword">
      </div>
      <div>
        新密码:<input type="text" placeholder="请输入新密码" ref="newPassword">
      </div>
      <div>
        确认密码:<input type="text" placeholder="请输入确认密码" ref="confirmPassword">
      </div>
      <button @click="savePassword()">保存修改</button>
    </div>
  </div>
</template>

<script>
  import BackBar from "../public/backBar";
  import loading from "../public/loading/loading";
  import global_msg from "../js/global";
  import myNetUtils from "../js/MyNetUtils.js";

  export default {
    name: "ChangePassword",
    data() {
      return {
        loading: "",
        cardNo: "",

      }
    },
    mounted() {
      this.cardNo = this.$route.query;
    },
    methods: {
      savePassword() {
        let currentPassword = this.$refs.currentPassword.value;
        let newPassword = this.$refs.newPassword.value;
        let confirmPassword = this.$refs.confirmPassword.value;
        this.editPassword(currentPassword, newPassword, confirmPassword);
      },

      //修改实体卡密码
      editPassword(currentPassword, newPassword, confirmPassword) {
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/entitycards/editpwd`, {
          "shopId": this.$store.state.selectedShopData.shopId,
          "cardNo": this.cardNo,
          "oldpwd": currentPassword,
          "newpwd": newPassword,
          "confirmpwd": confirmPassword,
        }, function (body) {
          let numRegex = /\D/g
          this.$refs.newPassword.value = this.$refs.newPassword.value.replace(numRegex, '')

          if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            alert("修改密码不可为空！")
          } else if (!this.$refs.newPassword.value) {
            alert("请输入数字")
            //密码只能为数字
          } else {
            alert("修改密码成功！")
            this.$router.go(-1);
          }

        }, function (message) {
          alert("修改实体卡密码失败:" + message);
        })
      }
    },
    components: {
      BackBar,
      loading
    }
  }
</script>

<style lang="less" scoped>
  .changepassword {
    padding: 20px 20px;
  }

  .changepassword_inner {
    margin-top: 50px;
  }
</style>
