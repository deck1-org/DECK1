<template>
  <div class="flex w-full h-full deck-frame-white">
    <h2 class="text-lg w-full font-semibold">Filters</h2>
    <div class="pt-5 w-full flex justify-between relative">
      <label for="startHour">Working hours: </label>
    </div>
    <div class="p-2 flex w-full justify-around">
      <div class="range-slider">
        <span @change="slider">
          <input v-model.number="startHour" ref="inputStartHour" type="number" min="0" max="23"/>
          <input v-model.number="endHour" ref="inputEndHour" type="number" min="0" max="23"/></span>
          <input @change="slider" v-model.number="startHour" ref="inputStartHour" min="0" max="23" step="1" type="range" />
          <input @change="slider" v-model.number="endHour" ref="inputEndHour" min="0" max="23" step="1" type="range" />
        <svg width="100%" height="16"></svg>
      </div>
    </div>
    <p class="text-red-600 w-full" v-if="error">{{ errorMessage }}</p>

    <div class="pt-5 w-full flex justify-between relative">
      <label for="startMonth">Months from-to: </label>
    </div>
    <div class="p-2 pb-8 flex w-full justify-around">
      <div class="range-slider">
        <span @change="slider">
          <input v-model.number="startMonth" type="number" min="1" max="12"/>
          <input v-model.number="endMonth" type="number" min="1" max="12"/></span>
          <input @change="slider" v-model.number="startMonth" min="1" max="12" step="1" type="range" />
          <input @change="slider" v-model.number="endMonth" min="1" max="12" step="1" type="range" />
        <svg width="100%" height="16"></svg>
      </div>
    </div>
    <button
      class="mx-2 my-3 p-0.5 px-3 rounded-md border-2 text-center px-2"
      @click="emitButtonClick"
    >
      Apply changes
    </button>
  </div>
</template>

<script>

import VueRangeSlider from 'vue-range-slider';

export default {
  components: {
    VueRangeSlider,
  },
  data() {
    return {
      startHour: ref(0),
      endHour: ref(23),
      startMonth: ref(1),
      endMonth: ref(12),
      years: ref(10),
      error: ref(false),
      errorMessage: ref("Enter a valid input!"),
      showTooltip: false,
    };
  },
  methods: {
    emitButtonClick() {
      this.checkInput();
      if (!this.error) {
        const data = {
          startHour: this.startHour,
          endHour: this.endHour,
          startMonth: this.startMonth,
          endMonth: this.endMonth,
          years: this.years,
        }
        this.$emit("buttonClick", data);
      }
    },
    checkInput() {
      if (
        this.$refs.inputStartHour.value < 0 ||
        this.$refs.inputEndHour.value < 0 ||
        this.$refs.inputEndHour.value > 23 ||
        this.$refs.inputStartHour.value > 23 ||
        Number(this.$refs.inputStartHour.value) >
        Number(this.$refs.inputEndHour.value) ||
        Number(this.$refs.inputStartHour.value) % 1 !== 0 ||
        Number(this.$refs.inputEndHour.value) % 1 !== 0 ||
        this.$refs.inputEndHour.value === "" ||
        this.$refs.inputStartHour.value === ""
      ) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
  },
};
</script>

<style scoped>
/* disable arrows/spinners in input field */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
