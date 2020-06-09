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
        window.alert("获取用户信息失败:" + message);
      })
    },
    //获取用户基本信息
    getUserBasicInfo: function (_this) {
      myNetUtils.method.get(`${this.getBaseUrl()}/api/member/user`, {
        "_timestamp": new Date().getTime(), "shopId": _this.$store.state.selectedShopData.shopId,
      }, function (body) {
        _this.$store.commit('setUserInfoData', body.data);
      }, function (message) {
        window.alert("获取账户信息失败：" + message);
      })
    },
    //微信授权
    getCode(_this) {
      // 非静默授权，第一次有弹框
      console.log("进入授权")
      let code = ""
      // localStorage.setItem("code", "")
      // _this.code = "";
      console.log("111")
      let local = window.location.href; // 获取页面url
      console.log("local")
      console.log(local)
      code = this.getUrlCode().code// 截取url中的code
      console.log("_this.code")
      console.log(code)
      //授权//每次进来的时候code都是空的
      if (code === undefined) {
        console.log("_this.code == null ")
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.getAppId()}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect`;


      } else {
        //如果截取url中的code不等于保存的code，才登录
        if (code !== localStorage.getItem("code")) {
          `${this.publicAccountLogin(_this, code)}`;

        } else {
          `${this.getUserAccountInfo(_this)}`;
          `${this.getUserBasicInfo(_this)}`;
        }

      }
      // }
    },
    ///解析微信code
    getUrlCode(_this) {
      // 截取url中的code方法
      let url = location.search;
      let theRequest = new Object();
      if (url.indexOf("?") !== -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    //公众号登录
    publicAccountLogin(_this, code) {
      console.log("publicAccountLogin:")
      console.log(code)
      myNetUtils.method.post(`${this.getBaseUrl()}/api/auth/login`, {
        "code": code, "brand_id": `${this.getBrandId()}`,
        "type": 1
        // 固定值type：1:公众号，2:小程序
      }, function (body) {

        console.log("代理模式请求成功")
        localStorage.setItem('token_type', body.data.token_type);
        localStorage.setItem('token', body.data.access_token);
        localStorage.setItem("isTokenExpire", "false");
        localStorage.setItem("isFirstEnter", "false");
        // localStorage.setItem("expires_in", body.data.expires_in);
        if (localStorage.getItem("shopId") !== "undefined" &&
          localStorage.getItem("shopId") !== "" &&
          localStorage.getItem("shopId") !== null &&
          localStorage.getItem("shopId") !== undefined) {
          // _this.getLastSelectedShop();
          `${this.getLastSelectedShop()}`

        } else {
          console.log("111getLocation")
          // `${this.getLocation(_this)}`;
          // this.getLocation(_this)
          _this.getLocation(_this)
        }


        localStorage.setItem("code", code);
      }, function (message) {
        window.alert("登录失败：" + message);
      })

    },
    //获取定位
    getLocation: function (_this) {
      console.log("222getLocation")
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          if (r.accuracy == null) {
            window.alert("您已拒绝地理位置授权");
            //用户决绝地理位置授权
          } else {
            const myGeo = new BMap.Geocoder();
            myGeo.getLocation(
              new BMap.Point(r.point.lng, r.point.lat),
              data => {
                if (data.addressComponents) {
                  const result = data.addressComponents;
                  const location = {
                    creditLongitude: r.point.lat, // 经度
                    creditLatitude: r.point.lng, // 纬度
                    creditProvince: result.province || "", // 省
                    creditCity: result.city || "", // 市
                    creditArea: result.district || "", // 区
                    creditStreet:
                      (result.street || "") + (result.streetNumber || "") // 街道
                  };
                  _this.location = location;
                  _this.creditLongitude = location.creditLongitude;
                  _this.creditLatitude = location.creditLatitude;
                  _this.creditCity = location.creditCity;
                  _this.log = _this.creditLongitude;
                  _this.lat = _this.creditLatitude;
                  _this.getNearestShop(_this.log, _this.lat)
                }
              }
            );
          }
        }
      });
    },


  },


}


// WEBPACK FOOTER //
// ./src/components/js/global.js
