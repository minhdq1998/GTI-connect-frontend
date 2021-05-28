<template>
  <div class="info-bar">
    <i class="fas fa-info-circle"></i>
    <p class="info-message">{{message}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.info-bar {
  display: flex;
  margin-bottom: 20px;
  padding: 20px;
  background-color: var(--infobgcolour);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.fa-info-circle {
  color: var(--infocolour);
}

.info-message {
  margin: 0px 0px 0px 10px;
  color: var(--infocolour);
}

</style>