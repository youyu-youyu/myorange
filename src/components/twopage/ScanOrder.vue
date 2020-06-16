<template>
  <div>
    <loading v-if="loading"></loading>
    <!-- 头-->
    <div class="header_container">
      <span class="header_sao">扫码点餐</span>
      <span class="header_center">餐桌15</span>
    </div>
    <div class="left_container">
      <div class="left_inner_container" v-for="(item,index) in leftColumnList" @click="leftColumnClickEvent(index)">
        {{item.categoryName}}
      </div>
    </div>
    <div class="right_container">
      <div class="right_inner_container" v-for="(item,index) in rightColumnList" :key="index">
        <div class="right_inner_container_name">{{item.productName}}</div>
        <div class="right_inner_container_money">￥{{item.price}}</div>
        <div class="right_inner_container_like">
          <div class="like-minus mui-icon mui-icon-minus-filled" v-show="item.count!==0"></div>
          <div v-show="item.count!==0"> {{rightColumnList.length>0?item.count:0}}</div>
          <div class="like-total mui-icon mui-icon-plus-filled" @click="addClick(index)"></div>
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
        leftColumnList: "",
        rightColumnList: [],//productList: [],
        currentSelectedLeftColumnIndex: 0,
        leftColumnListId: "",
        loading: false
      }
    },
    mounted() {

      //显示左边栏
      this.getLeftColumn()
      // mui('.mui-off-canvas-wrap').offCanvas('show');
    },
    methods: {
      //+
      addClick(index) {
        console.log(this.rightColumnList[index].count++)
        this.rightColumnList[index].count++
        // 点击时候刷新
      },
      //左边栏
      getLeftColumn() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/mall/category`, {
          "brand_id": `${global_msg.method.getBrandId()}`
        }, function (body) {
          _this.leftColumnList = body.data;
          if (_this.leftColumnList.length === 0) {
            Toast("未获得数据");
            return;
          }
          _this.leftColumnClickEvent(0);
        }, function (message) {
          alert("扫码点餐获取数据失败：" + message);
        })
      },
      //点击左边栏
      leftColumnClickEvent(index) {
        this.rightColumnList = [];
        this.loading = true;
        // 当第一个分类加载到第二页是点击另外一个分类时，第一个分类的页数要重新赋1
        //点击左边栏的时候，清空右边栏并显示与点击id相对应的详细列表
        this.currentSelectedLeftColumnIndex = index;
        console.log(this.leftColumnList[this.currentSelectedLeftColumnIndex].id)
        this.leftColumnListId = this.leftColumnList[this.currentSelectedLeftColumnIndex].id;
        this.getRightColumnList();
      },
      //获取右边栏数据
      getRightColumnList() {
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/mall/productlist`, {
          // 在请求完上一页的时候加载page变为2：this.pageIndex++
          "brand_id": `${global_msg.method.getBrandId()}`,
          "category_id": this.leftColumnListId,
          "page": _this.pageIndex,
          "count": 20
        }, function (body) {
          _this.loading = false;
          _this.rightColumnList = _this.rightColumnList.concat(body.data);
          console.log(_this.rightColumnList)
          //定义一个i为0；如果i小于产品列表长度
          for (let i = 0; i < _this.rightColumnList.length; i++) {
            //定义data接收某个产品(产品列表下标)
            let data = _this.rightColumnList[i];
            //如果没有count属性
            if (!data.hasOwnProperty("count"))
              //自行设置data中的count的值为0
              data["count"] = 0;
          }
          for (let i = 0; i < _this.rightColumnList.length; i++) {
            for (let j = 0; j < _this.rightColumnList.length; j++) {
              if (_this.rightColumnList[i].id === _this.rightColumnList[j].id) {
                _this.rightColumnList[i].count = _this.rightColumnList[j].count;
              }
            }
          }
        }, function (message) {
          _this.loading = false;
          alert("获取商品列表失败" + message);
        })
      },
    },
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

      .right_inner_container_name {
        line-height: 40px;
      }

      .right_inner_container_like {
        line-height: 40px;
        display: flex;
        align-items: center;

        .like-minus {
          right: 0;
          flex: 1;
          color: dodgerblue;
        }

        .like-total {
          color: dodgerblue;
          flex: 1;
        }
      }
    }
  }

</style>
