<template>
  <div class="text-area-input-group">
      <input-label :label="label" />
      <text-area-input v-bind="$attrs"></text-area-input>
  </div>
</template>

<script>
import InputLabel from '../atoms/InputLabel.vue'
import TextAreaInput from '../atoms/TextAreaInput.vue'

export default {
    name:"text-area-input-group",
    components: {TextAreaInput,InputLabel},
    props: {
        label: {
            type: String,
            default: ''
        },
    },
}
</script>

<style scoped>
</style>