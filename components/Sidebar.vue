<template>
  <div class="w-1/5 bg-blue-600">
    <span
      class="absolute text-white text-4xl top-5 left-4 cursor-pointer"
      onclick="openSidebar()"
    >
      <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
    </span>
    <div
      class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-1/5 overflow-y-auto text-center bg-gray-900"
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
        class="p-2.5 mt-3 flex items-center px-4 duration-300 cursor-pointer bg-white bg-gradient-to-r from-opacity-60 to-transparent hover:bg-gradient-to-r hover:from-transparent hover:to-opacity-60"
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
