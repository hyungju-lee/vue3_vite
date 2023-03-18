<script setup lang="ts">
// 프롭스
interface Props {
  labelFor: string;
  class?: string;
  style?: object;
}
const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});
</script>

<template>
  <label :for="labelFor" :class="props.class" :style="{...style}">
    <slot></slot>
  </label>
</template>

<style scoped lang="scss"></style>