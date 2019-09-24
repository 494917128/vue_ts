/******************************
 * 模态框
******************************/
import Event from '@/core/Event'
// 模态框
export const showModal: api.modal['showModal'] = (content) => {
  Event.$emit('modal/show', content)
}
// 提示框
export const showToast: api.modal['showToast'] = (content) => {
  Event.$emit('toast/show', content)
}
// loading框
export const showLoading: api.modal['showLoading'] = (text) => {
  console.log(123)
  Event.$emit('loading/show', text)
}
export const hideLoading: api.modal['hideLoading'] = () => {
  Event.$emit('loading/hide')
}
// 提示框
export const alert: api.modal['alert'] = (msg = '', callback) => {
  showToast({ text: msg, time: 1500 });
  setTimeout(() => { callback && callback() }, 1500);
}
// 错误框
export const error: api.modal['error'] = (msg = '', callback) => {
  showToast({ text: msg, type: 'error', time: 1500 });
  setTimeout(() => { callback && callback() }, 1500);
}
// 成功框
export const success: api.modal['success'] = (msg = '', callback) => {
  showToast({ text: msg, type: 'success', time: 1500 });
  setTimeout(() => { callback && callback() }, 1500);
}
// 成功框
export const confirm: api.modal['confirm'] = (msg = '', callback) => {
  showModal({
    text: msg,
    noCancel: false,
    success() { callback && callback() }
  });
}
