<template>
  <div>
    <loading v-if="loading"></loading>
    <!-- 头-->
    <div class="header_container">
      <span class="header_sao">扫码点餐</span>
      <span class="header_center">餐桌:{{tableName}}</span>
    </div>
    <div class="left_container">
      <div class="left_inner_container" v-for="(item,index) in leftColumnList" @click="leftColumnClickEvent(index)">
        {{item.catName}}
      </div>
    </div>
    <div class="right_container">
      <div class="right_inner_container" v-for="(item,index) in rightColumnList" :key="index">
        <div class="right_inner_container_name">{{item.cateringName}}</div>
        <div class="right_inner_container_money">￥{{item.selling_price}}</div>
        <div class="right_inner_container_like">
          <!--          <div class="like-minus mui-icon mui-icon-minus-filled" v-show="item.count>0" @click="minusClick(index)"></div>-->
          <div class="like-minus mui-icon mui-icon-minus-filled" @click="reduceClick(index)"></div>
          <!--          <div v-show="item.count>0">{{item.count}}</div>-->
          <div> {{rightColumnList.length>0?item.count:0}}</div>
          <div class="like-total mui-icon mui-icon-plus-filled" @click="addClick(index)"></div>
        </div>
      </div>
    </div>
    <div class="bottom_container">
      <div class="bottom_inner">
        <div style="width: 30%;float: left">
          <img src="../../assets/scanorder/scanorder.jpg" class="bottom_inner_img">
        </div>
        <div class="buyPrice">￥{{totalPrice}}</div>
        <div class="toBuy" @click="toOrderComputed">
          去结算
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myNetUtils from "../js/MyNetUtils";
  import global_msg from "../js/global";
  import {Toast} from "mint-ui"
  import loading from "../public/loading/loading";

  export default {
    name: "ScanOrder",
    data() {
      return {
        leftColumnList: [],
        rightColumnList: [],
        clickColumnList: [],//点击的，count为1的保存在这个数组里面
        currentSelectedLeftColumnIndex: 0,
        currentSelectedRightColumnIndex: 0,
        leftColumnListId: "",
        loading: false,
        totalPrice: 0,
        totalCount: 0,
        count: "",
        tableNumber: "",
        tableName: ""
      }
    },
    mounted() {
      //显示左边栏
      this.getLeftColumn()
      this.tableNumber = this.$route.query.tableNumber
      this.tableName = this.$route.query.tableName
    },
    methods: {
      //页面传参
      toOrderComputed() {
        this.$router.push({
          path: '/ordercomputed',
          query: {restaurantList: this.clickColumnList, totalPrice: this.totalPrice, tableNumber: this.tableNumber}
        })
      },
      //-
      reduceClick(index) {
        this.currentSelectedRightColumnIndex = index;
        this.rightColumnList[this.currentSelectedRightColumnIndex].count--;
        this.computeTotalPrice()
        this.$forceUpdate()
      },
      //+
      // 点击添加
      addClick(index) {
        this.currentSelectedRightColumnIndex = index;
        this.rightColumnList[this.currentSelectedRightColumnIndex].count++;
        console.log(this.rightColumnList[this.currentSelectedRightColumnIndex].count)
        //如果是加号，进入if
        // 将点击的数据放进clickColumnList数组中
        this.clickColumnList = this.clickColumnList.concat(this.rightColumnList[this.currentSelectedRightColumnIndex])
        this.computeTotalPrice()
        console.log(this.clickColumnList)
      },
      // 计算总价格
      computeTotalPrice() {
        // 进计算方法第一件事就要清空总价格
        this.totalPrice = 0
        for (let data of this.rightColumnList) {
          this.totalPrice += data.count * data.selling_price;
        }
      },
      //左边栏主餐类
      getLeftColumn() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/restaurant`, {
          "shopId": this.$store.state.selectedShopData.shopId,
          "include": "caterings"
        }, function (body) {
          _this.leftColumnList = body.data;
          if (_this.leftColumnList.length === 0) {
            Toast("未获得数据");
            return;
          }
          //默认点击第一个
          _this.leftColumnClickEvent(0);
        }, function (message) {
          alert("扫码点餐获取数据失败：" + message);
        })
      },
      //点击左边栏
      leftColumnClickEvent(index) {
        //如果点击第一项，右边显示第一项的信息，点击第二项显示第二项的信息
        this.loading = true;
        this.currentSelectedLeftColumnIndex = index;
        this.leftColumnListId = this.leftColumnList[this.currentSelectedLeftColumnIndex].catId;
        // //定义一个变量保存右边菜类的子信息
        this.rightColumnList = this.leftColumnList[this.currentSelectedLeftColumnIndex].caterings

        for (let i = 0; i < this.rightColumnList.length; i++) {
          //先循环再判断
          let data = this.rightColumnList[i];
          //如果没有count属性
          if (!data.hasOwnProperty("count"))
            //自行设置data中的count的值为0
            data["count"] = 0;
        }
        this.loading = false

      },

    }
    ,
    components: {
      loading
    }
  }
</script>

<style lang="less" scoped>
  .header_container {
    background: #ffffff;
    line-height: 30px;
    font-size: 15px;
    width: 100%;
    padding: 0 20px;
    position: fixed;

    .header_sao {
      float: left;
      width: 50%;
      /*text-align: left;*/
    }

    .header_center {
      /*width: 50%;*/
      margin: 0 auto;
    }
  }

  .left_container {
    font-size: 17px;
    padding: 30px 0;
    float: left;
    width: 30%;

    .left_inner_container {
      width: 100%;
      text-align: center;
      line-height: 40px;
      background: #ffffff;
      border-top: 1px solid #e0e0e0;

    }
  }

  .right_container {
    width: 68%;
    padding: 30px 0;
    float: right;
    text-align: right;

    .right_inner_container {
      width: 100%;
      background: #ffffff;
      padding-right: 20px;
      margin-top: 10px;
      padding-bottom: 35px;

      .right_inner_container_name {
        line-height: 40px;
      }

      .right_inner_container_like {
        line-height: 40px;
        display: flex;
        float: right;
        align-items: center;

        .like-minus {
          right: 0;
          flex: 1;
          color: dodgerblue;
        }

        .like-total {
          color: dodgerblue;

        }
      }
    }
  }

  .bottom_container {
    width: 95%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 10px;
    border-radius: 50px;
    position: fixed;
    background: #393939;
    z-index: 10;
    height: 50px;
    line-height: 50px;

    .bottom_inner_img {
      width: 60px;
      height: 60px;
      margin-top: -8px;
      margin-left: -1px;
      border-radius: 30px;
    }

    .buyPrice {
      width: 40%;
      float: left;
      color: #ffffff;
    }

    .toBuy {
      float: right;
      background: orange;
      height: 50px;
      width: 80px;
      border-radius: 0 50px 50px 0;
      padding-left: 10px;
    }
  }

</style>
