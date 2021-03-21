<template>
  <div class="radio-input">
    <input
     class="radio-value"
      type="radio"
      v-bind="$attrs"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
    />
    <label @click="$emit('update:modelValue', value)" class="radio-label" v-if="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-label {
  margin-left: 5px;
  cursor: pointer;
}
.radio-value {
  margin-top: -1px;
  cursor: pointer;
}

.radio-input {
  margin-bottom: 5px;
}

</style>