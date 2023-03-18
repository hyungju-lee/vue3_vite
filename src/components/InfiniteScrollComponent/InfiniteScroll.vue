<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import {isHtmlElement} from "@/typeGuard";

// 프롭스
interface Props {
  root?: HTMLElement;
  height?: number;
}
const props = withDefaults(defineProps<Props>(), {
  height: 1,
});
const emit = defineEmits(['visible', 'invisible']);

const observerTarget = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    // entries 감시대상들
    entries.forEach((entry) => {
      if (!entry.isIntersecting) { // isIntersecting 감시대상이 보일 때
        return;
      }
      if (entry.intersectionRatio <= 0) {
        emit('invisible');
        return;
      }
      if (entry.intersectionRatio > 0) {
        emit('visible');
      }
    });
  }, {
    // root: props.root || document.querySelector('html'),
    // rootMargin: '0px',
    // threshold: 1.0
  });

  if (isHtmlElement(observerTarget.value)) {
    observer.value.observe(observerTarget.value);
    window.scrollTo(0, window.scrollY - observerTarget.value.getBoundingClientRect().height);
  }
})

onUnmounted(() => {
  if (!observer.value) {
    return;
  }
  observer.value.disconnect();
})
</script>

<template>
<div ref="observerTarget" :style="{height: `${height === 0 ? 1 : height}px`}"></div>
</template>

<style scoped lang="scss">

</style>