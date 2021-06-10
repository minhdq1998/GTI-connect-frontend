<template>
  <div class="sector-list-container">
    <div class="title">
      Our sectors list
    </div>
    <div  class="sector-list">
      <div class="sector-item-container" v-for="(sector, index) in sectorList" :key="index">
        <container-box class="sector-item name" :style="{'background-color':sector.colour}">
          <div class="name">
            {{sector.name}}
          </div>
        </container-box>
        <container-box class="sector-item jobs">
          <div class="content" v-for="(job, index) in sector.jobs" :key="index">
            {{job}}
          </div>
        </container-box>
      </div>
    </div>
  </div>
</template>

<script>
  import { sector_list } from '@/constants'
import ContainerBox from '../../../components/atoms/ContainerBox.vue'

  export default {
    name:"home-sector-list",
      components: {ContainerBox},
      data() {
      return {
        sectorList: sector_list
      }
    },

  }
</script>

<style lang="scss" scoped>
.sector-list-container {
  margin-top: 50px;
}

.title {
  width: 100%;
  font-size: 3vw;
  margin-bottom: 20px;
  text-align: center;
}

.sector-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: 600;
}

.sector-item {
  margin: 0px 10px 10px 10px;
  padding: 20px;
  height: 50px;
  width: 220px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jobs {
  display: none;
}

.content {
  text-align: center;
}

.name {
  text-align: center;
  color: var(--whitecolour);
}

.sector-item-container:hover .jobs {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sector-item-container:hover .name {
  display: none;
}

</style>