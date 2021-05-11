<template>
  <div class="thank-you-content">
    <i class="far fa-check-circle"></i>
    <h1>Thank You! Your payment has been received.</h1>
    <p>Connection #{{cid}} is accepted! Offer #{{oid}}</p>
    <Button class="general-btn" text="Go to your Manage Connection page" @click="$router.push({ name: 'Manage Connections' })" />
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'

import NotificationMixin from '@/mixins/NotificationMixin'
import { offer } from '@/constants'

import { mapActions } from 'vuex'

  export default {
    name: "offer-accept-success",
    mixins: [NotificationMixin],
    components: {
      Button
    },
    data() {
      return {
        cid: this.$route.params.cid,
        oid: this.$route.params.oid,
      }
    },
    methods: {
      ...mapActions({
        dispatchAcceptOffer: 'connection/acceptOffer',
      }),
      acceptOffer() {
        this.dispatchAcceptOffer(this.oid).catch(() => {
          this.showBadNotification(offer.OFFER_ACCEPT_FAIL)
        })
      }
    },
    mounted() {
      this.acceptOffer()
    }
  }
</script>

<style lang="scss" scoped>
.fa-check-circle {
  font-size: 100px;
  color: var(--successcolour);
}

.thank-you-content {
  text-align: center;
  margin-top: calc((100vh - 260px)/2 - 110px);
}
</style>