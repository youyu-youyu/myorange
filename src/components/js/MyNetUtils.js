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
        axios.post(url,
          params)
          .then(res => {
            console.log(res.data)
            if (res.data.err_code === 0) {
              successCallback(res.data)
            } else {
              failedCallback(res.data.message)
            }
          });
        // .then(function (response) {
        //   if (response.body.err_code === 0) {
        //     successCallback(response.body)
        //   }
        // })
        // .catch(function (error) {
        //   failedCallback(error.body.message)
        // });

      }
    },
    get: function (url, params, successCallback, failedCallback) {
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
            if (res.body.err_code === 0) {
              successCallback(res.body)
            } else {
              failedCallback(res.body.message)
            }
          });
      } else {
        // axios网络请求框架
        axios.get(url,
          {
            params:
            params
          }, {emulateJSON: true})
          .then(res => {
            if (res.data.err_code === 0) {
              successCallback(res.data)
            } else {
              failedCallback(res.data.message)
            }
          });
      }
    }

  }
}
