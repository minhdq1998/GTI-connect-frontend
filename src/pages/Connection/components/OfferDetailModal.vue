<template>
  <div>
    <modal-container class="offer-detail-modal" @onClose="$emit('closeModal')">
       <template v-slot:header>
        <div class="text-header" v-if="!isAE">Current offer:</div>
        <div class="text-header" v-if="isAE">Your offer: </div>
      </template>
       <template v-slot:body>
        <div class="offer-detail">
          <div class="offer-owner item">
            <img :src="avatarUrl">
            <router-link :to="{ name: 'Profile', params: { id: offerOwner.pk }}">
              <div class="owner-name">
                {{offerOwner.first_name}} {{offerOwner.last_name}}
              </div>
            </router-link>
          </div>
          <div class="offer-message item">
            <span class="label">Message:</span> 
            {{offer.mesage}}
          </div>
          <div class="offer-duration item">
            <span class="label">Offer duration:</span> 
            {{offerDurationTextFormat}} 
          </div>
          <div class="offer-status item">
            <span class="label">Status:</span> 
            {{offer.status}}
          </div>
          <div class="offer-created-at">
            <span class="label">Created at:</span> 
            {{createdAtFormat(offer)}}
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <Button v-if="isAE" text="Cancel offer" @click="cancelOffer" class="general-btn"/>
        <Button v-if="!isAE" text="Accept offer" @click="acceptOffer" class="general-btn"/>
      </template>
    </modal-container>
  </div>
</template>

<script>
  import Button from '@/components/atoms/Button'
  import ModalContainer from '@/components/atoms/ModalContainer'
  import NotificationMixin from '@/mixins/NotificationMixin'
  import { offer } from '@/constants'
  import { loadStripe } from '@stripe/stripe-js'
  import { mapActions } from 'vuex'

  export default {
    name: "offer-detail-modal",
    mixins: [NotificationMixin],
    components: {
      Button,
      ModalContainer
    },
    emits: ['closeModal', 'cancelOffer'],
    props: {
      offer: {
        type: Object,
        required: true
      },
      isAE: {
        type: Boolean,
        required: true
      },
      offerOwner: {
        type: Object,
        required: true
      },
    },
    computed: {
      offerDurationTextFormat() {
        if (this.offer.time_number > 1) {
          return this.offer.time_number + " " + this.offer.time_type + "s"
        } else
        return this.offer.time_number + " " + this.offer.time_type 
      },
      avatarUrl() {
        return process.env.VUE_APP_ROOT_API + this.offerOwner.profile.avatar
      },
      offerInfo() {
        return {
          connectionId: this.offer.connection,
          ownerId: this.offerOwner.pk
        }
      },
      thankYouUrl() {
        return process.env.VUE_APP_LOCAL_URL + '/thankyou/connection_id=' + this.offer.connection + '-offer_id=' + this.offer.pk
      },
      acceptFailUrl() {
        return process.env.VUE_APP_LOCAL_URL + '/acceptfail/connection_id=' + this.offer.connection
      }
    },
    methods: {
      ...mapActions({
            dispatchAcceptOffer: 'connection/acceptOffer',
            dispatchCancelOffer: 'connection/cancelOffer',
            dispatchCreateCheckoutSession: 'connection/createCheckoutSession'
      }),
      createdAtFormat(offer) {
        return (new Date(offer.created_at)).toLocaleString()
      },
      acceptOffer() {
        this.dispatchCreateCheckoutSession({
          success_url: this.thankYouUrl,
          cancel_url: this.acceptFailUrl,
          connection_id: this.offer.connection,
          offer_id: this.offer.pk
        }).then(async res => {
          let checkout_session_id = res.checkout_id
          let stripe_public_key = process.env.VUE_APP_STRIPE_PUBLIC_KEY
          var stripe = await loadStripe(stripe_public_key)
          stripe.redirectToCheckout({
            sessionId: checkout_session_id
          }).then(result => {
            console.log(result)
          })
        }).catch(e => {
          this.showBadNotification(offer.OFFER_ACCEPT_FAIL + e.detail)
        })
        

        // this.dispatchAcceptOffer(this.offer.pk).then(() => {
        //   this.$router.push({ name: 'Manage Connections' })
        //   this.showGoodNotification(offer.OFFER_ACCEPT_SUCCESS)
        // }).catch(err => {
        //   this.showBadNotification(offer.OFFER_ACCEPT_FAIL + err.detail)
        // })
      },
      cancelOffer() {
        this.dispatchCancelOffer(this.offer.pk).then(() => {
          this.showGoodNotification(offer.OFFER_CANCEL_SUCCESS)
          this.$emit('closeModal')
          this.$emit('cancelOffer')
        }).catch(err => {
          this.showBadNotification(offer.OFFER_CANCEL_FAIL + err.detail)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.text-header {
  font-size: 20px;
  font-weight: 600;
}

.offer-message {
  white-space: pre-line
}

.label {
  font-weight: 600;
}

.item {
  margin-bottom: 10px;
}

.offer-detail {
  padding: 10px
}

.offer-owner {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.offer-owner a {
  text-decoration: none;
  color: var(--textgray);
}

.offer-owner img {
  height: 35px;
  width: 35px;
  margin-right: 10px;
  border-radius: 50%;
}
</style>