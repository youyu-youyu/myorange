<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="修改用户信息"></back-bar>
    <div class="modify">
      <img class="mui-pull-left modify-img" id="userPhoto_img" v-bind:src=userPhoto>
      <div class="mui-media-body  mui-media userPhoto" @click="modifyUserPhoto()">
        更换头像
      </div>
      <input type="file" accept="image/*" @change="modifyPhoto()" class="hiddenInput"/>
      <div class="modify_inner">
        <input type="text" placeholder="请输入昵称" ref="userNameInput">
        <input type="tel" placeholder="请输入电话" ref="userMobilPhoneInput">
        <input type="text" placeholder="请输入生日" ref="userBirthdayInput" id="userBirthday">
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
        userPhoto: "",
      }
    },
    mounted() {
      this.getPersonInfo();

    },
    methods: {

      showDatePicker() {
        this.$refs.pickerData.open();
      },
      //更换头像
      modifyUserPhoto() {
        // let _this = this
        // wx.chooseImage({
        //   count: 1, // 默认9
        //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        //   success: function (res) {
        //     var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        //     document.getElementById('userPhoto_img').src = localIds[0]
        //     _this.uploadPictureToServer(localIds[0])
        //   }
        // });


      },
      //获取个人信息
      getPersonInfo() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/mall/extdata`,
            {
              params: {}
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              let userData = res.body.data
              this.userPhoto = userData.userPhoto;
              this.$refs.userNameInput.value = userData.userName;
              this.$refs.userMobilPhoneInput.value = userData.userPhone;
              this.$refs.userBirthdayInput.value = userData.brithday;
              // if (this.$refs.userBirthdayInput.value !== "") {
              //   document.getElementById('userBirthday').setAttribute('disabled', 'disabled')
              // }
            } else {
              alert("获取个人信息失败：" + res.body.message);
            }
          })
      },
      //上传图片到服务器
      uploadPictureToServer(file) {
        alert(file)
        this.$http.post(`${global_msg.method.getBaseUrl()}/api/mall/uploadimg`,
          {
            "file": file
          }, {emulateJSON: true})
          .then(res => {
            alert()
            if (res.body.err_code === 0) {
              alert('上传图片成功!')
            } else
              alert('上传图片错误:' + res.body.message)
          })
      },

      //提交修改的用户信息
      submitModifyUserInfo() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/mall/extsave`,
            {
              "headimg": "",
              "username": this.$refs.userNameInput.value,
              "phone": this.$refs.userMobilPhoneInput.value,
              "birthday": this.$refs.userBirthdayInput.value,
            }, {emulateJSON: true})
          .then(res => {
            // alert(document.getElementById('userPhoto_img').src)
            // alert(res.body.data)
            if (res.body.err_code === 0) {
              alert('更新个人信息成功')
            } else
              alert('更新个人信息失败:' + res.body.message)
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
