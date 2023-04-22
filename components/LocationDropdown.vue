<template>
  <div class="deck-frame-white h-full justify-center content-center">
    <select id="location" v-model="location" @change="handleLocationChange">
      <option value="" disabled selected>Location</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { useFilterStore } from "~/stores/FilterStore";
import { useWeatherStore } from "~/stores/WeatherStore";

export default {
  name: "LocationDropdown",
  data() {
    return {
      location: "",
      options: ["SKRD-ROCK", "VW"], // to be changed - on component mount - need to get locations/sites from json file and asign it to options:
    };
  },
  setup() {
    const filterStore = useFilterStore();
    const weatherStore = useWeatherStore();

    return {
      filterStore,
      weatherStore,
    };
  },
  methods: {
    handleLocationChange() {
      this.filterStore.hideRecommendation = false;
      this.weatherStore.changeLocationAsync(this.location);
    },
  },
};
</script>

<style></style>
