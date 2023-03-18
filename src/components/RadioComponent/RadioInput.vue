<script setup lang="ts">
import {inject} from "vue";
import {CHANGE_INPUT, CURRENT_VALUE} from "@/components/RadioComponent/keys";

// 프롭스
interface Props {
  id: string;
  name: string;
  value: string;
  class?: string;
  style?: object;
}
const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});

const changeInput = inject(CHANGE_INPUT);
const currentValue = inject(CURRENT_VALUE);
</script>

<template>
  <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :checked="value === currentValue"
      @change="changeInput"
      :class="props.class"
      :style="{...style}"
  >
</template>

<style scoped lang="scss"></style>