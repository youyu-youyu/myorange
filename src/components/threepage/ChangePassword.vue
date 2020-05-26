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

  export default {
    name: "ChangePassword",
    data() {
      return {
        loading: ""
      }
    },
    mounted() {
    },
    methods: {
      savePassword() {
        let currentPassword = this.$refs.currentPassword.value;
        let newPassword = this.$refs.newPassword.value;
        let confirmPassword = this.$refs.confirmPassword.value;
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
