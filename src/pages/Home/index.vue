<template>
  <div class="landing-container">
    <welcome />
    <how-we-work />
    <how-we-operate />
    <home-sector-list />
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import HowWeWork from './components/HowWeWork.vue'
import HowWeOperate from './components/HowWeOperate.vue'
import HomeSectorList from './components/HomeSectorList.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: { Welcome, HowWeWork, HowWeOperate, HomeSectorList },
  name: 'Home',
 
}
</script>


<style lang="scss" scoped>

</style>