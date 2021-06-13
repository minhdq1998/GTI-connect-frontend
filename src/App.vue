<template>
  <navigation-bar />
  <div id="body-view">
    <div class="content-wrapper">
      <router-view/>
      <notification-container />
    </div>
    <div class="content-wrapper footer-wrapper">
      <div class="footer-bg">
      </div>
      <Footer/>
    </div>
  </div>
</template>

<script>
import NotificationContainer from './components/molecules/NotificationContainer.vue'
import NavigationBar from './components/templates/NavigationBar.vue'
import Footer from './components/templates/Footer.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    NotificationContainer,
    Footer
  }
}

</script>

<style>

.footer-wrapper {
    background-color: var(--hovercolour);
    min-height: 0px !important;
}

.footer-bg {
    background-color: var(--hovercolour);
    position: absolute;
    top: 0px;
    width: 100vw;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    height: 100%;
    z-index: -1;
}
</style>
