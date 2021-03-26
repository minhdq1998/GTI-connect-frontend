<template>
  <div class="">
    <h1>Connections</h1>
    <div>
    <connections-list :connections="connections"></connections-list>    
    </div>
    <pagination 
      :activePage="page" 
      :totalItems="totalConnections" 
      :itemsPerPage=10
      @setPage="(newpage) => { page = newpage }" />
  </div>
</template>

<script>
import ConnectionsList from '@/components/organisms/ConnectionsList'
import Pagination from '@/components/molecules/Pagination'

import AccountsMixin from '@/mixins/AccountsMixin'
import NotificationMixin from '@/mixins/NotificationMixin'
import { error } from '@/constants'

import { mapActions } from 'vuex'

export default {
  name: 'Connections',
  mixins: [AccountsMixin, NotificationMixin],
  components: {ConnectionsList, Pagination},
  data() {
    return {
      page: 1,
      connections: [],
      totalConnections: 0,
    }
  },
  mounted() {
    this.fetchConnections()
  },
  methods: {
    ...mapActions({
      dispatchGetConnectionListBySectors: 'connection/getConnectionListBySectors'
    }),
    fetchConnections() {
      this.dispatchGetConnectionListBySectors({
        page:this.page, 
        status:'Open', 
        sectors: this.user.profile.sectors }).then(res => {
        this.connections = res.results
        this.totalConnections = res.count
      }).catch(() => {
        this.showBadNotification( error.SOMETHING_WENT_WRONG )
      })
    }
  }

}
</script>
