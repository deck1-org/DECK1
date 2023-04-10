<template>
  <div class="flex">
    <div
      class="fixed top-0 bottom-0 p-2 overflow-y-auto text-center bg-gray-900"
    >
      <div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">
          <NuxtLink to="/">
            <IconsLogo class="inline-block align-middle" />
          </NuxtLink>
        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>

      <div
        class="p-2 text-white bg-transparent hover:bg-gradient-to-r hover:text-black hover:from-white hover:via-white hover:to-transparent transition duration-500 ease-in-out"
      >
        <NuxtLink to="/weatherDownTime">
          <a class="ml-2">Weather Down Time</a>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script></script>

<style></style>
