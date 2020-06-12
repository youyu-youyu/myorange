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
              <button @click="update(index)">修改密码</button>
              <button @click="unBound(index)">解绑</button>
            </td>
          </tr>
        </table>
      </div>
      <br>
      <br>
      <div class="physicalCard_img_1">
        <img src="../../assets/card/card.png" class="physicalCard_img"/>
        <router-link to="/addcard">
          <button class="physicalCard_btn">添加实体卡</button>
          <!--        <button class="physicalCard_btn" @click="addEntityCards()">添加实体卡</button>-->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import BackBar from "../public/backBar";
  import loading from "../public/loading/loading";
  import global_msg from "../js/global";
  import myNetUtils from "../js/MyNetUtils.js";

  export default {
    name: "PhysicalCard",
    data() {
      return {
        entityCardIndex: 0,
        entityCardsList: ""
      }
    },
    mounted() {
      this.getEntityCards();
    },
    methods: {
      //解绑后删除该列数据
      //解绑
      unBound(index) {
        this.entityCardIndex = index;
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/entitycards/unbind`, {
          "shopId": this.$store.state.selectedShopData.shopId,
          "cardNo": this.entityCardsList[this.entityCardIndex].cardNo,
        }, function (body) {
          alert("解绑成功！")
          _this.getEntityCards()
        }, function (message) {
          alert("解绑失败:" + message)
        })
      },
      //修改密码
      update(index) {
        this.entityCardIndex = index;
        this.$router.push({path: '/changepassword', query: {cardNo: this.entityCardsList[this.entityCardIndex].cardNo}})
        console.log(this.entityCardsList[this.entityCardIndex].cardNo)
        //传当前所点击的卡号
      },
      //获取实体卡号
      getEntityCards() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/entitycards`, {
          "shopId": this.$store.state.selectedShopData.shopId
        }, function (body) {
          _this.entityCardsList = body.data
        }, function (message) {
          alert("获取实体卡号失败" + message)
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
    padding: 0px 20px;
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
    width: 100px;
    height: 50px;
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
