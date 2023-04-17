<script setup>
import Chart from "chart.js/auto";
import { start } from "@/utils/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";

const weatherStore = useWeatherStore();

let myChart;

onMounted(() => {
  for (let i = 1; i < 4; i++) {
    switch(i) {
      case 1: 
        start(2);
      break;
      case 2:
        start(10);
        break;
        case 3:
        start(20);
        break;
    }
  myChart = new Chart(document.getElementsByClassName("mychart"+i), {
    type: "bar",
    data: {
      labels: weatherStore.labels.slice(weatherStore.startMonth-1, weatherStore.endMonth),
      datasets: [
        {
          label: "Site",
          data: weatherStore.siteData.slice(weatherStore.startMonth-1, weatherStore.endMonth),
          backgroundColor: "#718096 ",
          borderColor: "#333333",
          borderRadius: 10,
        },
        {
          label: "CTV Small",
          data: weatherStore.ctvSmallData.slice(weatherStore.startMonth-1, weatherStore.endMonth),
          backgroundColor: "#59b266",
          borderColor: "#333333",
          borderRadius: 10,
        },
        {
          label: "CTV Large",
          data: weatherStore.ctvLargeData.slice(weatherStore.startMonth-1, weatherStore.endMonth),
          backgroundColor: "#f9ce55",
          borderColor: "#333333",
          borderRadius: 10,
        },
        {
          label: "SOV",
          data: weatherStore.sovData.slice(weatherStore.startMonth-1, weatherStore.endMonth),
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
}
});
</script>

<template>
  <div class="deck-frame-white">
    <p v-if="useWeatherStore().show2yrs">2 years</p>
    <canvas title="2 years" v-if="useWeatherStore().show2yrs" className="mychart1"></canvas>
    <p v-if="useWeatherStore().show10yrs">10 years</p>
    <canvas title="10 years" v-if="useWeatherStore().show10yrs" className="mychart2"></canvas>
    <p v-if="useWeatherStore().show20yrs">20 years</p>
    <canvas title="20 years" v-if="useWeatherStore().show20yrs" className="mychart3"></canvas>
  </div>
</template>
