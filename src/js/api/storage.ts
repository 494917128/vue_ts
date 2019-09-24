/******************************
 * 设置缓存
******************************/
import { Config } from '@/js/Config'
// 设置缓存数据
export const setStorage: api.storage['setStorage'] = (name, val) => {
  if (val) {
    const key = escape(Config.STORAGE_HEAD + name),
      v = escape(val)
    window.localStorage.setItem(key, v);
  }
}
// 获取缓存数据
export const getStorage: api.storage['getStorage'] = (name) => {
  const key = escape(Config.STORAGE_HEAD + name)
  return window.localStorage.getItem(key)
}
// 删除缓存数据
export const removeStorage: api.storage['removeStorage'] = (name) => {
  const key = escape(Config.STORAGE_HEAD + name)
  window.localStorage.removeItem(key)
}
