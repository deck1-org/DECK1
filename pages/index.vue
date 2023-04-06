<script>

// import BarChart from '@/components/BarChart.vue';
// import HoursTable from './HoursTable.vue'

// export default {
//   name: 'App',
//   components: { BarChart, HoursTable }
// }
</script>

<template>
  <BarChart />
    <NuxtLink to="/HoursTable">
      <h1>Go to data</h1>
    </NuxtLink>
</template>

<style>
  h1{
    color:red;
    text-align: center;
    padding-top: 50px;
  }
</style>
