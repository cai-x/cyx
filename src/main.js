import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false

Vue.use(VueLazyload, {
    loading: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F079631e90e8871989842d35305b636f46761d4a5fe5-YizIOH_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628051644&t=630202c57b719046c86d16399a44814b"
})

// import axios from 'axios'
// axios.defaults.baseURL = "https://m.maizuo.com/"
// axios.interceptors.request.use(function(config) {
//     config.headers = {
//         "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"16252959314021678526955521"}',
//         "X-Host": "mall.film-ticket.film.list"
//     }
//     return config;
// }, function(error) {});

// axios.get("gateway?cityId=440300&pageNum=2&pageSize=10&type=1&k=2130159");

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')