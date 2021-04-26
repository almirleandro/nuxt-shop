<template>
  <div class="container">
    <div class="home-sections">
      <div class="first-row">
        <nuxt-link
          v-for="section in sections"
          :to="'/shop/' + section.title"
          :key="section.id"
          v-if="section.id < 4"
        >
          <div class="image-block-div">
            <img
              :src="section.imageUrl"
              :alt="section.title"
              v-if="section.id < 4"
            />
            <div class="section-title-div">
              {{ section.name }}
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="second-row">
        <nuxt-link
          v-for="section in sections"
          :to="'/shop/' + section.title"
          :key="section.id"
          v-if="section.id >= 4"
        >
          <div class="image-block-div">
            <img
              :src="section.imageUrl"
              :alt="section.title"
              v-if="section.id >= 4"
            />
            <div class="section-title-div">
              {{ section.name }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  transition: "default",
  data() {
    return {
      sections: []
    };
  },
  async fetch() {
    // http://localhost:8888/api/getSections
    // https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getSections
    const res = await fetch(
      `https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getSections`
    );
    const data = await res.json();
    this.sections = data;
  }
};
</script>

<style>
.container {
  padding: 0 70px;
  min-height: 90vh;
}

.home-sections {
  text-decoration: none;
  color: black;
}

.first-row,
.second-row {
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
}

.first-row {
  grid-template-columns: 1fr 1fr 1fr;
}

.second-row {
  grid-template-columns: 1fr 1fr;
}

.first-row a,
.second-row a {
  display: block;
  width: fit-content;
  margin-bottom: 5px;
  text-decoration: none;
  color: black;
  font-size: 1.8rem;
  min-width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-block-div {
  min-width: 100%;
  height: 100%;
  transition: transform 0.5s; /* Animation */
}

.image-block-div:hover {
  transform: scale(1.05);
}

.first-row a img,
.second-row a img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.section-title-div {
  background-color: rgba(238, 238, 238, 0.808);
  color: rgba(0, 0, 0, 0.575);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 80%;
  position: relative;
  float: left;
  margin-top: -100px;
  margin-left: 10%;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.5s; /* Animation */
}

.section-title-div:hover {
  background-color: rgba(0, 0, 0, 0.815);
  color: rgba(255, 255, 255, 0.842);
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
