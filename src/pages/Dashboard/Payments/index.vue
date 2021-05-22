<template>
  <div class="payments">
    <h1>Payments</h1>
    <div class="setup-noti" v-if="!PayoutEnable">
      <i class="fas fa-info-circle"></i>
      <p class="noti-message">Please finish setting up your payment method by registering your Stripe account below</p>
    </div>
    <Button :text=buttonStatus class="general-btn" @click="fetchStripeLinkAccount" />
  </div>
</template>

<script>
import User from '@/apis/User.js'
import Button from '@/components/atoms/Button.vue'
  export default {
  components: { Button },
    data() {
      return {
        loading: true,
        PayoutEnable: false,
        refresh_url: "http://localhost:3000/#/dashboard/payments",
        return_url: "http://localhost:3000/#/dashboard/payments"
        
      }
    },
    methods: {
      fetchPaymentInfo() {
        User.getPaymentInfo().then((res) => {
          this.loading = false

          if (res.payouts_enabled === false) {
            this.PayoutEnable = false
          } else this.PayoutEnable = true
        })
      },
      fetchStripeLinkAccount() {
        User.getStripeLinkAccount({refresh_url: this.refresh_url, return_url: this.return_url}).then((res) => {
          console.log(res)
        }).catch(err => {

          console.log(err.response)
        })
      }
    },
    computed: {
      buttonStatus() {
          if (this.PayoutEnable === false) return "Finish Setting Payment" 
          else return "View Payemnt Info"
      },
      urls() {
        return {
          refresh_url: process.env.VUE_APP_LOCAL_URL + '/dashboard/payments',
          return_url: process.env.VUE_APP_LOCAL_URL + '/dashboard/payments'
        }
      }
    },
    mounted() {
      this.fetchPaymentInfo()
    }
  }
</script>

<style lang="scss" scoped>
.setup-noti {
  display: flex;
  margin-bottom: 20px;
  padding: 20px;
  background-color: var(--infobgcolour);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.fa-info-circle {
  color: var(--infocolour);
}

.noti-message {
  margin: 0px 0px 0px 10px;
  color: var(--infocolour);
}
</style>