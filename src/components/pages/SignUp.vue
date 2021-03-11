<template>
  <div class="sign-up">
    <h1 class="sign-up-page-title">Sign Up</h1>
    <div class="form-container">
      <form class="sign-up-form" @submit.prevent="registerUser">
        <input-field 
          label="First name" 
          type="text" 
          placeholder="Your first name" 
          v-model="user.first_name"
          @blur="v$.user.first_name.$touch()"
          :validated="!v$.user.first_name.$error"
        />
        <template v-if="v$.user.first_name.$error">
          <p v-if="v$.user.first_name.required.$invalid">Your first name is required.</p>
          <p v-if="v$.user.first_name.maxLength.$invalid">The maximum length allowed is 30.</p>
        </template>
      
        <input-field 
          label="Last name" 
          type="text" 
          placeholder="Your last name" 
          v-model="user.last_name"
          @blur="v$.user.last_name.$touch()"
          :validated="!v$.user.last_name.$error"
        />
        <template v-if="v$.user.last_name.$error">
          <p v-if="v$.user.last_name.required.$invalid">Your last name is required.</p>
          <p v-if="v$.user.last_name.maxLength.$invalid">The maximum length allowed is 60.</p>
        </template>
       
        <input-field 
          label="Email" 
          type="email" 
          placeholder="Please enter your email" 
          v-model="user.email"
          @blur="v$.user.email.$touch()"
          :validated="!v$.user.email.$error"
        />
        <template v-if="v$.user.email.$error">
          <p v-if="v$.user.email.required.$invalid">Your email is required.</p>
          <p v-if="v$.user.email.email.$invalid">Please enter a valid email address.</p>
        </template>
    
        <input-field 
          label="Password" 
          type="password" 
          placeholder="Please enter your password"  
          v-model="user.password"
          @blur="v$.user.password.$touch()"
          :validated="!v$.user.password.$error"
        />
        <template v-if="v$.user.password.$error">
          <p v-if="v$.user.password.required.$invalid">Your password is required.</p>
          <p v-if="v$.user.password.valid.$invalid">Your password must contain at least 1 number and 1 special character.</p>
          <p v-if="v$.user.password.minLength.$invalid || v$.user.password.maxLength.$invalid">
            The password should be between 8 to 20 characters.
          </p>
        </template>
        
        <input-field 
          label="Confirm password" 
          type="password" 
          placeholder="Please re-enter your password" 
          v-model="user.password2"
          @blur="v$.user.password2.$touch()"
          :validated="!v$.user.password2.$error"
        />
        <template v-if="v$.user.password2.$error">
          <p v-if="v$.user.password2.required.$invalid">Your re-enter password is required.</p>
          <p v-if="v$.user.password2.sameAsPassword.$invalid">
            The re-entered password is incorrect.
          </p>
        </template>

        <div class="role-selection">
          <input-label label="Select your role" />
            <div class="role-options">
              <div>
                <form-radio-input 
                  v-model="user.role" 
                  :value="aeRole" 
                  label="Australian Expert" 
                  name="role" 
                />
              </div>
              <div>
                <form-radio-input 
                  v-model="user.role" 
                  :value="gtRole" 
                  label="Global Talent" 
                  name="role" 
                />
              </div>
            </div>
             <template v-if="v$.user.role.$error">
              <p v-if="v$.user.role.required.$invalid">Your role is required.</p>
            </template>
        </div>

        <Button text="Sign up" styleMode="form-main-button" type="submit" />
      </form>
    </div>
  </div>
</template>

<script>
import Button from '../atoms/Button.vue'
import FormRadioInput from '../atoms/FormRadioInput.vue'
import InputLabel from '../atoms/InputLabel.vue'
import InputField from '../molecules/InputField.vue'
import UserService from '../../services/UserService'
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength, minLength, sameAs } from '@vuelidate/validators'


// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: { InputField, Button, InputLabel, FormRadioInput },
  name: 'SignUp',
   setup () {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      user: this.createNewUser(),
      aeRole: "Australian Expert",
      gtRole: "Global Talent",
    }
  },
  validations () {
    return {
      user: {
        first_name: { required, maxLength: maxLength(30) }, 
        last_name: { required, maxLength: maxLength(60) }, 
        email: { required, email },
        password: {
          required, 
          minLength: minLength(8), 
          maxLength: maxLength(20),
          valid: function(value) {
            const containsNumber = /[0-9]/.test(value)
            const containsSpecial = /[!@#$%^&*)(+=`.~_-]/.test(value)
            return containsNumber && containsSpecial
          }
        },
        password2: {required, sameAsPassword: sameAs(this.user.password) },
        role: { required }
      }
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
    },
    registerUser() {
      // handle form submission here
      this.v$.$touch()
      if (!this.v$.$invalid) {
        UserService.createUserAccount(this.user)
        .then(() => {
          this.$router.push({
            name: 'Verify' //Temporary route push after successfully register user
          })
          this.user = this.createNewUser()
        })
        .catch(function (err) {
          const error = err.response.data
          console.log(error)
      })
      }
    }
  },
}
</script>
    
<style lang="scss" scoped>
.form-main-button {
  margin: 15px 0px;
}

.sign-up-page-title {
  text-align: center;
}

.sign-up-form{
  margin: 0px auto;
  max-width: 300px;
}

.role-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sign-up-form p {
  margin-top: 5px;
  margin-bottom: 0px;
  color: var(--errorcolour);
}

.error {
  border-color: var(--errorcolour);
}
</style>