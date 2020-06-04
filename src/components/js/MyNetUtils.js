import global_msg from "./components/js/global";
import Vue from "vue";

export default {
  method: {
    post: function (url, data, successCallback) {
      if (global_msg.myNetType === 0) {
        // vue-resource请求框架
        Vue.http
          //定义为全局使用global_msg.server_url
          //post网络请求（后端提供url）
          .post(url,
            data, {emulateJSON: true})
          .then(res => {
            successCallback(res)
          });
      }else {
        // axios网络请求框架

      }
    },

  }
}
