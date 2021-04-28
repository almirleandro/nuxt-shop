<template>
  <footer>
    <span
      >e-Commerce Template (Nuxt.js + Amplience + Commercetools + Apollo +
      Netlify Functions)</span
    >
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style>
footer span {
  display: block;
  text-align: center;
  margin: 70px 40px 15px;
  font-size: 0.95rem;
}

@media screen and (max-width: 720px) {
  footer span {
    margin: 40px 40px 15px;
    font-size: 0.8rem;
  }
}
</style>
