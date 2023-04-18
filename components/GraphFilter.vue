<template>
    <div 
    v-if="showComponents" 
    class="w-4/5 p-3 flex pt-10 relative mb-16">
        <div class="flex text-lg flex justify-between mb-[4px] absolute top-0 w-[894px]">
            <div 
            class="flex gap-1.5 items-center hover:text-gray-400 group hover:translate-y-[-3px] 
                    transition-all ease-in-out cursor-pointer left-[2px]">
                <IconsHide class="stroke-1 group-hover:text-yellow-400" />
                <p class="text-decoration" @click="hideToggle">Hide</p>
            </div>
            <div 
                v-if="chartId !== 1"
                class="flex gap-1.5 flex-row-reverse items-center hover:text-gray-400 
                group hover:translate-y-[-3px] transition-all ease-in-out cursor-pointer">
                    <IconsRemove class="stroke-1 group-hover:text-red-400" />
                    <p class="text-decoration" @click="emitRemove">Remove</p>
            </div>
        </div>
          <ChartComponent
          class="w-full"
          :key="chartComponentKey" 
          :filterParams="filterParams"/>
        <div class="w-1/5 p-3">
          <Filters @buttonClick="handleButtonClick" :filterParams="filterParams"/>
        </div>
    </div>
    <div 
    v-else
    class="mb-24">
        <div 
            class="flex gap-1.5 items-center hover:text-gray-400 
                group hover:translate-y-[-3px] transition-all ease-in-out cursor-pointer">
                <IconsHide class="stroke-1 group-hover:text-yellow-400" />
                <p class="text-decoration" @click="hideToggle">Show graph...</p>
            </div>
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
            showComponents: true,
            filterParams: {
            startHour: ref(0),
            endHour: ref(23),
            startMonth: ref(1),
            endMonth: ref(12),
            years: ref(10),
            chartId: props.chartId,
            },
        }
    },
    methods: {
        handleButtonClick(data) {
            // Update the value of chartComponentKey to force remount of ChartComponent
            console.log(data)
            this.filterParams.startHour = data.startHour;
            this.filterParams.endHour = data.endHour;
            this.filterParams.startMonth = data.startMonth;
            this.filterParams.endMonth = data.endMonth;
            this.filterParams.years = data.years;
            this.chartComponentKey = !this.chartComponentKey
        },
        emitRemove() {
            this.$emit("remove", this.filterParams.chartId);
        },
        hideToggle(){
            console.log(this.filterParams.years)
            this.showComponents = !this.showComponents;
        }
    }
}
</script>