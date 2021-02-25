<template>
<div id="nav">
  <div class="content-wrapper">
    <div class="nav-brand-logo">
      <img src="./../../assets/logo.png">
    </div>

    <mobile-navigation />

    <div class=" nav-router-links" >
      <router-link class="nav-router-link" to="/">About</router-link>
      <router-link class="nav-router-link" to="/jobs">Jobs</router-link>
      <router-link class="nav-router-link" to="/experts">Our experts</router-link>
      <router-link class="nav-router-link" to="/signin">Sign In</router-link>
      <router-link class="nav-router-link nav-login-btn" to="/signup">Join</router-link>
    </div>
  </div>
</div>
</template>

<script>
import MobileNavigation from './MobileNavigation.vue'

export default {
  components: {
    MobileNavigation
  }
}
</script>

<style scoped>
.nav-router-link {
    margin-left: 17px;
}

.nav-login-btn {
    border-radius: 4px;
    padding: 6px 12px 6px 12px;
    border: 1px solid var(--textgray);
}





</style>