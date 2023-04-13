import { defineStore } from "pinia";
import all_data from "@/assets/one_year.json";

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const weatherData = ref(all_data);
    const ctvSmallData = ref<Number[]>();
    const ctvLargeData = ref<Number[]>();
    const sovData = ref<Number[]>();
    const siteData = ref<Number[]>();
    const heliData = ref<Number[]>();
    const startHour = ref<Number>(8);
    const endHour = ref<Number>(20);

    return {
      weatherData,
      ctvSmallData,
      ctvLargeData,
      sovData,
      siteData,
      heliData,
      startHour,
      endHour
    };
  },
});

// config limits should be stored in filterStore
// functions should be stored in relevent component
