<script setup lang="ts">
import IconDelete from '@/components/icons/IconDelete.vue';
import {inject} from "vue";
import {UPDOWN_SEARCH_LIST, CLICK_SEARCH_LIST, ESC_SEARCH_INPUT, DELETE_SEARCH_KEYWORD} from "@/components/SearchComponent/keys";
// 프롭스
interface Props {
  tabIndex?: number;
  class?: string;
  style?: object;
  keyword: string;
}
const props = withDefaults(defineProps<Props>(), {
  tabIndex: 0,
  style: () => ({}),
});

const upDownSearchList = inject(UPDOWN_SEARCH_LIST);
const clickSearchList = inject(CLICK_SEARCH_LIST);
const escSearchInput = inject(ESC_SEARCH_INPUT);
const deleteSearchKeyword = inject(DELETE_SEARCH_KEYWORD);
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
    <button
        @click="deleteSearchKeyword"
        type="button"
        :data-keyword="keyword"
        style="position: absolute; top: 0; right: 0; width: 44px; height: 100%"
    >
      <IconDelete />
    </button>
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