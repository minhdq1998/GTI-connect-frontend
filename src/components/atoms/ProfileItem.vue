<template>
  <div class="profile-item" :style="{'width': itemWidth +'%'}">
    <label class="item-label">{{label}}</label>
    <p v-if="editable === false">{{fieldValue}}</p>
    <text-input class="edit-user-input" :type=type v-if="editable === true && isTextArea === false && isSelect === false" v-bind="$attrs" />
    <text-area-input  v-if="editable === true && isTextArea === true" :maxLength="2000" v-bind="$attrs" />
    <select-input v-if="editable === true && isSelect === true" v-bind="$attrs" :options="options" />
  </div>
</template>

<script>
import SelectInput from './SelectInput.vue'
import TextAreaInput from './TextAreaInput.vue'
import TextInput from './TextInput.vue'
export default {
  components: { TextInput, TextAreaInput, SelectInput },
  name: 'ProfileItem',
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
    isTextArea: {
      type: Boolean,
      default: false
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array
    },
    type: {

    }
  },
  computed: {
    fieldValue() {
      if (this.data === "") return "Not provided"
      else if (this.data === null) return "Not provided"
      else return this.data
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>