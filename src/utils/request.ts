import { message } from 'antd'
import axios, { AxiosError } from 'axios'
import { hideLoading, showLoading } from './loading/index.'
// 创建实例对象
const instance = axios.create({
  baseURL: '/api',
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
    // if (token) {
    //   config.headers.Authorization = 'Bearer ' + token
    // }
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
