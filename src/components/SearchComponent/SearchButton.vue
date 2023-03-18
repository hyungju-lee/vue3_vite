<script setup lang="ts">
import {inject} from "vue";
import {CLICK_SEARCH_BUTTON} from "@/components/SearchComponent/keys";

const clickSearchButton = inject(CLICK_SEARCH_BUTTON);

interface Props {
  class?: string;
  style?: object;
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});
</script>

<template>
  <button type="button" @click="clickSearchButton" :class="props.class" :style="{...style}">
    <slot>검색</slot>
  </button>
</template>

<style scoped lang="scss">

</style>