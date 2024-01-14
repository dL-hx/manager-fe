/**
 * localStorage模块封装
 * 引用:
 * import storage from '@/utils/storage';
 * storage.set()
 */
export default {
  /**
   * storage存储
   * @param key {string} 参数名称
   * @param value {any} 写入值
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * storage读取
   * @param key {string} 参数名称
   * @return storage值
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) {
      return ''
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  /**
   * 删除localStorage值
   * @param key {string} 参数名称
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * 清空localStorage值
   */
  clear() {
    localStorage.clear()
  }
}

