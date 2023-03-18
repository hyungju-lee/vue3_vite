<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);

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
      icon="fa-solid fa-trash"
      :class="props.class"
      :style="{...style}"
  />
</template>

<style scoped lang="scss">

</style>