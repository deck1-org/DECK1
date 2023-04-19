<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="flex w-full justify-end">
      <IconsAdd @click="showModal" class="cursor-pointer" />
      <!-- add on hover description like "by clicking on this "+" button you can add another asset to your fleet" -->
    </div>
    <CreateAssetModal v-if="isModalVisible" @hideModal="hideModal" />
    <div v-for="asset in assets" :key="asset.id" class="p-5">
      <AssetCard :asset="asset" />
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
