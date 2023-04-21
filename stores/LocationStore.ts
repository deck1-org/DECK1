import { defineStore } from "pinia";

export const useLocationStore = defineStore("LocationStore",{
    state: () => {
        const location1 = reactive<object>({id: 1,name: "Location 1",latitude: "55.675758",longitude: "12.569020", limit: 15});
        const location2 = reactive<object>({id: 2,name: "Location 2",latitude: "59.913868",longitude: "10.752245", limit: 21});
        const location3 = reactive<object>({id: 3,name: "Location 3",latitude: "34.321843",longitude: "19.231034", limit: 13});
        const location4 = reactive<object>({id: 4,name: "Location 4",latitude: "42.497681",longitude: "27.470030", limit: 19});
        const locations = [location1, location2, location3, location4];
        
        return{
            location1,
            location2,
            location3,
            location4,
            locations,
        };
    },
});