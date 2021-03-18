<template>
  <div class="manage-jobs">
    <h1>Manage Connections</h1>
    <TabsContainer 
      :tabs="['Open','In Progress', 'Finished', 'Cancelled']" 
      :selectedTab="currentTab"
      @selectTab="(tab) => { currentTab = tab }"> 
      <Tab v-if="'Open' == currentTab">Open</Tab>
      <Tab v-if="'In Progress' == currentTab">In Progress</Tab>
      <Tab v-if="'Finished' == currentTab">Finished</Tab>
      <Tab v-if="'Cancelled' == currentTab">Cancelled</Tab>
      <Button text="Create new Connection" styleMode="tab-nav-create-button"></Button>
    </TabsContainer>
  </div>
</template>

<script>
import TabsContainer from '@/components/organisms/TabsContainer'
import Tab from '@/components/molecules/Tab'
import Button from '@/components/atoms/Button'

export default {
  name:"manage-connections",
  components: {TabsContainer, Tab, Button},
  data() {
    return {
      currentTab: 'Open'
    }
  },
}
</script>

<style lang="scss" scoped>
.tab-nav-create-button {
  position:absolute;
  background-color: var(--bgcolour);
  color: var(--secondarycolour);
  right: 0px;
  top: 0px;
  border-radius: 7px;
}

.tab-nav-create-button:hover {
  font-weight: bold;
  background-color: var(--secondarycolour);
  color: var(--bgcolour);
}
</style>