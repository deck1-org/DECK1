import { defineStore } from "pinia";
import all_data from "@/assets/one_year.json";

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const weatherData = ref(all_data);

    return {
      weatherData,
    };
  },
});

// config limits - should be assigned to assets
// functions should be stored in relevent component
