<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="修改用户信息"></back-bar>
    <div class="modify">
      <img class="mui-pull-left modify-img" id="userPhoto_img" v-bind:src=basicInfoData.userPhoto>
      <div class="mui-media-body mui-media userPhoto" @click="modifyUserPhoto()">
        更换头像
      </div>
      <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
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
  import global_msg from "../js/global";

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
      //更换头像
      modifyUserPhoto() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            document.getElementById('userPhoto_img').src=localIds[0]
          }
        });


        // this.$http.post(`${global_msg.method.getBaseUrl()}/api/mall/uploadimg`,
        //   {
        //     "file": ""
        //   }, {emulateJSON: true})
      },
      //提交修改的用户信息
      submitModifyUserInfo() {
        // this.userMobilPhoneInput = this.$refs.userMobilPhoneInput.value;
        // this.userBirthdayInput = this.$refs.userBirthdayInput.value;
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/mall/extsave`,
            {
              // "headimg":,
              "username": this.$refs.userNameInput.value,
              "phone": this.$refs.userMobilPhoneInput.value,
              "birthday": this.$refs.userBirthdayInput.value,
            }, {emulateJSON: true})
          .then(res => {
            console.log(res.body.data)
            if (res.body.err_code === 0) {

            } else
              alert('获取小程序支付参数时错误：' + res.body.message)
          })
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
    margin-top: 30px;
    padding: 10px 20px;

    .modify-img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 20px 10px;
    }

    .userPhoto {
      margin-top: 60px;
    }

    .hiddenInput {
      display: none;
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
