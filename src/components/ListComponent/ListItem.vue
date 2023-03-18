<script setup lang="ts">
interface Props {
  class?: string;
  style?: object;
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});
</script>

<template>
  <li :class="props.class" :style="{...style}">
    <slot></slot>
  </li>
</template>

<style scoped lang="scss">

</style>