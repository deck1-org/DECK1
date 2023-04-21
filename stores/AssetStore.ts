import { defineStore } from "pinia";

export const useAssetStore = defineStore("AssetStore", {
  state: () => {
    const ctv_small = reactive({
      id: 1,
      name: "CTV small",
      limit: 1.5,
      category: "vessel",
    });
    const ctv_big = reactive({
      id: 2,
      name: "CTV large",
      limit: 1.75,
      category: "vessel",
    });
    const sov = reactive({
      id: 3,
      name: "SOV",
      limit: 2.75,
      category: "vessel",
    });
    const heli = reactive({
      id: 4,
      name: "Helicopter",
      visibility: 20.83,
      cloudbase: 0,
      category: "helicopter",
    }); // 20.83% -> 5km  // 0 ==> no fly | 1 ==> good to go (fly?)
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
