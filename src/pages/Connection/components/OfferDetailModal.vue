<template>
  <div>
    <modal-container class="offer-detail-modal" @onClose="$emit('closeModal')">
       <template v-slot:header>
        <div class="text-header">Current offer:</div>
      </template>
       <template v-slot:body>
        <div class="offer-detail">
          <div class="offer-message">
            Message: {{offer.mesage}}
          </div>
          <div class="offer-duration">
            Offer duration: {{offerDurationTextFormat}} 
          </div>
          <div class="offer-status">
            Status: {{offer.status}}
          </div>
          <div class="offer-created-at">
            Created at: {{offer.created_at}}
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <Button v-if="isAE" text="Cancel offer" class="general-btn"/>
        <Button v-if="!isAE" text="Accept offer" class="general-btn"/>
      </template>
    </modal-container>
  </div>
</template>

<script>
  import Button from '@/components/atoms/Button'
  import ModalContainer from '@/components/atoms/ModalContainer'

  export default {
    name: "offer-detail-modal",
    components: {
      Button,
      ModalContainer
    },
    props: {
      offer: {
        type: Object,
        required: true
      },
      isAE: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      offerDurationTextFormat() {
        if (this.offer.time_number > 1) {
          return this.offer.time_number + " " + this.offer.time_type + "s"
        } else
        return this.offer.time_number + " " + this.offer.time_type 
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
</style>