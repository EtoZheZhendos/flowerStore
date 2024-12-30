<template lang="pug">
q-item(class="q-my-sm", clickable, @click="selectFlower")
  q-item-section(avatar)
    q-avatar
      img(:src="flower.image", :alt="flower.name")
  q-item-section
    q-item-label {{ flower.name }}
    q-item-label(caption) Цена: {{ flower.price }} руб.
    q-item-label(caption) Тип: {{ flower.type }}
    q-item-label(caption) Наличие: {{ flower.available ? "В наличии" : "Нет в наличии" }}
  q-item-section(side)
    q-btn(color="red", icon="delete", @click.stop="deleteFlower")
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
.q-item {
  border-radius: 8px;
  transition: background-color 0.3s;
}

.q-item:hover {
  background-color: #f5f5f5;
}
</style>
