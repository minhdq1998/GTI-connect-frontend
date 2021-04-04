<template>
  <div class="profile-header">
    <div class="avatar-container">
      <profile-avatar :avatarUrl="avatarUrl" ></profile-avatar>
    </div>
    <div class="profile-title">
      <span class="profile-user-name">{{userProfile.first_name}} {{userProfile.last_name}}</span>
      <div class="profile-mini-detail">
        <span v-if="userProfile.profile.occupation_title">{{userProfile.profile.occupation_title}}</span>
        <span v-if="userProfile.profile.employer"> at {{userProfile.profile.employer}}</span>
      </div>
      <div class="profile-mini-detail" v-if="userProfile.profile.nationality"><b>Nationality: </b>{{userProfile.profile.nationality}}</div>
      <div class="sector-container" v-if="userProfile.profile.sectors">
        <div class="sector-tag" v-for="sector, index in userProfile.profile.sectors" :key="index">{{sector}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import ProfileAvatar from '@/components/atoms/ProfileAvatar'
  import { getMediaUrl } from '@/utils/media'

  export default {
    name: "profile-header",
    components: { ProfileAvatar },
    props: {
      userProfile: {
        type:Object,
        required: true
      }
    },
    computed: {
      avatarUrl() {
        return getMediaUrl(this.userProfile.profile.avatar)
      },
    }
  }
</script>

<style lang="scss" scoped>
.profile-header {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.avatar-container {
  width: 150px;
  height: 150px;
}

.profile-user-name {
  font-size: 25px;
  font-weight: 600;
}

.profile-mini-detail {
  margin-top: 5px;
  margin-bottom: 5px;
}

.profile-title {
  margin-left: 40px;
}


.sector-tag {
    margin-top: 3px;
    padding: 3px 10px 3px 10px;
    border-radius: 3px;
    background-color: var(--disabledcolour);
    color: var(--labelcolour);
    width: fit-content;
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 150px;
    font-weight: bold;
    text-align: center;
    float: left;
}

@media screen and (max-width: 640px) {
    .sector-tag {
      width: 150px;
      float: none;
      margin: 3px auto 0px auto;
    }


    .profile-header {
       justify-content: center;
    }
}
</style>