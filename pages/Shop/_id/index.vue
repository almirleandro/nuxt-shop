<template>
  <div class="section" v-if="products.hats">
    <span id="section-title">{{ products[$route.params.id].title }}</span>
    <div class="products-div">
      <div
        class="product-wrapper"
        v-for="item in products[$route.params.id].items"
      >
        <img :src="item.imageUrl" :alt="item.name" />
        <div class="add-cart-btn" @click.prevent="addToCart(item)">
          (${{ item.price }}) Add to Cart
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopSection",
  transition: "default",
  data() {
    return {
      products: {},
      state: this.$store.state.cart
    };
  },
  methods: {
    addToCart(item) {
      const key = item.name.split(" ").join("");
      const itemObj = this.$store.state.cart[key];

      if (itemObj) {
        this.$store.commit("increment", key);
      } else {
        this.$store.commit("addItem", { key, item });
      }
    }
  },
  async fetch() {
    // http://localhost:8888/api/getProducts
    // https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getProducts
    const res = await fetch(
      `https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getProducts`
    );
    const data = await res.json();
    this.products = data;
  }
};
</script>

<style>
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
</style>
