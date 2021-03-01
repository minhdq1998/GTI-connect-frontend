<template>
  <div class="form-input">
    <input @input="updateValue" :value="value" v-bind="$attrs" />
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: String
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
input {
  width: 300px;
  height: 40px;
  padding-left: 15px;
  margin-bottom: 10px;
}

::placeholder {
  color: #A9A9A9;
  opacity: 0.5; 
}

@media screen and (max-width: 360px) {
  input {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  margin-bottom: 10px;
  }
}
</style>