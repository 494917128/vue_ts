<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  name: "home",
  components: {
    HelloWorld
  },
})
export default class Home extends Vue {
  mounted() {
    this.$api.success('成功了',()=>{console.log('chengg')})
    // this.$api.link('about')
  }
}
</script>
