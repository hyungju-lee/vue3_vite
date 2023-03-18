<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner);

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
      icon="fa-solid fa-spinner"
      class="fa_spinner"
      :class="props.class"
      :style="{...style}"
  />
</template>

<style scoped lang="scss">
.fa_spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>