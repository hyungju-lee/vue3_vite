<script setup lang="ts">
import {inject, onMounted, watch} from "vue";
import {SEARCH_LISTS, SEARCH_LISTS_POSITION, CHECK_SEARCH_BOX_POSITION} from "@/components/SearchComponent/keys";
import {isFunctionType} from "@/typeGuard";

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

const searchLists = inject(SEARCH_LISTS);
const searchListsPosition = inject(SEARCH_LISTS_POSITION);
const checkSearchBoxPosition = inject(CHECK_SEARCH_BOX_POSITION);

onMounted(() => {
  if (!isFunctionType(checkSearchBoxPosition)) {
    return;
  }
  checkSearchBoxPosition();
})
</script>

<template>
  <Teleport :to="to" :disabled="teleportDisabled">
    <ul
        ref="searchLists"
        class="search_list"
        :class="props.class"
        :style="{
          ...style,
          ...searchListsPosition,
        }"
    >
      <slot>검색 키워드 목록</slot>
    </ul>
  </Teleport>
</template>

<style scoped lang="scss">
.search_list {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: #fff;
}
</style>