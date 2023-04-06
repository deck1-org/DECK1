<template>
    <!-- <p style="color: red" v-for="hour in hours" :key="hour.hour">
        {{ hour.Year }} {{ hour.Month }} {{ hour.Day }} {{ hour.Hour }} {{ hour["Wind speed 115m"]}} {{ hour["Sea temperature"] }} {{ hour.Visibility }}
        {{ hour.Lightning }} {{ hour["Heli blade icing"] }} {{ hour["VFR cloud"] }}
    </p> -->
    <div class="table">
    <h1>THE DATA!!</h1>
    <div class="table-container">
      <div class="table-col">
        <HoursRow :isHeader="true"></HoursRow>
        <HoursRow v-for="(hour, index) in hours" 
        :key="index"
        :index="index+1"
        :year="hour.Year"
        :month="hour.Month"
        :day="hour.Day"
        :hour="hour.Hour"
        :windspeed="hour.Windspeed"
        :hs="hour.Hs"
        :seatemp="hour.Seatemp"
        :visibility="hour.Visibility"
        :lightning="hour.Lightning"
        :heli_blade_icing="hour.Heli_blade_icing"
        :vfrCloud="hour.VFRCloud"
        />
      </div>
    </div>
  </div>
</template>
<script>

import Hours from '@/assets/one_year.json'
import HoursRow from '../components/HoursRow.vue';

export default {
    setup() {
        return { hours: Hours };
    },
    components: { HoursRow },
}

console.log(Hours)
</script>

<style scoped>
 .table {
  margin: 3rem 0;
  margin-right: 25rem;
}
.table h1 {
  margin-bottom: 2rem;
}
.table-container {
  display: flex;
  justify-content: space-between;
}
.table-col {
  width: 48%;
}
h1 {
  text-align: center;
}
</style>