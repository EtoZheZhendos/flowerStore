<template lang="pug">
q-page(class="q-pa-md")
  div(v-if="filteredFlowers.length > 0" class="row q-col-gutter-xl")
    div(v-for="flower in filteredFlowers" :key="flower.id" class="col-6")
      flower-item(:flower="flower" @select-flower="selectFlower" @delete-flower="deleteFlower")
  div(v-else, class="q-mt-md text-grey") Не удалось загрузить элементы списка.
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useFlowerStore } from "src/stores/flowerStore.js";
import FlowerItem from "src/components/items-for-list/FlowerItem.vue";

const props = defineProps({
  searchQuery: String,
});

const flowerStore = useFlowerStore();

onMounted(() => {
  flowerStore.fetchFlowers();
});

const deleteFlower = async (id) => {
  await flowerStore.deleteFlower(id);
};

const selectFlower = (id) => {
  flowerStore.fetchFlowerById(id).then((response) => {
    console.log("Выбранный цветок:", response.data);
  });
};

const filteredFlowers = computed(() => flowerStore.getFilteredFlowers);
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
