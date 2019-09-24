<template>
  <div :class="['modal_cover', 'justify-center', data.show  && 'show']">
    <div class='modal_container' @click.stop>
      <div class='content justify-center'>
        <i class="error iconfont icon-close2 justify-center" v-if='data.type=="error"'></i>
        <i class="success iconfont icon-true justify-center" v-else-if='data.type=="success"'></i>
        <i class="info iconfont icon-info justify-center" v-else></i>
        <span>{{data.text}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Event from '@/core/Event'

@Component
export default class MyToast extends Vue {
  @Prop() private data!: api.toastInitOption;
}
</script>

<style scoped>
  .modal_cover{
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden; }
  .show{
    visibility: visible;
    opacity: 1; }
  .modal_container{
    min-width: 100px;
    background: linear-gradient(#fff, #ccc);
    box-shadow: 0 0 10px #666;
    border-radius: 5px;
    overflow: hidden; }
  .content{
    padding: 20px 30px;
    text-align: center;
    font-size: 16px; }

  .iconfont{
    width: 30px;
    height: 30px;
    margin-right: 10px;
    color: #fff;
    border-radius: 50%;
  }
  .error{
    border: 1px solid #C2523A;
    background: linear-gradient(#DC8162, #C2523A);
  }
  .success{
    border: 1px solid #6EAA16;
    background: linear-gradient(#A0C331, #6EAA16);
  }
  .info{
    border: 1px solid #427AA0;
    background: linear-gradient(#62ABC9, #427AA0);
  }
</style>
