<template>
  <div class="shopcontainer">
    <div class="shopcontainer_top">
      <loading v-if="loading"></loading>
      <div class="shop_bg">
        <mt-search>
          <mt-cell
            v-for="item in result"
            :title="item.title"
            :value="item.value">
          </mt-cell>
        </mt-search>
      </div>
      <mt-swipe :auto="4000" class="shop_mint-swipe">
        <mt-swipe-item v-for="(item,index) in shopBannerList">
          <img :src="item.img_url" alt="加载错误">
        </mt-swipe-item>
      </mt-swipe>
      <div class="shop_search">
        <form action>
          <div class="mui-input-row mui-search">
          </div>
        </form>
      </div>
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl"
             class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <div :class="['mui-control-item', index === currentSelectedCategoryIndex ? 'mui-active':'' ]"
                 v-for="(item,index) in totalShopCategoryList" @click="categoryClickEvent(index)">
              <img :src="item.img" alt="加载错误" class="shop_item_img">
              <div class="shop_item_txt">{{item.categoryName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-water-fall ">
      <waterfall :data="productList">
        <template>
          <div class="cell-item " v-for="(item,index) in productList" :key="index">
            <img :src="item.productImg" alt="加载错误" :class="{img_2:index===1}">
            <div class="item-body">
              <div class="item-desc">{{item.productName}}</div>
              <div class="like-stock">库存：{{item.stock}}</div>
              <div class="item-footer">
                <div class="avatar">{{item.price}}￥</div>
                <div class="like">
                  <div class="like-minus mui-icon mui-icon-minus-filled" @click="addClick(index,false)"
                       v-show="item.count!==0"></div>
                  <div class="like-txt" v-show="item.count!==0">
                    <!--  页面渲染时productList.length的长度为0，因为这时还没请求接口
                    所以需要判断请求接口后渲染count,否则为0 -->
                    {{productList.length>0?item.count:0}}
                  </div>
                  <div class="like-total mui-icon mui-icon-plus-filled" @click="addClick(index,true)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </waterfall>
    </div>
    <span class=" mui-icon mui-icon-extra mui-icon-extra-cart fix-cart" @click="carDetailClick()">
        <span class="mui-badge bigbadge">{{shopCarList.length}}</span>
    </span>
  </div>
</template>
<script>
  // import mui from '../../lib/mui/js/mui.js'
  import "../css/shop.less";
  import global_msg from "../js/global";
  import {Toast} from "mint-ui";
  import loading from "../public/loading/loading";
  /*
    注意:
    1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
    2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
  */
  export default {
    data() {
      return {
        // data: [],
        loading: false,
        totalShopCategoryList: [],
        shopBannerList: [],
        categoryId: "",
        currentSelectedCategoryIndex: 0,
        pageIndex: 1,
        productId: "",
        productList: [],
        shopCarList: [],
        result: [],
        currentSelectedProductIndex: 0,
      };
    },
    created() {
      this.getShopCategory();
      this.getShopBanner();
      this.backgroundAccess();

      //如果是从shopcardetail返回的页面，这个页面的count等于shopcardetail的count
      this.shopCarList = this.$store.state.shopCarList
      console.log("111" + this.shopCarList)

    },
    methods: {
      //后台访问
      backgroundAccess() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/mall/order/qxdd`,
            {
              params: {}
            }, {emulateJSON: true})
          .then(res => {
              if (res.body.err_code === 0) {
              } else {
                alert("访问后台失败：" + res.body.message);
              }
            }
          )
      },
      //跳转购物车详情页面
      carDetailClick() {
        // console.log("传之前的:" + this.shopCarList)
        this.$store.commit('setShopCarList', this.shopCarList);
        this.$router.push({
          path: '/shop/car/detail',
        });
      }
      ,
      // 点击添加
      addClick(index, isAdd) {
        this.currentSelectedProductIndex = index;
        if (isAdd) {
          //如果是加号，进入if
          //出现问题，点击添加两个同样的商品到购物车，会在购物车列表中显示两遍
          //解决想法：如果点击添加商品的id与在购物车中有相匹配的，就更新数据，如果没有，就添加进去
          //如果id.length>1,更新数据
          let isContains = false;//定义一个（是否相同（包含））属性的布尔值为false
          for (let i = 0; i < this.shopCarList.length; i++) {
            // 如果购物车列表中的某个产品id与产品列表所点击的id相匹配
            if (this.shopCarList[i].id === this.productList[this.currentSelectedProductIndex].id) {
              this.productList[this.currentSelectedProductIndex].count++;
              // 不相同时
              isContains = true;
              // 跳出循环
              break;
            }
          }
          // console.log(this.productList);
          //如果相同isContains=true
          if (!isContains) {
            // 所点击的下标的count++
            this.productList[this.currentSelectedProductIndex].count++;
            // 追加
            this.shopCarList = this.shopCarList.concat(this.productList[this.currentSelectedProductIndex]);
          }
        } else {
          //如果是减（返回为false），进入else
          //所点击的产品的count-1
          this.productList[this.currentSelectedProductIndex].count--;
          // for循环中,定义一个i=0，如果i小于购物车列表的长度，i++
          for (let i = 0; i < this.shopCarList.length; i++) {
            // 如果购物车列表中的某个产品id与产品列表所点击的id相匹配
            if (this.shopCarList[i].id === this.productList[this.currentSelectedProductIndex].id) {
              //如果所选的产品列表中count为0，可以直接从购物车中删除，否则不行
              if (this.productList[this.currentSelectedProductIndex].count === 0) {
                this.shopCarList.splice(i, 1);
              }
              //购物车列表的下标i减去一个数量
              // this.shopCarList.splice(i, 1);
              // this.shopCarList[i].count--
              // 返回
              break;
            }
          }
        }
        //强制刷新
        this.$forceUpdate()
      }
      ,
      categoryClickEvent(index) {
        this.productList = [];
        this.loading = true;
        // 当第一个分类加载到第二页是点击另外一个分类时，第一个分类的页数要重新赋1
        this.pageIndex = 1;
        this.currentSelectedCategoryIndex = index;
        this.categoryId = this.totalShopCategoryList[this.currentSelectedCategoryIndex].id;
        // console.log(this.totalShopCategoryList[this.currentSelectedCategoryIndex].id+"::111id")
        this.getProductList();
      }
      ,
      loadMore() {
        this.getProductList();
      }
      ,
      //主页分类
      getShopCategory() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/mall/category`,
            {
              params: {
                "brand_id": `${global_msg.method.getBrandId()}`
              }
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.totalShopCategoryList = res.body.data;
              if (this.totalShopCategoryList.length === 0) {
                Toast("未获得分类数据");
                return;
              }
              this.categoryClickEvent(0);
            } else {
              alert("获取商城分类失败：" + res.body.message);
            }
          })
      }
      ,
      //主页banner
      getShopBanner() {
        this.$http
          //定义为全局使用global_msg.server_url
          //get请求（后端提供url）
          .get(`${global_msg.method.getBaseUrl()}/api/mall/banner`,
            {
              params: {
                "brand_id": `${global_msg.method.getBrandId()}`
              }
            }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.shopBannerList = res.body.data;
            } else {
              alert("获取商城轮播图失败：" + res.body.message);
            }
          })
      }
      ,

      //商品列表
      getProductList() {
        this.$http
          //定义为全局使用global_msg.server_url
          //post请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/mall/productlist`,
            {
              // 在请求完上一页的时候加载page变为2：this.pageIndex++
              "brand_id": `${global_msg.method.getBrandId()}`,
              "category_id": this.categoryId,
              "page": this.pageIndex,
              "count": 20
            }, {emulateJSON: true})
          .then(res => {
            this.loading = false;
            if (res.body.err_code === 0) {
              this.productList = this.productList.concat(res.body.data);
              //定义一个i为0；如果i小于产品列表长度
              for (let i = 0; i < this.productList.length; i++) {
                //定义data接收某个产品(产品列表下标)
                let data = this.productList[i];
                //如果没有count属性
                if (!data.hasOwnProperty("count"))
                  //自行设置data中的count的值为0
                  data["count"] = 0;
              }
              for (let i = 0; i < this.productList.length; i++) {
                for (let j = 0; j < this.shopCarList.length; j++) {
                  if (this.productList[i].id === this.shopCarList[j].id) {
                    this.productList[i].count = this.shopCarList[j].count;
                  }
                }
              }

            } else {
              alert("获取商品列表失败" + res.body.message);
            }
          })
      }
      ,
      //判断机型Android还是ios
      isAndroid() {
        let ua = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1;
        let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
          return true;
        }
        if (isIOS) {
          return false;
        }
      }
      ,


    },

    beforeCreate() {
      console.log("ShopContainer 加载了1")
    }
    ,
    mounted() {

      // this.data = this.originData;
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
      let _this = this;
      window.addEventListener('scroll', function () {
        let scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
        let clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
        let scrHeight
        if (_this.isAndroid())
          scrHeight = document.body.scrollHeight;
        else
          scrHeight = document.documentElement.scrollHeight; // 整个网页的实际高度，兼容Pc端
        if (_this.isAndroid()) {
          if (scr + clientHeight >= scrHeight) {
            if (!_this.loading) { //this.isMoreLoad控制滚动是否加载更多
              _this.loading = true;
              _this.pageIndex++;
              _this.loadMore()
            } else {
            }
          }
        } else {
          if (scr + clientHeight > scrHeight) {
            if (!_this.loading) { //this.isMoreLoad控制滚动是否加载更多
              _this.loading = true;
              _this.pageIndex++;
              _this.loadMore()
            } else {
            }
          }
        }

      });

      //   var overscroll = function(el) {
      //     el.addEventListener('touchstart', function() {
      //       var top = el.scrollTop
      //         ,totalScroll = el.scrollHeight
      //         ,currentScroll = top + el.offsetHeight;
      //       if(top === 0) {
      //         el.scrollTop = 1;
      //       }else if(currentScroll === totalScroll) {
      //         el.scrollTop = top - 1;
      //       }
      //     });
      //
      //     el.addEventListener('touchmove', function(evt) {
      //       if(el.offsetHeight < el.scrollHeight)
      //         evt._isScroller = true;
      //     });
      //   }
      //
      //   overscroll(document.querySelector('.scroll'));
      //   document.body.addEventListener('touchmove', function (e) {
      //     if(e._isScroller) return;
      //     e.preventDefault();
      //   }, {passive: false}); //passive 参数不能省略
    }
    ,
    components: {
      loading
    }
  }
  ;
</script>


// WEBPACK FOOTER //
// src/components/tabar/ShopContainer.vue
