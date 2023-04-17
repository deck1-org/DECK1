<script>
import Chart from "chart.js/auto";
import { start } from "@/utils/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";

export default {
  props: {
      startHour: Number,
      endHour: Number,
      startMonth: Number,
      endMonth: Number,
      years: Number,
      chartId: Number,
  },
  setup(props) {
    const weatherStore = useWeatherStore();
    onMounted(() => {
        start(props.startHour, props.endHour, props.startMonth, props.endMonth, props.years);
        const myChart = new Chart(document.getElementById("mychart" + props.chartId), {
          type: "bar",
          data: {
            labels: weatherStore.labels.slice(props.startMonth-1, props.endMonth),
            datasets: [
              {
                label: "Site",
                data: weatherStore.siteData.slice(props.startMonth-1, props.endMonth),
                backgroundColor: "#718096 ",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "CTV Small",
                data: weatherStore.ctvSmallData.slice(props.startMonth-1, props.endMonth),
                backgroundColor: "#59b266",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "CTV Large",
                data: weatherStore.ctvLargeData.slice(props.startMonth-1, props.endMonth),
                backgroundColor: "#f9ce55",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "SOV",
                data: weatherStore.sovData.slice(props.startMonth-1, props.endMonth),
                backgroundColor: "#fc8181",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "Heli",
                data: weatherStore.heliData.slice(weatherStore.startMonth-1, weatherStore.endMonth),
                backgroundColor: "#b794f4 ",
                borderColor: "#333333",
                borderRadius: 10,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
    })
  }
};
</script>

<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'mychart' + chartId"></canvas>
  </div>
</template>
