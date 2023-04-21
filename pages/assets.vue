<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="flex w-full justify-between p-5">
      <h1 class="text-2xl font-semibold">Assets</h1>
      <IconsAdd @click="showModal" class="cursor-pointer" />
      <!-- add on hover description like "by clicking on this "+" button you can add another asset to your fleet" -->
    </div>
    <CreateAssetModal v-if="isModalVisible" @hideModal="hideModal" />
    <div class="flex flex-col p-5">
      <h2 class="text-lg font-semibold w-full">Vessels</h2>
      <div class="flex pb-5">
        <div
          v-for="asset in assets.filter((x) => x.category === 'vessel')"
          :key="asset.id"
          class="p-5"
        >
          <AssetCard :asset="asset" />
        </div>
      </div>

      <h2 class="text-lg font-semibold w-full">Helicopters</h2>
      <div class="flex pb-5">
        <div
          v-for="asset in assets.filter((x) => x.category === 'helicopter')"
          :key="asset.id"
          class="p-5"
        >
          <AssetCard :asset="asset" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssetStore } from "~/stores/AssetStore";

export default {
  name: "AssetList",
  data() {
    return {
      assets: useAssetStore().assets,
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      console.log(this.isModalVisible);
    },
    hideModal() {
      this.isModalVisible = false;
      console.log(this.isModalVisible);
    },
  },
};
</script>
