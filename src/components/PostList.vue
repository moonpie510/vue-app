<script>
import PostItem from "@/components/PostItem.vue";

export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>

    <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
    />
  </div>

  <div v-else>
    <h3>Постов пока нет</h3>
  </div>
</template>

<style scoped>

</style>