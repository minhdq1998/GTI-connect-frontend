<template>
<div class="footer">
  <div class="footer-section-container">
    <div class="footer-section">
      <div class="footer-logo">
        <img src="./../../assets/logo.png">
      </div>
    </div>
    <div class="footer-section">
      <router-link class="footer-link" to="" >About Us</router-link> 
      <router-link class="footer-link" to="" >Our Experts</router-link> 
      <router-link class="footer-link" to="" >How we work</router-link>     
    </div>
    <div class="footer-section">
      <router-link class="footer-link" to="" >Privacy Policy</router-link>     
      <router-link class="footer-link" to="" >Term of Service</router-link>
    </div>
    <div class="footer-section">
      <router-link class="footer-link" to="/signup" >Join Us</router-link>
      <router-link class="footer-link" to="" >Contact</router-link>
    </div>
    <div class="footer-section">
      <div>Powered by Stripe</div>
      <div>@2021 - GTI Connect</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
<style scoped>
.footer {
    background-color: var(--hovercolour);
    height: 140px;
}

.footer-section-container {
  max-width: var(--max-width);
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
}

.footer-section {
  font-weight: bold;
  font-size: var(--footer-font-size);
  width: 20%;
  height: 130px;
}

.footer-section > .footer-link {
  display: block;
  text-decoration: none;
  color: var(--bgcolour);
  margin-bottom: 10px;
}

.footer-section > div {
  display: block;
  text-decoration: none;
  color: var(--bgcolour);
  margin-bottom: 10px;
}


.footer-logo > img{
  width:80%;
}
</style>