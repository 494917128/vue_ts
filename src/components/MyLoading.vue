<template>
  <div :class="['modal_cover', 'justify-center', data.show  && 'show']">
    <div class='modal_container'>
      <div class='content justify-center'>
        <i class="iconfont icon-loading justify-center"></i>
        <span>{{data.text}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Event from '@/core/Event'

@Component
export default class MyLoading extends Vue {
  @Prop() private data!: api.loadingInitOption;
}
</script>

<style scoped lang="less">
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
    font-size: 24px;
    color: #666;
    border-radius: 50%;
    animation: loading 2s infinite;
  }
  @keyframes loading{
    0%{ transform: rotate(0deg); }
    100%{ transform: rotate(360deg); }
  }
</style>
