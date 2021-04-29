<template>
  <div class="container">
    <transition name="default">
      <div class="home-sections" v-if="canLoad">
        <div class="first-row">
          <nuxt-link
            v-for="section in sections"
            :to="'/shop/' + section.description"
            :key="section.id"
            v-if="isUpperRow(section.description)"
          >
            <div class="image-block-div">
              <img
                :src="section.attributes[0].inputTip.en"
                :alt="section.description"
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
            :to="'/shop/' + section.description"
            :key="section.id"
            v-if="isBottomRow(section.description)"
          >
            <div class="image-block-div">
              <img
                :src="section.attributes[0].inputTip.en"
                :alt="section.title"
              />
              <div class="section-title-div">
                {{ section.name }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </transition>
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

  computed: {
    // Enable transition effect
    canLoad() {
      if (!this.sections?.length) return false;
      return true;
    }
  },

  methods: {
    isUpperRow(item) {
      const bool = item !== "womens" && item !== "mens";
      return bool;
    },
    isBottomRow(item) {
      const bool = item === "womens" || item === "mens";
      return bool;
    }
  },

  // Get array of categories from database
  async fetch() {
    try {
      // Development: http://localhost:8888/api/getSections
      // Production: https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getSections
      const res = await fetch(
        `https://nuxt-ecommerce-template.netlify.app/.netlify/functions/getSections`
      );
      const data = await res.json();
      this.sections = data;
    } catch (error) {
      // Handle error
      console.log("Error trying to fetch homepage data");
    }
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

@media screen and (max-width: 880px) {
  .container {
    padding: 20px 70px 0;
    min-height: 90vh;
  }

  .first-row,
  .second-row {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 0;
    margin-bottom: 0;
  }

  .image-block-div {
    transform-origin: bottom;
  }
}

@media screen and (max-width: 590px) {
  .container {
    margin-top: 112.6px;
    padding: 50px 50px 0;
  }

  .section-title-div {
    height: 50px;
    margin-top: -80px;
  }

  @media screen and (max-width: 460px) {
    .section-title-div {
      height: 40px;
      margin-top: -60px;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 410px) {
    .section-title-div {
      height: 30px;
    }
  }
}
</style>
