import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await $fetch(
          "https://64951976b08e17c91791a6a6.mockapi.io/api/v1/users"
        );
        console.log(response);
        if (response) {
          this.users = response;
          return response;
        } else {
          return [];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getUsers() {
      return this.users;
    },
  },
});
