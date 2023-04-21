<template>
  <div class="w-48 h-min deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
    <div class="w-full border-t-2 border-black p-2">
      <h2 class="font-semibold mb-2">{{ asset.name }}</h2>
      <div v-if="asset.category === 'vessel'">
        <label for="limit">Limit: </label>
        <input
          type="text"
          v-model="asset.limit"
          class="w-20 border-2 rounded-md text-center"
          disabled
        />
      </div>
      <div v-else-if="asset.category === 'helicopter'" class="flex flex-col">
        <label for="limit">Cloudbase: </label>
        <input
          type="text"
          v-model="asset.cloudbase"
          class="w-20 border-2 rounded-md text-center"
          disabled
        />
        <label for="limit">Visibility: </label>
        <input
          type="text"
          v-model="asset.visibility"
          class="w-20 border-2 rounded-md text-center"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssetCard",
  props: {
    asset: {
      type: Object,
      required: true,
    },
  },
};
</script>
