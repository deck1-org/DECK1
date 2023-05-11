<template>
  <div class="w-48 h-min deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
    <div class="w-full border-t-2 border-black p-2">
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg mb-2">{{ asset.name }}</h2>
        <IconsCardOptions />
      </div>
      <div v-if="asset.category === 'vessel'" class="flex justify-between">
        <label for="limit">Limit: </label>
        <p>{{ asset.limit }}m</p>
          <IconsInfo class="" />
      </div>
      <div v-else-if="asset.category === 'helicopter'">
        <div class="flex justify-between">
          <label for="limit" class="w-min">Cloudbase: </label>
          <p class="w-min">{{ asset.cloudbase }}</p>
        </div>
        <div class="flex justify-between">
          <label for="limit" class="w-min">Visibility: </label>
          <p class="w-min">{{ asset.visibility }}</p>
        </div>
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
