<template>
  <div class="section-wrapper">
    <transition name="default">
      <div class="section" v-if="loadPage">
        <span id="section-title">{{ section }}</span>
        <div class="products-div">
          <div class="product-wrapper" v-for="item in products">
            <img :src="item.masterVariant.images[0].url" :alt="item.name.en" />
            <div class="add-cart-btn" @click.prevent="addToCart(item)">
              (${{ item.masterVariant.prices[0].value.centAmount / 100 }}) Add
              to Cart
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ShopSection",
  transition: "default",

  data() {
    return {
      products: [],
      state: this.$store.state.cart,
      section: ""
    };
  },

  computed: {
    // Enable transition effect
    loadPage() {
      return this.products?.length;
    }
  },

  methods: {
    addToCart(item) {
      const key = item.name.en.split(" ").join("");
      const itemObj = this.$store.state.cart[key];

      if (itemObj) {
        this.$store.commit("increment", key);
      } else {
        this.$store.commit("addItem", { key, item });
      }
    }
  },

  // Get array of production of the chosen category
  async fetch() {
    try {
      // Transform category name to the category ID in the database
      let route = "";
      switch (this.$route.params.id) {
        case "jackets":
          route = "1503b845-3b2d-4469-aea3-2c8a4a54ec82";
          break;
        case "hats":
          route = "ffcc633b-0e55-4577-8a43-015f224debc8";
          break;
        case "sneakers":
          route = "25899254-051d-4372-acb1-25b7afd0f3be";
          break;
        case "womens":
          route = "e82cf5a0-5583-4c1d-a6a0-f3e39bf2c364";
          break;
        case "mens":
          route = "9f69d878-e50a-4eb1-aebf-6bd9f8b4d166";
          break;
      }

      // Development: http://localhost:8888/api/getProducts
      // Production: https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getProducts
      const res = await fetch(
        `https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getProducts`,
        {
          method: "POST",
          body: route
        }
      );
      const data = await res.json();
      this.products = data;

      // Uppercase first letter of the section title
      this.section =
        this.$route.params.id.charAt(0).toUpperCase() +
        this.$route.params.id.slice(1);
    } catch (error) {
      // Handle error
      console.log("error trying to fetch section data");
    }
  }
};
</script>

<style>
.section-wrapper {
  min-height: 90vh;
}

.section {
  padding: 0 70px;
  margin-bottom: 20px;
  min-height: 90vh;
}

#section-title {
  cursor: default;
  display: block;
  text-align: center;
  font-size: 2rem;
  margin-top: 20px;
}

.products-div {
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.product-wrapper {
  overflow: hidden;
}

.product-wrapper img {
  object-fit: cover;
  width: 100%;
  height: 85%;
  transition: transform 0.5s; /* Animation */
  transform-origin: bottom;
}

.product-wrapper:hover img {
  transform: scale(1.05);
}

.add-cart-btn {
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  margin-top: -5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.5s; /* Animation */
  padding: 20px 0;
}

.add-cart-btn:hover {
  background-color: rgba(0, 0, 0, 0.815);
  color: white;
}

.price-img {
  display: block;
  z-index: 100;
  color: white;
  margin: 10px;
  font-size: 1.3rem;
  position: absolute;
  text-align: right;
}

.default-enter-active,
.default-leave-active {
  transition: opacity 0.5s;
}
.default-enter,
.default-leave-active {
  opacity: 0;
}

@media screen and (max-width: 970px) {
  .products-div {
    width: 100%;
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
    grid-gap: 20px;
  }
}

@media screen and (max-width: 590px) {
  .section {
    padding: 112.6px 70px 0;
  }
}

@media screen and (max-width: 360px) {
  .section {
    padding: 50px 50px 0;
  }
}
</style>
