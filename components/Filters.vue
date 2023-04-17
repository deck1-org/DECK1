<template>
  <div class="flex w-full h-full deck-frame-white">
    <h2 class="text-lg w-full font-semibold">Filters</h2>

    <div class="mt-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="w-6 h-6 rounded-full" v-model="show2yrs" />
        <span class="ml-2">2</span>
        <input type="checkbox" class="w-6 h-6 rounded-full" v-model="show10yrs" />
        <span class="ml-2">10</span>
        <input type="checkbox" class="w-6 h-6 rounded-full" v-model="show20yrs" />
        <span class="ml-2">20</span>
      </label>
    </div>
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

    <div class="pt-5 w-full flex justify-between relative">
      <label for="startHour">Months from-to: </label>
    </div>
    <div class="p-5 flex w-full justify-around">
      <input
        class="filter-input"
        ref="inputStartMonth"
        type="number"
        id="startMonth"
        v-model="startMonth"
      />
      -
      <input
        class="filter-input"
        ref="inputEndMonth"
        type="number"
        id="endMonth"
        v-model="endMonth"
      />
    </div>
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
      startMonth: ref(useWeatherStore().startMonth),
      endMonth: ref(useWeatherStore().endMonth),
      show2yrs: ref(useWeatherStore().show2yrs),
      show10yrs: ref(useWeatherStore().show10yrs),
      show20yrs: ref(useWeatherStore().show20yrs),
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
        ((this.startHour !== store.startHour ||
        this.endHour !== store.endHour) ||
        (this.startMonth !== store.startMonth ||
          this.endMonth !== store.endMonth)) ||
        (this.show2yrs !== store.show2yrs || this.show10yrs !== store.show10yrs || this.show20yrs !== store.show20yrs)
      ) {
        store.startHour = this.startHour;
        store.endHour = this.endHour;
        store.startMonth = this.startMonth;
        store.endMonth = this.endMonth;
        store.show2yrs = this.show2yrs;
        store.show10yrs = this.show10yrs;
        store.show20yrs = this.show20yrs;
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
