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
            <img :src="item.photo_url" alt="加载错误" @click="projectClickEvent(index)" class="ticket_img">
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
          "brand_id": `${global_msg.method.getBrandId()}`, "shopId": this.$store.state.selectedShopData.shopId,
        }, function (body) {
          _this.projectPhotoList = body.data;
          for (let i = 0; i < _this.projectPhotoList.length; i++) {
            _this.projectPhotoList[i].photo_url = _this.projectPhotoList[i].photo_url === ""
              ? require("../../assets/project/xiangmu_card1.png")
              : _this.projectPhotoList[i].photo_url;
          }
        }, function (message) {
          alert("获取项目失败：" + message);
        })
        // this.$http
        //   //定义为全局使用global_msg.server_url
        //   //get请求（后端提供url）
        //   .get(`${global_msg.method.getBaseUrl()}/api/projects`,
        //     {
        //       params: {
        //         "brand_id": `${global_msg.method.getBrandId()}`, "shopId": this.$store.state.selectedShopData.shopId,
        //       }
        //     }, {emulateJSON: true})
        //   .then(res => {
        //     if (res.body.err_code === 0) {
        //
        //       this.projectPhotoList = res.body.data;
        //       for (let i = 0; i < this.projectPhotoList.length; i++) {
        //         this.projectPhotoList[i].photo_url = this.projectPhotoList[i].photo_url === ""
        //           ? require("../../assets/project/xiangmu_card1.png")
        //           : this.projectPhotoList[i].photo_url;
        //       }
        //     } else {
        //       alert("获取项目失败：" + res.body.message);
        //     }
        //   })
      },
      getTicket() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/tickets`,
            {
              params: {
                "brand_id": `${global_msg.method.getBrandId()}`, "shopId": this.$store.state.selectedShopData.shopId,
              }
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.ticketPhotoList = res.body.data;
              for (let i = 0; i < this.ticketPhotoList.length; i++) {
                if (this.ticketPhotoList[i].photo_url === "") {
                  this.ticketPhotoList[i].photo_url = require("../../assets/project/xiangmu_card5.png");
                }
              }
            } else {
              alert("获取门票失败：" + res.body.message);
            }
          })
      },
    }
  }
</script>
<style lang="less" scoped>

</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/tabar/ProjectContainer.vue-->
