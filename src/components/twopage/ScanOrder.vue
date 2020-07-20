<template>
  <div>
    <loading v-if="loading"></loading>
    <!-- 头-->
    <div class="header_container">
      <span class="header_sao">扫码点餐</span>
      <span class="header_name">店名:{{this.$store.state.selectedShopData.shopName}}</span>
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
          <!--          <img class="img_order mui-pull-left" src="../../assets/order/order.jpg">-->
          <img class="img_order mui-pull-left"
               :src="photoUrl">
          <div class="all_left mui-media-body">
            <div class="right_inner_container_name">{{item.cateringName}}</div>
            <div class="right_inner_container_money">￥{{item.selling_price}}</div>

          </div>
          <div class="right_inner_container_like mui-pull-right">
            <div class="like-minus mui-icon mui-icon-minus-filled" v-show="item.num>0"
                 @click="reduceClick(index,1)"></div>
            <div v-show="item.num>0"> {{rightColumnList.length>0?item.num:0}}</div>
            <div class="like-total mui-icon mui-icon-plus-filled" @click="addClick(index)"></div>
          </div>
        </div>
      </div>

    </div>

    <div class="bottom_container">
      <div class="bottom_inner">
        <div @click="showBoxClick()">
          <div style="width: 30%;float: left">
            <img src="../../assets/scanorder/scanorder.jpg" class="bottom_inner_img">
          </div>
          <div class="buyPrice">￥{{totalPrice}}</div>
        </div>
        <div class="toBuy" @click="toOrderComputed">
          去结算
        </div>
      </div>
    </div>
    <div class="scan_bottom">
      <div class="scan_middle" id="carShowBox">
        <div class="right1_container">
          <div class="cancel" @click="cancelClick()">x</div>
          <div class="right_inner_container1" v-for="(item,index) in clickColumnList" :key="index">
            <img class="img_order1 mui-pull-left"
                 :src="photoUrl">
            <div class="all_left all_left1 mui-media-body">
              <div class="right_inner_container_name">{{item.cateringName}}</div>
              <div class="right_inner_container_money">￥{{item.selling_price}}</div>

            </div>
            <div class="right_inner_container_like mui-pull-right smallcomputed">
              <div class="like-minus mui-icon mui-icon-minus-filled" v-show="item.num>0"
                   @click="reduceClick(index,2)"></div>
              <div v-show="item.num>0"> {{clickColumnList.length>0?item.num:0}}</div>
              <div class="like-total mui-icon mui-icon-plus-filled" @click="addClick(index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="cover"></div>
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
        coinTotalPrice: 0,
        photoUrl: ""
      }
    },
    mounted() {
      //显示左边栏
      this.getLeftColumn()
      this.tableNumber = this.$route.query.tableNumber
      this.tableName = this.$route.query.tableName
    },
    methods: {
      //取消点击购物车
      cancelClick() {
        console.log("取消")
        document.getElementById("cover").setAttribute("style", "display:none;")
        document.getElementById("carShowBox").setAttribute("style", "display:none;")
      },
      //点击购物车
      showBoxClick() {
        document.getElementById("cover").setAttribute("style", "display:block;")
        document.getElementById("carShowBox").setAttribute("style", "display:block;")
      },
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
              coinTotalPrice: this.coinTotalPrice,
              clickColumnList: this.clickColumnList
            }
          })
        }

      },
      //-
      reduceClick(index, clickEvent) {
        this.currentSelectedRightColumnIndex = index;
        if (clickEvent === 1) {
          //如果点击的是rightColumnList，rightColumnList.num--
          //如果点击的是clickColumnList，rightColumnList.num--
          this.rightColumnList[this.currentSelectedRightColumnIndex].num--;
        } else {
          this.clickColumnList[this.currentSelectedRightColumnIndex].num--;
        }
        //当点击购物车的时候
        for (let data of this.clickColumnList) {
          //问题1：点击-的时候，页面有时候不刷新，打印出是正确的
          //问题2：在购物车的时候有时候-的是第一个，结果第二个被-了
          if (data.num === 0) {
            //循环每一个data，如果全部data都为0的时候，从购物车移除num为0的数据
            this.clickColumnList.splice(index, 1)
            if (this.clickColumnList.length === 0) {
              //当全部的data.num都为0时候，隐藏
              document.getElementById("cover").setAttribute("style", "display:none;")
              document.getElementById("carShowBox").setAttribute("style", "display:none;")
            }
          }
        }

        this.computeTotalPrice()
        console.log(this.rightColumnList)
        console.log(this.clickColumnList)
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
        // console.log(this.clickColumnList)
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
          "include": "caterings",
          "_timestamp": new Date().getTime()
        }, function (body) {
          _this.leftColumnList = body.data;
          // console.log(_this.leftColumnList)
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
        console.log(this.rightColumnList)
        // this.rightColumnList = this.rightColumnList.concat(this.rightColumnList)
        for (let i = 0; i < this.rightColumnList.length; i++) {

          //先循环再判断
          let data = this.rightColumnList[i];
          this.photoUrl = data.photo_url === null ? require('../../assets/order/order.jpg') : data.photo_url
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
  //遮盖层
  #cover {
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

  .header_container {
    background: #ffffff;
    line-height: 30px;
    font-size: 15px;
    width: 100%;
    padding: 5px 20px;
    position: fixed;
    z-index: 999;

    .header_sao {
      float: left;
      width: 30%;
      /*text-align: left;*/
    }

    .header_name {
      /*z-index: 999;*/
      width: 33%;
      text-align: right;
    }

    .header_center {
      width: 30%;
      float: right;
      text-align: right;
      align-items: center;
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

  .right1_container {
    width: 100%;
    padding-bottom: 30px;
    float: right;
    background: #ffffff;
  }

  .cancel {
    padding: 0 10px;
    background: #D3B986;
    line-height: 40px;
  }

  .right_container {
    width: 68%;
    margin-top: 30px;
    float: right;
    background: #ffffff;
  }

  right_inner_container1 {
    width: 100%;
    background: #ffffff;
    padding-right: 20px;
  }

  .right_inner_container {
    width: 100%;
    background: #ffffff;
    padding-right: 20px;
    margin-top: 15px;
    padding-bottom: 35px;
  }

  .right_inner_container_name {
    line-height: 40px;
    /*float: left;*/
  }

  .smallcomputed {
    margin-top: -40px !important;
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
      z-index: 9999999 !important;
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
    float: left;
    margin: 5px 10px;
    width: 120px;
    height: 100px;
  }

  .img_order1 {
    float: left;
    margin: 5px 10px;
    width: 50px;
    height: 40px;
  }

  .scan_bottom {
    width: 100%;
  }

  .scan_middle {
    width: 100%;
    height: auto;
    display: none;
    background: #ffffff;
    position: fixed;
    bottom: 40px;
    z-index: 999999;
  }

  .all_left1 {
    border-bottom: 1px solid #e0e0e0;
  }
</style>
