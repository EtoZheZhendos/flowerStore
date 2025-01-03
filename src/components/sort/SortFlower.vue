<template lang="pug">
  q-select(
    rounded
    v-model="selectedSortOption"
    :options="sortOptions"
    label="Сортировка"
    outlined
    dense
    @update:model-value="handleSort"
    class="sort-input"
    style="width: 200px;"
  )
  </template>

<script setup>
import { ref } from "vue";
import { useFlowerStore } from "src/stores/flowerStore.js";

const flowerStore = useFlowerStore();

const sortOptions = [
  { label: "По возрастанию (Цена)", value: { type: "price", order: "asc" } },
  { label: "По убыванию (Цена)", value: { type: "price", order: "desc" } },
  { label: "От А до Я", value: { type: "name", order: "asc" } },
  { label: "От Я до А", value: { type: "name", order: "desc" } },
  { label: "Сбросить сортировку", value: { type: "reset", order: null } },
];

const selectedSortOption = ref(null);

const handleSort = (selectedOption) => {
  const { type, order } = selectedOption.value;
  if (type === "price") {
    flowerStore.sortFlowers(order);
  } else if (type === "name") {
    flowerStore.sortStringFlowers(order);
  } else if (type === "reset") {
    flowerStore.fetchFlowers();
  }
};
</script>

<style scoped>
.sort-input {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  transition: all 0.3s ease;
}

.sort-input:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
