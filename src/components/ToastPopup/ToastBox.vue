<script setup lang="ts">
interface Props {
  to?: string;
  teleportDisabled?: boolean;
  class?: string;
  style?: object;
}

const props = withDefaults(defineProps<Props>(), {
  to: "body",
  teleportDisabled: false,
  style: () => ({}),
})
</script>

<template>
<Teleport :to="to" :disabled="teleportDisabled">
  <div class="toast_box">
    <slot></slot>
  </div>
</Teleport>
</template>

<style scoped lang="scss">
.toast_box {
  position: fixed;
  bottom: 5px;
  right: 5px;
  left: 5px;
  z-index: 200;
}
</style>