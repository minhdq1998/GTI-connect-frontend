<template>
  <div class="form-container">
      <form class="sign-up-form" @submit.prevent="registerUser">
        <text-input-group 
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
      
        <text-input-group 
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
       
        <text-input-group 
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
    
        <text-input-group 
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
        
        <text-input-group
          label="Confirm password" 
          type="password" 
          placeholder="Please re-enter your password" 
          v-model="user.password2"
          @blur="v$.user.password2.$touch()"
          :validated="!v$.user.password2.$error"
        />
        <template v-if="v$.user.password2.$error">
          <p v-if="v$.user.password2.required.$invalid">Your re-enter password is required.</p>
          <p v-if="v$.user.password2.sameAsPassword.$invalid">The re-entered password is incorrect.</p>
        </template>

        <div class="role-selection">
          <input-label label="Select your role" />
            <div class="role-options">
              <div>
                <radio-input 
                  v-model="user.role" 
                  :value="aeRole" 
                  label="Australian Expert" 
                  name="role" 
                />
              </div>
              <div>
                <radio-input 
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
        <Button text="Sign up" styleMode="form-main-button" type="submit" :disabled="buttonDisable" />
      </form>
    </div>
</template>

<script>

import Button from '../../../components/atoms/Button'
import RadioInput from '../../../components/atoms/RadioInput'
import InputLabel from '../../../components/atoms/InputLabel'
import TextInputGroup from '../../../components/molecules/TextInputGroup.vue'
import UserService from '../../../services/UserService'
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength, minLength, sameAs } from '@vuelidate/validators'
export default {
  name: 'SignUpForm',
  setup () {
    return {
       v$: useVuelidate()
    }
  },
  components: { TextInputGroup, Button, InputLabel, RadioInput },
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
  computed: {
    buttonDisable: {
      get() {
      return this.v$.$invalid
      },
      set(newValue) {
        this.v$.$invalid = newValue
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
      const vm = this
      this.v$.$touch()
      if (!this.v$.$invalid) {
        UserService.createUserAccount(this.user)
        .then(() => {
          this.buttonDisable = true
          const notification = {
            type: 'success',
            message: 'Your account has been successfully created!'
          }
          vm.$store.dispatch('notification/add', notification, { root: true })
          this.$router.push({
            name: 'Sign In'
          })
        })
        .catch(function (err) {
          const mailError = err.response.data.email[0] // catch duplicate mail error message
          if (mailError) {
            const mailNotification = {
              type: 'error',
              message: 'There was a problem creating your account, ' + mailError
            }
            vm.$store.dispatch('notification/add', mailNotification, { root: true }) // send mail error notification
          }
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>

  .role-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .sign-up-form {
    padding: 10px 0px 10px 0px
  }

</style>