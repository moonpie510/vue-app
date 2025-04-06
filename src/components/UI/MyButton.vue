<script>
export default {
  name: "MyButton"
}
</script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 15px;
  color: teal;
  border: 1px solid teal;
  background: none;
}
</style>