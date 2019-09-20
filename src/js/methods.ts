import { Config } from '@/js/config'
/***************
设置缓存
***************/
// 设置缓存数据
const _setItem = (name: string, val: string): void => {
  if (val) {
    var key = escape(Config.STORAGE_HEAD + name),
      val = escape(val)
    window.localStorage.setItem(key, val);
  }
}
// 获取缓存数据
const _getItem = (name: string): string | null => {
  var key = escape(Config.STORAGE_HEAD + name)
  return window.localStorage.getItem(key)
}
// 删除缓存数据
const _removeItem = (name: string): void => {
  var key = escape(Config.STORAGE_HEAD + name)
  window.localStorage.removeItem(key)
}

/***************
判断数据类型
***************/
// 判断是否是手机格式
const _isPhone = (v: string | number = '') => {
  var val = String(v)
  var reg: RegExp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    telReg: boolean = !!val.match(reg);
  return telReg
}
// 判断是否是密码格式(大于6位小于20位)
const _isPassword = (val = '') => {
  return val.length >= 6 && val.length <= 20
}
// 判断是否是数字格式
const _isNum = (val = '') => {
  val = String(val)
  var reg = /^[1-9]\d*$/,
    telReg = !!val.match(reg);
  return telReg
}
// 判断是否是昵称格式(大于2位小于20位)
const _isNickname = (val = '') => {
  return val.length >= 2 && val.length <= 20
}

export default {
  _setItem,
  _getItem,
  _removeItem,

  _isPhone,
  _isPassword,
  _isNum,
  _isNickname,
}