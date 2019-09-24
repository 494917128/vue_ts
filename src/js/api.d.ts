type Dictionary<T> = { [key: string]: T }

declare namespace api {
  /********* 链接跳转 ***********/
  interface route {
    href(name: string, data?: Dictionary<string>): void
    link(name: string, data?: Dictionary<string>): void
  }
  /********* 设置缓存 ***********/
  interface storage {
    setStorage(name: string, val: string): void
    getStorage(name: string): string | null
    removeStorage(name: string): void
  }
  /********* 判断类型 ***********/
  interface typeJudge {
    isPhone(value: any): boolean
    isPassword(value: any): boolean
    isNum(value: any): boolean
    isEmail(value: any): boolean
  }
  /********* 封装请求 ***********/
  interface request {
    request(data: requestOption): void
    tokenReset(callback: (data: api.requestOption) => void, data: api.requestOption): void
    uploadFile(event: any, success?: (data: any) => void): void
  }
  /********* 模态框 ***********/
  interface modal {
    showModal(content?: api.showModalOption): void
    showToast(content?: api.showToastOption): void
    showLoading(text?: string): void
    hideLoading(): void
    alert(msg: string, callback?: () => void): void
    error(msg: string, callback?: () => void): void
    success(msg: string, callback?: () => void): void
    confirm(msg: string, callback?: () => void): void
  }
  /********* filters ***********/
  interface filters {
    toFixed(value?: string | number): string
    formatTime(time: number): string
    formatDate(time: number): string
  }

  /********* 总输出 ***********/
  interface api extends route, storage, typeJudge, request, modal, filters { }

  interface requestOption {
    loading?: string // 是否显示loading框
    prefix_url?: string // 域名（替代原域名）
    url: string // 请求地址
    data?: Dictionary<string> | FormData // 请求参数
    method?: 'POST' | 'GET' // 请求方法
    type?: 'json' | 'form' | 'formdata' // 请求类型
    success?(res: any): void // 成功返回
    successError?(res: any): void // 成功（登录态无效）
    fail?(error: any): void  // 失败返回
  }
  interface showModalOption {
    title?: string // 标题
    text: string // 内容
    noCancel?: boolean // 是否显示关闭按钮
    cancelText?: string // 关闭按钮的文字
    confirmText?: string // 确认按钮的文字
    stopCover?: boolean // 是否停止cover关闭模态框
    success?(): void // 点击“确认”返回
    fail?(): void // 点击“取消”|cover返回
    complete?(): void // 始终返回
  }
  interface showToastOption {
    text: string // 内容
    type?: 'error' | 'success' // 提示框模式，默认info
    time?: number // 提示框显示时间
  }
  interface modalInitOption extends showModalOption {
    show: boolean
  }
  interface toastInitOption extends showToastOption {
    show: boolean
  }
  interface loadingInitOption {
    show: boolean,
    text?: string
  }
} 