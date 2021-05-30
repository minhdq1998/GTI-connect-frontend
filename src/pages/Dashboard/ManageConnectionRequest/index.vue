<template>
  <div class="manage-jobs">
    <h1>Manage Connections</h1>
    <info-bar v-if="isAE && !user.payment_registered"
      message="You will need to register your Stripe account before you can send offer to any connection. Please head to Payments section to continue the process."
    />
    <div>
    <router-link to="/dashboard/createconnection/" v-if="isGT">
        <Button text="Establish new Connection" styleMode="tab-nav-create-button"></Button>
    </router-link>
    </div>
    <TabsContainer 
      :tabs="tabs" 
      :selectedTab="currentTab"
      @selectTab="(tab) => { currentTab = tab }"> 
      <Tab v-if="'Open' == currentTab"><ConnectionsList :connections="connections" :withOwnerDisplay="false"/></Tab>
      <Tab v-if="'In Progress' == currentTab"><ConnectionsList :connections="connections" :withOwnerDisplay="false"/></Tab>
      <Tab v-if="'Finished' == currentTab"><ConnectionsList :connections="connections" :withOwnerDisplay="false"/></Tab>
      <Tab v-if="'Cancelled' == currentTab"><ConnectionsList :connections="connections" :withOwnerDisplay="false"/></Tab>
      <Tab v-if="'Offer Sent' == currentTab"><ConnectionsList :connections="connections" :withOwnerDisplay="false"/></Tab>
    </TabsContainer>
    <div class="container-pagination">
    <pagination 
      :activePage="page" 
      :totalItems="totalConnections" 
      :itemsPerPage=10
      @setPage="(newpage) => { page = newpage }" />
      </div>
  </div>
</template>

<script>
import TabsContainer from '@/components/organisms/TabsContainer'
import Tab from '@/components/molecules/Tab'
import Button from '@/components/atoms/Button'
import InfoBar from '@/components/atoms/InfoBar.vue'
import ConnectionsList from '@/components/organisms/ConnectionsList'
import Pagination from '@/components/molecules/Pagination'

import AccountsMixin from '@/mixins/AccountsMixin'

import {mapActions} from 'vuex'
import {notiType, error} from '@/constants'

export default {
  name:"manage-connections",
  components: {TabsContainer, Tab, Button, ConnectionsList, Pagination, InfoBar },
  mixins: [AccountsMixin],
  created() {
    if (this.isAE) {
      this.tabs = ['Offer Sent', 'In Progress', 'Finished', 'Cancelled']
      this.currentTab = 'Offer Sent'
    } else {
      this.tabs = ['Open','In Progress', 'Finished', 'Cancelled']
      this.currentTab = 'Open'
    }
  },
  mounted() {
    if (this.isGT) {
    this.fetchConnections()
    }
  },
  data() {
    return {
      page: 1,
      tabs: [],
      currentTab: '',
      connections: [],
      totalConnections: 0
    }
  },
  methods: {
    ...mapActions({
      dispatchGetConnectionListByOwnerId: 'connection/getConnectionListByOwnerId',
      dispatchGetConnectionList: 'connection/getConnectionList',
      dispatchNotification: 'notification/add',
      dispatchGetAllConnectionOffers: 'connection/getAllConnectionOffers',
      dispatchGetConnectionListByAEId: 'connection/getConnectionListByAEId',
      dispatchGetConnectionListAEOffered: 'connection/getConnectionListAEOffered'
    }),
    fetchConnections() {
      this.dispatchGetConnectionListByOwnerId({page:this.page, owner:this.user.id, status:this.currentTab}).then(res => {
        this.connections = res.results
        this.totalConnections = res.count
      }).catch(() => {
        this.dispatchNotification(
          { type: notiType.ERROR, message: error.SOMETHING_WENT_WRONG })
      })
    },

    aeFetchConnection() {
      this.dispatchGetConnectionListByAEId({page: this.page, aeId:this.user.id, status:this.currentTab}).then(res => {
        this.connections = res.results
        this.totalConnections = res.count
      }).catch(() => {
        this.dispatchNotification(
          { type: notiType.ERROR, message: error.SOMETHING_WENT_WRONG })
      })
    },
    aeFetchOfferedConnection() {
      this.dispatchGetConnectionListAEOffered(this.user.id).then(res => {
        this.connections = res.results
        this.totalConnections = res.count
      }).catch(() => {
        this.dispatchNotification(
          { type: notiType.ERROR, message: error.SOMETHING_WENT_WRONG })
      })
    }
  },
  watch: {
    currentTab: {
      handler() {
        this.page = 1;
        if (this.isGT) {
          this.fetchConnections()
        } else if (this.isAE) {
          if (this.currentTab === "Offer Sent") {
            this.aeFetchOfferedConnection()
          } else 
          this.aeFetchConnection()
        }
      }
    },
    page: {
      handler() {
         if (this.isGT) {
          this.fetchConnections()
        } else if (this.isAE) {
          this.aeFetchConnection()
        }
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.tab-nav-create-button {
  background-color: var(--secondarycolour);
  color: var(--bgcolour);
  margin-bottom: 20px;
}

.tab-nav-create-button:hover {
  background-color: var(--hovercolour);
  font-weight: bold;
  
}

.container-pagination {
  margin-top: 10px;
}
</style>