<template>
  <div class="select-input-group">
      <input-label :label="label" />
      <select-input v-bind="$attrs"></select-input>
  </div>
</template>

<script>
import InputLabel from '../atoms/InputLabel.vue'
import SelectInput from '../atoms/SelectInput.vue'

export default {
    name:"text-area-input-group",
    components: {SelectInput,InputLabel},
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