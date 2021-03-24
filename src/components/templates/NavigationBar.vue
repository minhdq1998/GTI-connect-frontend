<template>
<div id="nav">
  <div class="content-wrapper">
    <div class="nav-brand-logo">
      <img src="./../../assets/logo.png">
    </div>

    <mobile-navigation :userIsLoggedIn=isLoggedIn />

    <div class="nav-router-links" >
      <profile-mini-navigation v-if="isLoggedIn"/>
      <template v-for="(route, index) in routes" >
        <router-link 
          :key="index"
          :class="styleClass(route.name)" 
          v-if="hasPermission(route.meta.permission)"
          :to="route.path" >{{route.name}}</router-link> 
      </template>
    </div>
  </div>
</div>
</template>

<script>
import MobileNavigation from './MobileNavigation.vue'
import ProfileMiniNavigation from '@/components/organisms/ProfileMiniNavigation'

import AccountsMixin from '@/mixins/AccountsMixin'

export default {
  components: {
    MobileNavigation,
    ProfileMiniNavigation
  },
  mixins:[AccountsMixin],
  data() {
    return {
      routes: this.getAccessibleRoutes()
    }
  },
  methods: {
    getAccessibleRoutes() {
      return [...this.$router.options.routes
              .filter(route => (
                route.path !== '/403' &&
                route.path !== '/connections/:id'
              ))].reverse()
    },
    styleClass(routeName) {
        switch (routeName) {
          case 'Join': return 'nav-router-link nav-singup-btn'
        default: return 'nav-router-link'
      }
    }
  }
}
</script>

<style scoped>
.nav-brand-logo {
  position:relative;
}

.nav-router-link {
  display: inline-block;
  margin-left: 17px;
  vertical-align: middle;
}

.nav-singup-btn {
    border-radius: 4px;
    padding: 3px 12px 3px 12px;
    border: 1px solid var(--textgray);
}

</style>