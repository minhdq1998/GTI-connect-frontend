<template>
  <div>
    <h1>Establish new connection</h1>
    <h2>Select your package: </h2>
    <options-input 
      :options="package_options" 
      v-model="connectionForm.request_type" />
    <PackageInfoBox :packageInfo="packageInfo" />
    <TextAreaInputGroup 
      label="Your description: " 
      v-model="connectionForm.description"
      :maxLength=3000
      />
    <Button 
      text="Establish" 
      class="connection-create-submit-btn" 
      @click="submit()"
      :disabled="!connectionForm.description"
      ></Button>
  </div>
</template>

<script>
import OptionsInput from '@/components/molecules/OptionsInput'
import PackagesInfoMixin from '@/mixins/PackagesInfoMixin'

import PackageInfoBox from './components/PackageInfoBox'
import Button from '@/components/atoms/Button'

import TextAreaInputGroup from '@/components/molecules/TextAreaInputGroup'

import { mapActions } from 'vuex'
import { notiType, error } from '@/constants'

export default {
    name:"create-connection",
    components: {OptionsInput, PackageInfoBox,TextAreaInputGroup, Button},
    mixins:[PackagesInfoMixin],
    mounted() {
      this.package_options = this.getPackageOptions()
    },
    data() {
      return {
        connectionForm: {
          request_type: "Package 1",
          description: ""
        },
        package_options: []
      }
    },
    computed: {
      packageInfo() {
        return this.getPackageInfo(this.connectionForm.request_type)
      },
    },
    methods: {
      ...mapActions({
        dispatchCreateConnection: 'connection/create',
        dispatchNotification: 'notification/add'
      }),
      submit() {
        this.dispatchCreateConnection(this.connectionForm).then(() => {
            this.$router.push({ name: 'Manage Connections' })
          }).catch(() => {
            this.dispatchNotification(
              { type: notiType.ERROR, message: error.SOMETHING_WENT_WRONG })
          })
      }
    },
}
</script>

<style scoped>
</style>