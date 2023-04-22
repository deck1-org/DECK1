<script>
import Chart from "chart.js/auto";
import { start } from "@/utils/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";

export default {
  props: {
    filterParams: {
      startHour: Number,
      endHour: Number,
      startMonth: Number,
      endMonth: Number,
      years: Number,
      chartId: Number,
    },
  },
  setup(props) {
    const weatherStore = useWeatherStore();
    onMounted(() => {
      start(
        props.filterParams.startHour, // instead of passing it as a properties for the function we could read the stuff from the store in calculations, that way we can use start method in other places, and dont have to pass it as props through components
        props.filterParams.endHour,
        props.filterParams.startMonth,
        props.filterParams.endMonth,
        props.filterParams.years
      );
      const myChart = new Chart(
        document.getElementById("wdtChart" + props.filterParams.chartId),
        {
          type: "bar",
          data: {
            labels: weatherStore.labels.slice(
              props.filterParams.startMonth - 1,
              props.filterParams.endMonth
            ),
            datasets: [
              {
                label: "Site",
                data: weatherStore.siteData.slice(
                  props.filterParams.startMonth - 1,
                  props.filterParams.endMonth
                ),
                backgroundColor: "#718096 ",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "CTV Small",
                data: weatherStore.ctvSmallData.slice(
                  props.filterParams.startMonth - 1,
                  props.filterParams.endMonth
                ),
                backgroundColor: "#59b266",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "CTV Large",
                data: weatherStore.ctvLargeData.slice(
                  props.filterParams.startMonth - 1,
                  props.filterParams.endMonth
                ),
                backgroundColor: "#f9ce55",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "SOV",
                data: weatherStore.sovData.slice(
                  props.filterParams.startMonth - 1,
                  props.filterParams.endMonth
                ),
                backgroundColor: "#fc8181",
                borderColor: "#333333",
                borderRadius: 10,
              },
              {
                label: "Heli",
                data: weatherStore.heliData.slice(
                  props.filterParams.startMonth - 1,
                  props.filterParams.endMonth
                ),
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
        }
      );
    });
  },
};
</script>

<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'wdtChart' + filterParams.chartId"></canvas>
  </div>
</template>
