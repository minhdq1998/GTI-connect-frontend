<template>
  <div>
    <modal-container class="change-pw-modal" @onClose="$emit('closeModal')">
      <template v-slot:header>
        <h2>Change your password</h2>
      </template>
      <template v-slot:body>
        <div class="change-pw-form">
          <text-input-group 
            label="Your current password" 
            placeholder="Please enter your current password"
            type="password"
            v-model="passwordForm.currentPassword"
            @blur="v$.passwordForm.currentPassword.$touch()"
            :validated="!v$.passwordForm.currentPassword.$error"
          />
          <template v-if="v$.passwordForm.currentPassword.$error">
          <FormError 
            v-if="v$.passwordForm.currentPassword.required.$invalid"
            errorMsg="Your password is required." />
          <FormError 
            v-if="v$.passwordForm.currentPassword.valid.$invalid"
            errorMsg="Your password must contain at least 1 number and 1 special character." />
          <FormError 
            v-if="v$.passwordForm.currentPassword.minLength.$invalid || v$.passwordForm.currentPassword.maxLength.$invalid"
            errorMsg="The password should be between 8 to 20 characters." />
          </template>

          <text-input-group 
            label="Your new password" 
            placeholder="Please enter your new password"
            type="password"
            v-model="passwordForm.newPassword"
            @blur="v$.passwordForm.newPassword.$touch()"
            :validated="!v$.passwordForm.newPassword.$error"
          />
          <template v-if="v$.passwordForm.newPassword.$error">
          <FormError 
            v-if="v$.passwordForm.newPassword.required.$invalid"
            errorMsg="Your new password is required." />
          <FormError 
            v-if="v$.passwordForm.newPassword.sameAsOld.$invalid"
            errorMsg="Your new password must be different from your current password." />
          <FormError 
            v-if="v$.passwordForm.newPassword.valid.$invalid"
            errorMsg="Your new password must contain at least 1 number and 1 special character." />
          <FormError 
            v-if="v$.passwordForm.newPassword.minLength.$invalid || v$.passwordForm.newPassword.maxLength.$invalid"
            errorMsg="The new password should be between 8 to 20 characters." />
          
          </template>

          <text-input-group 
            label="Re-enter new password" 
            placeholder="Please re-enter your new password"
            type="password"
            v-model="passwordForm.reEnterNewPassword" 
            @blur="v$.passwordForm.reEnterNewPassword.$touch()"
            :validated="!v$.passwordForm.reEnterNewPassword.$error"
          />
          <template v-if="v$.passwordForm.reEnterNewPassword.$error">
            <FormError 
              v-if="v$.passwordForm.reEnterNewPassword.required.$invalid"
              errorMsg="Your re-enter password is required." />
            <FormError 
              v-if="v$.passwordForm.reEnterNewPassword.sameAsPassword.$invalid" 
              errorMsg="The re-entered password is incorrect."/>
          </template>

        </div>
      </template>
      <template v-slot:footer>
        <Button text="Update password" styleMode="general-btn" @click="handleUpdatePassword" :disabled="buttonDisable" />
      </template>
    </modal-container>
  </div>
</template>

<script>
  import ModalContainer from '@/components/atoms/ModalContainer.vue';
  import Button from '@/components/atoms/Button.vue';
  import TextInputGroup from '@/components/molecules/TextInputGroup.vue';
  import FormError from '@/components/atoms/FormError.vue'
  import { changePassword } from '@/constants'

  import useVuelidate from '@vuelidate/core'
  import { required, sameAs, maxLength, minLength, not } from '@vuelidate/validators'
  import NotificationMixin from '@/mixins/NotificationMixin'

  import User from '@/apis/User'

  export default {
    name: 'ChangePasswordModal',
    components: { ModalContainer, Button, TextInputGroup, FormError },
    emits: ['closeModal'],
    mixins: [NotificationMixin],
    setup () {
      return {
        v$: useVuelidate()
      }
    },
    data() {
      return {
        passwordForm: this.newPasswordForm(),
        forceButtonDisable: false,
      }
    },
    methods: {
      newPasswordForm() {
        return {
          currentPassword: '',
          newPassword: '',
          reEnterNewPassword: ''
        }
      },
      handleUpdatePassword() {
        this.v$.$touch()
        if (!this.v$.$invalid) {
          this.forceButtonDisable = true
          User.changePassword({
            old_password: this.passwordForm.currentPassword,
            new_password: this.passwordForm.reEnterNewPassword
          }).then(() => {
            this.passwordForm = this.newPasswordForm()
            this.$emit('closeModal')
            this.showGoodNotification(changePassword.CHANGE_PASSWORD_SUCCESS)
          }).catch(() => {
            this.showBadNotification(changePassword.CHANGE_PASSWORD_FAIL)
          })
        }
      }
    },
    computed: {
      buttonDisable() {
        return this.v$.$invalid || this.forceButtonDisable
      }
    },
    validations () {
    return {
      passwordForm: {
        currentPassword: {
          required, 
          minLength: minLength(8), 
          maxLength: maxLength(20),
          valid: function(value) {
            const containsNumber = /[0-9]/.test(value)
            const containsSpecial = /[!@#$%^&*)(+=`.~_-]/.test(value)
            return containsNumber && containsSpecial
          }
        },
        newPassword: {
          required, 
          minLength: minLength(8), 
          maxLength: maxLength(20),
          valid: function(value) {
            const containsNumber = /[0-9]/.test(value)
            const containsSpecial = /[!@#$%^&*)(+=`.~_-]/.test(value)
            return containsNumber && containsSpecial
          },
          sameAsOld: not(sameAs(this.passwordForm.currentPassword))
        },
        reEnterNewPassword: {required, sameAsPassword: sameAs(this.passwordForm.newPassword) },
      }
    }
  }
  }
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}

p {
  margin-bottom: 5px;
}

.change-pw-form {
  padding: 0px 20px 0px 20px;
  margin-bottom: 20px;
}

</style>