<template>
  <div class="sign-up">
    <h1 class="sign-up-page-title">Sign Up</h1>
    <sign-up-form />
  </div>
</template>

<script>
import SignUpForm from '../organisms/SignUpForm.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    SignUpForm
  },
  name: 'SignUp',
   setup () {
    return {
     
    }
  },
}
</script>
    
<style lang="scss" scoped>
  .sign-up-page-title {
    text-align: center;
  }

</style>