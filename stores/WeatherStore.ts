import { defineStore } from "pinia";
import all_data from "@/assets/AllData.json";

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const weatherData = ref(all_data);
    const ctvSmallData = ref([]);
    const ctvLargeData = ref([]);
    const sovData = ref([]);
    const siteData = ref([]);
    const heliData = ref([]);

    return {
      weatherData,
      ctvSmallData,
      ctvLargeData,
      sovData,
      siteData,
      heliData,
    };
  },
});

// config limits should be assigned to each asset
// functions should be stored in relevent component
