import { defineStore } from "pinia";

export const useFilterStore = defineStore("FilterStore", {
  state: () => {
    const location = ref(""); // later try to get initial vlaue from cookies??? idk
    const workTimeFrom = ref(8);
    const workTimeTo = ref(20);
    const hideRecommendation = ref(true);

    return {
      location,
      workTimeFrom,
      workTimeTo,
      hideRecommendation,
    };
  },
});
