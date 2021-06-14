<template>
  <div class="profile-view">
    <profile-header :userProfile=userProfile />
    <profile-info :userProfile=userProfile />
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { error } from '@/constants'

import NotificationMixin from '@/mixins/NotificationMixin'
import ProfileHeader from './components/ProfileHeader.vue'
import ProfileInfo from './components/ProfileInfo.vue'

import AccountsMixin from '@/mixins/AccountsMixin'


export default {
  name: 'Profile',
  components: {
    ProfileHeader,
    ProfileInfo
  },
  mixins: [NotificationMixin, AccountsMixin],
  data() {
    return {
      id: this.$route.params.id,
      userProfile: {
        profile: {}
      }
    }
  },
  methods: {
    ...mapActions({
      dispatchGetUser: 'user/getUser'
    }),
  },
   beforeMount(){
    this.dispatchGetUser(this.id).then(res => {
      if (res.pk === this.user.id) {
        this.$router.push('/dashboard')
      }
        this.userProfile = res 
      }).catch(() => {
        this.showBadNotification(error.SOMETHING_WENT_WRONG)
      })
    },
}
</script>
