<template>
  <div class="ProjectContainer">
    <div class="recharge_CoinPack">
      <div class="recharge_cz">项目购买
      </div>
    </div>
    <div class="project_middle">
      <div class="project_middle_inner">
        <div class="project_middle_inner_buy">
          <img src="../../assets/project/xiangmu_card.png" class="project_middle_inner_buy_img">
          <span class="project_middle_inner_buy_txt">项目套餐</span>
        </div>
        <mt-swipe :auto="4000" class="project_middle_inner_mint_banner">
          <mt-swipe-item v-for="(item,index) in projectPhotoList" class="my-swipe-item">
            <img :src="item.photo_url" alt="加载错误" @click="projectClickEvent(index)"
                 class="ticket_img">
            <!--            <img src="../../assets/project/xiangmu_card5.png" alt="加载错误" class="ticket_img">-->
            <div class="project_middle_inner_mint_txt " style="padding: 20px 20px;">{{item.cardName}}</div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="project_middle_inner">
        <img src="../../assets/project/xiangmu_piao.png" class="project_middle_inner_buy_img">
        <span class="project_middle_inner_buy_txt">门票</span>
        <div class="project_middle_inner_banner">
          <mt-swipe :auto="4000" class="project_middle_inner_mint_banner">
            <mt-swipe-item v-for="(item,index) in ticketPhotoList" class="my-swipe-item">
              <img :src="item.photo_url" alt="加载错误" @click="tickectClickEvent(index)" class="ticket_img">
              <div class="project_middle_inner_mint_txt " style="padding: 20px 20px;">{{item.cardName}}</div>
            </mt-swipe-item>
          </mt-swipe>

        </div>
      </div>
      <!--      <img src="../../assets/project/xiangmu_card5.png" alt="加载错误"-->
      <!--           class="ticket_img">-->
    </div>
  </div>
</template>
<script>
  import "../css/project.less";
  import global_msg from "../js/global";
  import myNetUtils from "../js/MyNetUtils.js";

  export default {
    data() {
      return {
        projectPhotoList: [],
        ticketPhotoList: [],
        selectedIndex: 0,
        cardId: "",
      }
    },
    created() {
      // location.href = this.$store.state.homeHtml;
      this.getProject();
      this.getTicket();
    },
    methods: {
      projectClickEvent(index) {
        this.selectedIndex = index
        this.cardId = this.projectPhotoList[this.selectedIndex].cardId;
        this.$router.push({path: '/project/bag', query: {cardId: this.cardId}})
      },
      tickectClickEvent(index) {
        this.selectedIndex = index;
        this.cardId = this.ticketPhotoList[this.selectedIndex].cardId;
        this.$router.push({path: '/project/tickets/bag', query: {cardId: this.cardId}});
      },
      getProject() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/projects`, {
          "brand_id": `${global_msg.method.getBrandId()}`, "shopId": _this.$store.state.selectedShopData.shopId,
        }, function (body) {
          _this.projectPhotoList = body.data;
          for (let i = 0; i <= _this.projectPhotoList.length; i++) {
            //当长度为0时候
            if (_this.projectPhotoList.length === 0) {
              //设置图片为本地图片
              _this.projectPhotoList[i].photo_url = require("../../assets/project/xiangmu_card1.png")
            }
            console.log('图片' + _this.projectPhotoList[i].photo_url === '')
            //当数据库上的图片为空时，也设置为本地图片，否则就是数据库里面图片
            _this.projectPhotoList[i].photo_url = _this.projectPhotoList[i].photo_url === ""
              ? require("../../assets/project/xiangmu_card1.png")
              : _this.projectPhotoList[i].photo_url;

          }
        }, function (message) {
          alert("获取项目失败：" + message);
        })
      },
      getTicket() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/tickets`, {
          "brand_id": `${global_msg.method.getBrandId()}`, "shopId": _this.$store.state.selectedShopData.shopId,
        }, function (body) {
          _this.ticketPhotoList = body.data;

          for (let i = 0; i < _this.ticketPhotoList.length; i++) {
            if (_this.ticketPhotoList[i].photo_url === "") {
              _this.ticketPhotoList[i].photo_url = require("../../assets/project/xiangmu_card5.png");
            }
          }
        }, function (message) {
          alert("获取门票失败：" + message);
        })
      },
    }
  }
</script>
<style lang="less" scoped>

</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/tabar/ProjectContainer.vue-->
