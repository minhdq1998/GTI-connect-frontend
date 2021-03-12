<template>
  <navigation-bar />
  <div id="body-view">
    <div class="content-wrapper">
      <router-view/>
    </div>
  </div>
  <notification-container />
</template>

<script>
import NotificationContainer from './components/molecules/NotificationContainer.vue'
import NavigationBar from './components/templates/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    NotificationContainer
  }
}

</script>

<style>
</style>
