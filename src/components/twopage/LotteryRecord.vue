<template>
  <div>

    <loading v-if="loading"></loading>
    <back-bar title="彩票记录"></back-bar>
    <div class="coinRecord">
      <div class="in-and-out">
        <div class="in">
          存入彩票:111
        </div>
        <div class="out">
          扣除彩票:1323
        </div>
      </div>
      <table>
        <th>机台名称</th>
        <th>票数</th>
        <th>类型</th>
        <!--<tr v-for="(item,index) in bitRecordList">-->
        <tr>
          <td>3</td>
          <td>2</td>
          <td>1</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import record from "../public/record";
  import BackBar from "../public/backBar";
  import global_msg from "../js/global";
  import {Toast} from "mint-ui";
  import loading from "../public/loading/loading";
  //由homeContainer中的扫码存入的彩票
  export default {
    data() {
      return {
        meiTuanRecordList: [],
        loading: false,
      };
    },
    mounted() {
      this.loading = true;
      this.payRecord();
    },
    methods: {
      //彩票记录
      payRecord() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/lottery/log`,
            {
              "shopId": this.$store.state.selectedShopData.shopId,
            }, {emulateJSON: true})
          .then(res => {
            this.loading = false;
            console.log(res.body.data)
            if (res.body.err_code === 0) {
              if (res.body.data.length > 0)
                this.meiTuanRecordList = res.body.data
              else {
                Toast("未请求到数据");
              }
            } else {
              alert("获取彩票记录失败:" + res.body.message);
            }
          })
      },
    },
    components: {
      BackBar,
      loading
    }
  };
</script>
<style lang="less" scoped>
  .coinRecord {
    width: 100%;
    margin: 50px auto;

    .coinRecord_inner {
      margin-top: 60px;
      padding: 20px 15px;
      border: 1px solid #14aaff;
      border-radius: 10px;
      background-color: #ffffff;
    }

    .in-and-out {
      font-size: 15px;
      display: flex;
      padding: 0px 10px;
      background: #bbbbbb;
      line-height: 30px;
      border-bottom: 1px solid #e0e0e0;

      .in {
        flex: 1;
      }
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

  table {
    th {
      /*th {*/
      font-weight: 500;
      font-size: 15px;
      background: #bbbbbb;
      line-height: 30px;
    }
  }

  /*}*/
</style>
