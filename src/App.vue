<script setup lang="ts">
import { RouterView } from 'vue-router'
import emitter from "@/utils/eventBus";

emitter.on('error:script', err => {
  console.log('script 에러', err); // 토스트팝업으로 할지, 그냥 팝업으로 할지 추후 결정
})
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss">

</style>
