<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "Navbar",
  components: {MyButton},
}
</script>

<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue приложение</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px">О компании</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px">store</my-button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  height: 40px;
  background-color: lightblue;
  box-shadow: 2px 2px 4px grey;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>