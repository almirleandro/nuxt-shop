<template>
  <div class="post-container">
    <transition name="default">
      <div class="post" v-if="post">
        <h1>{{ post.title }}</h1>
        <span class="post-author">Author: {{ post.author }}</span>
        <p v-for="parag in paragraph" class="paragraph">{{ parag }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "BlogPage",
  transition: "default",
  apollo: {
    post: {
      query: gql`
        query getUser($id: String!) {
          post(id: $id) {
            id
            title
            author
            content
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  },
  computed: {
    paragraph() {
      const allText = this.post?.content;
      const textArray = allText?.split("\n\n");
      return textArray;
    }
  }
};
</script>

<style>
.post-container {
  padding: 50px 70px 0;
  display: flex;
  justify-content: center;
  min-height: 90vh;
}

.post {
  width: 680px;
}

.post h1 {
  padding-bottom: 20px;
}

.post-author {
  padding-bottom: 55px;
  display: block;
  font-size: 1rem;
}

.paragraph {
  font-family: Georgia, serif;
  letter-spacing: 0.5px;
  color: rgba(57, 63, 65, 1);
  margin-bottom: 30px;
  text-align: justify;
  line-height: 28px;
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
  .post-container {
    padding: 50px 50px 0;
  }

  .post h1 {
    font-size: 2rem;
  }
}
</style>
