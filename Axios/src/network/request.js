import axios from 'axios'

export function request(config) {
  //创建实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timout: 5000
  })

  //axios拦截器
  instance.interceptors.request.use(config=>{
    console.log(config)
    //比如config中的一些信息不符合服务器的要求
    //比如每次发送网络请求时，希望有动画
    //某些网络请求必须携带一些特殊的信息，比如登录（token）
    return config
  },err=>{
    console.log(err)
  })

  instance.interceptors.response.use(res=>{
    console.log(res)
  },err=>{
    console.log(err)
  })
  //发送真正的网络请求
  return instance(config)
}
