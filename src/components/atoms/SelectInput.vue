<template>
  <div class="select-input">
    <select
      :value="modelValue"
      v-bind="{
        ...$attrs, 
        onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
      }"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: [String, Number],
        default: ''
      },
      options: {
        type: Array,
        required: true
      },
 
    }
  }
</script>

<style lang="scss" scoped>
select {
  min-width: 50%;
  height: 40px;
  font-size: 100%;
  padding-left: 15px;
  cursor: pointer;
}

option {
  height: 10px;
}
</style>