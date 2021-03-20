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

import { new_connection } from '@/constants'

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
      descriptionError() {
        return new_connection.DESCRIPTION_ERROR
      }
    },
    methods: {
      submit() {
        console.log('submit')
      }
    },
}
</script>

<style scoped>

</style>