<template>
  <div class="input-field">
    <input-label :label="label" />
    <form-input :type="type" v-bind="$attrs" />
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
    type: String
  }
}
</script>

<style lang="scss" scoped>

</style>