import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useFlowerStore = defineStore("flower", {
  state: () => ({
    flowers: [],
    filteredFlowers: [],
    loading: false,
    error: null,
  }),
  getters: {
    getAllFlowers: (state) => state.flowers,
    getFilteredFlowers: (state) => state.filteredFlowers,
  },
  actions: {
    async fetchFlowers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: "http://localhost:3000/flowers",
          method: "GET",
        });
        this.flowers = response.data;
        this.filteredFlowers = response.data;
      } catch (error) {
        this.error = "Ошибка.";
      } finally {
        this.loading = false;
      }
    },

    searchFlowers(query) {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredFlowers = this.flowers.filter(
        (flower) =>
          flower?.name?.toLowerCase().includes(lowerCaseQuery) ||
          flower?.manufactured?.toLowerCase().includes(lowerCaseQuery)
      );
    },

    async deleteFlower(id) {
      this.loading = true;
      this.error = null;
      try {
        await api({
          url: `http://localhost:3000/flowers/${id}`,
          method: "DELETE",
        });
        await this.fetchFlowers();
      } catch (error) {
        this.error = "Ошибка.";
      } finally {
        this.loading = false;
      }
    },
    sortFlowers(order = "asc") {
      this.filteredFlowers.sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
    },
    sortStringFlowers(order = "asc") {
      this.filteredFlowers.sort((a, b) =>
        order === "asc" ? a.name - b.name : b.name - a.name
      );
    },
    async fetchFlowerById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: `http://localhost:3000/flowers/${id}`,
          method: "GET",
        });
        return response;
      } catch (error) {
        this.error = "Ошибка.";
      } finally {
        this.loading = false;
      }
    },
  },
});
