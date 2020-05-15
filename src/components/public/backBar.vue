<template>
  <transition>
    <div class="backBar font">
      <div class="back_top">
        <div class="back_top_inner">
          <div class="back_top_inner_txt" @click="routerBack">
            <a>
              <button class="mui-icon mui-icon-back back_txt"></button>
            </a>
            <div class="back_txt-1">{{back}}</div>
          </div>
          <span class="back_center">{{title}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="less" scoped>
  @import "../css/public.css";

  .backBar {
    /*position: fixed;*/
    -webkit-transform: translateZ(0);
    width: 100%;
    top: 0;
    left: 0;
    z-index: 998;
    // background-image   : linear-gradient(to right, #FD769F, #FB8D68);
    background-image: linear-gradient(to right, rgba(125, 130, 250), rgba(22, 168, 254));
    /*background-color: #fff;*/
    border-bottom: 1px solid #e0e0ee;
    height: 50px;
    overflow-x: hidden;
    position: fixed;
  }

  .back_top {
    /*position: absolute;*/
  }

  .back_top_inner {
    /*background-color: #fff;*/
    display: flex;
    line-height: 50px;
    position: absolute;

    // justify-content: space-between;
  }

  .back_top_inner_txt {
    // text-align: center;
    display: flex;
  }

  .back_txt {
    // color: aqua;
    background-color: transparent !important;
    flex: 1;
    line-height: 38px;
    border: none;
  }

  .back_txt_1 {
    // color: aqua !important;
    // float: left !important;
    flex: 1;
    font-size: 14px;
  }

  .back_center {
    // padding: 0 80px;
    text-align: center;
    width: 70%;
  }

</style>
<script type="text/ecmascript-6">
  import {mapActions} from "vuex";

  export default {
    props: [
      "title",
      "back",
      "backHome",
    ],
    data() {
      return {};
    },
    methods: {
      ...mapActions(["setIsFirst"]),
      routerBack() {
        // this.$router.go(-1); //返回上一层
        console.log("backBar:" + this.backHome);
        if (this.backHome !== undefined) {
          this.$router.push({path: '/home'})
        } else
          history.back(-1);
      }
    }
  };
</script>


// WEBPACK FOOTER //
// src/components/public/backBar.vue
