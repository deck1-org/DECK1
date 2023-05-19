<template>
  <div class="w-full h-full deck-frame-grey inline-block">
    <div class="w-1/5 h-20 p-3">
      <LocationDropdown @loading="toggleLoading" />
    </div>
    <div v-if="loading" class="w-1/5 h-20 p-3">
      <p>Loading data...</p>
    </div>
    <div class="w-4/5 h-20 p-3">
      <RecommendationPopUp />
    </div>
    <div class="flex flex-col">
      <div v-for="id in ids" :key="id">
        <GraphFilter @remove="handleRemove" :chartId="id" :amountOfCharts="ids.length"/>
      </div>
    </div>
    <div class="w-full p-3">
      <button
        v-if="ids.length !== 3"
        type="button"
        class="w-full border-2 border-gray-400 rounded-full py-1 font-semibold text-xl text-gray-600"
        @click="addGraph"
      >
        Add more graph
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
      ids: [1],
      loading: false,
    };
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
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
