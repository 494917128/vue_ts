import Vue from 'vue';
/// <reference path="./api.d.ts" />

declare module 'vue/types/vue' {
  interface Vue {
    $api: api.api
  }
}