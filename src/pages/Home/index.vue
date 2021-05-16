<template>
  <div class="landing-container">
    <welcome />
    <how-we-work />
    <payment-info />
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import HowWeWork from './components/HowWeWork.vue'
import PaymentInfo from './components/PaymentInfo.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: { Welcome, HowWeWork, PaymentInfo },
  name: 'Home',
 
}
</script>


<style lang="scss" scoped>

</style>