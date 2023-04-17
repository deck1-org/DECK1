<template>
    <div class="w-4/5 p-3">
          <ChartComponent :key="chartComponentKey" :startHour="startHour" :endHour="endHour" :startMonth="startMonth" :endMonth="endMonth" :years="years" :chartId="chartId"/>
        </div>
        <div class="w-1/5 p-3">
          <Filters @buttonClick="handleButtonClick"/>
    </div>
</template>

<script>
export default {
    layout: "default",
    name: "WeatherDownTime",
    props: {
        chartId: Number
    },
    data(props) {
        return {
            chartComponentKey: false,
            startHour: ref(0),
            endHour: ref(23),
            startMonth: ref(1),
            endMonth: ref(12),
            years: ref(2),
            chartId: props.chartId,
        }
    },
    methods: {
        handleButtonClick(data) {
            // Update the value of chartComponentKey to force remount of ChartComponent
            console.log(this.chartId)
            this.startHour = data.startHour;
            this.endHour = data.endHour;
            this.startMonth = data.startMonth;
            this.endMonth = data.endMonth;
            this.years = data.years;
            this.chartComponentKey = !this.chartComponentKey
        }
    }
}
</script>