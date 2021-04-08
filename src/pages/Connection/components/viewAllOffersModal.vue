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
  }
</script>

<style lang="scss" scoped>
.text-header {
  font-size: 20px;
  font-weight: 600;
}
</style>