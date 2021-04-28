<template>
  <div class="blog-home-container">
    <transition name="default">
      <div class="blog-homepage" v-if="canLoad">
        <h1>Blog</h1>
        <div
          class="blog-title-div"
          v-for="post in allPosts"
          :key="post.blogPost.postId"
        >
          <nuxt-link :to="'/blog/' + post.blogPost.postId">
            <span class="blog-title">{{ post.blogPost.title }}</span>
          </nuxt-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "BlogHomepage",
  transition: "default",
  apollo: {
    $client: "getPosts",
    allPosts: {
      prefetch: true,
      query: gql`
        query getUser {
          allPosts {
            blogPost {
              title
              postId
            }
          }
        }
      `
    }
  },
  computed: {
    canLoad() {
      if (!this.allPosts?.length) return false;
      return true;
    }
  }
};
</script>

<style>
.blog-home-container {
  padding: 50px 70px 0;
  display: flex;
  justify-content: center;
  min-height: 90vh;
}

.blog-homepage {
  width: 680px;
  transition: 0.5s; /* Animation */
}

.blog-homepage h1 {
  padding-bottom: 30px;
}

.blog-title-div {
  margin-top: 20px;
}

.blog-title-div a {
  text-decoration: none;
  font-size: 1.3rem;
  color: #0070f3;
}

.default-enter-active,
.default-leave-active {
  transition: opacity 0.5s;
}
.default-enter,
.default-leave-active {
  opacity: 0;
}

@media screen and (max-width: 590px) {
  .blog-home-container {
    padding: 50px 50px 0;
  }
}
</style>
