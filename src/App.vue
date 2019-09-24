<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <MyModal :data='modal' />
    <MyToast :data='toast' />
    <MyLoading :data='loading' />

  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyModal from '@/components/MyModal.vue'
import MyToast from '@/components/MyToast.vue'
import MyLoading from '@/components/MyLoading.vue'
import Event from '@/core/Event'

@Component({
  name: "home",
  components: {
    MyModal,
    MyToast,
    MyLoading,
  },
})
export default class Home extends Vue {
  public msg = 1;
  public modal: api.modalInitOption = { show: false, text: '' };
  public toast: api.toastInitOption = { show: false, text: '' };
  public loading: api.loadingInitOption = { show: false };

  // 初始化模态框
  modalInit(){
    var _this = this
    Event.$on('modal/show', ({ title = '提示', text, noCancel = true, cancelText = '取消', confirmText = '确定', stopCover = false, success, fail, complete }: api.modalInitOption) => {
      var data: api.modalInitOption = {
        show: true,
        title, text, noCancel, cancelText, confirmText, stopCover
      }

      _this.modal = data

      Event.$once('modal/confirm', () => {
        success && success()
      })
      Event.$once('modal/cancel', () => {
        fail && fail()
      })
      Event.$once('modal/complete', () => {
        _this.$set(_this.modal, 'show', false)
        complete && complete()
      })
    })
  }
  // 初始化提示框
  toastInit(){
    var _this = this
    Event.$on('toast/show', ({ text, type, time = 2000 }: api.toastInitOption) => {
      var data: api.toastInitOption = {
        show: true,
        text, type
      }

      _this.toast = data
      setTimeout(() => {
        Event.$emit('toast/hide')
      },time)
    })
    Event.$on('toast/hide', () => {
      _this.$set(_this.toast, 'show', false)
    })
  }
  // 初始化加载框
  loadingInit(){
    var _this = this
    Event.$on('loading/show', (text: string = '数据加载中...') => {
      console.log(213)
      var data: api.loadingInitOption = { show: true, text }

      _this.loading = data
    })
    Event.$on('loading/hide', () => {
      _this.$set(_this.loading, 'show', false)
    })
  }


  created() {
    this.modalInit()
    this.toastInit()
    this.loadingInit()
  }
}
</script>