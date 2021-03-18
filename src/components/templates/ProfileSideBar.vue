<template>
  <div class="profile-side-bar">
    <profile-avatar :avatarUrl="user.avatarUrl" />
    <p class="profile-user-name">{{`${user.first_name} ${user.last_name}`}}</p>
    <router-link class="side-bar-router-link" to="/dashboard">Your profile</router-link>
    <router-link class="side-bar-router-link" to="/dashboard/managejobs">Manage Connections</router-link>
    <router-link class="side-bar-router-link" to="/dashboard/payments">Payments</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileAvatar from '../atoms/ProfileAvatar.vue'

export default {
  components: { ProfileAvatar },
  name:'ProfileSideBar',
  setup () {
    return {}
  },
  computed: mapState({
    user: state => ({
      id: state.user.id,
      first_name: state.user.first_name,
      last_name: state.user.last_name,
      role: state.user.role,
      avatarUrl: state.user.avatarUrl
    })
  }),
}
</script>

<style lang="scss" scoped>
.profile-side-bar {
  width: 200px;
  height: 100vh;
  padding-right: 20px;
  top: 90px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0px 2px -2px gray;
}

.profile-side-bar a {
  color: var(--primarycolour);
  text-decoration: none;
  font-size: 1.5rem;
  padding: 20px 0px 20px 0px;
  width: 100%;
  box-shadow: 0 2px 2px -2px gray;
}

.profile-side-bar a.router-link-exact-active {
    color: var(--textactive);
}

.profile-user-name {
  margin: 0px;
  padding-bottom: 50px;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 2px -2px gray;
  color: var(--primarycolour);
}

.side-bar-router-link {
  width: 100%;
  text-align: center;
}

</style>