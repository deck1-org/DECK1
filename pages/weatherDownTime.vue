<template>
  <div class="flex flex-wrap w-full h-full">
    <div class="w-1/5">
      <LocationDropdown />
    </div>
    <div class="w-4/5">
      <RecommendationPopUp />
    </div>
    <div class="w-4/5">
      <Chart />
    </div>
    <div class="w-1/5">
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
