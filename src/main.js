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

Vue.use(less)
Vue.use(loading)
Vue.config.productionTip = false
Vue.use(waterfall)
//vue+vue-resource设置请求头(带上token)后端提供头部Accept:application/x.orange.mini+json
Vue.http.headers.common['Accept'] = 'application/x.orange.mini.v2+json';
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
    // alert(window.localStorage.getItem('token') == null)
    if (status_code === 401) { //与后台约定登录失效的返回码
      // //判断当第一次进来页面时，token为空是默认不弹框这句话====》alert('token 已过期,即将刷新');
      // if (window.localStorage.getItem('token') != null) {
        alert('token 已过期,即将刷新');
      // }
      // localStorage.setItem("isTokenExpire", "true");
      // localStorage.setItem("code", "");
      // //状态码为401的时候，调回主页
      // location.href = store.state.homeHtml;
      Vue.http
        //定义为全局使用global_msg.server_url
        //post网络请求（后端提供url）
        .post(`${global_msg.method.getBaseUrl()}/api/auth/refresh`,
          {}, {emulateJSON: true})
        .then(res => {
          console.log(res.body.data)
          if (res.body.err_code === 0) {
            localStorage.setItem('token_type', res.body.data.token_type);
            localStorage.setItem('token', res.body.data.access_token);
            localStorage.setItem("isTokenExpire", "false");
            alert("Token刷新成功，重新请求")
            next();
          } else {
            alert("刷新Token失败:" + res.body.message);
          }
        });


    } else if (status_code === 405) {
      alert("HTTP状态码405")
    } else if (status_code === 500) {
      alert("HTTP状态码500")
    }

  })
});
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
