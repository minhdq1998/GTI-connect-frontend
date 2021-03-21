<template>
  <div>
      <page-number 
      v-for="(page, index) in pages" 
      :key="index" 
      :number=page 
      :isActive="page == activePage"
      @click="$emit('setPage', page)"></page-number>
  </div>
</template>

<script>
import PageNumber from '../atoms/PageNumber.vue'

export default {
    name: 'pagination',
    components: { PageNumber},
    props: {
        totalItems: Number,
        activePage: Number,
        itemsPerPage: Number 
    },
    computed: {
        pages() {
            let totalPages = Math.floor(this.totalItems / this.itemsPerPage) + (this.totalItems % this.itemsPerPage == 0 ? 0 : 1)
            let pageList = []
            for (let i=1; i<= totalPages; i ++) {
                pageList.push(i)
            }
            return pageList
        }
    }
}
</script>

<style>

</style>