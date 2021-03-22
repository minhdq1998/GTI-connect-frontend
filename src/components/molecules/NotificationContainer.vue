<template>
  <div class="notification-container">
    <notification v-for="notification in notifications" :key="notification.id" :notification="notification" />
  </div>
</template>

<script>
import Notification from '../atoms/Notification.vue'
import { mapState } from 'vuex'
  export default {
    components: { Notification },
    computed: mapState('notification', ['notifications'])
  }
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  top: 90px;
  right: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: var(--bgcolour);
}

</style>