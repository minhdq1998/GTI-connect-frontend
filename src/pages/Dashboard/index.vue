<template>
  <div class="user-dashboard">
    <profile-side-bar />
    <div class="dashboard-content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ProfileSideBar from '../../components/templates/ProfileSideBar.vue'

export default {
  name: 'Dashboard',
  components: {
    ProfileSideBar
  }
}
</script>

<style lang="scss" scoped>
.user-dashboard {
  display: flex;
  flex-direction: row;
}

.dashboard-content-container {
  padding-left: 20px;
}
</style>
