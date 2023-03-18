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
<ul :class="props.class" :style="{...style}">
  <slot></slot>
</ul>
</template>

<style scoped lang="scss">

</style>