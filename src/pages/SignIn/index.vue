<template>
<div class="form-container">
  <UserAuthFormContainer title="Sign In" @onSubmit="loginUser">
    <text-input-group 
      label="Email" 
      type="email" 
      placeholder="Please enter your email" 
      v-model="loginForm.email"
      @blur="v$.loginForm.email.$touch()"
    />

    <text-input-group 
      label="Password" 
      type="password" 
      placeholder="Please enter your password" 
      v-model="loginForm.password"
      autocomplete="on"
      @blur="v$.loginForm.password.$touch()"
    />

    <SpacingDiv :space=10 />

    <FormError
      v-if="displayFailToLogin"
      :errorMsg="signInFailMsg"
    />

    <Button text="Sign In" 
        styleMode="form-main-button" 
        type="submit"
        :disabled="buttonDisable"
    />
  </UserAuthFormContainer>
</div>
</template>

<script>
import Button from '../../components/atoms/Button'
import TextInputGroup from '../../components/molecules/TextInputGroup'
import FormError from '../../components/atoms/FormError'
import SpacingDiv from '../../components/atoms/SpacingDiv'

import UserAuthFormContainer from '../../components/molecules/UserAuthFormContainer'

import { signin } from '../../constants'

import { mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'SignIn',
  components: { Button, UserAuthFormContainer, TextInputGroup, FormError, SpacingDiv},
  setup() { return { v$: useVuelidate() } },
  data() {
    return { 
      loginForm: {
        email: '',
        password: ''
      },
      forceButtonDisable: false,
      displayFailToLogin: false
    }
  },
  computed: {
    buttonDisable() {
      return this.v$.$invalid || this.forceButtonDisable
    },
    signInFailMsg() {
      return signin.SIGNIN_FAIL
    }
  },
  methods: {
    ...mapActions({
      dispatchLogin: 'user/login',
    }),
    loginUser() {
      this.v$.$touch()
      this.forceButtonDisable = true
      this.dispatchLogin(this.loginForm).then(() => {
        this.$router.push('/');
      }).catch(() => { this.displayFailToLogin = true;
      }).then(() => { this.forceButtonDisable = false }) 
    }
  },
  validations() {
    return {
      loginForm: {
        email: { required },
        password: { required }
      }
    }
  },
  watch: {
    loginForm: {
      handler() {
        this.displayFailToLogin=false
      },
      deep: true
    }
  }
}
</script>
