<template>
  <div class="notification" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
    <div class="noti-icon"><i :class="iconStyleClass"></i></div>
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
    },
    iconStyleClass() {
      if (this.notification.type === 'error') {
        return "fas fa-exclamation-circle"
      }
      return "far fa-check-circle"
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style lang="scss" scoped>
.notification {
  margin: 15px;
  width: 200px;
  padding: 1px 10px 1px 10px;
  box-shadow: 0px 0px 15px -8px var(--boxshadowcolour);
  color: var(--bgcolour);
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
}

.noti-icon {
  width: 20px;
  font-size: 20px;
  position: relative;
}

.noti-icon i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.notification p {
  display: block;
  height: 40px;
  width: calc(100% - 20px)
}

.noti-error {
  background-color: var(--errorcolour);
}

.noti-success {
  background-color: var(--successcolour);
}

</style>