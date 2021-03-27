<template>
  <div>
      <connection-list-item 
      v-for="(connection, index) in connections" 
      :key="index"
      v-bind="$attrs" 
      :connection="connection" />
  </div>
</template>

<script>
import ConnectionListItem from '../molecules/ConnectionListItem'

export default {
    name:"connections-list",
    components: {ConnectionListItem},
    props: {
        connections: Array
    }
}
</script>

<style scoped>

</style>