<template>
  <div class="sign-up">
    <h1 class="sign-up-page-title">Sign Up</h1>
    <div class="form-container">
      <form class="sign-up-form">
        <input-field label="First name" type="text" placeholder="Your first name" v-model="user.first_name" />
        <input-field label="Last name" type="text" placeholder="Your last name" v-model="user.last_name" />
        <input-field label="Email" type="email" placeholder="Please enter your email" v-model="user.email"/>
        <input-field label="Password" type="password" placeholder="Please enter your password"  v-model="user.password"/>
        <input-field label="Confirm password" type="password" placeholder="Please re-enter your password" v-model="user.password2"/>
        <div class="role-selection">
          <input-label label="Select your role" />
          <div>
            <form-radio-input v-model="user.role" :value="aeRole" label="Australian Expert" name="role" />
          </div>
          <div>
            <form-radio-input v-model="user.role" :value="gtRole" label="Global Talent" name="role" />
          </div>
        </div>
        <Button text="Sign up" styleMode="main-button" />
      </form>
    </div>
  </div>
</template>

<script>
import Button from '../atoms/Button.vue'
import FormRadioInput from '../atoms/FormRadioInput.vue'
import InputLabel from '../atoms/InputLabel.vue'
import InputField from '../molecules/InputField.vue'

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: { InputField, Button, InputLabel, FormRadioInput },
  name: 'SignUp',
  data() {
    return {
      user: this.createNewUser(),
      aeRole: "AE",
      gtRole: "GT"
    }
  },
  methods: {
    createNewUser() {
      return {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: "",
        role: ""
      }
    }
  }
}
</script>
    
<style lang="scss" scoped>
.main-button {
  margin: 10px 5px 0px 0px
}

.sign-up-page-title {
  text-align: center;
}

.sign-up-form{
  margin: 15px auto;
  max-width: 300px;
}
</style>