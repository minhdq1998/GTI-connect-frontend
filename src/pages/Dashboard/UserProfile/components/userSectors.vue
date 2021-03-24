<template>
  <div class="profile-item">
    <label class="item-label">{{label}}</label>
    <p v-if="editable === false">{{data}}</p>
    <div class="sector-item-container" v-if="editable === true">
        <div class="sector-item-list">
          <div v-for="sector, index in selectedSectors" class="sector-item" :key="sector" @click="onRemove(index)">
            {{sector}}
          </div>
        </div>
        <div  class="select-sector">
        <select selected v-if="selectedSectors.length < 3" v-model="selectedSector">
          <option v-for="(sector) in sectors" :key="sector" :value="sector.name">
            {{sector.name}}
          </option>
        </select>
        <Button text="Add" styleMode="add-sector-btn" @click="onAdd(selectedSector)" v-if="selectedSectors.length < 3"/>
        </div>
        <div class="error" v-if="isDuplicated === true">You have selected a duplicated sector. </div>
    </div>
  </div>
</template>

<script>

import store from '@/store'
import { notiType, getSectors, getUser } from '@/constants'
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
    store.dispatch('user/getCurrentUser').then(res => {
      this.selectedSectors = JSON.parse(JSON.stringify(res.profile.sectors));
    }).catch(() => {
        const notification = { type: notiType.ERROR, message: getUser.GET_USER_FAIL }
        vm.$store.dispatch('notification/add', notification, { root: true })
    })
    store.dispatch('user/getSectorsList').then(res => {
      this.sectors = JSON.parse(JSON.stringify(res));
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
  },
  data() {
    return {
      selectedSectors: [],
      sectors: [],
      selectedSector: '',
      itemHover: false,
      isDuplicated: false
    }
  },
   methods: {
    onAdd(sector) {
      this.selectedSectors.push(sector)
      this.isDuplicated = this.checkDuplicate(this.selectedSectors)
    },
    onRemove(index) {
      this.selectedSectors.splice(index, 1)
    },
    checkDuplicate(array) {
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
          if (i != j) {
            if (array[i] == array[j]) {
              return true
            }
          }
        }
      }
      return false; 
    }
  },
  watch: {
    selectedSectors: {
      handler() {
        this.$emit("update:modelValue", this.selectedSectors)
      },
      deep: true
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

select {
  min-width: 50%;
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


.add-sector-btn {
  background-color: var(--secondarycolour);
  color: var(--bgcolour);
  margin-left: 10px;
}

.add-sector-btn:hover {
  background-color: var(--hovercolour);
}


</style>