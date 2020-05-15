<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="修改用户信息"></back-bar>
    <div class="modify">
      <img v-bind:src=basicInfoData.userPhoto class="modify-img">
      <div class="modify_inner">
        <input type="text" placeholder="请输入昵称" ref="userNameInput" readonly="readonly">
        <input type="tel" placeholder="请输入电话" ref="userMobilPhoneInput">
        <input type="text" placeholder="请输入生日" ref="userBirthdayInput">
        <button class="userInfo_btn" @click="submitModifyUserInfo()">提交</button>
      </div>
      <div class="currentLevel_level">
        <div class="currentLevel">
          当前等级:黄金会员
        </div>
        <button class="userInfo_btn">提升等级</button>
      </div>
    </div>
  </div>
</template>

<script>
  import BackBar from "../public/backBar";
  import loading from "../public/loading/loading";

  export default {
    name: "ModifyUserInfo",
    data() {
      return {
        loading: false,
        basicInfoData: "",
        userMobilPhoneInput: "",
        userBirthdayInput: "",
      }
    },
    mounted() {
      this.basicInfoData = this.$store.state.userInfoData;
      this.$refs.userNameInput.value = this.basicInfoData.userName;
      this.$refs.userMobilPhoneInput.value = this.basicInfoData.userPhone;
      this.$refs.userBirthdayInput.value = this.basicInfoData.brithday;
    },
    methods: {
      //提交修改的用户信息
      submitModifyUserInfo() {
        this.userMobilPhoneInput = this.$refs.userMobilPhoneInput.value;
        this.userBirthdayInput = this.$refs.userBirthdayInput.value;
      },
    },
    //如果修改信息，获取到input的信息，提交到服务器
    components: {
      BackBar,
      loading
    }
  }
</script>

<style lang="less" scoped>
  .modify {
    margin-top: 50px;
    padding: 10px 20px;

    .modify-img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }

    .modify_inner {
      width: 100%;
    }

    .userInfo_btn {
      text-align: center;
      width: 100px;
      height: 40px;
      margin-top: 20px;
      left: 35%;
      background: #00a1fe;
    }

    .currentLevel {
      margin-top: 20px;
    }

    .currentLevel_level {
      margin-top: 50px;
    }
  }
</style>
