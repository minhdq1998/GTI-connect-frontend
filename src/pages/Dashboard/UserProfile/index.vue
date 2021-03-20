<template>
  <div class="user-profile">
    <div class="header-container">
      <h1>Your Profile</h1>
      <Button text="Edit profile" v-if="editable === false" @click="editable = true"/>
      <Button text="Save profile" v-if="editable === true" class="save-profile" @click="editable = false" />
    </div>
    <div class="profile-container">
      <profile-item :editable="editable" label="First name" :value="user.first_name" />
      <profile-item :editable="editable" label="Last name" :value="user.last_name" />
      <profile-item :editable="editable" label="Email" :value="user.email" />
      <profile-item :editable="editable" label="Phone number" :value="user.profile.phone_number" />      
      <profile-item :editable="editable" :itemWidth=100 label="Description" :value="user.profile.description" />
      <profile-item :editable="editable" label="Nationality" :value="user.profile.nationality" />
      <profile-item label="Sectors" :value="user.profile.sectors.join(', ')" /> 
      <profile-item label="Ocupation Title" :value="user.profile.occupation_title" />
      <profile-item label="Employer" :value="user.profile.employer" />
      <profile-item label="Highest education level" :value="user.profile.highest_education_level" />
      <profile-item label="Granted at" :value="user.profile.education_grant_month_year" />
      <profile-item :itemWidth=100 label="Academic publicfications" :value="user.profile.academic_publicfications" />
      <profile-item :itemWidth=100 label="Achievements" :value="user.profile.achievements" />
      <profile-item :itemWidth=100 label="Patents" :value="user.profile.patents" />
      <profile-item :itemWidth=100 label="Governments grants" :value="user.profile.governments_grants" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Button from '../../../components/atoms/Button.vue'
import ProfileItem from '../../../components/atoms/dashboardComponents/ProfileItem'

export default {
  name:'UserProfile',
  components: { ProfileItem, Button },
  setup () {
    return {}
  },
  data () {
    return {
      editable: false,
    }
  },
  computed: mapState({
    user: state => ({
      id: state.user.id,
      first_name: state.user.first_name,
      last_name: state.user.last_name,
      email: state.user.email,
      role: state.user.role,
      avatarUrl: state.user.avatarUrl,
      profile: state.user.profile
    })
  }),
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

.save-profile {
  background-color: var(--successcolour);
  color: var(--bgcolour);
}
</style>