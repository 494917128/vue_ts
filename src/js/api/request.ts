/******************************
 * 封装请求
******************************/
import axios from 'axios'
import { Config } from '@/js/Config'
import { href, link } from './route'
import { setStorage, getStorage, removeStorage } from './storage'
import { showLoading, hideLoading, error } from './modal'

// 封装请求
export const request: api.request['request'] = ({ loading = '数据加载中，请稍后 . . .', prefix_url, url, data = {}, method = 'POST', type = 'form', success, successError, fail }) => {
  var content_type
  switch (type) {
    case 'form':
      content_type = 'application/x-www-form-urlencoded'
      break;
    case 'json':
      content_type = 'application/json'
      break;
    case 'formdata':
      content_type = 'multipart/form-data'
      break;
  }
  // 加载中的loading框（暂未开通）
  if (loading) {
    showLoading(loading);
  }
  var token = getStorage('access_token') || '';

  axios({
    url: Config.AXIOS_HOST + url,
    data: data,
    headers: {
      'Content-type': content_type
    },
    method: method,
    params: { 'access-token': token },
    transformRequest: [function (data: any) {
      if (type !== 'form') { return data };
      let ret = '',
        i = 0
      for (let it in data) {
        if (i === 0) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
        } else {
          ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
        }
        i++;
      }
      return ret;
    }],
  }).then(function (res) {
    // 加载中的loading框
    if (loading) { hideLoading() }

    if (res.data.code === 200) {
      success && success(res.data);
    } else if (res.data.code === 400 && res.data.message == '您的登录验证已经过期，请重新登陆') { // 登录态过期，刷新登录态后重新请求该接口
      error(res.data.message || '请求出错', () => {
        tokenReset(request, { loading, prefix_url, url, data, method, type, success, successError, fail });
      })
    } else if (res.data.code === 401) { // 未登录
      error('您还未登录，请先登录', () => {
        removeStorage('access_token');
        removeStorage('refresh_token');
        href('login');
      })
    } else if (res.data.code === 429) { // 请求过快
      fail && fail(res);
      error('您点的太快了，请等下再试吧');
    } else {
      error(res.data.message || '请求出错', () => {
        successError && successError(res.data); // 适应重置登录密匙
        fail && fail(res);
      })
    }
  }).catch(function (error) {
    // 加载中的loading框
    if (loading) { hideLoading() }
    error('请求出错');
    console.log(error);
    fail && fail(error);
  });
}
// 重置token
export const tokenReset: api.request['tokenReset'] = (callback, data) => {
  var refresh_token = getStorage('refresh_token') || ''
  request({
    url: 'v1/user/refresh',
    data: { refresh_token: refresh_token, group: 'app' },
    success(res) {
      setStorage('access_token', res.data.access_token);
      setStorage('refresh_token', res.data.refresh_token);
      callback && callback(data);
    },
    successError(res) {
      removeStorage('access_token');
      removeStorage('refresh_token');
      href('login');
    },
    fail() { }
  })
}
// 图片上传
export const uploadFile: api.request['uploadFile'] = (event, success) => {
  var reader = new FileReader(),
    img1 = event.target.files[0],
    type = img1.type, // 文件的类型，判断是否是图片  
    size = img1.size, // 文件的大小，判断图片的大小  
    imgData = { accept: 'image/gif, image/jpeg, image/png, image/jpg' }
  if (imgData.accept.indexOf(type) == -1) {
    error('请选择我们支持的图片格式！');
    return false;
  } else if (size > 3145728) {
    error('请选择3M以内的图片！');
    return false;
  }
  let form = new FormData();
  form.append('file', img1, img1.name);

  request({
    method: 'POST',
    url: 'v1/file/images',
    type: 'formdata',
    data: form,
    success(res) {
      success && success(res.data);
    }
  })
}
