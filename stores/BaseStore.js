import { defineStore } from "pinia";
import all_data from "@/assets/failure.json";

export const useBaseStore = defineStore("BaseStore", {
  state: () => {
    let message = ref("");

    return {
      message,
    };
  },
});
