<template lang="pug">
q-layout
  q-header(elevated class="fixed header-style")
   q-toolbar(class="flex items-center justify-between")
      q-toolbar-title(class="text-h4 title-style") Цветочный магазин
      div(class="flex-grow flex justify-center")
        q-input(v-model="searchQuery" label="Поиск цветов" outlined dense rounded   class="bg-white search-input" style="min-width: 300px;" clearable)
          template(v-slot:append)
      q-icon(v-if="searchQuery" name="close" class="cursor-pointer" @click="searchQuery = ''")
      div(class="flex items-center")
        sort-flower(color="primary" class="bg-white")
  q-page-container
    router-view
  </template>

<script setup>
import { ref, watch } from "vue";
import { useFlowerStore } from "src/stores/flowerStore.js";
import SortFlower from "src/components/sort/SortFlower.vue";
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
.header-style {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

.title-style {
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-left: 20px;
}

.search-input {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  transition: all 0.3s ease;
}

.search-input:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.sort-button {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.sort-button:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
