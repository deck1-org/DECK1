<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="w-1/5 h-20 p-3">
      <LocationDropdown />
    </div>
    <div class="w-4/5 h-20 p-3">
      <RecommendationPopUp />
    </div>
    <div class="flex flex-col">
    <div v-for="id in ids" :key="id">
      <GraphFilter @remove="handleRemove" :chartId="id" />
    </div>
      <button
      v-if="ids.length !== 3"
      type="button"
      class="w-[898px] border-2 rounded-full py-1 ml-[12px] mt-[-16px]"
      @click="addGraph">
      <!-- /*<IconsAdd /> --> <p class="font-semibold text-[18px] text-gray-800">Add more graph</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  name: "WeatherDownTime",
  data(){
    return {
      ids: [1],
      show: ref(false),
    }
  },
  methods: {
    addGraph() {
      this.ids.push(this.ids[this.ids.length-1]+1)
    },
    handleRemove(id) {
      console.log('id: ' + id)
      if(this.ids.length !== 1){
      this.ids = this.ids.filter((el) => el !== id);
      }
    }
  }
}
</script>
