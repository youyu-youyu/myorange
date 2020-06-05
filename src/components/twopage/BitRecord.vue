<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="充币记录"></back-bar>
    <div class="coinRecord">
      <record title1="序号" title2="充币金额" title3="游戏币" title4="增币数" title5="充币时间"></record>
      <div>
        <table>
          <tr v-for="(item,index) in bitRecordList">
            <td>{{index+1}}</td>
            <td>{{item.money}}</td>
            <td>{{item.coin}}</td>
            <td>{{item.give_coin}}</td>
            <td>{{item.createdAt.split("-")[1]+"-"+item.createdAt.split("-")[2]}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import record from "../public/record";
  import BackBar from "../public/backBar";
  import global_msg from "../js/global";
  import {Toast} from "mint-ui";
  import loading from "../public/loading/loading";
  import myNetUtils from "../js/MyNetUtils.js";

  export default {
    data() {
      return {
        bitRecordList: [],
        loading: false,
      };
    },
    mounted() {
      this.loading = true;
      this.payRecord();
    },
    methods: {
      //充值记录
      payRecord() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/leaderboard/coins`, {
          "shopId": this.$store.state.selectedShopData.shopId,
        }, function (body) {
          _this.loading = false;
          if (body.data.length > 0)
            _this.bitRecordList = body.data;
          else {
            Toast("未请求到数据");
          }
        }, function (message) {
          _this.loading = false;
          alert("获取充币记录失败" + message);
        })
      },
    },
    components: {
      BackBar,
      record,
      loading
    }
  };
</script>
<style lang="less" scoped>
  .coinRecord {
    width: 100%;
    margin: 50px auto;

    /*height: 100px;*/

    .coinRecord_inner {
      margin-top: 60px;
      padding: 20px 15px;
      border: 1px solid #14aaff;
      border-radius: 10px;
      background-color: #ffffff;
    }
  }

  .coinrecord_img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }

  .coinrecord_username {
    font-size: 18px !important;
    margin-top: 10px;
  }

  .coinrecord_txt {
    line-height: 30px;
    padding-left: 120px;
    font-size: 15px;
  }

  table {
    tr {
      td {
        width: 1%;
        text-align: center;
        border: 1px solid #cccccc;
        padding: 10px 0;
      }
    }
  }
</style>


// WEBPACK FOOTER //
// src/components/twopage/CoinRecord.vue
