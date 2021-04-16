<template>
  <div>
    <modal-container class="response-request-finish-modal" @onClose="$emit('closeModal')">
      <template v-slot:header>
        <h3>Response to {{aeInCharge}} finish connection request</h3>
      </template>
      <template v-slot:body>
        <p class="important-notice">Once you accept, this connection between you and {{aeInCharge}} will be finished.</p>
      </template>
      <template v-slot:footer>
        <Button text="Accept request" styleMode="general-btn" @click="acceptRequest" />
        <Button text="Decline request" styleMode="decline-btn"  @click="declineRequest" />
      </template>
    </modal-container>
  </div>
</template>

<script>
  import ModalContainer from '@/components/atoms/ModalContainer.vue';
  import Button from '@/components/atoms/Button.vue';
  import { mapActions } from 'vuex'
  import {  connectionResponseFinishRequest } from '@/constants'
  import NotificationMixin from '@/mixins/NotificationMixin'

  export default {
    name: "response-finish-request",
    components: { ModalContainer, Button },
    mixins: [NotificationMixin], 
    emits: ['closeModal', 'responsedRequestFinishConnection'],
    props: {
      aeInCharge: {
        type: String,
        required: true
      },
      connectionId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        acceptResponse: { accept: true },
        declineResponse: { accept: false }
      }
    },
    methods: {
      ...mapActions({
        dispatchResponseRequestFinishConnection: 'connection/responseRequestFinishConnection'
      }),
      acceptRequest() {
        this.dispatchResponseRequestFinishConnection({
          connectionId: this.connectionId,
          response: this.acceptResponse
        }).then(() => {
          this.showGoodNotification(connectionResponseFinishRequest.SEND_ACCEPT_REQUEST_SUCCESS)
          this.$emit('closeModal')
          this.$emit('responsedRequestFinishConnection')
          this.$router.push({ name: 'Manage Connections' })
        }).catch(() => {
          this.$emit('closeModal')
          this.showBadNotification(connectionResponseFinishRequest.SEND_ACCEPT_REQUEST_FAIL)
        })
      },
      declineRequest() {
        this.dispatchResponseRequestFinishConnection({
          connectionId: this.connectionId,
          response: this.declineResponse
        }).then(() => {
          this.showGoodNotification(connectionResponseFinishRequest.SEND_DECLINE_REQUEST_SUCCESS)
          this.$emit('closeModal')
          this.$emit('responsedRequestFinishConnection')
        }).catch(() => {
          this.$emit('closeModal')
          this.showBadNotification(connectionResponseFinishRequest.SEND_DECLINE_REQUEST_FAIL)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 0;
}

p {
  margin-bottom: 15px;
}

.decline-btn {
  color: var(--whitecolour);
  background-color: var(--graycolour);
  margin-left: 10px;
}

.decline-btn:hover {
  background-color: var(--graycolour-hover);
}
</style>