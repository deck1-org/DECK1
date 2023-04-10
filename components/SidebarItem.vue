<template>
  <div
    class="text-lg mt-5 p-5 cursor-pointer text-white bg-transparent hover:text-black hover:white-gradient transition duration-300 ease-in-out"
  >
    <NuxtLink :to="path">
      <a>{{ text }}</a>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    path: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
