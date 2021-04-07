<template>
  <div>
    <modal-container class="view-offers-modal" @onClose="$emit('closeModal')">
      <template v-slot:header>
        <div class="text-header">Received offers</div>
      </template>
      <template v-slot:body>
        <offer-list :offers=offers />   
      </template>
    </modal-container>
  </div>
</template>

<script>
  import ModalContainer from '@/components/atoms/ModalContainer'
  import OfferList from '../../../components/organisms/OfferList.vue'

  export default {
    name: "offer-detail-modal",
    components: {
      ModalContainer, 
      OfferList
    },
    props: {
      offers: {
        type: Array,
        required: true
      }
    },
    computed: {
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
.text-header {
  font-size: 20px;
  font-weight: 600;
}
</style>