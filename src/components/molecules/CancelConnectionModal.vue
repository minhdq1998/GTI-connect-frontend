<template>
  <div>
    <modal-container class="change-avatar-modal" @onClose="$emit('closeModal')">
      <template v-slot:header>
        <h2>Close connection</h2>
      </template>
      <template v-slot:body>
        <p>Are you sure you want to close this connection?</p>
        <p class="important-notice">After being closed, this connection cannot be restored.</p>
      </template>
      <template v-slot:footer>
        <Button text="Close connection" styleMode="general-btn" @click="closeUserConnection(connectionId)"/>
      </template>
    </modal-container>
  </div>
</template>

<script>
import ModalContainer from '@/components/atoms/ModalContainer.vue';
import Button from '../atoms/Button.vue';
import Connection from '@/apis/Connection';
import { notiType, connection } from '@/constants'


  export default {
    components: { ModalContainer, Button },
    methods: {
      closeUserConnection(id) {
        const vm = this
        Connection.closeConnection(id).then((res) => {
          console.log(res.status)
          const notification = { type: notiType.SUCCESS, message: connection.CLOSE_CONNECTION_SUCCESS }
          vm.$store.dispatch('notification/add', notification, { root: true })
          this.$router.push({ name: 'Manage Connections' })
        })
        .catch(() => {
          const notification = { type: notiType.ERROR, message: connection.CLOSE_CONNECTION_FAIL }
          vm.$store.dispatch('notification/add', notification, { root: true })
        })
      }
    },
    props: {
      connectionId: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 0;
}

p {
  margin-bottom: 5px;
}

.important-notice {
  color: var(--errorcolour);
  margin: 0px 0px 15px 0px;
}

</style>