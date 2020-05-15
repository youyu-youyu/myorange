<template>
  <div>
    <loading v-if="loading"></loading>
    <back-bar title="实体卡"></back-bar>
    <div class="physicalCard">
      <div class="physicalCard_img_1">
        <img src="../../assets/project/xiangmu_card1.png" class="physicalCard_img"/>
        <button class="physicalCard_btn">添加</button>
      </div>
      <div class="physicalCard_info">
        <table>
          <th></th>
          <tr>
            <td></td>
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
</style>
