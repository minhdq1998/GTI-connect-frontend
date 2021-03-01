<template>
  <div class="sign-up">
    <h1 class="sign-up-page-title">Sign Up</h1>
    <div class="form-container">
      <form class="sign-up-form">
        <input-field label="First name" type="text" placeholder="Your first name"/>
        <input-field label="Last name" type="text" placeholder="Your last name"/>
        <input-field label="Email" type="email" placeholder="Please enter your email"/>
        <input-field label="Password" type="password" placeholder="Please enter your password"/>
        <input-field label="Confirm password" type="password" placeholder="Please re-enter your password"/>
        <Button text="Sign up" styleMode="var(--primarycolour)" type="submit" />
      </form>
    </div>
  </div>
</template>

<script>
import Button from '../atoms/Button.vue'
import InputField from '../molecules/InputField.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: { InputField, Button },
  name: 'SignUp',
 
}
</script>
    
<style lang="scss" scoped>
.sign-up-page-title {
  text-align: center;
}

.sign-up-form{
  margin: 15px auto;
  max-width: 300px;
}
</style>