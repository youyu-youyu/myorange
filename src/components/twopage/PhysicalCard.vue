<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="实体卡"></back-bar>
    <div class="physicalCard">

      <div class="physicalCard_info">
        <table width="100%">
          <th>卡号</th>
          <th>操作</th>
          <tr v-for="(item,index) in entityCardsList">
            <td>{{item.cardNo}}</td>
            <td>
              <router-link to="/changepassword">
                <button>修改密码</button>
              </router-link>
              <button>解绑</button>
            </td>
          </tr>
        </table>
      </div>
      <br>
      <br>
      <br>
      <div class="physicalCard_img_1">
        <img src="../../assets/project/xiangmu_card1.png" class="physicalCard_img"/>
        <router-link to="/addcard">
          <button class="physicalCard_btn">添加实体卡</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import BackBar from "../public/backBar";
  import loading from "../public/loading/loading";
  import global_msg from "../js/global";

  export default {
    name: "PhysicalCard",
    data() {
      return {
        entityCardsList: [
          {
            "cardNo": "97178BAF"
          },
          {
            "cardNo": "379591AF"
          }
        ],

      }
    },
    mounted() {
      this.getEntityCards();
      console.log(this.entityCardsList)
    },
    methods: {
      //已有实体卡号获取
      getEntityCards() {

        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/entitycards`,
            {
              params: {
                "shopId": this.$store.state.selectedShopData.shopId
              }
            }, {emulateJSON: true})

          .then(res => {
            console.log(res.body.data)
            if (res.body.err_code === 0) {
              // this.entityCardsList = res.body.data
            } else {
              alert("获取支付套餐失败" + res.body.message)
            }
          })

      }

    },
    components: {
      BackBar,
      loading
    }
  }
</script>

<style lang="less" scoped>
  .physicalCard {
    margin-top: 50px;
  }

  .physicalCard_img_1 {
    padding: 10px 20px;
    /*display: flex;*/
    /*justify-content: space-around;*/
  }

  .physicalCard_img {
    width: 100px;
    height: 50px;
    float: left;
  }

  .physicalCard_btn {
    float: right;
    vertical-align: middle;
  }

  .physicalCard_info {
  }

  table {
    tr {
      td {
        width: 50%;
        text-align: center;
        border: 1px solid #cccccc;
        padding: 10px 0;
      }
    }
  }

  table {
    th {
      width: 50%;
      background: #bbbbbb;
      line-height: 30px;
    }
  }
</style>
