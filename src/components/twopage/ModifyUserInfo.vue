<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="修改用户信息"></back-bar>
    <div class="modify">
      <div class="photo">
        <img class="mui-pull-left modify_img" id="userPhoto_img" v-bind:src=userPhoto @click="uploadHeadImg">
      </div>
      <!--      <div class="mui-media-body  mui-media userPhoto" @click="modifyUserPhoto()">-->
      <!--        更换头像-->
      <!--      </div>-->
      <div class="setting_right" @click="uploadHeadImg">
        <div class="caption">更改头像</div>
      </div>
      <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
    </div>
    <div class="modify_inner" style="width: 90%;margin: 0px auto">
      <input type="text" placeholder="请输入昵称" ref="userNameInput">
      <input type="tel" placeholder="请输入手机号" ref="userMobilPhoneInput">
      <div>
        <date-picker v-model="time1" valueType="format"
                     ref="userBirthdayInput"
                     id="userBirthday"
                     :disabled="disabled"
                     placeholder="请输入生日"></date-picker>
      </div>
      <button class="userInfo_btn" @click="submitModifyUserInfo()">提交</button>
    </div>
    <div class="currentLevel_level">
      <div class="currentLevel">
        当前等级:{{this.$store.state.userInfoData.rankName}}
      </div>
      <button class="userInfo_btn" @click="membershipLevelUpgrade()">提升等级</button>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>
  import BackBar from "../public/backBar";
  import loading from "../public/loading/loading";
  import global_msg from "../js/global";
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/locale/zh-cn';
  import 'vue2-datepicker/index.css';
  import {Toast, MessageBox} from "mint-ui";
  import myNetUtils from "../js/MyNetUtils.js";


  export default {
    name: "ModifyUserInfo",
    props: {},
    data() {
      return {
        time1: null,
        loading: false,
        userPhoto: "",
        disabled: false
      }
    },
    mounted() {
      this.getPersonInfo();


    },
    methods: {
      // 打开图片上传
      uploadHeadImg: function () {
        this.$el.querySelector('.hiddenInput').click()
      },
      // 将头像显示
      handleFile: function (e) {
        let $target = e.target
        let file = $target.files[0]
        let reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target
          this.userPhoto = res.result
          console.log(222)
          console.log(this.userPhoto)
        }
        reader.readAsDataURL(file)
      },

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
      //会员等级提升
      membershipLevelUpgrade() {
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/member/grading`, {
          "_timestamp": new Date().getTime()
        }, function (body) {
          Toast("会员等级提升成功")
        }, function (message) {
          alert("会员等级提升失败：" + message);
        })
      },
      //获取个人信息
      getPersonInfo() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/mall/extdata`, {},
          function (body) {
            let userData = body.data
            _this.userPhoto = userData.userPhoto;
            console.log("服务器图片")
            console.log(_this.userPhoto)
            _this.$refs.userNameInput.value = userData.userName;
            _this.$refs.userMobilPhoneInput.value = userData.userPhone;
            _this.time1 = userData.brithday;
            console.log(_this.time1)
            if (_this.time1 !== null && _this.time1 !== "") {
              //判断生日是否为空，不为空设置为不可编辑
              _this.disabled = true
            }
          }, function (message) {
            alert("获取个人信息失败：" + message);
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
        let phone = this.$refs.userMobilPhoneInput.value
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
          alert("手机号有误，请重填");
          return false;
        }
        console.log(this.userPhoto)
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/mall/extsave`, {
          "headimg": _this.userPhoto,
          "username": this.$refs.userNameInput.value,
          "phone": phone,
          "birthday": this.$refs.userBirthdayInput.value,
        }, function (body) {
          Toast('更新个人信息成功')
          _this.$router.go(-1);
        }, function (message) {
          alert('更新个人信息失败:' + message)
        })
      },
    },
    //如果修改信息，获取到input的信息，提交到服务器
    components: {
      BackBar,
      loading,
      DatePicker
    }
  }
</script>

<style lang="less" scoped>
  .modify {
    margin-top: 30px;
    padding: 10px 20px;

    .photo {
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin: 20px 10px;
      float: left;
      border-radius: 50%;
      /*border-radius: 50%;*/

    }

    .modify_img {

      width: 100%;
      height: 100%;
      /*background-size: fill !important;*/
      background-size: cover;
    }

    .userPhoto {
      margin-top: 60px;
    }

    .hiddenInput {
      display: none;
    }

    /*.modify_inner {*/
    /*  width: 90% !important;*/
    /*  margin: 0px auto;*/
    /*}*/

  }

  .userInfo_btn {
    text-align: center;
    width: 100px;
    height: 40px;
    margin-top: 20px;
    left: 35%;
    background: ghostwhite !important;
    /*background: #00a1fe;*/
  }

  .currentLevel {
    margin-top: 20px;
    text-align: center;
  }

  .currentLevel_level {
    margin-top: 50px;
  }

  .mx-datepicker {
    width: 100% !important;
  }

  .setting_right {
    margin-top: 50px;
  }

  .mx-input {
    color: #000000 !important;
    font-size: 16px !important;
  }

  .mx-input.disabled {
    color: #444343 !important;
  }

  /*.mx-icon-calendar {*/
  /*  top: 40% !important;*/
  /*}*/
</style>
