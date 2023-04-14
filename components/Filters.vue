<template>
  <div class="flex w-full h-full deck-frame-white">
    <h2 class="text-lg w-full font-semibold">Filters</h2>

    <div class="pt-5 w-full flex justify-between relative">
      <label for="startHour">Working hours: </label>
      <div>
        <IconsInfo
          class="cursor-pointer"
          @mouseover="showTooltip = true"
          @mouseout="showTooltip = false"
        />
        <div
          v-show="showTooltip"
          class="tooltip bg-gray-200 text-black p-2 absolute rounded-xl top-full right-0 shadow"
        >
          <p>Input fields accept</p>
        </div>
      </div>
    </div>

    <div class="p-5 flex w-full justify-around">
      <input
        class="filter-input"
        ref="inputStartHour"
        type="number"
        id="startHour"
        v-model="startHour"
      />
      -
      <input
        class="filter-input"
        ref="inputEndHour"
        type="number"
        id="endHour"
        v-model="endHour"
      />
    </div>
    <p class="text-red-600 w-full" v-if="error">{{ errorMessage }}</p>

    <button
      class="rounded-md border-2 text-center px-2"
      @click="emitButtonClick"
    >
      Apply changes
    </button>
  </div>
</template>

<script>
import { useWeatherStore } from "@/stores/WeatherStore";

export default {
  data() {
    return {
      startHour: ref(useWeatherStore().startHour),
      endHour: ref(useWeatherStore().endHour),
      error: ref(false),
      errorMessage: ref("Enter a valid input!"),
      showTooltip: false,
    };
  },
  methods: {
    emitButtonClick() {
      const store = useWeatherStore();
      this.checkInput();
      if (
        !this.error &&
        (this.startHour !== store.startHour ||
        this.endHour !== store.endHour)
      ) {
        store.startHour = this.startHour;
        store.endHour = this.endHour;
        this.$emit("buttonClick");
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
        //foolproof
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
