<script setup lang="ts">
import IconLoading from '@/components/icons/IconLoading.vue';
import {ref} from "vue";

interface Props {
  src: string;
  alt: string;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['load', 'error']);

const loaded = ref(false);

const onLoaded = () => {
  loaded.value = true;
  emit('load');
}

const onError = () => {
  loaded.value = true;
  emit('error')
}
</script>

<template>
  <div class="img_area">
    <img
        v-show="loaded"
        class="img"
        :src="src"
        :alt="alt"
        @load="onLoaded"
        @error="onError"
    >
    <IconLoading
        v-if="!loaded"
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
    />
  </div>
</template>

<style scoped lang="scss">
.img_area {
  position: relative;
  padding-top: 56.25%;

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>