<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="flex w-full justify-end">
      <IconsAdd @click="showModal" class="cursor-pointer" />
    </div>
    <CreateLocationModal v-if="isModalVisible" @hideModal="hideModal" />
    <div v-if="!loading" class="flex flex-wrap">
      <div v-for="location in locations" :key="location._id" class="p-5">
        <LocationCard :location="location" />
      </div>
    </div>
    <div v-else>
      Loading data...
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";

export default {
  name: "LocationList",
  data() {
    return {
      locations: [],
      isModalVisible: false,
      loading: true,
    };
  },
  async mounted(){
    this.locations = await useLocationStore().getAll()
    this.locations === [] ? "" : this.loading = false;
  },
  async updated() {
    this.locations = await useLocationStore().getAll()
    this.locations === [] ? "" : this.loading = false;
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
