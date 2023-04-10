<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="w-1/5 h-20 p-3">
      <LocationDropdown />
    </div>
    <div class="w-4/5 h-20 p-3">
      <RecommendationPopUp />
    </div>
    <div class="w-4/5 p-3">
      <ChartComponent />
    </div>
    <div class="w-1/5 p-3">
      <Filters />
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  name: "WeatherDownTime",
  onMounted() {
    console.log("onMounted");
  },
};
</script>
