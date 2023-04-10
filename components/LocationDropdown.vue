<template>
  <div>
    <label for="location">Location:</label>
    <select id="location" v-model="location" class="border-2 border-black">
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
      options: ["Location 1", "Location 2"],
    };
  },
};
</script>

<style></style>
