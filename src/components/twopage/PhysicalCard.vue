<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="实体卡"></back-bar>
    <div class="physicalCard">
      <div class="physicalCard_img_1">
        <img src="../../assets/project/xiangmu_card1.png" class="physicalCard_img"/>
        <router-link to="/addcard">
          <button class="physicalCard_btn">添加</button>
        </router-link>
      </div>
      <br>
      <br>
      <br>
      <div class="physicalCard_info">
        <table width="100%">
          <th>卡号</th>
          <th>操作</th>
          <tr>
            <td>13243243545345435</td>
            <td>
              <router-link to="/changepassword">
                <button>修改密码</button>
              </router-link>
              <button>解绑</button>
            </td>
          </tr>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import BackBar from "../public/backBar";
  import loading from "../public/loading/loading";

  export default {
    name: "PhysicalCard",
    data() {
      return {}
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
