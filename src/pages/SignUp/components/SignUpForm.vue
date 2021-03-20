<template>
    <user-auth-form-container title="Sign Up" @onSubmit="registerUser">
        <text-input-group 
          label="First name" 
          type="text" 
          placeholder="Your first name" 
          v-model="user.first_name"
          @blur="v$.user.first_name.$touch()"
          :validated="!v$.user.first_name.$error"
        />
        <template v-if="v$.user.first_name.$error">
          <FormError 
            v-if="v$.user.first_name.required.$invalid" 
            errorMsg="Your first name is required." />
          <FormError 
            v-if="v$.user.first_name.maxLength.$invalid" 
            errorMsg="The maximum length allowed is 30."/>        
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
          <FormError 
            v-if="v$.user.last_name.required.$invalid" 
            errorMsg="Your last name is required." />
          <FormError 
            v-if="v$.user.last_name.maxLength.$invalid" 
            errorMsg="The maximum length allowed is 60." />
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
          <FormError 
            v-if="v$.user.email.required.$invalid" 
            errorMsg="Your email is required."/>
          <FormError 
            v-if="v$.user.email.email.$invalid" 
            errorMsg="Please enter a valid email address."
          />
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
          <FormError 
            v-if="v$.user.password.required.$invalid"
            errorMsg="Your password is required." />
          <FormError 
            v-if="v$.user.password.valid.$invalid"
            errorMsg="Your password must contain at least 1 number and 1 special character." />
          <FormError 
            v-if="v$.user.password.minLength.$invalid || v$.user.password.maxLength.$invalid"
            errorMsg="The password should be between 8 to 20 characters." />
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
          <FormError 
            v-if="v$.user.password2.required.$invalid"
            errorMsg="Your re-enter password is required." />
          <FormError 
            v-if="v$.user.password2.sameAsPassword.$invalid" 
            errorMsg="The re-entered password is incorrect."/>
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
              <FormError 
                v-if="v$.user.role.required.$invalid"
                errorMsg="Your role is required." />
            </template>
        </div>
        <Button text="Sign up" 
            styleMode="form-main-button" 
            type="submit" 
            :disabled="buttonDisable"
        />
    </user-auth-form-container>
</template>

<script>

import Button from '../../../components/atoms/Button'
import RadioInput from '../../../components/atoms/RadioInput'
import InputLabel from '../../../components/atoms/InputLabel'
import FormError from '../../../components/atoms/FormError'

import TextInputGroup from '../../../components/molecules/TextInputGroup.vue'
import UserAuthFormContainer from '../../../components/molecules/UserAuthFormContainer.vue'

import { signup, notiType } from '../../../constants'

import useVuelidate from '@vuelidate/core'
import { required, email, maxLength, minLength, sameAs } from '@vuelidate/validators'

export default {
  name: 'SignUpForm',
  setup () {
    return {
       v$: useVuelidate()
    }
  },
  components: { TextInputGroup, Button, InputLabel, RadioInput, UserAuthFormContainer, FormError },
  data() {
    return {
      user: this.createNewUser(),
      forceButtonDisable: false,
      aeRole: "Australian Expert",
      gtRole: "Global Talent",
    }
  },
  computed: {
    buttonDisable() {
      return this.v$.$invalid || this.forceButtonDisable
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
      const vm = this
      this.v$.$touch()
      if (!this.v$.$invalid) {
        this.forceButtonDisable = true
        this.$store.dispatch('user/register', this.user)
        .then(() => {
          const notification = { type: notiType.SUCCESS, message: signup.SIGNUP_SUCCESS }
          vm.$store.dispatch('notification/add', notification, { root: true })
          this.$router.push({ name: 'Sign In' })
        })
        .catch(function (err) {
          const mailError = err.response.data.email[0] // catch duplicate mail error message
          if (mailError) {
            const mailNotification = { type: notiType.ERROR, message: signup.SIGNUP_FAIL + mailError }
            vm.$store.dispatch('notification/add', mailNotification, { root: true }) // send mail error notification
          }
        }).then(() => { this.forceButtonDisable = false })
      }
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
  }
}
</script>

<style lang="scss" scoped>

  .role-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

</style>