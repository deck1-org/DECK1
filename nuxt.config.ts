// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
    css: [
        '@/assets/css/main.css',
    ],
    build: {
        postcss: {
          postcssOptions: {
            plugins: {
              tailwindcss: {},
              autoprefixer: {},
            },
          },
        },
    }
}
