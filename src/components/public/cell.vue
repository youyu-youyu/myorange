<template>
  <div id="base_div">
    <!--    onclick=selectPay-->
    <div id="cover_selectPay">
      <!--      v-show-->
      <div id="cover"></div>
      <div class="selectPay" id="selectPay_id">
        <button @click="selectPayType(0)">{{selectPayType0}}</button>
        <button @click="selectPayType(1)" v-show="selectPayType1!==''">{{selectPayType1}}</button>
        <button @click="selectPayType(2)" v-show="selectPayType2!==''">{{selectPayType2}}</button>
      </div>
    </div>
    <div @click="selectPay()" class="left_a_right" id="payInfo" v-show="isDisplay">
      <div class="mui-pull-left">付款详情</div>
      <div class="mui-pull-right left_a_right-right">{{payTypeText}}
        <span class="mui-icon mui-icon-forward"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cell",

    props: {
      title: {
        type: String,
        default: ""
      },
      rightTxt: {
        type: String,
        default: "",

      },
      selectPayType0: {
        type: String,
        default: "",

      },
      selectPayType1: {
        type: String,
        default: "",

      },
      selectPayType2: {
        type: String,
        default: "",
      },
      parentClickMethodName: {
        type: Function,
        default: null
      },
      isDisplay: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        payTypeText: "微信付款",
        payType: 1
      }
    },
    mounted() {
      //点击子组件时阻止父亲冒泡
      // document.getElementById("cover_selectPay").onclick = function (e) {
      //   e.stopPropagation();
      //   e.preventDefault();
      // }
    },
    methods: {
      //点击出现三button选择付款
      selectPay() {
        console.log("cover现");
        document.getElementById("selectPay_id").setAttribute("style", "display:block;");
        document.getElementById("cover").setAttribute("style", "display:block;")
      },
      selectPayType(type) {
        console.log("cover隐");
        document.getElementById("selectPay_id").setAttribute("style", "display:none;");
        document.getElementById("cover").setAttribute("style", "display:none;")
        switch (type) {
          case 0:
            this.payTypeText = this.selectPayType0;
            this.payType = 1;
            break;
          case 1:
            this.payTypeText = this.selectPayType1;
            this.payType = 3;
            break;
          case 2:
            this.payTypeText = this.selectPayType2;
            this.payType = 4
        }
        //
        if (this.parentClickMethodName !== null) {
          this.parentClickMethodName(this.payType)
        }
      },
    }

  }
</script>

<style lang="less" scoped>
  .left_a_right {
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 25px 10px;
    line-height: 5px;

    .left_a_right-right {
      margin-top: -10px;
      color: #a8adac;

    }
  }

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

  #selectPay_id {
    top: 40%;
    left: 50%;
    width: 100%;
    text-align: center;
    position: fixed;
    z-index: 999999;
    display: none;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
  }

  .selectPay button {
    width: 100px;
    height: 45px;
    border-radius: 10px;
    -webkit-box-shadow: 5px 5px 20px 5px #888;
    box-shadow: 5px 5px 20px 5px #888
  }


</style>


<!--// WEBPACK FOOTER //-->
<!--// src/components/public/cell.vue-->
