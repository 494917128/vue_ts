import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $Modal: string
    // $axios: AxiosInstance
    $utils: object
  }
}