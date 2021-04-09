<template>
  <div>
    <modal-container class="send-offer-modal" @onClose="$emit('closeModal')">
       <template v-slot:header>
        <div class="text-header">Make an offer</div>
      </template>
       <template v-slot:body>
        <form>
          <text-area-input-group  
            label="Your message"
            v-model="message"
            :maxLength=3000 
          />
          <div class="select-duration-container">
            <div class="select-duration">
              <text-input-group
                label="Duration"
                placeholder="Please enter a number"
                v-model="time_number"
              />
            </div>
            <select-input-group
              class="select-duration-type"
              v-model="time_type"
              :options="durationOptions"
  
            />
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <Button :disabled="validOffer" text="Send offer" class="general-btn" @click="sendOffer"/>
      </template>
    </modal-container>
  </div>
</template>

<script>
  import ModalContainer from "@/components/atoms/ModalContainer.vue";
  import TextAreaInputGroup from '@/components/molecules/TextAreaInputGroup.vue';
  import TextInputGroup from '@/components/molecules/TextInputGroup.vue';
  import SelectInputGroup from '../../../components/molecules/SelectInputGroup.vue';
  import Button from '@/components/atoms/Button.vue';

  import { mapActions } from 'vuex'
  import { offer_duration_type, offer } from '@/constants'
  import NotificationMixin from '@/mixins/NotificationMixin'


  export default {

    name: "send-offer-modal",
    components: { ModalContainer, TextAreaInputGroup, TextInputGroup, SelectInputGroup, Button  },
    emits: ['closeModal', 'offerSent'],
    mixins: [ NotificationMixin ],
    props: {
      connection: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        message: "",
        time_type: offer_duration_type[0],
        time_number: "",
        durationOptions: offer_duration_type,
        validated: false
      }
    },
    computed: {
      offerInfo() {
        return {
          connection: this.connection,
          message : this.message,
          time_number: this.time_number,
          time_type: this.time_type,
        }
      },
      validOffer() {
        if (this.message === "" || this.time_number === "" || this.validated === false) {
          return true
        }
        return false
      }
    },
    methods: {
      ...mapActions({
        dispatchPostOffer: 'connection/postConnectionOffer',
      }),
      sendOffer() {
        this.dispatchPostOffer(this.offerInfo).then(() => {
            this.showGoodNotification(offer.OFFER_SEND_SUCCESS)
            this.message = ''
            this.time_number = ''
            this.$emit('closeModal')
            this.$emit('offerSent')
          }).catch((err) => {
            this.showBadNotification(offer.OFFER_SEND_FAIL + err.detail)
          })
      },
      validateTimeNumber(value) {
       this.validated = !isNaN(value)
      }
    },
    watch: {
      time_number(value){
        this.time_number = value
        this.validateTimeNumber(value)
      }
    }
  }
</script>

<style lang="scss" scoped>
.text-header {
  font-size: 20px;
  font-weight: 600;
}

.select-duration-container {
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
}

.select-duration {
  width: 50%;
  margin-right: 10px;
}
</style>