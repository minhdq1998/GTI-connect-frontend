<template>
  <div class="options-input">
      <OptionItem 
        v-for="(option, index) in options" 
        :text="option" 
        :key="index" 
        :isSelected="option==modelValue" 
        v-bind="$attrs"
        @click="onChange(option)"/>
  </div>
</template>

<script>
import OptionItem from '../atoms/OptionItem'

export default {
    name: 'options-input',
    components: {OptionItem},
    props: {
        options: {
            type: Array,
        },
        modelValue: {
            type: [String, Number],
            required: true
        }
    },
    methods: {
        onChange(option) {
            this.$emit("update:modelValue", option)
        }
    }
}

</script>

<style>
.options-input {
    display: flex;
}

</style>