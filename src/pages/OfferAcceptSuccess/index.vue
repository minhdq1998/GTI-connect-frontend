<template>
  <div v-if=loaded class="thank-you-content">
    <i class="far fa-check-circle"></i>
    <h1>Thank You! Your payment has been received.</h1>
    <p>Connection #{{cid}} is accepted! Offer #{{oid}}</p>
    <Button class="general-btn" text="Go to your Manage Connection page" @click="$router.push({ name: 'Manage Connections' })" />
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'

import NotificationMixin from '@/mixins/NotificationMixin'

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
        loaded: false,
      }
    },
    methods: {
      ...mapActions({
        dispatchAcceptOffer: 'connection/acceptOffer',
      }),
      async acceptOffer() {
        await this.dispatchAcceptOffer(this.oid).then(() => {
          this.loaded = true
        })
        .catch(() => {
          this.$router.push({ name: 'Offer Accept Fail', params: {id: this.cid} })
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