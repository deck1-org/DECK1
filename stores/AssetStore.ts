import { defineStore } from "pinia";

export const useAssetStore = defineStore("AssetStore", {
  state: () => {
    const ctv_small = reactive<object>({ id: 1, name: "CTV small", limit: 0 });
    const ctv_big = reactive<object>({ id: 2, name: "CTV large", limit: 2 });
    const sov = reactive<object>({ id: 3, name: "SOV", limit: 4 });
    const heli = reactive<object>({ id: 4, name: "Helicopter", limit: 6 });
    const assets = [ctv_small, ctv_big, sov, heli]; // error in the terminal comes from reading the data from this array

    return {
      ctv_small,
      ctv_big,
      sov,
      heli,
      assets,
    };
  },
});
