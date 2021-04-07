<template>
  <div>
    <Button 
      v-if="!isConnectionOwner && isAE && !isCancelled && !offerSent"
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
        :disabled="isCancelled"
        v-if="isConnectionOwner"
        class="cancel-connection-btn action-btn" 
        text="Close connection"
        @click="$emit('closeConnection')">
    </Button>
    <Button 
        v-if="isConnectionOwner && hasOffers"
        text="View Offers"
        class="view-offers-btn"
        @click="$emit('showReceivedOffers')">>
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