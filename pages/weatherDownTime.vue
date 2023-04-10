<template>
  <div class="flex flex-wrap content-start flex-start w-full h-full">
    <div class="w-1/5 h-20 border-2 border-black">
      <LocationDropdown />
    </div>
    <div class="w-4/5 h-20 border-2 border-black">
      <RecommendationPopUp />
    </div>
    <div class="w-4/5 border-2 border-black">
      <Chart />
    </div>
    <div class="w-1/5 border-2 border-black">
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
