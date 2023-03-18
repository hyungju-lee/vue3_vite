<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

interface Props {
  class?: string;
  style?: object;
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});
</script>

<template>
  <font-awesome-icon
      icon="fa-solid fa-magnifying-glass"
      :class="props.class"
      :style="{...style}"
  />
</template>

<style scoped lang="scss">

</style>