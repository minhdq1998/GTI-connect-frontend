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
  color: var(--labelcolour);
  font-weight: 700;
  font-size: 1.2rem;
  margin: 15px 0px 5px 0px;
}
</style>