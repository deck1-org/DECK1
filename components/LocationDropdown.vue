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
      filterStore.hideRecommendation = false;
      // filterStore.loading = true; setting loading vlaue to true, so we can show loading wheel instead of chart with old data
    },
  },
};
</script>

<style></style>
