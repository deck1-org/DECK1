<script setup>
<script setup>
import Chart from "chart.js/auto";
import { start } from "@/utils/wdtCalculations";
import { useWeatherStore } from "@/stores/WeatherStore";

const weatherStore = useWeatherStore();

const storeData = start(8, 20);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let myChart;

const data = {
  labels,
  datasets: [
    {
      label: "CTV Small",
      backgroundColor: "#59b266",
      borderColor: "#333333",
      data: weatherStore.ctvSmallData,
    },
    {
      label: "CTV Large",
      backgroundColor: "#f9ce55",
      borderColor: "#333333",
      data: weatherStore.ctvLargeData,
    },
    {
      label: "SOV",
      backgroundColor: "#fc8181",
      borderColor: "#333333",
      data: weatherStore.sovData,
    },
    {
      label: "Site",
      backgroundColor: "#718096 ",
      borderColor: "#333333",
      data: weatherStore.siteData,
    },
    {
      label: "Heli",
      backgroundColor: "#b794f4 ",
      borderColor: "#333333",
      data: weatherStore.heliData,
    },
  ],
};

const config = {
  type: "bar",
  data,
  options: {},
};

onMounted(() => {
  myChart = new Chart(document.getElementById("myChart"), config);
});

const handleColorChange = () => {
  myChart.data.datasets[0].backgroundColor = "#0000FF";
  myChart.update();
};
</script>

<template>
  <div class="deck-frame-white">
    <button v-on:click="handleColorChange">Change color</button>
    <canvas id="myChart"></canvas>
  </div>
</template>
