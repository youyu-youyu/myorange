<template>
  <div>
    <loading v-if="loading"></loading>
    <!-- 头-->
    <div class="header_container">
      <span class="header_sao">扫码点餐</span>
      <span class="header_center">{{tableName}}</span>
    </div>
    <div class="scan_content">
      <div class="left_container">
        <div class="left_inner_container" v-for="(item,index) in leftColumnList" @click="leftColumnClickEvent(index)">
          {{item.catName}}
        </div>
      </div>
      <div class="right_container">
        <div class="right_inner_container" v-for="(item,index) in rightColumnList" :key="index">
          <!--          <img class="img_order" src="../../assets/order/order.jpg">-->
          <div class="right_inner_container_name">{{item.cateringName}}</div>
          <div class="right_inner_container_money">￥{{item.selling_price}}</div>
          <div class="right_inner_container_like">
            <div class="like-minus mui-icon mui-icon-minus-filled" v-show="item.num>0"
                 @click="reduceClick(index)"></div>
            <div v-show="item.num>0"> {{rightColumnList.length>0?item.num:0}}</div>
            <div class="like-total mui-icon mui-icon-plus-filled" @click="addClick(index)"></div>
          </div>
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
        num: "",
        tableNumber: "",
        tableName: "",
        coinTotalPrice: 0
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
        if (this.totalPrice <= 0) {
          Toast("您未添加商品！")
        } else {
          this.$router.push({
            path: '/ordercomputed',
            query: {
              restaurantList: this.clickColumnList,
              totalPrice: this.totalPrice,
              tableNumber: this.tableNumber,
              coinTotalPrice: this.coinTotalPrice
            }
          })
        }

      },
      //-
      reduceClick(index) {
        this.currentSelectedRightColumnIndex = index;
        this.rightColumnList[this.currentSelectedRightColumnIndex].num--;
        if (this.rightColumnList[this.currentSelectedRightColumnIndex].num <= 0) {
          //如果数量为0时候，把点击的东西的数组赋空
          this.clickColumnList = []
        }
        this.computeTotalPrice()
        this.$forceUpdate()
      },
      //+
      // 点击添加
      addClick(index) {
        this.currentSelectedRightColumnIndex = index;
        // 将点击的数据放进clickColumnList数组中
        let isContains = false
        for (let i = 0; i < this.clickColumnList.length; i++) {
          //如果所点击的和已经保存在clickColumnList的cateringId相同，直接把num覆盖改变就好，其他不变
          //如果是同一个cateringId num++，不同就concat进去
          if (this.clickColumnList[i].cateringId === this.rightColumnList[this.currentSelectedRightColumnIndex].cateringId) {
            this.rightColumnList[this.currentSelectedRightColumnIndex].num++;
            isContains = true
            break;
          }

        }
        if (!isContains) {
          this.rightColumnList[this.currentSelectedRightColumnIndex].num++;
          this.clickColumnList = this.clickColumnList.concat(this.rightColumnList[this.currentSelectedRightColumnIndex])
        }

        this.computeTotalPrice()
        console.log(this.clickColumnList)
      },
      // 计算总价格
      computeTotalPrice() {
        // 进计算方法第一件事就要清空总价格
        this.coinTotalPrice = 0
        this.totalPrice = 0
        for (let data of this.rightColumnList) {
          this.totalPrice += data.num * data.selling_price;
          this.coinTotalPrice += data.num * data.coin_money
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
          console.log(_this.leftColumnList)
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
          if (!data.hasOwnProperty("num"))
            //自行设置data中的count的值为0
            data["num"] = 0;
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
    padding: 5px 20px;
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
    margin-top: 10px;
    /*background: #e2e1e1;*/
    width: 30%;

    .left_inner_container {
      width: 100%;
      text-align: center;
      line-height: 40px;
      background: #e2e1e1;
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
      margin-top: 15px;
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

    .bottom_inner {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 10px;
      border-radius: 50px;
      height: 50px;
      line-height: 50px;
      background: #393939;
      z-index: 99999 !important;
    }

    .bottom_inner_img {
      width: 60px;
      height: 60px;
      margin-top: -8px;
      /*z-index: 99999 !important;*/
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

  .scan_content {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    z-index: 1;
    min-height: 1110px;
  }

  .img_order {
    width: 100px;
    height: 100px;
  }
</style>
