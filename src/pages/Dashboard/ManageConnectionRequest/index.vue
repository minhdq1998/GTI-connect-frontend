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
      <Tab v-if="'Open' == currentTab">Open</Tab>
      <Tab v-if="'In Progress' == currentTab">In Progress</Tab>
      <Tab v-if="'Finished' == currentTab">Finished</Tab>
      <Tab v-if="'Cancelled' == currentTab">Cancelled</Tab>
    </TabsContainer>
  </div>
</template>

<script>
import TabsContainer from '@/components/organisms/TabsContainer'
import Tab from '@/components/molecules/Tab'
import Button from '@/components/atoms/Button'
import AccountsMixin from '@/mixins/AccountsMixin'

export default {
  name:"manage-connections",
  components: {TabsContainer, Tab, Button},
  mixins: [AccountsMixin],
  mounted() {
    if (this.isAE) {
      this.tabs = ['In Progress', 'Finished', 'Cancelled']
      this.currentTab = 'In Progress'
    } else {
      this.tabs = ['Open','In Progress', 'Finished', 'Cancelled']
      this.currentTab = 'Open'
    }
  },
  data() {
    return {
      tabs: [],
      currentTab: ''
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
</style>