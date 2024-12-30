<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
   q-toolbar-title Цветочный магазин
    q-toolbar
      div(class="row items-center justify-center full-width")
        q-input(
          v-model="searchQuery",
          label="Поиск цветов",
          outlined,
          dense,
          rounded,
          class="bg-white",
          style="min-width: 800px",
          clearable
        )
          template(v-slot:append)
            q-icon(
              v-if="searchQuery",
              name="close",
              class="cursor-pointer",
              @click="searchQuery = ''"
            )
  q-page-container
    router-view(:searchQuery="searchQuery")
  </template>

<script setup>
import { ref, watch } from "vue";
import { useFlowerStore } from "src/store/flowerStore.js";

const flowerStore = useFlowerStore();
const searchQuery = ref("");

watch(
  () => searchQuery.value,
  async (value) => {
    if (value === "") {
      await flowerStore.resetFlowers();
    }
    flowerStore.searchFlowers(value);
  }
);
</script>

<style scoped>
.q-input.rounded {
  border-radius: 24px;
}
</style>
