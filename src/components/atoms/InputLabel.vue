<template>
  <div class="input-label">
    <label v-if="label">{{label}}</label>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
label {
  color: rgba(0, 32, 63, 0.5);
  font-weight: 700;
  font-size: 1.2rem;
  padding: 5px 0;
}
</style>