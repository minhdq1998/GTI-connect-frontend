<template>
  <div class="profile-item" :style="{'width': itemWidth +'%'}">
    <label class="item-label">{{label}}</label>
    <p v-if="editable === false">{{data}}</p>
    <div v-if="editable === true">
      <select    
        :value="modelValue"
        v-bind="{
        ...$attrs, 
        onChange: ($event) => { 
          $emit('update:modelValue', selectedSector) }
        }"
        v-model="selectedSector"
        multiple
      >
        <option v-for="(sector) in sectors" :key="sector" :selected="sector === modelValue" :value="sector.name">
          {{sector.name}}
        </option>
      </select>
      <p>Please hold Ctrl (Window) or Command (Mac) to select multiple sectors</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserSectors',
  setup () {
    return {}
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
    itemWidth: {
      type: Number,
      default: 45
    },
    editable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      selectedSector: this.modelValue,
      sectors: [
        {
          name: "Agri-food and AgTech"
        },
        {
          name: "Circular Economy"
        },
        {
          name: "Defence, Advanced Manufacturing and Space"
        },
        {
          name: "DigiTech"
        },
        {
          name: "Education"
        },
        {
          name: "Energy"
        },
        {
          name: "Financial Services and FinTech"
        },
        {
          name: "Health Industries"
        },
        {
          name: "Infrastructure and tourism"
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.profile-item {
  min-height: 50px;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.item-label {
  font-weight: 600;
  color: var(--labelcolour);
  font-size: 1.2rem;
}

.profile-item p {
  margin-top: 5px
}

.edit-user-input input {
  width: 100%;
}

select {
  min-width: 50%;
  height: 40px;
  font-size: 100%;
  padding-left: 15px;
  cursor: pointer;
}

select[multiple] {
  background:none;
  width:100%;
  height:auto;
  padding:0;
  margin:0;
  border-width: 1px;
  border-style: inset;
  -moz-appearance: menulist;
  -webkit-appearance: menulist;
  appearance: menulist;
}

option {
  padding: 10px 5px 5px 10px;
  height: 20px;
}
</style>