/**
 * 工具函数封装
 * MDN: https://developer.mozilla.org/zh-CN/
 */
import moment from 'moment';
/**
 * 格式化金额
 * 转换为金额千分位
 * formatMoney('123456789.55666') => ¥123,456,789.56
 * @param num
 * @returns
 */
export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString())

  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

/**
 * 格式化数字
 * 转换为金额千分位
 *
 * 通过正则处理数字千分位格式化
 * formatMoney('123456789.55666') => ¥123,456,789.56
 * @param num
 * @returns
 */
export const formatNum = (num?: number | string) => {
  if (!num) return 0
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 格式化日期
// toLocalDate(new Date())
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString().replaceAll('/', '-')
  if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString().replaceAll('/', '-')
  return curDate.toLocaleString().replaceAll('/', '-')
}

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) curDate = date
  else if (date) curDate = new Date(date)

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in O) {
    const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
  }
  return fmt
}
// @ts-ignore
Date.prototype.Format = function (timestamp, fmt) {
  const date = new Date(timestamp - 28800000)
  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}

/**
 * Object Serialize: 对象序列化方法
 */

export const objSerialize = params => {
  params = { ...params } // wd=111&cb=222

  const arrs: any[] = [] // 数组序列化
  for (const key in params) {
    if (params[key]) {
      arrs.push(`${key}=${params[key]}`)
    }
  }
  return `?${arrs.join('&')}`
}

export const getTime = () => {
  const time = moment(new Date())
    .add('year', 0)
    .format('YYYY-MM-DD')
    .split('-')
    .map(item => parseInt(item, 10))
  return {
    year: time[0],
    month: time[1] - 1,
    day: time[2]
  }
}

/**
 * 获取当前日期的时间戳
 */
export const getTimestamp = () => {
  const timestamp = Date.parse((new Date().toString()))
  return timestamp
}
/**
 * moment 转 日期字符串
 * @param text
 * @param format
 * @returns {string} 日期字符串
 */
export const formatTime = (text, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(text).format(format)
}

/**
 * 时间戳转换成指定格式日期
 * eg.dateFormat(11111111111111, 'Y年m月d日 H时i分')
 * → "2322年02月06日 03时45分"
 */
export const dateFormat = (timestamp, fmt = 'yyyy-MM-dd HH:mm:ss') => {
  if (!timestamp) {
    return
  }
  // @ts-ignore
  return new Date().Format(timestamp, fmt)
}
