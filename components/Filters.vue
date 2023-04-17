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

export default {
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
