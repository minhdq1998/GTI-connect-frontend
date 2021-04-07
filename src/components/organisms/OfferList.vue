<template>
  <div class="offer-list-container">
    <h2>Offer List</h2>
    <div class="offer-list" v-for="(offer, index) in offers" :key="index">
      <offer-list-item :offer=offer />
    </div>
  </div>
</template>

<script>
import OfferListItem from '../molecules/OfferListItem.vue'
  export default {
  components: { OfferListItem },
  props: {
    offers: {
      type: Array,
      required: true
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>