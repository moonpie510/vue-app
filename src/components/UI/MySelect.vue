<script>
export default {
  name: "MySelect",

  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    changeOptions(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <select :value="modelValue" @change="changeOptions" class="select">
    <option disabled value="Выберите из списка">Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{option.label}}
    </option>
  </select>
</template>

<style scoped>
  .select {
    width: 200px;
  }
</style>