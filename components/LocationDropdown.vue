<template>
  <div class="deck-frame-white h-full justify-center content-center">
    <select id="location" v-model="location" @change="handleLocationChange()">
      <option value="" disabled selected>Location</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { useFilterStore } from "~/stores/FilterStore";

export default {
  name: "LocationDropdown",
  data() {
    return {
      location: "",
      options: ["Location 1", "Location 2"], // to be changed - on component mount - need to get locations/sites from json file and asign it to options:
    };
  },
  methods: {
    handleLocationChange() {
      const filterStore = useFilterStore();
      filterStore.location = this.location;
      // update chart - tbh no need to update cuz all we have to do is to
      filterStore.loading = true;
      console.log(filterStore.hideRecommendation);
      filterStore.hideRecommendation = false;
      console.log(
        this.location,
        filterStore.location,
        filterStore.hideRecommendation
      );
    },
  },
};
</script>

<style></style>
