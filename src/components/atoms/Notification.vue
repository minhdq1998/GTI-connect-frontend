<template>
  <div class="notification" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Notification',
  setup () {
    return {}
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000)
  },
  beforeUnmount() {
    clearTimeout(this.timeout)
  },
  props: {
    notification: {
      type: Object,
      required: true
    },
  },
  computed: {
    notificationTypeClass() {
      if (this.notification.type === 'error') {
        return "noti-error"
      }
      return "noti-success"
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style lang="scss" scoped>
.notification {
  margin: 1em 0 1em;
}

.noti-error {
  color: var(--errorcolour);
}

.noti-success {
  color: var(--successcolour)
}

</style>