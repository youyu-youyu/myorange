import myNetUtils from "../js/MyNetUtils.js";

const orange_url = 'https://plmokn28.020orange.com';
const xiaozhu_url = 'https://plmokn28.020orange.com';
const production_url = 'https://saas.orangecrt.com';//正式环境域名
const galaxy_url = 'https://plmokn28.020orange.com';
const local_url = 'api';
// 分离出来，全局使用
const orangeBrandId = '169766137633050624';
const productionBrandId = '76702093133615104';

const testBrandId = '170843706449072128';
const galaxyBrandId = '173825699113734144';


const productionAppId = "wxfc2079e5d7f21d07";
const orangeAppId = "wxfc2079e5d7f21d07";
const xiaozhuAppId = "wx828d6d5d15e47ca3";
const galaxyAppId = "wx03291eeea47291fc";

const city = '上海';
const qrCode = 'qrCode';
const isProcessQrCode = 'isProcess';
let company = -1;//0代表桔子科技的品牌，1代表测试品牌,2代表银河的

export default {
  brandId: orangeBrandId,   //用户token信息
  city,     //位置
  qrCode, //扫描到的二维码
  isProcessQrCode, //是否处理了二维码
  company: company,
  myNetType: 0,
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
        return galaxyBrandId
      } else if (company === 3) {
        return productionBrandId;
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
        return galaxyAppId
      } else if (company === 3) {
        return productionAppId
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
        return galaxy_url;
      } else if (company === 3) {
        return production_url;
      } else {
        return local_url;
      }
    },

    //获取用户账户信息
    getUserAccountInfo: function (_this) {
      myNetUtils.method.get(`${this.getBaseUrl()}/api/me`, {
        "_timestamp": new Date().getTime(), "shopId": _this.$store.state.selectedShopData.shopId,
      }, function (body) {
        _this.$store.commit('setUserAccountData', body.data);
      }, function (message) {
        alert("获取用户信息失败:" + message);
      })
    },
    //获取用户基本信息
    getUserBasicInfo: function (_this) {
      myNetUtils.method.get(`${this.getBaseUrl()}/api/member/user`, {
        "_timestamp": new Date().getTime(), "shopId": _this.$store.state.selectedShopData.shopId,
      }, function (body) {
        _this.$store.commit('setUserInfoData', body.data);
      }, function (message) {
        alert("获取账户信息失败：" + message);
      })
    },

  },


}


// WEBPACK FOOTER //
// ./src/components/js/global.js
