<template>
  <div class="addaddress">
    <div class="back_top_all">
      <div class="back_top_inner">
        <div class="back_top_inner_txt" @click="back()">
          <button class="mui-icon mui-icon-back back_txt"></button>
          <div class="mui-media-left back_txt_1">{{titleName}}</div>
        </div>
        <span class="mui-pull-right back_txt_2 back_txt_22" @click="saveValue()">保存</span>
      </div>
    </div>
    <div class="addaddress_content">
      <input placeholder="收货人" type="text" class="m-input" ref="input1">
      <input placeholder="手机号码" type="tel" class="m-input  phone" ref="input2">
      <div class="back_top addaddress-location" @click="selectLocation()">
        <div class="back_top_inner">
          <div class="back_top_inner_txt">
            <div class="mui-media-left back_txt_1 local">所在地区:{{proName}}&nbsp;{{cityName}}&nbsp;{{disName}}</div>
          </div>
          <button class="mui-pull-right back_txt_2 mui-icon mui-icon-forward"></button>
        </div>
      </div>
      <div class="mui-input-row" style="margin: 10px 5px;">
        <textarea id="textarea" rows="5" placeholder="详细地址,如:XX街道,XX小区,XX单元X号"
                  ref="input3">{{fullAddress}}</textarea>
      </div>
    </div>
    <div id="Prover_1" class="mui-popover mui-popover-action
    mui-popover-bottom  recharge_bottom" :class="{'mui-active':showBox===0}">
      <div class="recharge_middle">
        <div class="backBar font addBackBar">
          <div class="back_top">
            <div class="back_top_inner selectCity">
              <div class="back_top_inner_txt">
                <button class="mui-icon mui-icon-closeempty back_txt" @click="addAddressBack()"></button>
              </div>
              <span class="back_center">选择城市</span>
            </div>
          </div>
        </div>
        <div class="homelocation">
          <ul class="example">
            <li v-for="(item,index) in leftList" @click="clickLeftEvent(index)">
              {{item.name}}
            </li>
          </ul>
          <ul class="example">
            <li v-for="(item,index) in centerShowList" @click="clickCenterEvent(index)">
              {{item.name}}
            </li>
          </ul>
          <ul class="example">
            <li v-for="(item,index) in rightShowList" @click="clickRightEvent(index)">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'mint-ui'
  import global_msg from "../js/global.js";

  export default {
    name: "Order",
    data() {
      return {
        // 定义input结果
        showBox: 1,//1隐藏，0显示
        leftList: [],
        centerShowList: [],
        rightShowList: [],
        leftCurrentIndex: 0,
        centerCurrentIndex: 0,
        rightCurrentIndex: 0,
        proId: "",
        cityId: "",
        disId: "",
        proName: "",
        cityName: "",
        disName: "",
        updateAddress: "",
        isUpdate: false,
        fullName: "",
        fullAddress: "",
        titleName: "添加收货地址"
      }
    },
    mounted() {
      this.updateAddress = this.$route.query.updateAddress;
      this.$refs.input1.value = this.updateAddress.fullname;
      console.log(this.$refs.input1.value)
      this.$refs.input2.value = this.updateAddress.mobile;
      this.proName = this.updateAddress.provname;
      this.cityName = this.updateAddress.cityname;
      this.disName = this.updateAddress.disname;
      this.$refs.input3.value = this.updateAddress.address;
      if (this.$refs.input3.value !== '') {
        this.isUpdate = true;
        this.titleName = "修改收货地址";
      }
    },
    methods: {
      //修改收货地址
      editReceivingAddress() {
        this.$http.post(`${global_msg.method.getBaseUrl()}/api/mall/saveaddr`, {
          "fullname": this.$refs.input1.value,
          "mobile": this.updateAddress.mobile,
          "provid": this.proId === "" ? this.updateAddress.provid : this.proId,
          "cityid": this.cityId === "" ? this.updateAddress.cityid : this.cityId,
          "disid": this.disId === "" ? this.updateAddress.disid : this.disId,
          "address": this.$refs.input3.value,
          "brand_id": `${global_msg.method.getBrandId()}`,
          "def": "2",
          "addrid": this.updateAddress.id
          // brand_id是从服务器拿，不能错
        }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              this.$router.go(-1); //返回上一层
            } else {
              Toast("修改收货地址失败：" + res.body.message)
            }
          })
      },
      // 返回
      back() {
        // this.$router.go(-1); //返回上一层
        history.back(-1);
      },
      // 保存
      saveValue() {
        if (this.$refs.input1.value === '' || this.$refs.input2.value === '' || this.$refs.input3.value === '') {
          Toast("")
        }
        this.fullname = this.$refs.input1.value;
        this.mobile = this.$refs.input2.value;
        this.fullAddress = this.$refs.input3.value;
        if (this.isUpdate) {
          this.editReceivingAddress();
        } else {
          this.addReceivingAddress();
        }


      },
      //添加收货地址接口
      addReceivingAddress() {
        this.$http.post(`${global_msg.method.getBaseUrl()}/api/mall/addrto`, {
          "fullname": this.$refs.input1.value, "mobile": this.mobile, "provid": this.proId,
          "cityid": this.cityId, "disid": this.disId, "address": this.$refs.input3.value,
          "brand_id": `${global_msg.method.getBrandId()}`, "def": "2"
          // brand_id是从服务器拿，不能错
        }, {emulateJSON: true})
          .then(res => {

            console.log(res.body.message);
            if (res.body.err_code === 0) {
              this.$router.go(-1);
            } else {
              Toast("添加收货地址失败：" + res.body.message)

            }
          })
      },
      //选地区
      selectLocation() {
        this.getAddressCity();
        this.showBox = 0;
      },
      //取消
      addAddressBack() {
        this.showBox = 1;
      },
      //点击省
      clickLeftEvent(index) {
        this.leftCurrentIndex = index;
        this.centerShowList = [];
        //循环点击的省里面的所有市
        for (let data of this.leftList[index].children) {
          this.centerShowList = this.centerShowList.concat(data);
        }


        this.rightShowList = [];
        for (let child of this.centerShowList[0].children) {
          this.rightShowList = this.rightShowList.concat(child);
        }
      },

      // 点击市
      clickCenterEvent(index) {
        this.centerCurrentIndex = index;
        this.rightShowList = [];
        for (let data of this.centerShowList[index].children) {
          this.rightShowList = this.rightShowList.concat(data);
        }
      },
      //点击区
      //省市区显示在所在地区中
      clickRightEvent(index) {
        this.rightCurrentIndex = index;
        this.proId = this.leftList[this.leftCurrentIndex].id;
        this.cityId = this.centerShowList[this.centerCurrentIndex].id;
        this.disId = this.rightShowList[this.rightCurrentIndex].id;
        this.proName = this.leftList[this.leftCurrentIndex].name;
        this.cityName = this.centerShowList[this.centerCurrentIndex].name;
        this.disName = this.rightShowList[this.rightCurrentIndex].name;
        this.showBox = 1;
      },
      //获取城市接口
      getAddressCity() {
        this.$http.get(`${global_msg.method.getBaseUrl()}/api/mall/getarea`,
          {
            params: {}
          }, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {

              this.leftList = [];
              this.leftList = res.body.data;

              this.centerShowList = [];
              this.centerShowList = this.centerShowList.concat(this.leftList[0].children);

              this.rightShowList = [];
              this.rightShowList = this.centerShowList.concat(this.centerShowList[0].children);

              console.log(res.body.data);
            } else {
              alert("获取城市定位失败：" + res.body.message);
            }

          })
      },
    }
  }
</script>

<style lang="less" scoped>
  .addBackBar {
    position: fixed;
    width: 100%;
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

  .recharge_middle {
    height: 400px;
    background: #dad9d9;
    overflow-y: auto;
  }

  .back_center {
    line-height: 50px;
  }

  .selectCity {
    background: #0062cc;
  }

  .homelocation {
    width: 100%;
    display: flex;
    margin-top: 50px;

    .example {
      flex: 1;
      margin-left: -40px;

      li {
        text-align: center;
        list-style: none;
        padding-top: 20px;
      }
    }
  }
</style>


// WEBPACK FOOTER //
// src/components/fourpage/AddAddress.vue
