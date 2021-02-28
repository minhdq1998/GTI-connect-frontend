<template>
  <div id="nav-mobile" class="nav-icon">
    <i class="fas fa-bars" @click="dropDownShow = !dropDownShow"></i>
    <transition name="slide">
      <div class="dropdown-content" @click="dropDownShow = !dropDownShow" v-if="dropDownShow">
        <router-link class="nav-router-link-mobile" to="/">About</router-link>
        <router-link class="nav-router-link-mobile" to="/jobs">Jobs</router-link>
        <router-link class="nav-router-link-mobile" to="/experts">Our experts</router-link>
        <router-link class="nav-router-link-mobile" to="/signin">Sign In</router-link>
        <router-link class="nav-router-link-mobile nav-login-btn" to="/signup">Join</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dropDownShow: false
      }
    }
  }
</script>

<style lang="scss" scoped>
.fa-bars {
  color: var(--primarycolour);
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0px;
  top: 80px;
  width: 100%;
  color: var(--primarycolour);
  transform-origin: top;
  transition: transform .5s ease-in-out;
  overflow: hidden;
}

.nav-router-link-mobile {
  display: flex;
  font-size: 1rem;
  padding-right: 20px;
  padding-left: 20px;
  background-color: var(--primarycolour);
}

#nav-mobile a.router-link-exact-active {
  color: var(--primarycolour);
  background-color: #FFFFFF;
}

#nav-mobile a {
  color: #FFFFFF;
}

.slide-enter, .slide-leave-to{
  transform: scaleY(0);
}
</style>