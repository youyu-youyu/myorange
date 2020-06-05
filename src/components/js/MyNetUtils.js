import global_msg from "./global";
import Vue from "vue";

export default {
  method: {
    post: function (url, params, successCallback, failedCallback) {
      if (global_msg.myNetType === 0) {
        // vue-resource请求框架
        Vue.http
          //定义为全局使用global_msg.server_url
          //post网络请求（后端提供url）
          .post(url,
            params, {emulateJSON: true})
          .then(res => {
            if (res.body.err_code === 0) {
              successCallback(res.body)
            } else {
              failedCallback(res.body.message)
            }
          });
      } else {
        // axios网络请求框架
        Vue.axios.post(url,
          params, {emulateJSON: true})
          .then(res => {
            successCallback(res)
          });
      }
    },
    get: function (url, params, successCallback) {
      if (global_msg.myNetType === 0) {
        // vue-resource请求框架
        Vue.http
          //定义为全局使用global_msg.server_url
          //get网络请求（后端提供url）
          .get(url, {
            params:
            params
          }, {emulateJSON: true})
          .then(res => {
            successCallback(res)
          });
      } else {
        // axios网络请求框架
        Vue.axios.get(url,
          params, {emulateJSON: true})
          .then(res => {
            successCallback(res)
          });
      }
    }

  }
}
