<script setup>
import Chart from "chart.js/auto";
import { start } from "@/utils/wdtCalculations"
import { useWeatherStore } from "@/stores/WeatherStore";

const store = useWeatherStore().weatherData;
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let myChart;

const data = {
  labels,
  datasets: [
    {
      label: "CTV SMALL",
      backgroundColor: "#444444",
      borderColor: "#333333",
      data: start(store, 8, 20)[0],
    },
    {
      label: "CTV BIG",
      backgroundColor: "#444444",
      borderColor: "#333333",
      data: start(store, 8, 20)[1],
    },
    {
      label: "SOV",
      backgroundColor: "#444444",
      borderColor: "#333333",
      data: start(store, 8, 20)[2],
    },
    {
      label: "Site",
      backgroundColor: "#444444",
      borderColor: "#333333",
      data: start(store, 8, 20)[3],
    },
    {
      label: "Heli",
      backgroundColor: "#444444",
      borderColor: "#333333",
      data: start(store, 8, 20)[4],
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
  <button v-on:click="handleColorChange">Change color</button>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>
