<template>
  <div>
    <h1>Establish new connection</h1>
    <h2>Select your package: </h2>
    <options-input 
      :options="packagesName" 
      v-model="selectedPackage" 
      />
    <PackageInfoBox :packageInfo=packageInfo />
    <TextAreaInputGroup 
      label="Your description: " 
      v-model="descriptionInput"
      :maxLength=3000
      />;
    <Button 
      text="Establish" 
      class="connection-create-submit-btn" 
      @click="submit()"
      :disabled="!descriptionInput"
      ></Button>
  </div>
</template>

<script>
import OptionsInput from '@/components/molecules/OptionsInput'

import PackageInfoBox from './components/PackageInfoBox'
import Button from '@/components/atoms/Button'

import TextAreaInputGroup from '@/components/molecules/TextAreaInputGroup'

import { mapActions } from 'vuex'
import NotificationMixin from '@/mixins/NotificationMixin'

import {  error } from '@/constants'
import Packages from '@/apis/Packages'

export default {
    name:"create-connection",
    components: {OptionsInput, PackageInfoBox,TextAreaInputGroup, Button},
    mixins:[NotificationMixin],
    mounted() {
      Packages.getPackages().then(res => {
        this.package_options = res
        console.log(this.package_options)
      }).catch(() => {
        this.showBadNotification(error.SOMETHING_WENT_WRONG)
      })
    },
    data() {
      return {
        descriptionInput: "",
        selectedPackage: "",
        package_options: [],
        packageInfo: {}
      }
    },
    computed: {

      packagesName() {
        return this.package_options.map(x => x.name)
      },
      connectionForm() {
        return {
          package: this.packageInfo.pk,
          description: this.descriptionInput
        }
      },



    },
    watch: {
      selectedPackage: {
        handler() {
          this.packageInfo = this.updatePackage()
        }
      }
    },
    methods: {
      ...mapActions({
        dispatchCreateConnection: 'connection/create',
      }),

      updatePackage() {
        let i
        for (i = 0; i <= this.package_options.length; i++) {
          if (this.package_options[i].name === this.selectedPackage) {
            return this.package_options[i]
          }
        }
      },

      submit() {
        this.dispatchCreateConnection(this.connectionForm).then(() => {
            this.$router.push({ name: 'Manage Connections' })
          }).catch((err) => {
            if (err.response.data.non_field_errors) {
              this.showBadNotification(error.SOMETHING_WENT_WRONG + " " + err.response.data.non_field_errors[0] + ".")
            }
            else
            this.showBadNotification(error.SOMETHING_WENT_WRONG)
          })
      }
    },
}
</script>

<style scoped>
</style>