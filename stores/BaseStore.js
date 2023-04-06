import { defineStore } from "pinia";
import all_data from "@/assets/AllData.json";

export const useBaseStore = defineStore("BaseStore", {
  state: () => {
    let message = ref("");

    return {
      message,
    };
  },
});
