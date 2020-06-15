<template>
  <div class="HomeComtainer">
    <div class="home_top">
      <!--      <h4>科技让生活越来越方便</h4>-->
      <!--      <router-link to="/homelocation">-->
      <div class="home_location">
        <div @click="toHomeLocation()">
          <img src="../../assets/home/home_location.png" class="home_left" style="width: 30px;margin-top: 3px">
          <div class="home_right">
            {{getShopName}}
            <span class="mui-icon mui-icon-arrowdown "></span>
          </div>
        </div>
        <div class="home_right1">
          <router-link to="/discount">
            <div class="home_right1_1">优惠券 &nbsp;&nbsp;{{coupons}}张</div>
            <!--              <div class="item_item">6张</div>-->
          </router-link>
        </div>
      </div>
      <!--      </router-link>-->
      <div class="home_top_middle">
        <div class="item">
          <ul class="home_item_ul">
            <li class="mui-table-view-cell">
              <router-link to="/everydaysign">
                <img
                  class="mui-media-object mui-pull-left home__item_img"
                  src="../../assets/home/home_sing.png"/>
                <div class="mui-media-body home_day">
                  每日签到
                  <p class="mui-ellipsis">签到赚积分</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="item" @click="startScan">
          <ul class="home_item_ul">
            <li class="mui-table-view-cell">
              <img src="../../assets/home/scan.png" class="mui-pull-left" style="width: 40px;">
              <!--              <span class="mui-icon-extra mui-icon-extra-sweep mui-media-object mui-pull-left"></span>-->
              <div class="mui-media-body home_day">
                扫一扫
                <p class="mui-ellipsis">机器支付</p>
              </div>
              <!-- </router-link> -->
            </li>
          </ul>
        </div>

        <div class="item">
          <ul class="home_item_ul">
            <li class="mui-table-view-cell">
              <router-link to="/recharge">
                <button class="home_btn">充值</button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="home_top_boder">
        <div class="home_top_boder_inner">
          <div class="item">
            <div class="home_top_inner_1">
              <img id="id_test" class="mui-media-object mui-pull-left home_img" src="../../assets/home/home_coin.png">
              <div class="mui-media-body move" style="margin-top: 5px;text-align: center">
                {{parseInt(userMoney)}}
                <div class='mui-ellipsis home_block'>G币</div>
              </div>
            </div>

          </div>
          <div class="item">
            <div class="home_top_inner_1">
              <img class="mui-media-object mui-pull-left home_img" src="../../assets/home/home_youxibi.png">
              <div class="mui-media-body move" style="margin-top: 5px;text-align: center">
                {{userCoin}}
                <div class='mui-ellipsis home_block'>游戏币</div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="home_top_inner_1">
              <img class="mui-media-object mui-pull-left home_img" src="../../assets/home/home_caipiao.png">
              <div class="mui-media-body move" style="margin-top: 5px;text-align: center">
                {{userLottery}}
                <div class='mui-ellipsis home_block'>彩票</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="cover"></div>
    <!--       售币机 //-->
    <div class="selectPay" id="selectPay_id">
      <button @click="scanGetCoinClick(10)">10</button>
      <button @click="scanGetCoinClick(20)">20</button>
      <button @click="scanGetCoinClick(30)">30</button>
      <button @click="scanGetCoinClick(40)">40</button>
      <button @click="scanGetCoinClick(50)">50</button>
      <button @click="scanGetCoinClick(60)">60</button>
      <div class="input_class">
        <input type="text" placeholder="请输入币数" id="value" class="qr_search">
        <button class="btn-search" @click="scanGetCoinClick('')">确定</button>
      </div>
    </div>
    <!--    机器-->
    <div class="robot" id="robot_id">
      <div class="robot-inner">
        <div class="like">
          <div class="like-minus mui-icon mui-icon-minus-filled mui-btn-numbox-minus"></div>
          <div class="like-txt">2</div>
          <div class="like-total mui-icon mui-icon-plus-filled mui-btn-numbox-plus"></div>
        </div>
        <button class="btn1-search">投币</button>
      </div>
    </div>
    <div class="home_middle">
      <div class="home_middle_inner" style="width: 95%">
        <!--        <div class="home_middle_text">广而告之</div>-->
        <mt-swipe :auto="4000">
          <mt-swipe-item><img src="../../assets/home/home_pic1.png"/>
          </mt-swipe-item>
          <mt-swipe-item><img src="../../assets/home/yuantiao.jpg"/>
          </mt-swipe-item>
          <mt-swipe-item><img src="../../assets/home/shuijiao.jpg"/>
          </mt-swipe-item>
          <mt-swipe-item><img src="../../assets/home/yuantiao.jpg"/>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="home_middle_inner">
        <div class="home_middle_text">每日惊喜</div>
        <div class="home_middle_img">
          <router-link to="/homesurprise">
            <img src="../../assets/home/home_pic2.png" class="home_middle_img"/>
          </router-link>
        </div>
      </div>
    </div>
    <!--    <button @click="goMini()">跳转小程序</button>-->
    <!--    <input id="upload_file" type="file" class="file-input" accept="image/png,image/jpeg,image/jpg"/>-->
  </div>
</template>
<script>
  // import '../../lib/mui/css/mui.min.css'
  import BMap from "BMap";
  import global_msg from "../js/global.js";
  import myNetUtils from "../js/MyNetUtils.js";
  import "../css/home.less";
  import {Toast} from "mint-ui";
  import wx from 'weixin-jsapi'

  export default {
    data() {
      return {
        log: "",
        lat: "",
        shopName: "",
        slidePhoto: [],
        areaIdPath: "",
        selectedShopData: '',
        //定义支付状态为-1
        payStatus: -1,
        type: 1,
        miniCode: '',
        userMoney: "",
        userCoin: "",//游戏币
        userLottery: "",
        coupons: "",
        deviceCode: "",
      };
    },
    created: function () {
      console.log("优惠券id")
      console.log(this.$store.state.setCoupon)
      // if (localStorage.getItem("isFirstEnter11") === null
      //   || localStorage.getItem("isFirstEnter11").indexOf("true") !== -1) {
      //   alert("模拟了")
      //   localStorage.setItem("token", "111");
      //   localStorage.setItem("isFirstEnter11", "false")
      // }


    },
    mounted() {
      //返回主页面
      this.parseUrlBrand();
      //如果是公众号
      if (this.type === 1) {
        if (global_msg.company !== -1) {
          //如果第一次进来如果token为空，或者token未过期时(indexOf的检查字符串中有没有指定的子字符串,当不包含的时.返回-1.)
          if (localStorage.getItem("isFirstEnter") === null) {
            //第一次进来时走授权
            `${global_msg.method.getCode(this)}`;
            // this.getCode();
            //当前时间戳加上过期时间
            // 如果下次进来的时间戳>
            //时间戳： 1592186784743
          } else {

            // 不是第一次进来直接获取上次店铺
            this.getLastSelectedShop();

          }
        } else {
          this.getLastSelectedShop();
        }
      } else {
        this.miniLogin();
      }
      /**
       * 处理购买套餐结果回调开始
       */
      if (window.location.href.indexOf("type") > 0) {
        this.type = 2;
        this.$store.commit('setType', this.type);
        this.miniCode = this.getUrlKey('code');
      }
      let payStatus = localStorage.getItem("payStatus");
      if (payStatus === "1") {
        // 如果支付状态为1
        localStorage.setItem("payStatusResult", "-1");//?
        localStorage.setItem("payStatus", "0");
        //把payStatus设置为0
        //在套餐界面点支付的时候把状态设置为1，主界面拿到状态为1的时候就说明
        //需要我们在主页面来处理，如果为0的话，说明不处理
        let url = window.location.href;
        if (url.indexOf("err_code") >= 0) {
          if (url.indexOf("err_code=0") >= 0) {
            this.payStatus = 0;
            localStorage.setItem("payStatusResult", "0");
          } else if (url.indexOf("err_code=1") >= 0
          ) {
            //跳转到充值页面
            this.payStatus = 1;
            localStorage.setItem("payStatusResult", "1");
          }
        }
      }
      /**
       * 处理购买套餐结果回调结束
       */


      /**
       * 处理扫码开始
       */
      // alert("扫描到的东西1111:" + qrCode);
      if (this.getUrlQrCode("qrresult") !== ""
        && this.getUrlQrCode("qrresult") !== undefined
        && this.getUrlQrCode("qrresult") !== "undefined") {
        let isProcessQrCode = localStorage.getItem(global_msg.isProcessQrCode);
        //扫码完成后把彩票存进


        if (isProcessQrCode === null || isProcessQrCode === "false") {
          //如果未处理
          localStorage.setItem(global_msg.isProcessQrCode, "true"); // 设置为已处理

          localStorage.setItem(global_msg.qrCode, this.getUrlQrCode("qrresult"));//设置扫到的东西为本地保存
          // 然后刷新页面，重新走mounted，自动获取上次定位，在定位中处理扫码内容
        }
        // location.href = global_msg.orangeHomeHtml;
      }
      /**
       * 处理扫码结束
       */

    },

    methods: {
      //跳转选店页面
      toHomeLocation() {
        this.$router.push({path: '/homelocation'})

      },
      //跳转小程序主页面
      goMini() {
        window.wx.miniProgram.navigateTo({
          url: '/pages/payMent/payMent',
          success: function () {
            console.log('success')
            alert('success')
          },
          fail: function () {
            console.log('fail');
            alert('fail')
          },
          complete: function () {
            console.log('complete');
            alert("complete")
          }
        });
        // console.log(url)

      },
      configJSSDK(miniInfo) {
        // 通过config接口注入权限验证配置 【必需】
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: miniInfo.appId, // 必填，公众号的唯一标识
          timestamp: miniInfo.timestamp, // 必填，生成签名的时间戳
          nonceStr: miniInfo.nonceStr, // 必填，生成签名的随机串
          signature: miniInfo.signature,// 必填，签名
          jsApiList: ["chooseImage", "scanQRCode", "uploadImage"],// 必填，需要使用的JS接口列表 这里填写需要用到的微信api openlocation为使用微信内置地图查看位置接口
        });
        window.wx.error(function (res) {
          // alert(res)
          alert("配置jssdk error")
        });
        window.wx.ready(function () {
          // alert("配置jssdk ready")
        });
      },
      //获取微信jssdk配置
      getJSSDKInfo() {
        let _this = this
        myNetUtils.method.get(`${global_msg.method.getBaseUrl()}/api/auth/base`, {
          "brand_id": `${global_msg.method.getBrandId()}`,
          "url": window.location.href
        }, function (body) {
          _this.configJSSDK(body.data)
        }, function (message) {
          alert("获取微信jssdk配置失败:" + message)
        })
      },

      //确定
      scanGetCoinClick(coinNum) {
        if (coinNum === "") {
          this.scanCodeGetCoin(document.getElementById("value").value);

        } else {
          this.scanCodeGetCoin(coinNum)
        }
        // let value =document.getElementById("value").value;
      },

      //返回的主页面
      parseUrlBrand() {
        let _this = this
        if (window.location.href.indexOf("brand") !== -1) {
          let brand = this.getUrlParam("brand");
          if (brand === undefined) {
            return;
          }
          brand = brand.split("#")[0];
          // 跟if(brand==="test")一个意思
          switch (brand) {
            case "test":
              global_msg.setCompany(1);
              _this.$store.commit("setHomeHtml", global_msg.method.getBaseUrl() + "/mini/index.html?brand=test");
              break;
            case "orange":
              global_msg.setCompany(0);
              _this.$store.commit("setHomeHtml", global_msg.method.getBaseUrl() + "/mini/index.html?brand=orange");
              console.log("测试用例master")
              break;
            case "galaxy":
              global_msg.setCompany(2);
              _this.$store.commit("setHomeHtml", global_msg.method.getBaseUrl() + "/mini/index.html?brand=galaxy");
              break;
            case "production":
              global_msg.setCompany(3);
              _this.$store.commit("setHomeHtml", global_msg.method.getBaseUrl() + "/mini/index.html?brand=production");
              break;
            default:
              global_msg.setCompany(-1);
              break;
          }
        } else
          _this.$store.commit("setHomeHtml", global_msg.method.getBaseUrl() + "/mini/index.html");

      },
      //小程序登录
      miniLogin: function () {
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/auth/login`, {
          "code": this.miniCode, "brand_id": `${global_msg.method.getBrandId()}`, "type": 2
        }, function (body) {
          localStorage.setItem('token_type', body.data.token_type);
          localStorage.setItem('token', body.data.access_token);
          localStorage.setItem("isTokenExpire", "false");
          if (localStorage.getItem("shopId") !== "undefined" &&
            localStorage.getItem("shopId") !== "" &&
            localStorage.getItem("shopId") !== null) {
            this.getLastSelectedShop();
          } else
            this.getLocation();

          localStorage.setItem("code", this.getUrlCode().code);
        }, function (message) {
          alert("小程序登录失败：" + message);
        })
      },
      getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      ///获取经纬度
      getLocation() {
        let _this = this
        console.log("12getLocation")
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

      ///扫码
      startScan() {

        // let local = window.location.href;
        // localStorage.setItem(global_msg.isProcessQrCode, "false");
        // window.location.href = `http://sao315.com/w/api/saoyisao?redirect_uri=${local}`;
        let _this = this;
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            if (result.indexOf("qrStorageTicket") !== -1) {
              result = JSON.parse(result)
            }
            /**
             * 扫到存彩票的二维码
             */
            //重定向回主页的时候，判断扫到的码是否存在 qrStorageTicket，如果存在，进if
            if (result.cmd === "qrStorageTicket") {
              _this.storageLottery(result);
            }

            /**
             * 扫到取币二维码
             */
            //如果存在以AE开头的测试二维码
            if (result.startsWith("AE") && result.length === 12) {
              _this.deviceCode = result.substring(4, 12)

              // 00：机器，01：售币机
              if (result.substring(2, 4) === "01") {
                document.getElementById("cover").setAttribute("style", "display:block;")
                document.getElementById("selectPay_id").setAttribute("style", "display:block;")
                //
              } else if (result.substring(2, 4) === "00") {
                document.getElementById("cover").setAttribute("style", "display:block;")
                document.getElementById("robot_id").setAttribute("style", "display:block;")
              }
            }

            /**
             * 实体卡扫码绑定
             */
            //扫码完成
            //如果卡号的长度为八位数，跳出请输入密码，请确认密码
            //点击确认密码之后，调用服务器
          }
        });

      },

      ///该方法的作用是从页面url里面处理回调过来的二维码信息
      getUrlParam(name) {
        let reg = new RegExp("\\b" + name + "=([^&]*)");
        let r = location.href.match(reg);
        if (r != null) return decodeURIComponent(r[1]);
      },
      //截取扫码
      getUrlQrCode(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] === variable) {
            return pair[1];
          } else {
          }
        }
        return "";
      },

      //扫码存彩票
      storageLottery(tickeyJSON) {
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/storageticket`, {
          "deviceId": tickeyJSON.deviceId, "ticketNumber": tickeyJSON.ticketNumber,
          "password": tickeyJSON.password, "orderNo": tickeyJSON.orderNo
        }, function (body) {
          alert("存彩票成功！")
        }, function (message) {
          alert("存彩票失败！" + message)
        })
      },
      //扫码取币
      scanCodeGetCoin(coinsNum) {
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/qrfetchcoin`, {
          "activation_code": this.deviceCode, "coin": coinsNum,
        }, function (body) {
          document.getElementById("cover").setAttribute("style", "display:none;")
          document.getElementById("selectPay_id").setAttribute("style", "display:none;")

        }, function (message) {
          alert("扫码取币失败:" + message)
        })
      },
      //获取最近的店
      getNearestShop(log, lat) {
        console.log("获取店铺")
        let _this = this;
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/shop/select`, {
          "shopLat": lat,
          "shopLog": log,
          "brand_id": `${global_msg.method.getBrandId()}`,
          "shopId": this.$store.state.selectedShopData.shopId
        }, function (body) {
          _this.$store.commit('setSelectedShopData', body.data);
          let shopNameData = body.data;
          _this.shopName = shopNameData.shopName;
          _this.slidePhoto = shopNameData.slidePhoto;
          _this.areaIdPath = shopNameData.areaIdPath;

          `${global_msg.method.getUserAccountInfo(_this)}`;
          `${global_msg.method.getUserBasicInfo(_this)}`
        }, function (message) {
          alert("请求最近店铺失败:" + message);
        })

      },

      //由于刷新页面导致上次选择的店铺不存在，这里通过获取店铺接口重新拿到上次选择的店铺
      //获取店铺所需要的的三个参数在选择店铺页面选中的时候要保存在localStorage里

      getLastSelectedShop() {
        console.log("进来getLastSelectedShop")
        let _this = this
        myNetUtils.method.post(`${global_msg.method.getBaseUrl()}/api/shop/select`, {
          "shopLat": localStorage.getItem("shopLat"), "shopId": localStorage.getItem("shopId"),
          "shopLog": localStorage.getItem("shopLog"),
        }, function (body) {
          _this.$store.commit('setSelectedShopData', body.data);
          let shopNameData = body.data;
          _this.shopName = shopNameData.shopName;
          _this.slidePhoto = shopNameData.slidePhoto;
          `${global_msg.method.getUserAccountInfo(_this)}`;
          `${global_msg.method.getUserBasicInfo(_this)}`;
          let result = localStorage.getItem("payStatusResult")
          if (result === "1" || result === "0")
            _this.$router.push({path: '/recharge', query: {payStatus: localStorage.getItem("payStatusResult")}})

          _this.getJSSDKInfo()
        }, function (message) {
          window.alert("获取店铺失败:" + message)
        })
      },


    },
    //computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义
    // 然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
    computed: {
      getShopName: function () {
        let _this = this
        return _this.$store.state.selectedShopData.shopName
      },
    },
    watch: {
      "$store.state.userAccountData"(t, e) {
        let _this = this
        console.log("个人数据发生变化");
        this.userMoney = _this.$store.state.userAccountData.userMoney;
        if (this.userMoney < 0) {
          this.userMoney = 0
        }
        this.userCoin = _this.$store.state.userAccountData.userCoin;
        if (this.userCoin < 0) {
          this.userCoin = 0
        }
        this.userLottery = _this.$store.state.userAccountData.userLottery;
        if (this.userLottery < 0) {
          this.userLottery = 0
        }
        this.coupons = _this.$store.state.userAccountData.coupons;
      }
    },

  };
</script>


<!--// WEBPACK FOOTER //-->
<!--// src/components/tabar/HomeContainer.vue-->
