<template>
  <div class="accept-fail-content">
    <i class="far fa-times-circle"></i>
    <h1>An error has occured during the transaction.</h1>
    <p>The offer for connection #{{id}} has not been accepted!</p>
    <Button class="grey-btn" text="Return to connection" @click="$router.push({ name: 'Connection', params: id })"/>
  </div>
</template>


<script>
import Button from '@/components/atoms/Button.vue'



  export default {
    name: "offer-accept-success",
    components: {
      Button
    },
    data() {
      return {
        id: this.$route.params.id,

      }
    },
    methods: {
      
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
.fa-times-circle {
  font-size: 100px;
  color: var(--errorcolour);
}

.accept-fail-content {
  text-align: center;
  margin-top: calc((100vh - 260px)/2 - 110px);
}
</style>