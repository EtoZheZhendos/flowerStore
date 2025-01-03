<template lang="pug">
q-page(class="q-pa-md")
  div(v-if="filteredFlowers.length > 0" class="row q-col-gutter-sm")
    div(v-for="flower in filteredFlowers" :key="flower.id" class="col-2")
      flower-item(:flower="flower" @select-flower="selectFlower" @delete-flower="deleteFlower")
  div(v-else, class="q-mt-md text-grey") Не удалось загрузить элементы списка.
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useFlowerStore } from "src/stores/flowerStore.js";
import FlowerItem from "src/components/items-for-list/FlowerItem.vue";

const flowerStore = useFlowerStore();

const deleteFlower = async (id) => {
  await flowerStore.deleteFlower(id);
};

const selectFlower = async (id) => {
  await flowerStore.fetchFlowerById(id).then((response) => {
    console.log("Выбранный цветок:", response.data);
  });
};

const filteredFlowers = computed(() => flowerStore.getFilteredFlowers);

onMounted(() => {
  flowerStore.fetchFlowers();
});
</script>

<style scoped>
.flower-list {
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
  padding: 20px;
}

.no-items {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
