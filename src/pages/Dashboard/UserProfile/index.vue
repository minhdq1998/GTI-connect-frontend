<template>
  <div class="user-profile">
    <h1>Your Profile</h1>
    <div class="profile-container">
      <profile-item label="First name" :value="user.first_name" />
      <profile-item label="Last name" :value="user.last_name" />
      <profile-item itemWidth=100 label="Description" :value="user.profile.description" />
      <profile-item label="Nationality" :value="user.profile.nationality" />
      <profile-item label="Sectors" :value="user.profile.sectors.join(', ')" /> 
      <profile-item label="Ocupation Title" :value="user.profile.occupation_title" />
      <profile-item label="Employer" :value="user.profile.employer" />
      <profile-item label="Highest education level" :value="user.profile.highest_education_level" />
      <profile-item label="Granted at" :value="user.profile.education_grant_month_year" />
      <profile-item label="Academic publicfications" :value="user.profile.academic_publicfications" />
      <profile-item label="Achievements" :value="user.profile.achievements" />
      <profile-item label="Patents" :value="user.profile.patents" />
      <profile-item label="Governments grants" :value="user.profile.governments_grants" />
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileItem from '../../../components/atoms/dashboardComponents/ProfileItem'

export default {
  name:'UserProfile',
  components: { ProfileItem },
  setup () {
    return {}
  },
  computed: mapState({
    user: state => ({
      id: state.user.id,
      first_name: state.user.first_name,
      last_name: state.user.last_name,
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
  justify-content: flex-start;
}
.user-profile h1 {
  margin: 20px 0px 20px 0px;
}
</style>