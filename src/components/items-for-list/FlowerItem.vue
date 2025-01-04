<template lang="pug">
  q-card(class="flower-item" @click="selectFlower")
    q-img(:src="flower.image" :alt="flower.name" class="flower-image")
    q-card-section
      div(class="text-h6 flower-name") {{ flower.name }}
      div(class="text-subtitle1 flower-price") Цена: {{ flower.price }} руб.
      div(class="text-caption flower-type") Тип: {{ flower.type }}
      div(class="text-caption flower-availability")
        span(:class="flower.available ? 'available' : 'not-available'") {{ flower.available ? "В наличии" : "Нет в наличии" }}
      div(class="text-caption flower-country") Страна: {{ flower.manufactured }}
    q-card-actions(align="right")
      q-btn(color="red" icon="delete" @click.stop="deleteFlower" class="delete-button")
  </template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps, defineEmits } from "vue";

const router = useRouter();
const props = defineProps({
  flower: {
    type: Object,
    required: true,
  },
});

const selectFlower = () => {
  router.push({ path: `/flower/${props.flower.id}` });
};

const emit = defineEmits(["select-flower", "delete-flower"]);

const deleteFlower = () => {
  emit("delete-flower", props.flower.id);
};
</script>

<style scoped>
.flower-item {
  background: white;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  margin-bottom: 25px;
  max-width: 400px;
  cursor: pointer;
}

.flower-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.flower-image {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 250px;
  object-fit: cover;
}

.flower-name {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1rem;
}

.flower-price {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.flower-type {
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.flower-availability {
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.available {
  color: #4caf50;
}

.not-available {
  color: #f44336;
}

.flower-country {
  font-size: 0.8rem;
  color: #666;
}

.delete-button {
  border-radius: 50%;
  transition: all 0.3s ease;
}

.delete-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
