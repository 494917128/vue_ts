/******************************
 * filters
******************************/
const formatNumber = (n: string | number): string => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 数字两位小数点
export const toFixed: api.filters['toFixed'] = (value) => {
  if (!value) { return '0.00' }
  var toFixedNum = Number(value).toFixed(3);
  var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
  return realVal;
}
// 时间戳转换为时间格式
export const formatTime: api.filters['formatTime'] = (time) => {
  const date = new Date(time * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
// 时间戳转换为日期格式
export const formatDate: api.filters['formatDate'] = (time) => {
  const date = new Date(time * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('/');
}
