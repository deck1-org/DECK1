<script setup lang="ts">

interface RowProps {
    index?: number;
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    windspeed?: string;
    hs?: string;
    seatemp?: string;
    visibility?: string;
    lightning?: string;
    heli_blade_icing?: string;
    vfrCloud?: string;
    isHeader?: boolean;
}

const props = defineProps<RowProps>();
</script>

<template>
    <div class="row" v-if="isHeader">
        <h4 class="header">RowCount</h4>
        <h4 class="header">Year</h4>
        <h4 class="header">Month</h4>
        <h4 class="header">Day</h4>
        <h4 class="header">Hour</h4>
        <h4 class="header">Wind speed</h4>
        <h4 class="header">Significant wave height</h4>
        <h4 class="header">Sea temperature</h4>
        <h4 class="header">Visibility</h4>
        <h4 class="header">Lightning</h4>
        <h4 class="header">Heli blade icing</h4>
        <h4 class="header">VFR Cloud</h4>
    </div>
    <div 
    v-else 
    class="row">
        <h4 class="cell">{{ index }}</h4>
        <h4 class="cell">{{ year }}</h4>
        <h4 class="cell">{{ month }}</h4>
        <h4 class="cell">{{ day }}</h4>
        <h4 class="cell">{{ hour }}</h4>
        <h4 class="cell">{{ hs }}</h4>
        <h4 class="cell">{{ windspeed }}</h4>
        <h4 class="cell">{{ seatemp }}</h4>
        <h4 class="cell">{{ visibility }}</h4>
        <h4 class="cell">{{ lightning }}</h4>
        <h4 class="cell">{{ heli_blade_icing }}</h4>
        <h4 class="cell">{{ vfrCloud }}</h4>
    </div>
</template>

<style scoped>
.row {
  border-top: 1px solid rgba(128, 128, 128, 0.336);
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: rgb(10, 31, 148);
  font-weight: 700;
  margin: 0;
  margin-right: 2rem;
  padding: 0.3rem 1rem;
  width: 200%;
}
.header {
  font-size: 1.25rem;
  color: rgb(10, 31, 148);
  font-weight: 700;
  margin: 0;
  margin-right: 3rem;
  padding: 0.5rem 2rem -1rem;
  width: 4rem; /*padding,margin-right,width has to match with */
}
.cell {
  font-size: 1.25rem;
  color: crimson;
  margin: 0;
  font-weight: 400;
  margin-right: 3.3rem;
  padding: 0.5rem 2rem -1rem;
  width: 4rem;
}
</style>