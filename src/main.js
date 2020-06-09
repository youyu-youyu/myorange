// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import './lib/mui/css/icons-extra.css'
//引入loading
import loading from './components/public/loading/loading'
// Vue.http.headers.common['contentType'] = 'application/json;charset=UTF-8';
import app from './App.vue'
import waterfall from 'vue-waterfall2'
import global_msg from "./components/js/global";
import less from 'less'
import myNetUtils from "./components/js/MyNetUtils";

Vue.use(less)
Vue.use(loading)
Vue.config.productionTip = false
Vue.use(waterfall)
//vue+vue-resource设置请求头(带上token)后端提供头部Accept:application/x.orange.mini+json
Vue.http.headers.common['Accept'] = 'application/x.orange.mini.v2+json';
if (global_msg.myNetType === 0) {
  Vue.http.interceptors.push((request, next) => {
    if (global_msg.company !== -1)
      request.headers.set('Authorization', window.localStorage.getItem('token_type') + ' ' + window.localStorage.getItem('token'));
    else
      request.headers.set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGxtb2tuMjguMDIwb3JhbmdlLmNvbSIsImlhdCI6MTU4Njc1ODg4MywiZXhwIjoxNjE4Mjk0ODgzLCJuYmYiOjE1ODY3NTg4ODMsImp0aSI6IkhFdjVRN1RjWGZ1NE1MZFUiLCJzdWIiOjE2OTgxMTMxMjg3MDgyMTg4OCwicHJ2IjoiYzgzZTZhZTllYTM2OGIxMTVmMjMxMzQyN2Y1ZDVjMGY5ZDEzYzc2MyJ9.dIVtz_IPI8o3zS_MvVdXpdAvF8kyz_21PU3qPwfAaoU');
    // console.log("456")
    next(function (response, next) {
      let status_code = response.body.status_code;
      if (status_code === 200)
        return response

      if (status_code === 460) {//返回状态为460，直接登录
        console.log("460" + window.location.href)
        localStorage.setItem("token", "")
        localStorage.removeItem('isFirstEnter');
        window.location.href = "https://plmokn28.020orange.com/mini/index.html?brand=orange"
        // alert(status_code)
        // `${global_msg.method.getCode(this)}`;

        ////

        // 非静默授权，第一次有弹框
        // 如果没有code，则去请求
        // window.location.href = "https://www.baidu.com"


        return;
      }
      // alert(window.localStorage.getItem('token') == null)
      if (status_code === 401) { //与后台约定登录失效的返回码
        //判断当第一次进来页面时，token为空是默认不弹框这句话====》alert('token 已过期,即将刷新');
        // if (window.localStorage.getItem('token') != null) {
        //   alert('token 已过期,即将刷新');
        // }
        // localStorage.setItem("isTokenExpire", "true");
        // localStorage.setItem("code", "");
        // //状态码为401的时候，调回主页
        // location.href = store.state.homeHtml;
        //刷新token接口
        let promise = new Promise(function (resolve, reject) {
          //登录页面时，获取时间，倒计时如果超过时间，在超过时间之前调用刷新接口
          //如果过期超过一天，需要重新登录
          // let currentTime = Date.parse(new Date()) / 1000;
          // let expiresTime = window.localStorage.getItem('expires_in');
          // if (expiresTime - currentTime < 600) {
          // 判断如果expires_in小于3600秒，则刷新token,每次expires_in的值都为86400？
          //怎么获取expires_in,expires_in在登录接口和刷新接口
          console.log("进来刷新token页面")

          // console.log("expires_in:" + expires_in)
          // 刷新14天内没刷新token，则需要重新登录
          Vue.http
            //定义为全局使用global_msg.server_url
            //post网络请求（后端提供url）
            .post(`${global_msg.method.getBaseUrl()}/api/auth/refresh`,
              {}, {emulateJSON: true})
            .then(res => {
              if (res.body.err_code === 0) {
                localStorage.setItem('token_type', res.body.data.token_type);
                localStorage.setItem('token', res.body.data.access_token);
                localStorage.setItem("isTokenExpire", "false");
                console.log("重新请求")
                resolve();
              } else {
                alert("刷新Token失败:" + res.body.message);
                reject("");
              }
            });
        });
        return promise.then(function () {

          return Vue.http(request).then(res => {
            return res
          })
        })
      } else if (status_code === 405) {
        alert("HTTP状态码405")
      } else if (status_code === 500) {
        alert("HTTP状态码500")
      }
    })
  });
} else {
  // 添加请求拦截器
  Vue.axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (global_msg.company !== -1)
      config.headers.common.Authorization = window.localStorage.getItem('token_type') + ' ' + window.localStorage.getItem('token')  //请求头加上token
    else
      config.headers.common.Authorization = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGxtb2tuMjguMDIwb3JhbmdlLmNvbSIsImlhdCI6MTU4Njc1ODg4MywiZXhwIjoxNjE4Mjk0ODgzLCJuYmYiOjE1ODY3NTg4ODMsImp0aSI6IkhFdjVRN1RjWGZ1NE1MZFUiLCJzdWIiOjE2OTgxMTMxMjg3MDgyMTg4OCwicHJ2IjoiYzgzZTZhZTllYTM2OGIxMTVmMjMxMzQyN2Y1ZDVjMGY5ZDEzYzc2MyJ9.dIVtz_IPI8o3zS_MvVdXpdAvF8kyz_21PU3qPwfAaoU'
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  Vue.axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    if (error.response) {
      if (error.response.status === 401) {

      }
    }

    if (status_code === 401) { //与后台约定登录失效的返回码
      // //判断当第一次进来页面时，token为空是默认不弹框这句话====》alert('token 已过期,即将刷新');
      // if (window.localStorage.getItem('token') != null) {
      //   alert('token 已过期,即将刷新');
      // }
      // localStorage.setItem("isTokenExpire", "true");
      // localStorage.setItem("code", "");
      // //状态码为401的时候，调回主页
      // location.href = store.state.homeHtml;
      //刷新token接口
      let promise = new Promise(function (resolve, reject) {
        Vue.http
          //定义为全局使用global_msg.server_url
          //post网络请求（后端提供url）
          .post(`${global_msg.method.getBaseUrl()}/api/auth/refresh`,
            {}, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              localStorage.setItem('token_type', res.body.data.token_type);
              localStorage.setItem('token', res.body.data.access_token);
              localStorage.setItem("isTokenExpire", "false");
              console.log("重新请求")
              resolve();
            } else {
              alert("刷新Token失败:" + res.body.message);
              reject("");
            }
          });

      });
      return promise.then(function () {

        return Vue.http(request).then(res => {
          return res
        })
      })


    } else if (status_code === 405) {
      alert("HTTP状态码405")
    } else if (status_code === 500) {
      alert("HTTP状态码500")
    }
    return Promise.reject(error);
  });

}
//state相当于对外的只读状态,使用store.commit方法通过触发mutations改变state
const store = new Vuex.Store({
  ///state定义全局变量，如果要修改全局变量，结合下面mutations方法
  ///中，只能通过调用mutations中的方法来修改store里的值
  state: {
    type: 1,
    selectedShopData: "",//店铺
    isFirstEnter: 0,
    homeHtml: "",
    userInfoData: "",
    userAccountData: "",
    shopCarList: [],
    brand: "",
  },
  getter: {},
  //store中包含组件的共享状态state和改变状态的方法（暂且称作方法）mutations
  mutations: {
    setSelectedShopData(state, param) {
      state.selectedShopData = param;
    },
    setIsFirstEnter(state, param) {
      state.isFirstEnter = param;
    },
    setHomeHtml(state, param) {
      state.homeHtml = param;
    },
    setUserInfoData(state, param) {
      state.userInfoData = param;
    },
    setUserAccountData(state, param) {
      state.userAccountData = param;
    },
    setShopCarList(state, param) {
      state.shopCarList = param;
    },
    setType(state, param) {
      state.type = param;
    },
    setBrand(state, param) {
      state.brand = param;
    }


  },
});
var vm = new Vue({
  el: '#app',
  store,
  // 子组件
  components: {app},
  render: c => c(app),
  router,//路由挂载对象
})


// WEBPACK FOOTER //
// ./src/main.js
