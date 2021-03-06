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

// import axios from 'axios'
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
// Vue.use(axios)

//vue+vue-resource设置请求头(带上token)后端提供头部Accept:application/x.orange.mini+json
Vue.http.headers.common['Accept'] = 'application/x.orange.mini.v2+json';
if (global_msg.myNetType === 0) {
  Vue.http.interceptors.push((request, next) => {

    //伪代码
    // 两个时间戳相减 除1000 后取整即可
    // let second = parseInt(调接口的时间戳 - 获取token的时间) / 1000);
    let currentTime = Math.floor(new Date().getTime() / 1000);
    if ((localStorage.getItem('expires_in')) && (localStorage.getItem('expires_in')) - currentTime > 0
      && (localStorage.getItem('expires_in')) - currentTime <= 60) {
      //刷新接口
      // alert("过期时间")
      localStorage.setItem('expires_in', 0)
      let promise = new Promise(function (resolve, reject) {
        global_msg.method.refreshToken(resolve, reject);
      });
    }

    if (global_msg.company !== -1)
      request.headers.set('Authorization', window.localStorage.getItem('token_type') + ' ' + window.localStorage.getItem('token'));
    else
      request.headers.set('Authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGxtb2tuMjguMDIwb3JhbmdlLmNvbSIsImlhdCI6MTU5Mjk2NzA0MywiZXhwIjoxNjI0NTAzMDQzLCJuYmYiOjE1OTI5NjcwNDMsImp0aSI6Ilc5VXpDaEpkSHlMWUhRRWsiLCJzdWIiOjE5NTgzOTQ4Mjc0MDc0MDA5NiwicHJ2IjoiYzgzZTZhZTllYTM2OGIxMTVmMjMxMzQyN2Y1ZDVjMGY5ZDEzYzc2MyJ9.qgkvcz4ssscnxyz6FHv0tUoeHyRcnYdHN0A_rMRdHMM');
    // console.log("456")

    /**
     * 服务器给反应了
     */
    next(function (response, next) {
      let status_code = response.body.status_code;
      if (status_code === 200)
        return response
      if (status_code === 460) {//返回状态为460，直接登录
        localStorage.setItem("token", "")
        // 刷新14天内没刷新token，则需要重新登录
        localStorage.removeItem('isFirstEnter');
        //跳回主页
        location.href = store.state.homeHtml;
        // alert(status_code)
        // `${global_msg.method.getCode(this)}`;
        return;
      }
      if (status_code === 401) { //与后台约定登录失效的返回码
        localStorage.setItem("token", "")
        // 刷新14天内没刷新token，则需要重新登录
        localStorage.removeItem('isFirstEnter');
        //判断当第一次进来页面时，token为空是默认不弹框这句话====》alert('token 已过期,即将刷新');
        // if (window.localStorage.getItem('token') != null) {
        //   alert('token 已过期,即将刷新');
        // }
        // localStorage.setItem("isTokenExpire", "true");
        // localStorage.setItem("code", "");
        // //状态码为401的时候，调回主页
        // location.href = store.state.homeHtml;
        //刷新token接口
        //登录页面时，获取时间，倒计时如果超过时间，在超过时间之前调用刷新接口
        //如果过期超过一天，需要重新登录
        let promise = new Promise(function (resolve, reject) {
          console.log("进来刷新token页面")
          global_msg.method.refreshToken(resolve, reject);
        });
        return promise.then(function () {

          return Vue.http(request).then(res => {
            return res
          })
        })
      } else if (status_code === 405) {
        // alert("HTTP状态码405")
      } else if (status_code === 500) {
        `${global_msg.method.getCode(_this)}`;
        // alert("HTTP状态码500")
      }
    })
  //  con
  });
} else {
  // http request 拦截器
  axios.interceptors.request.use(config => {
      //如果存在token
      if (localStorage.getItem('token')) {
        config.headers['Accept'] = 'application/x.orange.mini.v2+json';
        // 在发送请求之前做些什么
        if (global_msg.company !== -1)
          config.headers.Authorization = window.localStorage.getItem('token_type') + ' ' + window.localStorage.getItem('token')  //请求头加上token
        else
          config.headers.Authorization = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGxtb2tuMjguMDIwb3JhbmdlLmNvbSIsImlhdCI6MTU4Njc1ODg4MywiZXhwIjoxNjE4Mjk0ODgzLCJuYmYiOjE1ODY3NTg4ODMsImp0aSI6IkhFdjVRN1RjWGZ1NE1MZFUiLCJzdWIiOjE2OTgxMTMxMjg3MDgyMTg4OCwicHJ2IjoiYzgzZTZhZTllYTM2OGIxMTVmMjMxMzQyN2Y1ZDVjMGY5ZDEzYzc2MyJ9.dIVtz_IPI8o3zS_MvVdXpdAvF8kyz_21PU3qPwfAaoU'
        return config;

      }

      //
      let currentTime = Math.floor(new Date().getTime() / 1000);
      console.log((!localStorage.getItem('expires_in')))
      console.log("currentTime:" + currentTime)
      console.log((localStorage.getItem('expires_in')) - currentTime)
      if ((localStorage.getItem('expires_in')) && (localStorage.getItem('expires_in')) - currentTime > 0
        && (localStorage.getItem('expires_in')) - currentTime <= 60) {
        //刷新接口
        alert("过期时间")
        localStorage.setItem('expires_in', 0)
        let promise = new Promise(function (resolve, reject) {
          global_msg.method.refreshToken(resolve, reject);
        });
      }
      return config;
    }, err => {
      return Promise.reject(err)
    },
  )

// http response 拦截器
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.status_code) {
          case 460:
            localStorage.setItem("token", "")
            localStorage.removeItem('isFirstEnter');
            //跳回主页
            location.href = store.state.homeHtml;
            // alert(status_code)
            // `${global_msg.method.getCode(this)}`;
            break;
          case 401:
            // 401 清除token信息并跳转到登录页面
            let promise = new Promise(function (resolve, reject) {
              //刷新token接口
              global_msg.method.refreshToken(resolve, reject);
            });
            return promise.then(function () {

              return Vue.http(request).then(res => {
                return res
              })
            })
            break;
          case 405:
            // alert("HTTP状态码405")
            break;
          case 500:
          // alert("HTTP状态码500")
        }
      }
      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)
    },
  )

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
    coupon: "",
    reChangeShowData: "",

  },
  getter: {},
  //store中包含组件的共享状态state和改变状态的方法（暂且称作方法）mutations
  mutations: {
    setSelectedShopData(state, param) {
      state.selectedShopData = param;
    },
    setReChangeShowData(state, param) {
      state.reChangeShowData = param;
    },
    setIsFirstEnter(state, param) {
      state.isFirstEnter = param;
    },
    setCoupon(state, param) {
      state.coupon = param;
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
  axios,
  components: {app},
  render: c => c(app),
  router,//路由挂载对象
})


// WEBPACK FOOTER //
// ./src/main.js
