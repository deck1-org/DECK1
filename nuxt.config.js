export default {
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/main.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
};
