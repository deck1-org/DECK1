<template>
  <div class="w-full h-full deck-frame-grey inline-block">
    <div class="w-1/5 h-20 p-3">
      <LocationDropdown @loading="toggleChartKey" />
    </div>
    <div class="w-4/5 h-20 p-3">
      <RecommendationPopUp />
    </div>
    <div class="flex flex-col">
      <div v-for="id in ids" :key="id">
        <GraphFilter :key="chartKey" @remove="handleRemove" :chartId="id" :amountOfCharts="ids.length"/>
      </div>
    </div>  
    <div class="w-full p-3">
      <button
        v-if="ids.length !== 3"
        type="button"
        class="w-full border-2 border-gray-400 rounded-full py-1 font-semibold text-xl text-gray-600"
        @click="addGraph"
      >
        Add more graphs
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  name: "WeatherDownTime",
  data() {
    return {
      ids: [],
      chartKey: false,
    };
  },
  mounted(){
    this.ids.push(1);
  },
  methods: {
    addGraph() {
      this.ids.push(this.ids[this.ids.length - 1] + 1);
    },
    handleRemove(id) {
      if (this.ids.length !== 1) {
        this.ids = this.ids.filter((el) => el !== id);
      }
    },
    toggleChartKey() {
      this.chartKey = !this.chartKey;
    },
  },
};
</script>
