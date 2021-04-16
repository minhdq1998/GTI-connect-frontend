<template>
  <div>
    <Button 
      v-if="!isConnectionOwner && isAE && isOpen && !offerSent"
      class="connection-create-submit-btn action-btn" 
      text="Make an offer"
      @click="$emit('showMakeOffer')">
    </Button>
    <Button 
        v-if="offerSent"
        class="view-offer-btn action-btn" 
        text="View your offer"
        @click="$emit('showOfferDetail')">
    </Button>
    <Button 
      v-if="isConnectionOwner && hasOffers && isOpen"
      text="View Offers"
      class="view-offers-btn"
      @click="$emit('showReceivedOffers')">>
    </Button>
    <Button 
        v-if="isConnectionOwner && isOpen"
        class="cancel-connection-btn action-btn" 
        text="Close connection"
        @click="$emit('closeConnection')">
    </Button>
    <Button
      v-if="!isConnectionOwner && isInProgress && isAE && hasReport && !requestFinishSent"
      class="request-finish-btn action-btn" 
      text="Request finish connection"
      @click="$emit('requestFinishConnection')"
    >
    </Button>
    <Button
      v-if="isConnectionOwner && isInProgress && !isAE && hasReport && requestFinishSent"
      class="request-finish-btn action-btn" 
      text="Response to request"
      @click="$emit('responseRequestFinish')"
    >
    </Button>
  </div>
</template>

<script>
  import Button from '@/components/atoms/Button'
  export default {
    name: "connection-button-group",
    components: { Button },
    props: {
      isConnectionOwner: {
        type: Boolean,
        required: true
      },
      isAE: {
        type: Boolean,
        required: true
      },
      isCancelled: {
        type: Boolean,
        required: true
      },
      offerSent: {
        type: Boolean,
        required: true
      },
      hasOffers: {
        type: Boolean,
        required: true
      },
      isOpen: {
        type: Boolean,
        required: true
      },
      isInProgress: {
        type: Boolean,
        required: true
      },
      hasReport: {
        type: Boolean,
        required: true
      },
      requestFinishSent: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.action-btn {
  display: block;
  margin-top: 20px;
  width: 100%;
  }

.view-offers-btn {
  color: var(--whitecolour);
  background-color: var(--primarycolour);
  display: block;
  margin-top: 10px;
  width: 100%;
}

.request-finish-btn {
  color: var(--whitecolour);
  background-color: var(--primarycolour);
}

.request-finish-btn:hover {
  background-color: var(--primarycolour-hover);
}

.view-offers-btn:hover {
  background-color: var(--primarycolour-hover);
}

.view-offer-btn {
  color: var(--whitecolour);
  background-color: var(--primarycolour);
}

.view-offer-btn:hover {
  background-color: var(--primarycolour-hover);
}

</style>