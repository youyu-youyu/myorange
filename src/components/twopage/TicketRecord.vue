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

          <button class="mui-pull-right projectrecord_btn" @click="ticketUserNow(index)">立即使用</button>
        </div>

      </div>
    </div>
    <div id="ticketCover"></div>
    <div class="ticketCode">
      <div id="id-qr" class="qrcode qrcode_center" ref="qrCodeUrl">
      </div>
      <div class="ticketCancel" id="t_cancel_id" @click="ticketCancelClick()">x</div>
    </div>

  </div>
</template>
<script>
  import backBar from "../public/backBar.vue";
  import global_msg from "../js/global";
  import loading from "../public/loading/loading";
  import myNetUtils from "../js/MyNetUtils.js";
  import {Toast} from "mint-ui"
  import QRCode from "qrcodejs2";

  export default {
    data() {
      return {
        loading: false,
        projectRecordList: [],
        useFlag: "",
        ticketIndex: ""
      };
    },
    mounted() {
      this.loading = true;
      setTimeout(this.getTicketRecord, 500);

    },
    methods: {
      //立即使用
      ticketUserNow(index) {
        // this.ticketIndex = index
        document.getElementById("ticketCover").setAttribute("style", "display:block;")
        document.getElementById("id-qr").setAttribute("style", "display:block;")
        document.getElementById("t_cancel_id").setAttribute("style", "display:block;")
        this.creatTicketRecordCode(index)

      },
      ticketCancelClick() {
        document.getElementById("ticketCover").setAttribute("style", "display:none;")
        document.getElementById("id-qr").setAttribute("style", "display:none;")
        document.getElementById("t_cancel_id").setAttribute("style", "display:none;")
      },
      getTicketRecord() {
        // if (this.$store.state.userAccountData.coupons <= 0) {
        //   this.useFlag = 0
        // } else {
        //   this.useFlag = 1
        // }
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/tickets/own`, {
          "brand_id": `${global_msg.method.getBrandId()}`,
          "shopId": this.$store.state.selectedShopData.shopId,
          // "useFlag": this.useFlag
          "useFlag": 1,
          "_timestamp": new Date().getTime()
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
      //创建二维码
      creatTicketRecordCode(index) {
        this.ticketIndex = index
        document.getElementById("id-qr").innerHTML = "";
        // this.$refs.qrCodeUrl.innerHTML = ''
        let qrCode1 = new QRCode(this.$refs.qrCodeUrl, {
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
        qrCode1.clear();
        //所点击的cardId
        // alert("id:" + this.projectRecordList[this.ticketIndex].id)
        console.log("id:" + this.projectRecordList[this.ticketIndex].id)
        qrCode1.makeCode("{\"cardId\":\"" + this.projectRecordList[this.ticketIndex].id + "\",\"cmd\":\"ticket\",\"shopId\":\"" + this.$store.state.selectedShopData.shopId + "\",\"ticketId\":\"" + this.projectRecordList[this.ticketIndex].id + "\"}");
        // \"uid\":\"" + this.$store.state.userAccountData.userId + "\",\"expire\":\"" + expire + "\",\"shopId\":\"" + this.$store.state.selectedShopData.shopId + "\"}");
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
    /*overflow-x: auto !important;*/
  }

  .projectrecord {
    /*margin-top: 60px !important;*/
    margin-top: 100px !important;
    /*overflow-y: visible !important;*/
    //不能给高度，给高度有问题
    height: 1100px !important;
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


  .qrcode_center {
    /*width: 200px;*/
    /*height: 200px;*/
    position: absolute;
    top: 25%;
    left: 25%;
  }

  .ticketCancel {
    position: absolute;
    top: 20%;
    display: none;
    left: 45%;
    background: #b6b5b5;
    width: 50px;
    height: 50px;
    font-size: 30px;
    border-radius: 50px;
    vertical-align: center;
    text-align: center;
    z-index: 99999;
    padding: 10px 0;
  }

  //创建二维码
  #id-qr {
    display: none;
    z-index: 99999;
    margin-top: 30px;
    box-shadow: 0px 0px 10px 10px #ffffff;
  }


  /*遮盖层*/
  #ticketCover {
    background: #000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    filter: alpha(opacity=50);
    opacity: .5;
    display: none;
    z-index: 99999;
    height: -webkit-fill-available
  }
</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/twopage/TicketRecord.vue-->
