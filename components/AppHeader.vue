<template>
  <div class="navbar">
    <div class="logo-div">
      <nuxt-link to="/" class="logo-img">
        <span id="shop-title">Nuxt e-Commerce</span>
        <div class="logo-border"></div>
      </nuxt-link>
    </div>
    <div class="left-side-wrapper">
      <div class="links">
        <nuxt-link to="/">Shop</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
      </div>
      <nuxt-link to="/cart">
        <div class="cart-header-div">
          <span>Cart</span>
          <div class="cart-size">
            {{ size }}
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      quantity: this.$store.state.cart.size
    };
  },
  computed: {
    size() {
      return this.$store.state.cart.size;
    }
  }
};
</script>

<style>
.navbar {
  padding: 50px 70px;
  display: flex;
  justify-content: space-between;
}

.navbar a {
  text-decoration: none;
  color: black;
}

.links {
  display: flex;
  align-items: center;
}

.links a {
  display: block;
  margin-left: 40px;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 1s;
}

.links a:hover {
  text-decoration-color: black;
}

#shop-title {
  font-size: 1.2rem;
  padding: 10px 20px 5px 0;
}

#shop-title:hover + .logo-border {
  border-bottom: solid 3px black;
  width: 100%;
}

.logo-border {
  padding: 2px 0;
  transition: 1s;
  border-bottom: solid 3px white;
  width: 1px;
}

.cart-header-div {
  display: flex;
  align-items: center;
  margin-left: 35px;
}

.cart-header-div span {
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: 1s;
}

.cart-header-div:hover span {
  text-decoration-color: black;
}

.cart-size {
  border: 1px solid rgb(201, 201, 201);
  border-radius: 3px;
  padding: 0 5px;
  margin-left: 7px;
  text-decoration: none;
}

.left-side-wrapper {
  display: flex;
  align-items: center;
}
</style>
