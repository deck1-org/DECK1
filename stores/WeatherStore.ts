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
    const startHour = ref<number>(1);
    const endHour = ref<number>(23);
    const startMonth = ref<number>(1);
    const endMonth = ref<number>(12);
    const show2yrs = ref<boolean>(false);
    const show10yrs = ref<boolean>(false);
    const show20yrs = ref<boolean>(false);

    return {
      weatherData,
      ctvSmallData,
      ctvLargeData,
      sovData,
      siteData,
      heliData,
      startHour,
      endHour,
      startMonth,
      endMonth,
      show2yrs,
      show10yrs,
      show20yrs,
    };
  },
});

// config limits should be stored in filterStore
// functions should be stored in relevent component
