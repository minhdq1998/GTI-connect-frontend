<template>
  <div class="sign-up">
    <sign-up-form />
  </div>
</template>

<script>
import SignUpForm from './components/SignUpForm.vue';
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