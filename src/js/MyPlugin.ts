import methods from './methods'
import modal from './modal'
import axios from 'axios'
import route from '@/router'
import { Config } from './Config'

import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    // 变量
    count_down: string
    verify_prompt: {
      phone: string,
      password: string,
      num: string,
      nickname: string
    }
    $Data: {
      config: {}
    }
  }
}


const formatNumber = (n: string | number): string => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export default {
  install: function (Vue: any, opt: any) {
    Vue.mixin({
      data: function () {
        return {
          count_down: '', // 验证码倒计时
          verify_prompt: {
            phone: '手机号码格式错误', // 手机号码格式错误的提示
            password: '密码需大于6位且小于20位', // 密码格式错误的提示
            num: '密码需大于6位且小于20位', // 数字格式错误的提示
            nickname: '昵称需大于2位且小于20位', // 昵称格式错误的提示
          },
          $Data: {
            config: {}
          }
        }
      },
      filters: {
        // 数字两位小数点
        toFixed(value?: string | number) {
          if (!value) { return '0.00' }
          var toFixedNum = Number(value).toFixed(3);
          var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
          return realVal;
        },
        // 时间戳转换为时间格式
        formatTime(time: number) {
          const date = new Date(time * 1000);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const hour = date.getHours();
          const minute = date.getMinutes();
          const second = date.getSeconds();

          return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
        },
        // 时间戳转换为日期格式
        formatDate(time: number) {
          const date = new Date(time * 1000);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          return [year, month, day].map(formatNumber).join('/');
        }
      },
      methods: {

        ...methods,
        ...modal,
        // 弹出框
        _alert(msg: string = '', callback?: () => void) {
          this._showToast({ text: msg, time: 1500 });
          setTimeout(() => { callback && callback() }, 1500);
        },
        // 错误框
        _error(msg: string = '', callback?: () => void) {
          this._showToast({ text: msg, type: 'error', time: 1500 });
          setTimeout(() => { callback && callback() }, 1500);
        },
        // 成功框
        _success(msg: string = '', callback?: () => void) {
          this._showToast({ text: msg, type: 'success', time: 1500 });
          setTimeout(() => { callback && callback() }, 1500);
        },
        // 成功框
        _confirm(msg: string = '', callback?: () => void) {
          this._showModal({
            text: msg,
            noCancel: false,
            success() {
              callback && callback();
            }
          });
        },
        // 链接跳转
        _href(name: string, data = {}) {
          route.push({ name: name, params: data });
        },
        // 链接跳转（url带参数）
        _link(name: string, data = {}) {
          route.push({ name: name, query: data });
        },
        // 发送验证码的60秒倒计时
        _countDown(mobile: string | number) {
          var _this: any = this
          this._request({
            url: 'v1/code/get-code',
            data: { mobile: mobile },
            success(res: any) {
              _this._success('验证码已发送')

              _this.count_down = 60;
              _this._timer = setInterval(() => {
                if (_this.count_down === 0) {
                  clearInterval(_this._timer);
                  _this.count_down = '';
                } else {
                  _this.count_down = _this.count_down - 1;
                }
              }, 1000);
            }
          })
        },

        // 封装请求
        _request(
          { loading = '数据加载中，请稍后 . . .', prefix_url, url, data = {}, method = 'POST', type = 'form', success, successError, fail }:
            { loading?: string, prefix_url?: string, url: string, data?: object, method?: 'POST' | 'GET', type?: 'json' | 'form', success?(res: any): void, successError?(res: any): void, fail?(error: any): void }
        ) {
          var _this = this
          // 加载中的loading框（暂未开通）
          if (loading) {
            this._showLoading(loading);
          }
          var token = this._getItem('access_token') || '';

          axios({
            url: Config.AXIOS_HOST + url,
            data: data,
            headers: {
              'Content-type': type == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
            },
            method: method,
            params: { 'access-token': token },
            transformRequest: [function (data: any) {
              if (type == 'json') { return data };
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
          }).then(function (res: any) {
            // 加载中的loading框
            if (loading) { _this._hideLoading() }

            if (res.data.code === 200) {
              success && success(res.data);
            } else if (res.data.code === 400 && res.data.message == '您的登录验证已经过期，请重新登陆') { // 登录态过期，刷新登录态后重新请求该接口
              _this._error(res.data.message || '请求出错', () => {
                _this._tokenReset(_this._request, { loading, prefix_url, url, data, method, type, success, successError, fail });
              })
            } else if (res.data.code === 401) { // 未登录
              _this._error('您还未登录，请先登录', () => {
                _this._removeItem('access_token');
                _this._removeItem('refresh_token');
                _this._href('login');
              })
            } else if (res.data.code === 429) { // 请求过快
              fail && fail(res);
              _this._error('您点的太快了，请等下再试吧');
            } else {
              _this._error(res.data.message || '请求出错', () => {
                successError && successError(res.data); // 适应重置登录密匙
                fail && fail(res);
              })
            }

          }).catch(function (error: any) {
            // 加载中的loading框
            if (loading) { _this._hideLoading() }
            _this._error('请求出错');
            console.log(error);
            fail && fail(error);
          });
        },

        // 重置token
        _tokenReset(callback?: (data: any) => void, data = {}) {
          var _this = this,
            refresh_token = this._getItem('refresh_token') || ''
          this._request({
            url: 'v1/user/refresh',
            data: { refresh_token: refresh_token, group: 'app' },
            success(res) {
              _this._setItem('access_token', res.data.access_token);
              _this._setItem('refresh_token', res.data.refresh_token);
              callback && callback(data);
            },
            successError(res) {
              _this._removeItem('access_token');
              _this._removeItem('refresh_token');
              _this._href('login');
            },
            fail() { }
          })
        },
        // 图片上传
        _uploadFile(event: any, success?: (data: any) => void) {
          var _this = this,
            reader = new FileReader(),
            img1 = event.target.files[0],
            type = img1.type, // 文件的类型，判断是否是图片  
            size = img1.size, // 文件的大小，判断图片的大小  
            imgData = { accept: 'image/gif, image/jpeg, image/png, image/jpg' }
          if (imgData.accept.indexOf(type) == -1) {
            this._error('请选择我们支持的图片格式！');
            return false;
          }
          if (size > 3145728) {
            this._error('请选择3M以内的图片！');
            return false;
          }
          let form = new FormData();
          form.append('file', img1, img1.name);

          axios({
            method: 'post',
            url: 'v1/file/images',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: form
          }).then(function (res: any) {
            if (res.data.code == 200) {
              success && success(res.data);
            } else {
              _this._error(res.data.message || '请求出错', () => {
                fail && fail();
              })
            }
          }).catch(function (error: any) {
            _this._error('上传图片出错！');
          });
        },
        // 获取用户信息
        _getUserInfo(callback?: (data: any) => void) {
          var _this = this
          this._request({
            url: 'v1/user/info',
            success(res) {
              _this.$Data.userInfo = res.data
              callback && callback(res.data);
            }
          })
        },
        // 获取网站信息
        _getConfig(callback?: (data: any) => void) {
          var _this = this
          if (this.$Data.config) {
            callback && callback(this.$Data.config)
          } else {
            this._request({
              url: 'v1/sys/config-web',
              success(res) {
                _this.$Data.config = res.data
                callback && callback(res.data);
              }
            })
          }
        },

        // 订单支付
        _orderPay(order_id: string | number, callback?: () => void) {
          this._error('该功能暂未开放，请前往小程序支付', callback);
        }
      },
      // 清除验证码的60秒轮询
      destroyed() {
        clearInterval(this._timer);
      }
    })
  }
}