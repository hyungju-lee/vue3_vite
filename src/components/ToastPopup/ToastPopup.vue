<script setup lang="ts">
import {onMounted, ref} from "vue";
import {isHtmlElement} from "@/typeGuard";

interface Props {
  index: number;
  class?: string;
  style?: object;
}

const toastPopup = ref<HTMLElement | null>(null);
const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});
const emit = defineEmits(["transitionEnd"]);

const transitionEnd = () => {
  emit("transitionEnd");
  if (!isHtmlElement(toastPopup.value)) {
    return;
  }
  toastPopup.value.remove();
}

onMounted(() => {
  if (!isHtmlElement(toastPopup.value)) {
    return;
  }

  toastPopup.value.style.opacity = '0';
  toastPopup.value.style.transform = 'translateY(100%)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!isHtmlElement(toastPopup.value)) {
        return;
      }

      toastPopup.value.style.opacity = '1';
      toastPopup.value.style.transform = 'translateY(0)';
    })
  })
})
</script>

<template>
  <div
      ref="toastPopup"
      @transitionend="transitionEnd"
      class="toast_area"
      :class="props.class"
      :style="{
        ...style,
      }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.toast_area {
  transition: transform 1s ease;
}
</style>