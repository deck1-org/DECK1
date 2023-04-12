<template>
    <div class="bg-blue w-full deck-frame-white flex-col">
        <div>Asset configuration</div>
        <div class="justify-items-stretch flex">
            <label>WDT threshold:</label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              v-model="wdtThreshold"
            />
            {{ wdtThreshold }}
        </div>
        <div class="">Significant Wave Height Limit (m)</div>
        <div class="justify-items-stretch flex">
            <label>Small CTV</label>
            <input 
                type="number"
                min="0"
                max="10"
                v-model="ctv_small_limit"
                @change="handleCTVSlimit()"
            />
        </div>
    </div>
</template>

<script>

import { useConfigurationStore } from "~/stores/ConfigurationStore.ts"

export default {
    data() {
        return {
            wdtThreshold: 0,
            ctv_small_limit: 1.5,
            conf_ctv_big_limit: 1.75,
            conf_sov_limit: 2.75,
            conf_site_limit: 18,
            conf_heli_visibility_limit: 5,
            conf_heli_cloudbase_limit: 1,
        };
    },
    methods: {
        handleCTVSlimit(){
            const configStore = useConfigurationStore();
            configStore.ctv_small_limit = this.ctv_small_limit;
        }
    }
};
</script>