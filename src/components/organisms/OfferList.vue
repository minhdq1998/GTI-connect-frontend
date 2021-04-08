<template>
  <div class="offer-list-container">
    <div class="offer-list" v-for="(offer, index) in offers" :key="index">
      <offer-list-item :offer=offer />
    </div>
  </div>
</template>

<script>
import OfferListItem from '../molecules/OfferListItem.vue'
  export default {
  components: { OfferListItem },
  data() {
    return {
      showOfferDetailModal: false,
    }
  },
  props: {
    offers: {
      type: Array,
      required: true
    }
  }
  }
</script>

<style lang="scss" scoped>
.offer-list-container {
  padding: 10px 10px 0px 10px;
  margin: 10px 0px 10px 0px;
  overflow-y: scroll;
  border: 1px solid var(--boxshadowcolour2);
  height: 400px;
}
</style>