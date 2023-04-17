<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="w-1/5 h-20 p-3">
      <LocationDropdown />
    </div>
    <div class="w-4/5 h-20 p-3">
      <RecommendationPopUp />
    </div>
    <div class="w-4/5 p-3">
      <ChartComponent :key="chartComponentKey" :startHour="startHour" :endHour="endHour" />
    </div>
    <div class="w-1/5 p-3">
      <Filters @buttonClick="handleButtonClick" />
    </div>
    <div class="w-4/5 p-3">
      <AssetConfiguration />
    </div>
  </div>
</template>

<script>
import { useWeatherStore } from "~/stores/WeatherStore";
export default {
  layout: "default",
  name: "WeatherDownTime",
  data(){
    return {
      chartComponentKey: false,
      startHour: useWeatherStore().weatherData.startHour, 
      endHour: useWeatherStore().weatherData.endHour
    }
  },
  methods: {
    handleButtonClick() {
      // Update the value of chartComponentKey to force remount of ChartComponent
      this.chartComponentKey = !this.chartComponentKey
    }
  }
};
</script>
