<template>
  <div class="changepassword">
    <diy>
      当前密码:<input type="text" placeholder="请输入当前密码" ref="currentPassword">
    </diy>
    <diy>
      新密码:<input type="text" placeholder="请输入新密码" ref="newPassword">
    </diy>
    <diy>
      确认密码:<input type="text" placeholder="请输入确认密码" ref="confirmPassword">
    </diy>
    <button @click="savePassword()">保存修改</button>
  </div>
</template>

<script>
  export default {
    name: "ChangePassword",
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      savePassword() {
        let currentPassword = this.$refs.currentPassword.value;
        let newPassword = this.$refs.newPassword.value;
        let confirmPassword = this.$refs.confirmPassword.value;
      }
    }
  }
</script>

<style lang="less" scoped>
  .changepassword {
    padding: 20px 20px;
  }
</style>
