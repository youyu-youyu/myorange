<template>
  <div class="app-container">
    <!------中间的路由router-view 区域-------->

    <transition>
      <router-view></router-view>
      <!--      <tabs v-if ="tabType"></tabs>-->
    </transition>
    <!------底部 Tabbar 区域-------->
    <nav class="mui-bar mui-bar-tab" v-show="$route.meta.showTabbar">
      <router-link class="mui-tab-item-mango mui-active" to="/home">
        <div @click="changeImg(0)">
          <!--  如果点击，显示图片1，不点击显示图片2-->
          <img :src="homeUrl" alt="首页" style="width: 45px;height: 45px;margin-top:5px;">
          <span class="mui-tab-label">首页</span>
        </div>
      </router-link>
      <router-link class="mui-tab-item-mango" to="/project">
        <div @click="changeImg(1)">
          <img :src="projectUrl" style="width: 45px;height: 45px;margin-top:5px;">
          <span class="mui-tab-label">项目</span>
        </div>
      </router-link>
      <a class="mui-tab-item-mango" href="#Prover_0">
        <button class="code">
          <img src="./assets/app/code.png" style="width: 80px;height: 80px;margin-left:-13px;margin-top:-7px;">
          <span class="mui-tab-label"></span>
        </button>
      </a>
      <router-link class="mui-tab-item-mango" to="/shop">
        <div @click="changeImg(2)">
          <img :src="shopUrl" style="width: 45px;height: 45px;margin-top:5px;">
          <span class="mui-tab-label">商城</span>
        </div>
      </router-link>
      <router-link class="mui-tab-item-mango" to="/user">
        <div @click="changeImg(3)">
          <img :src="myUrl" style="width: 45px;height: 45px;margin-top:5px;">
          <span class="mui-tab-label">我的</span>
        </div>
      </router-link>
    </nav>
    <div id="Prover_0" class="mui-popover mui-popover-action mui-popover-bottom">
      <div class="tabar_middle">
        <div class="tabar_middle_inner">

          <div id="id_qr" class="qrcode qrcode_center" ref="qrCodeUrl"></div>
          <div class="tabar_middle_inner_txt tabar_middle_qr-txt">
            请靠近扫码器扫描
          </div>
          <div class="tabar_middle_inner_txt ">
            二维码每30秒自动更新
          </div>
        </div>
        <!--        <div class="tabar_tabar" fixed>-->
        <!--          <p class="tabar_tabar_txt1">使用星礼卡，同步支付星星</p>-->
        <!--          <a><p class="tabar_tabar_txt2">获取一张好生意卡</p></a>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import QRCode from 'qrcodejs2'
  import global_msg from "./components/js/global";

  export default {
    data() {
      return {
        downIcon: true,
        homeUrl: require('./assets/app/menu_home_2.png'), // 未变化前首页路由的图片路径
        projectUrl: require('./assets/app/menu_xiangmu_1.png'), // 未变化前发现发现路由的图片路径
        shopUrl: require('./assets/app/menu_shop_1.png'), // 未变化前消息路由的图片路径
        myUrl: require('./assets/app/menu_my_1.png'), // 未变化前我的路由的图片路径
        qrCode: "",

      }
    },
    created() {
      let loading = document.getElementById('Loading')
      if (loading !== null) {
        document.body.removeChild(loading)
      }
    },
    mounted() {

    },
    methods: {
      creatQrCode() {
        this.$refs.qrCodeUrl.innerHTML = ''
        let qrCode1 = new QRCode(this.$refs.qrCodeUrl, {
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
        qrCode1.clear();
        qrCode1.makeCode("{\"cmd\":\"member\",\"uid\":" + this.$store.state.userAccountData.userId + ",\"expire\":\"" + new Date().getTime() + "\"}");
      },
      changeImg(type) {
        this.homeUrl = require('./assets/app/menu_home_1.png');
        this.projectUrl = require('./assets/app/menu_xiangmu_1.png');
        this.shopUrl = require('./assets/app/menu_shop_1.png');
        this.myUrl = require('./assets/app/menu_my_1.png');
        switch (type) {
          case 0:
            this.homeUrl = require('./assets/app/menu_home_2.png');
            break;
          case 1:
            this.projectUrl = require('./assets/app/menu_xiangmu_2.png');
            break;
          case 2:
            this.shopUrl = require('./assets/app/menu_shop_2.png');
            break;
          case 3:
            this.myUrl = require('./assets/app/menu_my_2.png');
            break;
          default:
            break;
        }
      },
    },
    watch: {
      '$store.state.userAccountData': function (newFlag, oldFlag) {
        this.creatQrCode();
        window.setInterval(this.creatQrCode, 30000);
      }
    }
  }
</script>
<style lang="less" scoped>
  * {
    touch-action: pan-y;
    z-index: 99999;

  }

  .app-container {
    overflow-x: hidden;
    /* 解决动画后底部导航动的问题 */
  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
    /* 解决从下向上动 */
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  .mui-bar-tab {
    display: flex;
    height: 90px;
    /*z-index: 999999;*/
    margin-bottom: -3px !important;
    padding: 0 !important;
  }

  .mui-tab-tab .mui-tab-item-mango .mui-active {
    color: #007aff;
  }

  .mui-tab-tab .mui-tab-item-mango {
    flex: 1 !important;
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-tab-label {
    /*padding-left: 6px;*/
    font-size: 13px;
    display: block;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mui-icon {
    top: 3px;
    left: 3px;
  }

  a {
    flex: 1;
    /* padding: 0 20px; */
    text-align: center;
  }

  .code {
    margin-top: -45px;
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-radius: 200%;
    border: 1px solid #e0e0ee;
  }

  .mui-icon-extra-class {
    font-size: 35px;
  }

  .tabar_middle_inner {
    z-index: 99999999 !important;
    min-height: 400px !important;
    background-color: #fff;
    text-align: center;
    padding: 20px 0;
    width: 100%;
    margin: 0 auto;

    /*.tabar_middle_inner_txt {*/

    /*}*/

    .tabar_middle_qr-txt {
      font-size: 25px;
      font-weight: 600;
      padding: 20px 10px;
    }
  }

  .tabar_tabar {
    background-color: #fff;
    text-align: center;
    line-height: 50px;
    bottom: 0;

    .tabar_tabar_txt1 {
      font-weight: 600;
      color: #000000 !important;
    }

    .tabar_tabar_txt2 {
      font-size: 20px;
      color: #00AB5F !important;
    }
  }

  .mui-popover {
    background-color: #fff;
  }

  .tabar_img {
    width: 150px;
    height: 150px;
  }

  .mui-icon {
    font-size: 27px !important;
  }

  .qrcode_center {
    margin: 0 auto;
    /*text-align: center;*/
  }

  img {
    /*margin: 0 auto !important;*/
  }

  .qrcode {
    display: inline-block;

    img {
      width: 132px;
      height: 132px;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
      box-sizing: border-box;
    }
  }
</style>


// WEBPACK FOOTER //
// src/App.vue
