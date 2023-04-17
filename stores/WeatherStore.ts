import { defineStore } from "pinia";
import all_data from "~/assets/site-weather/SKRD-ROCKweather.json";

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const weatherData = ref(all_data);
    const ctvSmallData = ref<Number[]>();
    const ctvLargeData = ref<Number[]>();
    const sovData = ref<Number[]>();
    const siteData = ref<Number[]>();
    const heliData = ref<Number[]>();
    const labels = ref<String[]>(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    
    return {
      weatherData,
      ctvSmallData,
      ctvLargeData,
      sovData,
      siteData,
      heliData,
      labels,
    };
  },
});