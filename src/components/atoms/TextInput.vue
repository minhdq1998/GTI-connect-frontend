<template>
  <div class="text-input">
    <input 
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[validated ? 'valid-input' : 'invalid-input']"
    >
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: [String, Number],
        default: ''
      },
      validated: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
input {
  width: 300px;
  height: 40px;
  padding-left: 15px;
}

.invalid-input {
  border-color: red;
}

::placeholder {
  color: #A9A9A9;
  opacity: 0.5; 
}

@media screen and (max-width: 360px) {
  input {
  width: 250px;
  height: 35px;
  padding-left: 15px;
  margin-bottom: 10px;
  }
}
</style>