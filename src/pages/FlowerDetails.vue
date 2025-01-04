<template lang="pug">
  q-page(class="q-pa-md")
    q-btn(flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-sm" color="accent")
    div(v-if="flower")
      q-card(class="my-card")
        q-img(:src="flower.image", :alt="flower.name", class="card-image", :ratio="21/9", style="height: 500px; object-fit: cover;")
        q-card-section
          div(class="text-h5 q-mb-sm") {{ flower.name }}
          div(class="text-subtitle1 q-mb-sm") Цена: {{ flower.price }} руб.
          div(class="text-subtitle1 q-mb-sm") Тип: {{ flower.type }}
          div(class="text-subtitle1 q-mb-sm") Наличие: {{ flower.available ? "В наличии" : "Нет в наличии" }}
          div(class="text-body1 q-mb-md") {{ flower.description }}
          div(class="text-subtitle1 q-mb-sm") Страна производитель: {{ flower.manufactured }}
          div(class="row q-gutter-sm")
            q-btn(color="accent", label="Купить")
            q-btn(color="primary", label="Добавить в корзину")
    div(v-else-if="loading", class="text-center q-mt-md")
      q-spinner(size="50px", color="primary")
    div(v-else, class="text-grey") Цветок не найден.
  </template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFlowerStore } from "src/stores/flowerStore.js";

const route = useRoute();
const flowerStore = useFlowerStore();
const flower = ref(null);
const loading = ref(false);

onMounted(async () => {
  const flowerId = route.params.id;
  if (flowerId) {
    loading.value = true;
    try {
      const response = await flowerStore.fetchFlowerById(flowerId);
      flower.value = response.data;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      loading.value = false;
    }
  }
});
</script>

<style scoped>
.my-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-image {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.text-h5 {
  font-size: 1.5rem;
  font-weight: bold;
}

.text-subtitle1 {
  font-size: 1rem;
  color: #555;
}

.text-body1 {
  font-size: 0.9rem;
  color: #666;
}

.q-btn {
  font-size: 0.9rem;
}
</style>
