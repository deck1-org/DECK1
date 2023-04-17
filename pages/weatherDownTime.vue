<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="w-1/5 h-20 p-3">
      <LocationDropdown />
    </div>
    <div class="w-4/5 h-20 p-3">
      <RecommendationPopUp />
    </div>
    <div class="w-4/5 p-3">
      <ChartComponent :key="chartComponentKey"/>
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
export default {
  layout: "default",
  name: "WeatherDownTime",
  data(){
    return {
      chartComponentKey: false,
    }
  },
  methods: {
    handleButtonClick() {
      // Update the value of chartComponentKey to force remount of ChartComponent
      this.chartComponentKey = !this.chartComponentKey
    }
  }
}
</script>
