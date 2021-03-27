<template>
  <div class="manage-jobs">
    <h1>Manage Connections</h1>
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
import AccountsMixin from '@/mixins/AccountsMixin'
import ConnectionsList from '@/components/organisms/ConnectionsList'
import Pagination from '@/components/molecules/Pagination'

import {mapActions} from 'vuex'
import {notiType, error} from '@/constants'

export default {
  name:"manage-connections",
  components: {TabsContainer, Tab, Button, ConnectionsList, Pagination},
  mixins: [AccountsMixin],
  created() {
    if (this.isAE) {
      this.tabs = ['In Progress', 'Finished', 'Cancelled']
      this.currentTab = 'In Progress'
    } else {
      this.tabs = ['Open','In Progress', 'Finished', 'Cancelled']
      this.currentTab = 'Open'
    }
  },
  mounted() {
    this.fetchConnections()
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
      dispatchGetConnectionList: 'connection/getConnectionList',
      dispatchNotification: 'notification/add'
    }),
    fetchConnections() {
      this.dispatchGetConnectionList({page:this.page, owner:this.$store.state.user.id, status:this.currentTab}).then(res => {
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
        this.fetchConnections()
      }
    },
    page: {
      handler() {
        this.fetchConnections()
      }
    }
  }
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