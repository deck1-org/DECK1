<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="w-1/5 h-20 p-3">
      <LocationDropdown />
    </div>
    <div class="w-4/5 h-20 p-3">
      <RecommendationPopUp />
    </div>
    <div>
      <GraphFilter :chartId="chartId" />
      <GraphFilter v-if="show2" :chartId="chartId" />
      <GraphFilter v-if="show3" :chartId="chartId" />
    </div>
    <button
    type="button"
    class="w-4/5 inline-block border-2 rounded-full pb-4 pt-2"
    @click="addGraph">
    <!-- /*<IconsAdd /> --> Add more graph
    </button>
    <!-- <div class="w-4/5 p-3">
        <AssetConfiguration />
    </div> -->
  </div>
</template>

<script>
export default {
  layout: "default",
  name: "WeatherDownTime",
  data(){
    return {
      chartId: ref(1),
      show2: ref(false),
      show3: ref(false),
    }
  },
  methods: {
    addGraph() {
      this.chartId++;
      switch (this.chartId) {
        case 2:
          this.show2 = true;
          break;
        case 3:
          this.show3 = true;
      }
    }
  }
}
</script>
