<template>
<div id="nav">
  <div class="content-wrapper">
    <div class="nav-brand-logo">
      <img src="./../../assets/logo.png">
    </div>

    <mobile-navigation :userIsLoggedIn=userIsLoggedIn />

    <div class="nav-router-links" >
      <template v-if="userIsLoggedIn">
        <profile-mini-navigation />
        <router-link class="nav-router-link" to="/dashboard">Dashboard</router-link>
      </template>
      <template v-if="!userIsLoggedIn">
        <router-link class="nav-router-link nav-singup-btn" to="/signup">Join</router-link>
        <router-link class="nav-router-link" to="/signin">Sign In</router-link>
      </template>
      <router-link class="nav-router-link" to="/experts">Our experts</router-link>
      <router-link class="nav-router-link" to="/jobs">Jobs</router-link>
      <router-link class="nav-router-link" to="/">About</router-link>
    </div>
  </div>
</div>
</template>

<script>
import MobileNavigation from './MobileNavigation.vue'
import ProfileMiniNavigation from '@/components/organisms/ProfileMiniNavigation'

import {isLoggedIn} from '@/utils/auth'

import {mapState} from 'vuex'

export default {
  components: {
    MobileNavigation,
    ProfileMiniNavigation
  },
  data() {
    return {
      userIsLoggedIn:isLoggedIn()
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    }),
    
  },
  watch:{
    accessToken: {
      handler() {
        this.userIsLoggedIn = isLoggedIn()
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