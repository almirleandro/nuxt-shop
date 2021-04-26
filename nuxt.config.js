import axios from "axios";

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
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/apollo"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  apollo: {
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    clientConfigs: {
      default: {
        httpEndpoint:
          "https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getPost"
      },
      getPosts: {
        httpEndpoint:
          "https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getPosts"
      }
    }
  },

  generate: {
    async routes() {
      // let arrayOfRoutes = [];

      // const firstRes = await axios.get(
      //   "https://nuxt-ecommerce-template.netlify.app/api/getSections"
      // );
      // const firstRoute = firstRes.data.map(section => {
      //   return "/shop/" + section.title;
      // });

      return [
        "/shop/hats",
        "/shop/jackets",
        "/shop/sneakers",
        "/shop/womens",
        "/shop/mens"
      ];

      // const secondRes = await axios.get("http://localhost:8888/api/getSections");
      // const secondRoute = secondRes.data.map(section => {
      //   return "/shop/" + section.title;
      // });
      // arrayOfRoutes.push(secondRoute);
    }
  }
};
