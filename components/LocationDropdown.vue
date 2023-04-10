<template>
  <div>
    <label for="ice-cream">Location:</label>
    <select id="ice-cream" v-model="iceCream" class="border-2 border-black">
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Example",
  data() {
    return {
      iceCream: "",
      options: ["Chocolate", "Coconut", "Mint", "Strawberry", "Vanilla"],
    };
  },
};
</script>
