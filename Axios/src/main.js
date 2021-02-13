import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// axios({
//   url:'http://123.207.32.32:8000/home/multidata'
// }).then(res=>{
//   console.log(res)
// })
//
// axios({
//   url:'http://123.207.32.32:8000/home/data?type=sell&page=3'
// }).then(res=>{
//   console.log(res)
// })
//
// //发送并发请求
// axios.all([axios({
//   url:'http://123.207.32.32:8000/home/multidata'
// }),axios({
//   url:'http://123.207.32.32:8000/home/data',
//   params:{
//     type:'sell',
//     page:1
//   }
// })])
//   .then(results=>{
//     console.log(results)
//   })

// //创建对应的axios实例
// const instance1 = axios.create({
//   baseURL:'http://123.207.32.32:8000',
//   timeout:5000
// })
//
// instance1({
//   url:'/home/multidata'
// }).then(res=>{
//   console.log(res)
// })
//
// instance1({
//   url:'/home/data',
//   params:{
//     type:'pop',
//     page:1
//   }
// }).then(res=>{
//   console.log(res)
// })
import {request} from "./network/request";

request({
  url:'/home/data'
}).then(res=>{
  console.log(res)
})

