<template>
  <div class="myAddress">
    <div class="back_top">
      <div class="back_top_inner">
        <div class="back_top_inner_txt" @click="back">
          <button class="mui-icon mui-icon-back back_txt"></button>
          <div class="mui-media-left back_txt_1">我的收货地址</div>
        </div>
        <span class="mui-pull-right back_txt_2" @click="addAddress()">添加新地址</span>
      </div>
    </div>
    <div class="address">
      <div class="address_content" v-for="(item,index) in addressList">
        <a><span class="mui-icon mui-icon-navigate mui-pull-left add_left"></span></a>
        <div class="address_content_inner mui-media-body" @click="selectAddressClick(index)">
          <span>{{item.fullname}}</span>&nbsp;&nbsp;<span>{{item.mobile}}</span>
          <div class="add">
            {{item.full_address}}
          </div>
        </div>
        <div class="mui-pull-right add-right" @click="editorInfo(index)">
          编辑
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {Toast} from "mint-ui"
  import global_msg from "../js/global";
  import myNetUtils from "../js/MyNetUtils.js";

  export default {
    name: "MyAddress",
    data() {
      return {
        shopCarList: [],
        addressList: [],
        fullname: "",
        mobile: "",
        full_address: "",
        editIndex: "",
        selectIndex: "",
      }
    },
    created() {
      this.shopCarList = this.$route.query.temp;
      this.getReceivingAddressList();
      // console.log(this.shopCarList)
    },
    methods: {
      addAddress() {
        // this.showBox = 0
        this.$router.push({path: '/addaddress'})
      },
      //编辑收货地址
      editorInfo(index) {
        this.editIndex = index;
        //点击编辑时回到添加收货地址页面，并且添加收货地址详细信息中显示需要编辑的信息
        //点击哪个下标，显示哪个
        //点击编辑的一瞬间就应该从数据库拿数据
        this.$router.push({
          path: '/addaddress', query: {updateAddress: this.addressList[this.editIndex]}
        });
      },

      back() {
        // this.$router.go(-1); //返回上一层
        history.back(-1);
      },
      //获取收货地址列表
      getReceivingAddressList() {
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/mall/addrlist`, {
          "brand_id": `${global_msg.method.getBrandId()}`
        }, function (body) {
          _this.addressList = [];
          // this.addressList =res.body.data;
          _this.addressList = _this.addressList.concat(body.data);
        }, function (message) {
          alert("获取收货地址列表失败" + message)
        })
      },
      //选择地址
      selectAddressClick(index) {
        this.selectIndex = index;
        //传点击的地址
        this.$router.push({path: '/shop/car/detail', query: {addressIndex: this.addressList[this.selectIndex]}});
        // this.$router.go(-1); //返回上一层
      },
    },

  }
</script>

<style lang="less" scoped>zhuan
.back_top {
  width: 100%;
  background-color: #fff !important;
  height: 50px;
  position: fixed;
}

.back_txt {
  flex: 1;
  line-height: 38px;
  float: left;
  border: none;
}

.back_txt_1 {
  // color: aqua !important;
  float: left !important;
  line-height: 50px;
  font-size: 14px;
}

.back_txt_2 {
  line-height: 50px;
  font-size: 14px;
  padding-right: 20px;
}

.back_top {
  width: 100%;
  background-color: #fff !important;
  height: 50px;
}

back_top_all {
  position: fixed;
  width: 100% !important;
  background-color: #fff !important;
  height: 50px;
}

.back_txt {
  flex: 1;
  line-height: 38px;
  float: left;
  background: transparent;
  border: none;
}

.back_txt_1 {
  // color: aqua !important;
  float: left !important;
  line-height: 50px;
  font-size: 14px;
}

.mui-icon-forward:before {
  line-height: 30px;
}

.back_txt_2 {
  font-size: 14px;
  padding-right: 20px;
  border: none;
}

.back_txt_22 {
  line-height: 50px;

}

.phone {
  margin-top: 10px;
}

.addaddress {
  width: 100%;
}

.addaddress_content {
  padding-top: 50px;
  padding: 10px 5px;
}

.address_content {
  padding-left: 10px;
}

.local {
  padding-left: 20px;
}

.back_top {
  border: 1px solid #e0e0e0;
}

.m-input {
  padding: 10px 20px;
  width: 100%;
  /*padding-left: 20px;*/
  border: 1px solid #e0e0e0;
}

.addaddress_content {
  background-color: #ffffff;
}

.address {
  /*padding-bottom: 30px;*/
  background: #ffffff;
  /*padding-top: 50px;*/
}

.shopcardetain_img_empty {
  width: 30px;
  float: left;
  position: absolute;
}

.add-right {
  border-left: 1px solid #e0e0e0;
  padding: 0 20px;
  margin-top: -35px;
  font-size: 13px;
}

.address_content_inner {
  font-size: 13px;
  margin-top: 10px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.add_left {
  margin-top: 10px;
}
</style>


// WEBPACK FOOTER //
// src/components/threepage/MyAddress.vue
