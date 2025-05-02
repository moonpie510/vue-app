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

    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>

  <div v-else>
    <h3>Постов пока нет</h3>
  </div>
</template>

<style scoped>
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 0.5s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }

  .post-list-move {
    transition: all 0.5s ease;
  }
</style>