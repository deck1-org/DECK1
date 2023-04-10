<template>
  <div class="deck-frame-white h-full justify-center">
    <!-- <select id="location" v-model="location">
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select> -->

    <select id="location" v-model="location">
      <option value="" disabled selected>Location</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LocationDropdown",
  data() {
    return {
      location: "",
      options: ["Location 1", "Location 2"], // to be changed - on component mount - need to get locations/sites from json file and asign it to options:
    };
  },
};
</script>

<style></style>
