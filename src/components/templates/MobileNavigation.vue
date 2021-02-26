<template>
  <div id="nav-mobile" class="nav-icon">
    <i class="fas fa-bars" @click="onDropDownClick"></i>
    <transition name="slide-fade">
      <div class="dropdown-content" @click="onDropDownClick" v-if="dropDownShow">
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
    },
    methods: {
      onDropDownClick() {
        this.dropDownShow = !this.dropDownShow
        console.log(this.dropDownShow)
      },
      closeDropDown() {
        this.dropDownShow = true
      },
    }
  }
</script>

<style lang="scss" scoped>
.dropdown-content {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0px;
  top: 80px;
  background-color:  #00203FFF;
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
  background-color: var(--secondarycolour);
}

.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>