<template>
  <navigation-bar />
  <div id="body-view">
    <div class="content-wrapper">
      <router-view/>
    </div>
  </div>
</template>
<script>

import NavigationBar from './components/templates/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}

</script>

<style>
</style>
