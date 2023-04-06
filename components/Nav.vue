<script setup>
import { useBaseStore } from "@/stores/BaseStore";

const store = useBaseStore();

const form = reactive({
  message: "",
});

const submit = (e) => {
  e.preventDefault();
  store.message = form.message;
  console.log(form);
};
</script>

<template>
  <div class="h-screen w-full bg-white relative flex overflow-hidden">
    <!-- Sidebar -->
    <aside
      class="h-full w-64 flex flex-col space-y-12 items-center relative bg-gray-800 text-white"
    >
      <!-- Home -->
      <div class="h-2 w-20 flex items-center pt-8 rounded-lg cursor-pointer">
        <NuxtLink to="/">
          <img class="object-fill" src="@/assets/logo.png" alt="logo" />
        </NuxtLink>
      </div>

      <!-- Assets -->
      <div
        class="h-10 w-40 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white"
      >
        <NuxtLink to="/Assets">
          <IconsBoat class="inline-block align-middle" />
          <a class="ml-2">Assets</a>
        </NuxtLink>
      </div>

      <!-- Sites -->
      <div
        class="h-10 w-40 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white"
      >
        <NuxtLink to="/Sites">
          <IconsLocation class="inline-block align-middle" />
          <a class="ml-2">Sites</a>
        </NuxtLink>
      </div>

      <!-- Analytics -->
      <div
        class="h-10 w-40 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white"
      >
        <NuxtLink to="/Analytics">
          <IconsAnalytics class="inline-block align-middle" />
          <a class="ml-2">Analytics</a>
        </NuxtLink>
      </div>
    </aside>

    <div class="w-full h-full flex flex-col justify-between">
      <!-- Header -->
      <header
        class="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800"
      >
        <!-- Info on top-right -->
        <div class="flex flex-shrink-0 items-center space-x-4 text-white">
          <IconsBell></IconsBell>
          <div class="text-sm font-regular">loggedinas</div>
        </div>
      </header>

      <!-- Main -->
      <main>
        <ChartComponent />
      </main>
    </div>
  </div>
</template>
