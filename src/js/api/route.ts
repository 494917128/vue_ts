/******************************
 * 链接跳转
******************************/
import route from '@/router'
// 链接跳转
export const href: api.route['href'] = (name, data = {}): void => {
  route.push({ name: name, params: data });
}
// 链接跳转（url带参数）
export const link: api.route['link'] = (name, data = {}) => {
  route.push({ name: name, query: data });
}
