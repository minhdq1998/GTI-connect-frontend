<template>
  <div class="nav-icon">
    
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
      barClick() {
        alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
   
      }
    }
  }
</script>

<style lang="scss" scoped>
.dropdown-content {
  transition: opacity 1s ease-out;
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

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>