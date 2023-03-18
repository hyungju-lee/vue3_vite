<script setup lang="ts">
import {provide} from "vue";
import {CHANGE_INPUT, CURRENT_VALUE} from "@/components/RadioComponent/keys";

// 프롭스
interface Props {
  currentValue: string;
  class?: string;
  style?: object;
}
const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});

const emit = defineEmits(["change:input"])

const changeInput = (e: Event) => {
  emit("change:input", e);
}

provide(CHANGE_INPUT, changeInput);
provide(CURRENT_VALUE, props.currentValue);
</script>

<template>
  <div class="radio_box" :class="props.class" :style="{...style}">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>