<template>
  <div class="profile-info">
    <profile-item label="First name" :data="userProfile.first_name"  />
    <profile-item label="First name" :data="userProfile.last_name" />
    <profile-item label="Description" :data="userProfile.profile.description" :itemWidth=100 />
    <profile-item label="Ocupation Title" :data="userProfile.profile.occupation_title" />
    <profile-item label="Employer" :data="userProfile.profile.employer" />
    <profile-item label="Highest education level" :data="userProfile.profile.highest_education_level" />
    <profile-item label="Granted at" :data="userProfile.profile.education_grant_month_year" />
    <profile-item label="Achievements" :data="userProfile.profile.achievements" :itemWidth=100 />
    <profile-item label="Patents" :data="userProfile.profile.patents" :itemWidth=100 />
    <profile-item label="Governments grants" :data="userProfile.profile.governments_grants" :itemWidth=100 />
    <div class="profile-item">
      <label class="item-label">CV/Resume</label>
      <div>
      <a target="_blank" :href="cvUrl"><Button :text=cvText styleMode="cv-url"></Button></a>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileItem from '@/components/atoms/ProfileItem.vue'
import Button from '@/components/atoms/Button.vue'

  export default {
    name: "profile-info",
    components: { ProfileItem, Button },
    props: {
      userProfile: {
        type:Object,
        required: true
      }
    },
    computed: {
      cvUrl() {
        return process.env.VUE_APP_ROOT_API + this.userProfile.profile.cvdocument
      },
      cvText() {
        return this.userProfile.first_name + "'s CV"
      }
    }
  }
</script>

<style lang="scss" scoped>
.profile-info {
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.profile-item {
  margin-bottom: 20px;
  width: 45%;
}

.item-label {
  font-weight: 600;
  color: var(--labelcolour);
  font-size: 1.2rem;
}

a {
  text-decoration: none;
}

.cv-url {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border: 1px solid var(--secondarycolour);
  color: var(--secondarycolour);
  background-color: var(--bgcolour);
}

.cv-url:hover {
  background-color: var(--secondarycolour-hover);
}

@media screen and (max-width: 640px) {
    .profile-info {
      padding: 20px 0px 20px 0px
    }

}
</style>