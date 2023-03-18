<script setup lang="ts">
import {inject} from "vue";
import {UPDOWN_SEARCH_LIST, CLICK_SEARCH_LIST, ESC_SEARCH_INPUT} from "@/components/SearchComponent/keys";
// 프롭스
interface Props {
  tabIndex?: number;
  class?: string;
  style?: object;
}
const props = withDefaults(defineProps<Props>(), {
  tabIndex: 0,
  style: () => ({}),
});

const upDownSearchList = inject(UPDOWN_SEARCH_LIST);
const clickSearchList = inject(CLICK_SEARCH_LIST);
const escSearchInput = inject(ESC_SEARCH_INPUT);
</script>

<template>
  <li
      class="search_item"
      :tabindex="tabIndex"
      @keydown.prevent.stop
      @keyup.up="upDownSearchList"
      @keyup.down="upDownSearchList"
      @keyup.enter="clickSearchList"
      @keyup.esc="escSearchInput"
      @click="clickSearchList"
      :class="props.class"
      :style="{...style}"
  >
    <slot>검색 키워드 항목</slot>
  </li>
</template>

<style scoped lang="scss">
.search_item {
  position: relative;
  &:hover {
    background-color: #ddd;
  }
}
</style>