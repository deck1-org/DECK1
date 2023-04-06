<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    <br>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { Colors } from 'chart.js';
  import all_data from '@/assets/AllData.json'
  
  ChartJS.register(Title, Colors, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  // ARRAYS TO DISPLAY
  let current_day = 0;
  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let [wdt_ctv_small, wdt_ctv_big, wdt_sov, wdt_site, wdt_heli] = Array.from({ length: 5 }, () => Array.from({ length: 12 }, () => []));
  let [day_ctv_small, day_ctv_big, day_sov, day_site, day_heli] = Array.from({ length: 5 }, () => []);
  let [ctv_small, ctv_big, sov, site, heli] = Array.from({ length: 5 }, () => Array.from({ length: 12 }, () => 0));

  // CONFIG LIMITS
  const conf_ctv_small_limit = 1.5;             // m
  const conf_ctv_big_limit = 1.75;              // m
  const conf_sov_limit = 2.75;                  // m
  const conf_site_limit = 18;                   // m/s
  const conf_heli_visibility_limit = 5;         // km
  const conf_heli_cloudbase_limit = 1;          // 0 ==> no fly | 1 ==> good to go (fly?)
  
  // CONFIG THRESHOLDS - percentage of a day that can be no-fly
  const conf_ctv_small_threshold = 0.5; // 75% no fly --> NO WDT | 80% no fly --> WDT
  const conf_ctv_big_threshold = 0.5;
  const conf_sov_threshold = 0.5;
  const conf_site_threshold = 0.5;
  const conf_heli_threshold = 0.5;

  export default {
    name: 'BarChart',
    methods: {
      countYears(data_set) {      // Return amount of unique years
        return new Set(data_set.map(({ Year }) => Year)).size;
      },
      countValue(arr, value) {    // return amount of "value" in array
        return arr.reduce((count, num) => num === value ? count + 1 : count, 0);
      },
      evaluateArray(arr, threshold = 0.5) {  // % of zeroes in the array >= 0.5  ---> 0
        const ones = arr.filter(num => num === 1).length;
        const zeroes = arr.filter(num => num === 0).length;
        return zeroes / arr.length >= threshold ? 0 : 1;
      },
      finalArrays(data_set){
        let years = this.countYears(data_set);
        for (let i = 0; i < 12; i++){
          ctv_small[i] = this.countValue(wdt_ctv_small[i], 0) / years;
          ctv_big[i] = this.countValue(wdt_ctv_big[i], 0) / years;
          sov[i] = this.countValue(wdt_sov[i], 0) / years;
          site[i] = this.countValue(wdt_site[i], 0) / years;
          heli[i] = this.countValue(wdt_heli[i], 0) / years;
        }
      },      
      start(data_set, timeRangeStart, timeRangeEnd) {
        for (let obj of data_set) {
          this.fillArrays(obj, timeRangeStart, timeRangeEnd)
        }
        this.finalArrays(data_set);
      },  
      fillArrays(obj, timeRangeStart, timeRangeEnd) { 
        let current_hour = Number(obj["Hour"]) 
        if (current_hour >= timeRangeStart && current_hour <= timeRangeEnd) {
          if (current_day === Number(obj["Day"])) {    
            let hs = parseFloat(obj["Significant wave height (Hs)"])
            let windspeed = parseFloat(obj["Wind speed 115m"])
            let visibility = parseFloat(obj["Visibility"])
            let cloudBase = Number(obj["VFR cloud"])

            day_sov.push(hs <= conf_sov_limit ? 1 : 0);
            day_ctv_big.push(hs <= conf_ctv_big_limit ? 1 : 0);
            day_ctv_small.push(hs <= conf_ctv_small_limit ? 1 : 0);

            day_site.push(windspeed <= conf_site_limit ? 1 : 0);
            day_heli.push(visibility >= conf_heli_visibility_limit && cloudBase === conf_heli_cloudbase_limit ? 1 : 0);
          }
          else { // If day changes
            // push wdt for 1 day to month array
            wdt_ctv_small[obj["Month"]-1].push(this.evaluateArray(day_ctv_small, conf_ctv_small_threshold));  
            wdt_ctv_big[obj["Month"]-1].push(this.evaluateArray(day_ctv_big, conf_ctv_big_threshold));
            wdt_sov[obj["Month"]-1].push(this.evaluateArray(day_sov, conf_sov_threshold));
            wdt_site[obj["Month"]-1].push(this.evaluateArray(day_site, conf_site_threshold));
            wdt_heli[obj["Month"]-1].push(this.evaluateArray(day_heli, conf_heli_threshold));

            [day_ctv_small, day_ctv_big, day_sov, day_site, day_heli] = [[], [], [], [], []]; // reset array

            current_day = Number(obj["Day"]);                                       // update day
            this.fillArrays(obj, timeRangeStart, timeRangeEnd);                     // re-run method with updated day
          }
        }
      }
    },
    created() {
      this.start(all_data, 8, 20);
    },

    components: { Bar },
    data() {
      return {
        chartData: {
          labels: labels,
          datasets: [
            {
              label: "Site",
              backgroundColor: "#F57E31",
              data: site,
            },  
            {
              label: "CTV small",
              backgroundColor: "#A7A7A7",
              data: ctv_small,
            },
            {
              label: "CTV big",
              backgroundColor: "#FFC73B",
              data: ctv_big,
            },
            {
              label: "SOV",
              backgroundColor: "#6AA3DB",
              data: sov,
            },

            {
              label: "Heli",
              backgroundColor: "#FFFF00",
              data: heli,
            },
          ]
        },
        chartOptions: {
          responsive: true,
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Custom Chart Title'
              }
            }
          },
          backgroundColor: '#07ffbd',
          borderColor: 'white'
        }
      }
    }
  }
  </script>