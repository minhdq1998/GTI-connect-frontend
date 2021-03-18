<template>
  <div class="profile-item" :style="{'width': itemWidth +'%'}">
    <label class="item-label">{{label}}</label>
    <p>{{value}}</p>
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
      default: 50
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