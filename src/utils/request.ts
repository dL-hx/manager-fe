import { message } from 'antd'
import axios, { AxiosError } from 'axios'
import { hideLoading, showLoading } from './loading/index.'
import storage from './storage'
import env from '@/config'

// 创建实例对象
const instance = axios.create({
  // baseURL: '/api',
  // baseURL: import.meta.env.VITE_BASE_API,
  baseURL: env.baseApi,
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试',
  withCredentials: true,
  headers: {
    // icode: ''
  }
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    // const token = localStorage.get('token')
    // const token = storage.get('token')
    // if (token) {
    //   config.headers.Authorization = 'Bearer ' + token
    // }

    // 配置环境变量的两种方式
    // 当MOCK 开关打开时， 使用MOCK地址。 否则使用默认地址
    // 编译时环境
    // if (import.meta.env.VITE_MOCK === 'true') {
    //   config.baseURL = import.meta.env.VITE_MOCK_API
    // }else{
    //   config.baseURL = import.meta.env.VITE_BASE_API
    // }

    // 运行时环境
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data = response.data
    hideLoading()
    if (data.code === 500001) {
      message.error(data.msg)
      localStorage.removeItem('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code != 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    hideLoading()

    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(url: string, params?: object):Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, data?: object):Promise<T>  {
    return instance.post(url, data)
  }
}
