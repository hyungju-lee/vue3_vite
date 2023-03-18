<script setup lang="ts">
import {inject, ref} from "vue";
import {
  ENTER_SEARCH_INPUT,
  KEYUP_SEARCH_INPUT,
  SEARCH_INPUT,
  FOCUS_INPUT,
  UPDOWN_SEARCH_INPUT,
  SEARCH_INPUT_VALUE, ESC_SEARCH_INPUT,
} from "@/components/SearchComponent/keys";
import {isFunctionType, isTextInputElement} from "@/typeGuard";

const enterSearchInput = inject(ENTER_SEARCH_INPUT);
const keyupSearchInput = inject(KEYUP_SEARCH_INPUT);
const focusInput = inject(FOCUS_INPUT);
const updownSearchInput = inject(UPDOWN_SEARCH_INPUT);

const searchInput = inject(SEARCH_INPUT);
const searchInputValue = inject(SEARCH_INPUT_VALUE);

const escSearchInput = inject(ESC_SEARCH_INPUT);

const isHangleTyping = ref(false)

const keyupEvent = (e: KeyboardEvent) => {
  const target = e.target;
  if (e.key === 'Enter') {
    if (isHangleTyping.value) { // true 면 이 뒤 코드는 실행 안되게하는대신
      isHangleTyping.value = e.isComposing; // 이때 이 값은 false라 이걸 다시 저장
      return;
    }
    const typeCheckResult = isFunctionType(enterSearchInput) && isTextInputElement(target);
    typeCheckResult && enterSearchInput(e, target.value);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (isHangleTyping.value) { // true 면 이 뒤 코드는 실행 안되게하는대신
      isHangleTyping.value = e.isComposing; // 이때 이 값은 false라 이걸 다시 저장
      return;
    }
    isFunctionType(updownSearchInput) && updownSearchInput(e);
  } else {
    // 현재 조합글자인지 아닌지 그 정보를 저장
    isHangleTyping.value = e.isComposing;
    const typeCheckResult = isFunctionType(keyupSearchInput) && isTextInputElement(target);
    typeCheckResult && keyupSearchInput(e, target.value);
  }
}

interface Props {
  class?: string;
  style?: object;
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});
</script>

<template>
  <input
      v-model="searchInputValue"
      type="text"
      @keyup="keyupEvent"
      @keyup.esc="escSearchInput"
      @focus="focusInput"
      ref="searchInput"
      :class="props.class"
      :style="{...style}"
  >
</template>

<style scoped lang="scss">

</style>