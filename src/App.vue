<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    MyButton,
    MyDialog,
    PostList,
    PostForm
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: true
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },

    async fetchPosts() {
      try {
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts = response.data;
          this.isPostsLoading = false;
        }, 1000)
      } catch (e) {
        alert(e.message);
      }
    }
  },

  mounted() {
    this.fetchPosts();
  }
}
</script>

<template>
  <div class="app">
    <h1>Страница с постами</h1>

    <my-button
        @click="dialogVisible = true"
        style="margin: 15px 0"
    >
      Создать пост
    </my-button>

    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="posts"
        @remove="removePost"
        v-if="isPostsLoading !== true"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>