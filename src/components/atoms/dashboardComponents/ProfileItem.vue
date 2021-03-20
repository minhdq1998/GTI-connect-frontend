<template>
  <div class="profile-item" :style="{'width': itemWidth +'%'}">
    <label class="item-label">{{label}}</label>
    <p :contenteditable="editable" @input="$emit('update:value', $event.target.value)">{{value}}</p>
  </div>
</template>

<script>
export default {
  name: 'ProfileItem',
  setup () {
    return {}
  },
  props : {
    label: {
      type: String,
      default: "Label"
    },
    value: {
      type: String,
      default: "Value"
    },
    itemWidth: {
      type: Number,
      default: 45
    },
    editable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

.profile-item {
  height: 50px;
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
</style>