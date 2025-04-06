<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  name: "PostForm",
  components: {MyInput, MyButton},

  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },

  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <h2>Создание поста</h2>

    <my-input
        v-model="post.title"
        class="my-input"
        type="text"
        placeholder="Название"
    />
    <my-input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Описание"
    />
    <my-button
        @click="createPost"
        style="align-self: flex-end; margin-top: 15px"
    >
      Добавить
    </my-button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>