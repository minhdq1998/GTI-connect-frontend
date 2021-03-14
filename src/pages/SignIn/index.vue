<template>
<div class="form-container">
  <form class="sign-in-form" @submit.prevent="loginUser">

  </form>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'

export default {
  name: 'SignIn',
  components: {
  },
  setup() {
    return {
       v$: useVuelidate()
    }
  },
  methods: {
    loginUser() {
      const vm = this
      this.v$.touch()
      console.log(vm)
    }
  }
}
</script>
