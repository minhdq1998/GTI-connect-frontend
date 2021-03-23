<template>
  <div class="profile-side-bar">
    <profile-avatar :avatarUrl="user.avatarUrl" />
    <p class="profile-user-name">{{`${user.first_name} ${user.last_name}`}}</p>
    <template v-for="(route, index) in routes" >
        <router-link 
          :key="index"
          class="side-bar-router-link" 
          v-if="hasPermission(route.meta.permission)"
          :to="'/dashboard/' + route.path" >{{route.name}}</router-link> 
    </template>
  </div>
</template>

<script>
import ProfileAvatar from '../atoms/ProfileAvatar.vue'
import AccountsMixin from '@/mixins/AccountsMixin'

export default {
  name:'ProfileSideBar',
  components: { ProfileAvatar },
  mixins:[AccountsMixin],
  data() {
    return {
      routes: this.getDashboardRoutes()
    }
  },
  methods: {
    getDashboardRoutes() {
      let routes = this.$router.options.routes.filter(route => (route.name=="Dashboard"))
      return routes[0].children
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-side-bar {
  width: 200px;
  padding-right: 20px;
  top: 90px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 0px 2px -2px gray;
  height: calc(100vh - 130px);
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
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 2px -2px gray;
  color: var(--primarycolour);
}

.side-bar-router-link {
  width: 100%;
  text-align: center;
}

</style>