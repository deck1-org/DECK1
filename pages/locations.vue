<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="flex w-full justify-end">
      <IconsAdd @click="showModal" class="cursor-pointer" />
    </div>
    <CreateLocationModal v-if="isModalVisible" @hideModal="hideModal" />
    <div v-for="location in locations" :key="location.id" class="p-5">
      <LocationCard :location="location" />
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";

export default {
  name: "LocationList",
  data() {
    return {
      locations: useLocationStore().locations,
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
