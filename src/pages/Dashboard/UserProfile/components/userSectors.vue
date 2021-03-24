<template>
  <div class="profile-item">
    <label class="item-label">{{label}}</label>
    <p class="sector-for-view-only" v-if="editable === false">{{data}}</p>
    <div class="sector-item-container" v-if="editable === true">
        <div class="sector-item-list">
          <div v-for="(sector, index) in selectedSectors" class="sector-item" :key="index" @click="onRemove(index)">
            {{sector}}
          </div>
        </div>
        <div  class="select-sector">
        <select selected v-if="selectedSectors.length < 3" v-model="selectedSector">
          <option v-for="(sector) in availableSectors" :key="sector" :value="sector">
            {{sector}}
          </option>
        </select>
        <Button text="Add" styleMode="add-sector-btn" :disabled="isDisabled" @click="onAdd(selectedSector)" v-if="selectedSectors.length < 3"/>
        </div>
    </div>
  </div>
</template>

<script>

import store from '@/store'
import { notiType, getSectors } from '@/constants'
import Button from '@/components/atoms/Button'

export default {
  name: 'UserSectors',
  components: {
    Button
  },
  setup () {
    return {}
  },
  mounted() {
    const vm = this
    store.dispatch('user/getSectorsList').then(res => {
      this.sectorOptions = res.map(sector => (sector.name));
    }).catch(() => {
        const notification = { type: notiType.ERROR, message: getSectors.GET_SECTORS_FAIL }
        vm.$store.dispatch('notification/add', notification, { root: true })
    })
    
  },
  props : {
    label: {
      type: String,
      default: "Label"
    },
    data: {
      type: [String, Number, Array],
      default: "Value"
    },
    editable: {
      type: Boolean,
      default: false
    },
    selectedSectors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sectorOptions: [],
      selectedSector: '',
    }
  },
   methods: {
    onAdd(sector) {
      let newSectors = [...this.selectedSectors, sector]
      this.selectedSector = ""
      this.$emit('updateValue', newSectors)
    },
    onRemove(index) {
      let newSectors = [...this.selectedSectors]
      newSectors.splice(index, 1)
      this.$emit('updateValue', newSectors)
    }
  },
  computed: {
    isDisabled() {
      if (this.selectedSector === "") {
        return true
      }
      return false
    },
    availableSectors() {
      return this.sectorOptions.filter(sector => !this.selectedSectors.includes(sector))
    }
  }
 
}
</script>

<style lang="scss" scoped>

.profile-item {
  font-size: 1.1rem;
  margin-bottom: 20px;
  width: 45%;
  min-height: 60px;
}

.item-label {
  font-weight: 600;
  color: var(--labelcolour);
  font-size: 1.2rem;
}

.sector-for-view-only {
  margin-top:5px;
}

select {
  width: 100%;
  height: 40px;
  font-size: 100%;
  padding-left: 15px;
  cursor: pointer;
}

option {
  padding: 10px 5px 5px 10px;
  height: 20px;
}

.error {
  color: var(--errorcolour)
}

.sector-container-item p {
  margin-bottom: 0px;
}

.select-sector {
  display: flex;
}

.sector-item-list {
  display: inline-block;
  width: calc(100% - 20px);
}

.sector-item {
  padding: 0px 10px 0px 10px;
  background-color: var(--disabledcolour);
  height: 35px;
  text-align: center;
  vertical-align: middle;
  margin: 5px 0px 5px 0px;
  font-weight: 600;
  line-height: 35px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sector-item:hover {
  background-color: var(--errorcolour);
  color: var(--bgcolour)
}

.sector-item:hover::before {
  content: "Remove: ";
}

</style>