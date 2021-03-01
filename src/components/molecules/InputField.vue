<template>
  <div class="input-field">
    <input-label :label="label" />
    <form-input :value="value" v-bind="$attrs"/>
  </div>
</template>

<script>
import FormInput from '../atoms/FormInput.vue'
import InputLabel from '../atoms/InputLabel.vue'
export default {
  inheritAttrs: false,
  components: {
    InputLabel, FormInput
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: String
  }
  }
</script>

<style lang="scss" scoped>

</style>