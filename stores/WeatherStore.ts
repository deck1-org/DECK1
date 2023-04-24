import { defineStore } from "pinia";
import skrd from "~/static/SKRD-ROCK-weather.json";

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const weatherData = ref<any>(skrd);
    const ctvSmallData = ref<Number[]>();
    const ctvLargeData = ref<Number[]>();
    const sovData = ref<Number[]>();
    const siteData = ref<Number[]>();
    const heliData = ref<Number[]>();
    const labels = ref<String[]>([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);

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
  actions: {
    async changeLocationAsync(selection: string) {
      let data = 
        selection === "VW" ? await import("@/static/VW-weather.json")
          : selection === "SKRD-ROCK" ? await import("@/static/SKRD-ROCK-weather.json")
          : selection === "PBG" ? await import("@/static/PBG-weather.json")
          : await import("@/static/Thor-weather.json");
      this.weatherData = data.default;
      console.log(this.weatherData);
    },
  },
});
