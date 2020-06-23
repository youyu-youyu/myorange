<template>
  <div>
    <loading v-if="loading"></loading>
    <backBar title="我的门票"></backBar>
    <div class="projectrecord">
      <div class="ticket_top" v-for="(item,index) in projectRecordList">
        <div class="ticket_top_inner">
          <!--          <div class="tickect-record">-->
          <div>
            <ul class="mui-table-view projectrecord-border">
              <li class="mui-table-view-cell mui-media">
                <img class="mui-media-object mui-pull-left" v-bind:src=item.photo_url>
                <div class="mui-media-body ticketname">
                  <div class="mui-pull-left">
                    {{item.cardName}}
                  </div>
                  <div class="mui-ellipsis user_left ">ID:{{item.cardId}}</div>
                </div>
              </li>
            </ul>
            <div class="avilable-all">
              <div class="mui-pull-left avilable" style="width: 100%;">有效开始日:{{item.valid_start_date}}</div>
              <div class="mui-pull-left " style="width: 100%;">有校结束日:{{item.valid_end_date}}</div>
            </div>
          </div>

          <button class="mui-pull-right projectrecord_btn">立即使用</button>
          <!--          </div>-->
        </div>

      </div>
    </div>
  </div>
  <!--  </div>-->
</template>
<script>
  import backBar from "../public/backBar.vue";
  import global_msg from "../js/global";
  import loading from "../public/loading/loading";
  import myNetUtils from "../js/MyNetUtils.js";
  import {Toast} from "mint-ui"

  export default {
    data() {
      return {
        loading: false,
        projectRecordList: [],
        useFlag: ""

      };
    },
    mounted() {
      this.loading = true;
      setTimeout(this.getTicketRecord, 500);
    },
    methods: {
      getTicketRecord() {
        if (this.$store.state.userAccountData.coupons <= 0) {
          this.useFlag = 0
        } else {
          this.useFlag = 1
        }
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/tickets/own`, {
          "brand_id": `${global_msg.method.getBrandId()}`,
          "shopId": this.$store.state.selectedShopData.shopId,
          "useFlag": this.useFlag
        }, function (body) {
          _this.loading = false;
          _this.projectRecordList = body.data
          console.log(_this.projectRecordList)
          if (_this.projectRecordList.length <= 0) {
            Toast("您目前没有门票")
          }
        }, function (message) {
          _this.loading = false;
          alert("获取门票信息失败：" + message);
        })
      },
    },
    components: {
      backBar,
      loading,
    }
  };
</script>
<style lang="less" scoped>
  .backBar {
    -webkit-transform: translateZ(0);
    position: fixed;
    overflow-x: auto !important;
  }

  .mui-table-view:before {
    /*background-color: transparent !important;*/
  }

  .projectrecord {
    margin-top: 60px;
    overflow-y: auto !important;
  }

  .mui-table-view:before {
    background-color: transparent !important;
  }

  .projectrecord-border {
    float: left;
    width: 75%;
  }

  .ticket_top {
    width: 95%;
    /*height: 170px;*/
    background: none;
    margin: 0px auto;
    /*height: 25vh;*/

    .ticket_top_inner {
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url("../../assets/user/ticketImg.png");
      /*height: 22vh;*/
      height: 100%;
      width: 100%;
      /*border-radius: 20px;*/
      position: relative;

    }

    .UserContainer {
      width: 100%;
      /*min-height: 1100px;*/

    }

    .mui-table-view {
      position: inherit !important;
      background-color: transparent !important;
    }

    .mui-media-object {
      max-width: 60px !important;
      height: 60px !important;
      border-radius: 10px;
      margin: 10px 0px !important;

      /*line-height: 62px !important;*/
    }

    .ticketname {
      margin-top: 20px;
      padding-left: 10px;
    }

    .item {
      /*line-height: 40px;*/
      color: #000000;
      flex: 1;
      font-size: 13px;
      padding-left: 10px;
      padding-top: 5px;
    }

    .user_left {
      /*padding-top: 15px;*/
      color: #000000;
    }
  }

  .item_times {
    font-size: 13px !important;
    float: left;
    line-height: 45px;
    color: #000000 !important;
  }

  .tickect-body {
    margin-top: 20px;
    color: #000000 !important;
    font-size: 13px !important;
  }

  .projectrecord_btn {
    border-radius: 20px;
    /*margin-top: -45px;*/
    top: -40%;
    margin-right: 5px;
    background-color: orange;
  }

  .avilable-all {
    padding-left: 20px;
    font-size: 13px;
  }

  .avilable {
    margin-top: -15px;
  }
</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/TicketRecord.vue-->
