const orange_url = 'https://plmokn28.020orange.com';
const xiaozhu_url = 'https://plmokn28.020orange.com';
const nanjing_url = 'https://plmokn28.020orange.com';
const local_url = 'api';
// 分离出来，全局使用
const orangeBrandId = '169766137633050624';
const testBrandId = '170843706449072128';
const nanjingBrandId = 'chfj';


const orangeAppId = "wxfc2079e5d7f21d07";
const xiaozhuAppId = "wx828d6d5d15e47ca3";

const city = '上海';
const qrCode = 'qrCode';
const isProcessQrCode = 'isProcess';
let company = -1;//0代表桔子科技的品牌，1代表测试品牌,2代表南京腾狮的

export default {
  brandId: orangeBrandId,   //用户token信息
  city,     //位置
  qrCode, //扫描到的二维码
  isProcessQrCode, //是否处理了二维码
  company: company,
  setCompany(index) {
    this.company = index;
    company = index;
  },
  method: {

    getBrandId: function () {
      if (company === 0) {
        return orangeBrandId;
      } else if (company === 1) {
        return testBrandId;
      } else if (company === 2) {
      } else {
        return orangeBrandId;
      }
    },
    getAppId: function () {
      if (company === 0) {
        return orangeAppId;
      } else if (company === 1) {
        return xiaozhuAppId;
      } else if (company === 2) {
      } else {
        return orangeAppId;
      }
    },
    getBaseUrl: function () {
      if (company === 0) {
        return orange_url;
      } else if (company === 1) {
        return xiaozhu_url;
      } else if (company === 2) {
      } else {
        return local_url;
      }
    },

    //获取用户账户信息
    getUserAccountInfo: function (_this) {
      _this.$http
        //定义为全局使用global_msg.server_url
        //get请求（后端提供url）
        .get(`${this.getBaseUrl()}/api/me`,
          {
            params: {
              "_timestamp": new Date().getTime(), "shopId": _this.$store.state.selectedShopData.shopId,
            }
          }, {emulateJSON: true})
        .then(res => {
          console.log(res.body.data);
          if (res.body.err_code === 0) {
            // alert("姓名:" + res.body.data.userName);
            _this.$store.commit('setUserAccountData', res.body.data);
          } else {
            alert("获取用户信息失败:" + res.body.message);
          }
        })
    },
    //获取用户基本信息
    getUserBasicInfo: function (_this) {
      _this.$http
        //定义为全局使用global_msg.server_url
        //get请求（后端提供url）
        .get(`${this.getBaseUrl()}/api/member/user`,
          {
            params: {
              "_timestamp": new Date().getTime(), "shopId": _this.$store.state.selectedShopData.shopId,
            }
          }, {emulateJSON: true})
        .then(res => {
          console.log(res.body.data);
          if (res.body.err_code === 0) {
            _this.$store.commit('setUserInfoData', res.body.data);
            console.log("userId:" + res.body.data.userId)
          } else
            alert("获取账户信息失败：" + res.body.message);
        })
    },
  },

}



// WEBPACK FOOTER //
// ./src/components/js/global.js
