<template>
  <div class="">
    <profile-header :userProfile=user />
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { error } from '@/constants'

import NotificationMixin from '@/mixins/NotificationMixin'
import ProfileHeader from './components/ProfileHeader.vue'

export default {
  name: 'Profile',
  components: {
    ProfileHeader
  },
  mixins: [NotificationMixin],
  data() {
    return {
      id: this.$route.params.id,
      user: {
        profile: {}
      }
    }
  },
  methods: {
    ...mapActions({
      dispatchGetUser: 'user/getUser'
    }),
    showCancelModal() {
      this.showCancelConnectionModal = true
    }
  },
   beforeMount(){
        this.dispatchGetUser(this.id)
        .then(res => {
            this.user = res
            console.log(this.user)
        }).catch(() => {
            this.showBadNotification(error.SOMETHING_WENT_WRONG)
        })
    },
}
</script>
