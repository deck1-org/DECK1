<script setup lang="ts">
import Chart from "chart.js/auto";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

let myChart;

const data = {
  labels,
  datasets: [
    {
      label: "My first ass",
      backgroundColor: "#444444",
      borderColor: "#333333",
      data: [1, 10, 5, 3, 20, 30, 40],
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
