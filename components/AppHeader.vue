<template>
  <div class="navbar">
    <div class="logo-div">
      <nuxt-link to="/" class="logo-img">
        <span id="shop-title">Nuxt e-Commerce</span>
      </nuxt-link>
    </div>
    <div class="links">
      <nuxt-link to="/">Shop</nuxt-link>
      <nuxt-link to="/blog">Blog</nuxt-link>
      <nuxt-link to="/cart">Cart</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader"
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

.links a {
  margin-left: 40px;
}

#shop-title {
  font-size: 1.2rem;
  border: solid 1px black;
  padding: 10px;
}
</style>
