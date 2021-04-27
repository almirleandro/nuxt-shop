export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Nuxt Shop",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/apollo"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  apollo: {
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    clientConfigs: {
      default: {
        httpEndpoint:
          // Development: http://localhost:8888/api/getPost
          // Production: https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getPost
          "https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getPost"
      },
      getPosts: {
        httpEndpoint:
          // Development: http://localhost:8888/api/getPosts
          // Production: https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getPosts
          "https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getPosts"
      }
    }
  },

  generate: {
    async routes() {
      return [
        "/shop/hats",
        "/shop/jackets",
        "/shop/sneakers",
        "/shop/womens",
        "/shop/mens",
        "/blog/6f2f596a-3a62-4529-ac94-7182cf35620c",
        "/blog/ef52a252-3331-469d-a608-0d6dcc288964",
        "/blog/6b880c0f-c3e2-4c14-a8bd-f22b61630992",
        "/blog/b89856bc-b173-4dba-ae61-e7b3311ad079"
      ];
    }
  }
};
