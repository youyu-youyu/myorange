<template>
  <div class="homelocation">
    <ul class="example">
      <li v-for="(item,index) in shopList" @click="clickEvent(index)"
      >
        <div class="homelocation_inner" :class="{temp:index===selectedIndex}">
          <div class="mui-pull-left homelocation_img">
          </div>
          <div class="mui-pull-body homelocation_body">
            <div>{{item.shopName}}</div>
            <div>地址：{{item.shopAddress}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  .homelocation {
    width: 100%;
    display: flex;

    .example {
      /*width: 95%;*/
      flex: 1;
      margin-left: -30px;
      /*background: #ffffff;*/
      /*margin-left: -40px;*/

      li {
        /*text-align: center;*/
        list-style: none;
        padding: 5px 5px;
        line-height: 30px;
        width: 100%;

        .homelocation_inner {
          width: 97%;
          padding: 0 20px;
          background: #ffffff;
          border-radius: 10px;

          .homelocation_img {
            /*padding: 20px 10px;*/
            /*justify-content: center;*/
            width: 60px;
            height: 60px;
            border-radius: 10px;
            margin-top: 20px;
            top: 50%;
          }

          .homelocation_body {
            padding: 20px 30px;
            margin-left: 50px;
          }
        }
      }

    }

    .temp {
      background-color: #D3B986 !important;
    }

  }

  .active {
    color: blue;
  }
</style>
<script>
  import {Toast} from 'mint-ui'
  import global_msg from "../js/global.js";
  import myNetUtils from "../js/MyNetUtils.js";

  export default {

    data() {
      return {
        shopList: [],
        selectedIndex: -1,
        // pathId: ""
      }
    },
    destroyed() {
      // console.log("页面销毁，传参:");
    },
    mounted() {
      this.getShopList();
      // this.pathId = localStorage.getItem("payStatusResult")
      // console.log(this.pathId)
    },
    methods: {
      //接口图片错误显示默认图片
      //获取门店列表
      getShopList() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/shop/list`, {
          "count": 100, "page": 1, "path": "",
          "shopLat": localStorage.getItem("LocationLat"),
          "shopLog": localStorage.getItem("LocationLog"),
          "_timestamp": new Date().getTime()
        }, function (body) {
          _this.shopList = body.data

        }, function (message) {
          alert("获取门店列表失败：" + message);
        })
      },
      //点击传参到主页面
      clickEvent(index) {
        this.selectedIndex = index;
        // this.$router.push({path: '/home', query: {param: });
        this.$store.commit('setSelectedShopData', this.shopList[this.selectedIndex])
        localStorage.setItem("shopId", this.shopList[this.selectedIndex].shopId);
        localStorage.setItem("shopLat", this.shopList[this.selectedIndex].shopLat);
        localStorage.setItem("shopLog", this.shopList[this.selectedIndex].shopLog);
        this.$router.go(-1);
      }

    }
  };
</script>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/HomeLocation.vue-->
