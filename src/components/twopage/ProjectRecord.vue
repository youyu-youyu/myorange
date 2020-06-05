<template>
  <div>
    <loading v-if="loading"></loading>
    <backBar title="我的项目" class="backBar"></backBar>
    <div class="projectrecord">
      <div class="ticket_top" v-for="(item,index) in projectRecordList">
        <div class="user_top_inner">
          <ul class="mui-table-view projectrecord-border">
            <li class="mui-table-view-cell mui-media">
              <img class="mui-media-object mui-pull-left" v-bind:src=item.photo_url>
              <div class="mui-media-body user_top_body ">
                <div>
                  <div class="mui-pull-left">
                    项目名称:{{item.cardName}}
                  </div>
                  <button class="mui-pull-right projectrecord_btn">立即使用</button>
                </div>
                <div>
                  <div class="mui-ellipsis user_left ">项目ID:{{item.cardId}}</div>
                </div>
              </div>

            </li>
          </ul>
          <div class="projectrecord_footer">
            <div class="user_top_bottom1">
              <div class="item">
                <div class="item_item" v-show="item.is_number_time===0">有效开始日:</div>
                <div class="item_item item_times" v-show="item.is_number_time===1">有效次数:</div>
                <div class="item_item " v-show="item.is_number_time===0">{{item.valid_start_date}}</div>
                <div class="item_item item_times" v-show="item.is_number_time===1">{{item.times}}</div>
              </div>
              <div class="item">
                <div class="item_item item_1" v-show="item.is_number_time===0">有效结束日:</div>
                <div class="item_item" v-show="item.is_number_time===0">{{item.valid_end_date}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import backBar from "../public/backBar.vue";
  import global_msg from "../js/global";
  import loading from "../public/loading/loading";
  import myNetUtils from "../js/MyNetUtils.js";


  export default {
    data() {
      return {
        loading: false,
        projectRecordList: [],

      };
    },
    mounted() {
      this.loading = true;
      setTimeout(this.getProjectRecord, 500);

    },
    methods: {
      getProjectRecord() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/projects/own`, {
          "brand_id": `${global_msg.method.getBrandId()}`,
          "shopId": this.$store.state.selectedShopData.shopId,
          "useFlag": 1
        }, function (body) {
          _this.loading = false;
          _this.projectRecordList = body.data
        }, function (message) {
          _this.loading = false;
          alert("获取项目记录失败" + message)
        })
      },
    },
    components: {
      backBar,
      loading
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
    background-color: transparent !important;
  }

  .projectrecord {
    margin-top: 50px;
  }

  .ticket_top {
    width: 100%;
    height: 150px;
    background: none;
    // position        : absolute;
    /*margin-top: 70px;*/
    padding-top: 2px;

    .user_top_inner {
      width: 90%;
      margin: 10px auto;
      background: #fff;
      height: 140px;
      border-radius: 10px;
      /*border-bottom: 2Px solid #FB8D68;*/
      position: relative;

    }

    .UserContainer {
      width: 100%;
      min-height: 1100px;
    }

    .mui-table-view {
      position: inherit !important;
      background-color: transparent !important;
    }

    .mui-media-object {
      max-width: 45px !important;
      height: 45px !important;
      border-radius: 10px;
      margin-top: 10px;
      /*line-height: 62px !important;*/
    }

    .item {
      line-height: 35px;
    }

    .user_left {
      /*padding-top: 15px;*/
      font-size: 12px;
      color: #000000 !important;
    }
  }

  .item_times {
    font-size: 13px !important;
    line-height: 35px;
  }

  .user_top_body {
    /*margin-top: 10px;*/
    width: 80%;
    font-size: 12px !important;
    color: #000000 !important;
    /*width: 100%;*/
  }

  .user_top_bottom1 {
    display: flex;
    //line-height: 40px;
    /*background: #ffffff;*/
    width: 100%;
    border-radius: 5px;
    margin: 0px auto;
    padding: 5px 2px;

    .item {
      flex: 1;
      display: flex;

      .item_item {
        font-size: 13px;
        flex: 1;
        //padding-top: 10px;
        color: #000000 !important;
        text-align: center;
      }
    }
  }

  .projectrecord-border {
    border-bottom: 1px solid #e0e0e0;
  }

  .projectrecord_btn {
    border-radius: 20px;
    /*margin-top: -45px;*/
    margin-right: 0px;
    background-color: orange;
  }
</style>


// WEBPACK FOOTER //
// src/components/twopage/ProjectRecord.vue
