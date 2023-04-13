<template>
  <div class="bg-blue w-full deck-frame-white flex-col space-y-4 pb-20">
    <h3>Filters</h3>
    <label class="pt-4" for="startHour">Start Hour: (0-23)</label>
    <input class="w-32 rounded-md text-center" ref="inputStartHour" type="number" id="startHour" v-model="startHour" />

    <label class="pt-4" for="endHour">End Hour: (0-23)</label>
    <input class="w-32 rounded-md text-center" ref="inputEndHour" type="number" id="endHour" v-model="endHour" />
    
    <button class="pt-4 w-32" @click="emitButtonClick">Filter</button>
    <p class="text-red-600" v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useWeatherStore } from "@/stores/WeatherStore";

export default  {
data(){
    return {
      startHour: ref(useWeatherStore().startHour), 
      endHour: ref(useWeatherStore().endHour),
      error: ref(false),
      errorMessage: ref('Enter a valid input! (0-23)')
    }
  },
  methods: {
    emitButtonClick(){
      const store = useWeatherStore()
      this.checkInput()
      if (!this.error && this.startHour !== store.startHour && this.endHour !== store.endHour){
        store.startHour = this.startHour
        store.endHour = this.endHour
        this.$emit('buttonClick')
      }
    },
    checkInput(){
      if (this.$refs.inputStartHour.value < 0 || this.$refs.inputEndHour.value < 0 || 
          this.$refs.inputEndHour.value > 23 || this.$refs.inputStartHour.value > 23 ||
          Number(this.$refs.inputStartHour.value) > Number(this.$refs.inputEndHour.value) ||
          Number(this.$refs.inputStartHour.value) % 1 !== 0 || Number(this.$refs.inputEndHour.value) % 1 !== 0 ||
          this.$refs.inputEndHour.value === '' || this.$refs.inputStartHour.value === ''
          ){ //foolproof
        this.error = true;
      } else {
        this.error = false
      }
    }
  }
}
</script>

<style scoped>
/* disable arrows/spinners in input field */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
