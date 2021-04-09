<template>
  <div class="offer-list-item" @click="showOfferDetailModal = true">
    <div class="offer-detail" >
      <div class="offer-owner offer-item">
        <span class="label">Offer from:</span> 
        {{offerOwner.first_name}} {{offerOwner.last_name}}
      </div>
      <div class="offer-message offer-item">
        <span class="label">Message:</span>
        <div class="message-content">{{offer.mesage}}</div>
      </div>
      <div class="offer-duration offer-item">
        <span class="label">Offer duration:</span> 
        {{offerDurationTextFormat(offer)}} 
      </div>
      <div class="offer-created-at">
        <span class="label">Offer sent at:</span>
        {{createdAtFormat(offer)}}
      </div>
    </div>
  </div>
  <offer-detail-modal v-if="showOfferDetailModal" :offerOwner=offerOwner @closeModal="showOfferDetailModal = false" :isAE="false" :offer=offer />
</template>

<script>
  import NotificationMixin from '@/mixins/NotificationMixin'
  import AccountsMixin from '@/mixins/AccountsMixin'
  import { mapActions } from 'vuex'
  import { error } from '@/constants'
import OfferDetailModal from '../../pages/Connection/components/OfferDetailModal.vue'

  export default {
    name: "offer-list-item",
    components: { OfferDetailModal },
    props: {
      offer: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        offerOwner: {},
        showOfferDetailModal: false,
      }
    },
    mixins: [AccountsMixin, NotificationMixin],
    methods: {
      ...mapActions({
        dispatchGetOfferOwner: 'user/getUser'
      }),
      offerDurationTextFormat(offer) {
        if (offer.time_number > 1) {
          return offer.time_number + " " + offer.time_type + "s"
        } else
        return offer.time_number + " " + offer.time_type 
      },
      createdAtFormat(offer) {
        return (new Date(offer.created_at)).toLocaleString()
      },
      closeOfferDetailModal() {
        this.showOfferDetailModal = false
      }
    },
    mounted() {
      this.dispatchGetOfferOwner(this.offer.owner).then(res => {
        this.offerOwner = res
      }).catch(() => {
        this.showBadNotification(error.SOMETHING_WENT_WRONG)
        })
    }
  }
</script>

<style lang="scss" scoped>
.offer-list-item {
  display: flex;
  border: 1px solid var(--boxshadowcolour2);
  margin-bottom: 10px;
  padding: 20px;
  transition: all 0.25s;
  text-decoration: none;
  color: var(--textgray);
}

.offer-list-item:hover {
    box-shadow: 0 0 2.5px 2px var(--boxshadowcolour2);
    cursor: pointer;
}

.label {
  font-weight: 600;
}

.offer-item {
  margin-bottom: 5px;
}

.message-content {
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
}
</style>