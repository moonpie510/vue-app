<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number]
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <input
      class="input"
      type="text"
      @input="updateValue"
  >
</template>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  margin-top: 15px;
  padding: 10px 15px;
}
</style>