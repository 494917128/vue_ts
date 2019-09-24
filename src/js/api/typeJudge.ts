/******************************
 * 判断数据类型
******************************/
// 判断是否是手机格式
export const isPhone: api.typeJudge['isPhone'] = (v) => {
  if (typeof v == 'string' || typeof v == 'number') {
    const val = String(v)
    const reg: RegExp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      telReg: boolean = !!val.match(reg);
    return telReg
  }
  return false
}
// 判断是否是密码格式(大于6位小于20位)
export const isPassword: api.typeJudge['isPassword'] = (val) => {
  if (typeof val == 'string') {
    return val.length >= 6 && val.length <= 20
  }
  return false
}
// 判断是否是数字格式(正整数)
export const isNum: api.typeJudge['isNum'] = (val) => {
  if (typeof val == 'string' || typeof val == 'number') {
    val = String(val)
    const reg = /^[1-9]\d*$/,
      telReg = !!val.match(reg);
    return telReg
  }
  return false
}
// 判断是否是数字格式(正整数)
export const isEmail: api.typeJudge['isEmail'] = (val) => {
  if (typeof val == 'string') {
    val = String(val)
    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
      telReg = !!val.match(reg);
    return telReg
  }
  return false
}
