<script setup>
import Chart from "chart.js/auto";
import { start } from "@/utils/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";

const weatherStore = useWeatherStore();

let myChart;

onMounted(() => {
  start(Number(weatherStore.startHour), Number(weatherStore.endHour));

  myChart = new Chart(document.getElementById("myChart"), {
    type: "bar",
    data: {
      labels: [
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
      ],
      datasets: [
        {
          label: "CTV Small",
          data: weatherStore.ctvSmallData,
          backgroundColor: "#59b266",
          borderColor: "#333333",
          borderRadius: 10,
        },
        {
          label: "CTV Large",
          data: weatherStore.ctvLargeData,
          backgroundColor: "#f9ce55",
          borderColor: "#333333",
          borderRadius: 10,
        },
        {
          label: "SOV",
          data: weatherStore.sovData,
          backgroundColor: "#fc8181",
          borderColor: "#333333",
          borderRadius: 10,
        },
        {
          label: "Site",
          data: weatherStore.siteData,
          backgroundColor: "#718096 ",
          borderColor: "#333333",
          borderRadius: 10,
        },
        {
          label: "Heli",
          data: weatherStore.heliData,
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
});
</script>

<template>
  <div class="deck-frame-white">
    <canvas id="myChart"></canvas>
  </div>
</template>
