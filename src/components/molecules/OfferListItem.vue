<template>
  <div class="offer-list-item" >
    <div class="offer-detail">
      <div class="offer-owner">
        Owner Id: {{offer.owner}}
      </div>
      <div class="offer-message">
        Message: {{offer.mesage}}
      </div>
      <div class="offer-duration">
        Offer duration: {{offerDurationTextFormat(offer)}} 
      </div>
      <div class="offer-status">
        Status: {{offer.status}}
      </div>
      <div class="offer-created-at">
        Created at: {{createdAtFormat(offer)}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "offer-list-item",
    props: {
      offer: {
        type: Object,
        required: true
      }
    },
    methods: {
      offerDurationTextFormat(offer) {
        if (offer.time_number > 1) {
          return offer.time_number + " " + offer.time_type + "s"
        } else
        return offer.time_number + " " + offer.time_type 
      },
      createdAtFormat(offer) {
        return (new Date(offer.created_at)).toLocaleString()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>