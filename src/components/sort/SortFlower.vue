<template lang="pug">
    q-btn-dropdown(color="accent" label="Сортировка" icon="sort")
      q-list
        q-item(clickable v-close-popup @click="sortFlowers('asc')")
          q-item-section
            q-item-label Сортировать по возрастанию
        q-item(clickable v-close-popup @click="sortFlowers('desc')")
          q-item-section
            q-item-label Сортировать по убыванию
        q-separator
        q-item(clickable v-close-popup @click="resetSort")
          q-item-section
            q-item-label Сбросить параметры сортировки
    </template>

<script setup>
import { useFlowerStore } from "src/stores/flowerStore.js";

const flowerStore = useFlowerStore();

const resetSort = async () => {
  await flowerStore.fetchFlowers();
};

const sortFlowers = async (order) => {
  await flowerStore.sortFlowers(order);
};
</script>
