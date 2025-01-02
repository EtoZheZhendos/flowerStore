<template lang="pug">
q-item(class="q-my-sm flower-item", clickable, @click="selectFlower")
  q-item-section(avatar)
    q-avatar
      img(:src="flower.image" :alt="flower.name")
  q-item-section
    q-item-label {{ flower.name }}
    q-item-label(caption) Цена: {{ flower.price }} руб.
    q-item-label(caption) Тип: {{ flower.type }}
    q-item-label(caption) Наличие: {{ flower.available ? "В наличии" : "Нет в наличии" }}
    q-item-label(caption) Страна: {{ flower.manufactured }}
  q-item-section(side)
    q-btn(color="red" icon="delete" @click.stop="deleteFlower")
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
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.flower-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.flower-image {
  border-radius: 8px;
}

.flower-name {
  font-weight: bold;
  color: #2c3e50;
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
