<template>
  <div :class="['modal_cover', 'justify-center', data.show && 'show']" @click="$emit('cancel');cancel()">
    <div class='modal_container' @click.stop>
      <div class='title justify-center'>{{data.title}}</div>
      <div class='content'>
        <span v-if="data.text">{{data.text}}</span>
        <slot v-else></slot>
      </div>
      <div class='button_div justify-center'>
        <div @click="$emit('cancel');cancel()" v-if="!data.noCancel" class='modal-button justify-center' hover-class='hover'>{{data.cancelText||'取消'}}</div>
        <div v-if="!data.noCancel" class='modal-line'></div>
        <div @click="$emit('confirm');confirm()" class='modal-button justify-center' hover-class='hover'>{{data.confirmText||'确定'}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Event from '@/core/Event'

@Component
export default class MyModal extends Vue {
  @Prop() private data!: api.modalInitOption;

  cancel () {
    Event.$emit('modal/cancel')
    Event.$emit('modal/complete')
  }
  confirm () {
    Event.$emit('modal/confirm')
    Event.$emit('modal/complete')
  }
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
    width: 300px;
    background-color: #E8E8E8;
    border-radius: 10px;
    overflow: hidden; }
  .title{
    height: 55px;
    font-size: 16px; }
  .content{
    padding: 0 15px 15px;
    text-align: center;
    font-size: 16px; }


  .modal-button{
    flex: 1;
    height: 45px;
    color: #0894ec;
    font-size: 16px; }
  .modal-button:hover { 
    background-color: rgba(0, 0, 0, .05); }
  .modal-line{
    height: 30px;
    width: 1px;
    background-color: #ccc; }
  .hover{
    background-color: #D4D4D4; }
</style>
