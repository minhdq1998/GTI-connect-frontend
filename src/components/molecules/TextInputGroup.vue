<template>
  <div class="text-input-group">
    <input-label :label="label" />
    <text-input :type="type" v-bind="$attrs" :validated="validated" />
  </div>
</template>

<script>
import TextInput from '../atoms/TextInput.vue'
import InputLabel from '../atoms/InputLabel.vue'
export default {
  inheritAttrs: false,
  components: {
    InputLabel, TextInput
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    type: String,
    validated: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>