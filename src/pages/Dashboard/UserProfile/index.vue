<template>
  <div class="user-profile">
    <div class="header-container">
      <h1>Your Profile</h1>
      <div>
        <Button text="Edit profile" v-if="editable === false" class="edit-profile-btn" @click="editable = true"/>
        <Button text="Save profile" v-if="editable === true" :disabled="invalidUserInput" class="save-profile-btn" @click="handleSaveButton" />
        <Button text="Cancel" v-if="editable === true" class="cancel-edit-profile-btn" @click="handleCancelButton" />
      </div>
    </div>
    <info-bar class="info-bar" v-if="isAE && !user.is_verified"
      message="You will need to register your Stripe account before you can send offer to any connection. Please head to Payments section to continue the process."
    />
    <div class="profile-container">
      <profile-item :editable="editable" label="First name" :data="currentUser.first_name" v-model="currentUserForm.first_name" />
      <profile-item :editable="editable" label="Last name" :data="currentUser.last_name" v-model="currentUserForm.last_name" />
      <profile-item label="Email" :data="currentUser.email" v-model="currentUserForm.email" />
      <profile-item :editable="editable" label="Phone number" :data="currentUser.profile.phone_number" v-model="currentUserForm.profile.phone_number" />      
      <profile-item :editable="editable" label="Description" :data="currentUser.profile.description" v-model="currentUserForm.profile.description" :isTextArea="true" :itemWidth=100 />
      <user-sectors :editable="editable" label="Sectors" :data="currentUser.profile.sectors.join(', ')" :selectedSectors="currentUserForm.profile.sectors" @updateValue="(newValue) => currentUserForm.profile.sectors = newValue"  />
      <profile-item :editable="editable" label="Nationality" :data="currentUser.profile.nationality" v-model="currentUserForm.profile.nationality" :isSelect="true" :options="nationalities" />
      <profile-item :editable="editable" label="Ocupation Title" :data="currentUser.profile.occupation_title" v-model="currentUserForm.profile.occupation_title"  />
      <profile-item :editable="editable" label="Employer" :data="currentUser.profile.employer" v-model="currentUserForm.profile.employer" />
      <profile-item :editable="editable" label="Highest education level" :data="currentUser.profile.highest_education_level" v-model="currentUserForm.profile.highest_education_level" :isSelect="true" :options="highest_edu_level" />
      <profile-item :editable="editable" label="Granted at" :data="currentUser.profile.education_grant_month_year" v-model="currentUserForm.profile.education_grant_month_year" />
      <profile-item :editable="editable" label="Academic publications" :data="currentUser.profile.academic_publicfications" v-model="currentUserForm.profile.academic_publicfications" :isTextArea="true" :itemWidth=100 />
      <profile-item :editable="editable" label="Achievements" :data="currentUser.profile.achievements" v-model="currentUserForm.profile.achievements" :isTextArea="true" :itemWidth=100 />
      <profile-item :editable="editable" label="Patents" :data="currentUser.profile.patents" v-model="currentUserForm.profile.patents" :isTextArea="true" :itemWidth=100 />
      <profile-item :editable="editable" label="Governments grants" :data="currentUser.profile.governments_grants" v-model="currentUserForm.profile.governments_grants" :isTextArea="true" :itemWidth=100 />
      <UserCV :editable="editable"></UserCV>
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import ProfileItem from '@/components/atoms/ProfileItem'
import InfoBar from '@/components/atoms/InfoBar'
import { highest_edu_level, nationalities, notiType, updateInfo, getUser } from '@/constants'
import store from '@/store'
import UserSectors from './components/userSectors'
import UserCV from './components/userCV.vue'
import AccountsMixin from '@/mixins/AccountsMixin'


export default {
  name:'UserProfile',
  components: { ProfileItem, InfoBar, Button, UserSectors, UserCV },
  mixins: [AccountsMixin],
  mounted() {
    const vm = this
    store.dispatch('user/getCurrentUser').then(res => {
      this.currentUser = JSON.parse(JSON.stringify(res));
      this.currentUserForm = JSON.parse(JSON.stringify(res));
    }).catch(() => {
        const notification = { type: notiType.ERROR, message: getUser.GET_USER_FAIL }
        vm.$store.dispatch('notification/add', notification, { root: true })
    })
  },
  setup () {
    return {}
  },
  data () {
    return {
      editable: false,
      currentUserForm: {
        profile: {
          sectors: []
        }
      },
      currentUser: {
         profile: {
          sectors: []
        }
      },
      highest_edu_level: highest_edu_level,
      nationalities: nationalities
    }
  },

  methods: {
    handleCancelButton() {
      this.editable = false
      this.currentUserForm = JSON.parse(JSON.stringify(this.currentUser))
    },
    handleSaveButton() {
      this.editable = false
      const vm = this
      store.dispatch('user/updateCurrentUser', this.currentUserForm).then(res => {
        this.currentUserForm = JSON.parse(JSON.stringify(res));
        this.currentUser = JSON.parse(JSON.stringify(res));
        const notification = { type: notiType.SUCCESS, message: updateInfo.UPDATE_SUCCESS }
        vm.$store.dispatch('notification/add', notification, { root: true })
      }).catch(() => {
        const notification = { type: notiType.ERROR, message: updateInfo.UPDATE_FAIL }
        vm.$store.dispatch('notification/add', notification, { root: true })
    })
    }
  },

  computed: {
    invalidUserInput() {
      if (this.currentUserForm.first_name === "" || this.currentUserForm.last_name === "" ) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding-top: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.user-profile h1 {
  margin: 20px 0px 20px 0px;
}

.header-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}

.info-bar {
  margin-bottom: 0px;
}

.edit-profile-btn {
  color: var(--primarycolour);
  background-color: var(--bgcolour);
  border: 1px solid var(--primarycolour);
}

.edit-profile-btn:hover {
  background-color: var(--primarycolour);
  color: var(--bgcolour);
}

.cancel-edit-profile-btn {
  margin-left: 10px;
  background-color: var(--bgcolour);
  border: 1px solid var(--cancelcolour);
  color: var(--cancelcolour);
}

.cancel-edit-profile-btn:hover {
  background-color: var(--cancelcolour);
  color: var(--bgcolour);
}
</style>