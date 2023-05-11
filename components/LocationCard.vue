<template>
    <div class="w-48 h-min deck-frame-white">
      <div class="w-full h-40 flex justify-center items-center">
        Place for image
      </div>
      <button @click="postData">Register data to database</button>
      <div class="w-full border-t-2 border-black p-2">
        <h2 class="font-semibold mb-2">{{ location.name }}</h2>
        <label for="latitude">Latitude: </label>
        <input
          type="text"
          v-model="latitude"
          class="w-32 border-2 rounded-md text-center"
          disabled
        />
        <label for="longitude">Longitude: </label>
        <input
        type="text"
        v-model="longitude"
        class="w-32 border-2 rounded-md text-center"
        disabled
        />
      <label for="limit">Limit: </label>
      <input
        type="text"
        v-model="limit"
        class="w-32 border-2 rounded-md text-center"
        disabled
      />
    </div>
    </div>
  </template>
  
  <script>
  import weatherdata from '@/static/SKRD-ROCK-weather.json'
  import { useWeatherdataStore } from "~/stores/WeatherdataStore";

  export default {
    name: "LocationCard",
    props: {
      location: {
        type: Object,
        required: true,
      },
    },
    data(props) {
      return {
        name: props.location.name,
        latitude: props.location.latitude,
        longitude: props.location.longitude,
        limit: props.location.limit,
        weatherData: weatherdata,
      };
    },
    methods: {
      async postData() {
        const weatherData = await import(`~/static/${this.location.name}-weather.json`)
        useWeatherdataStore().postData(weatherData.default, this.location)
      }
    }
  };
  </script>
  