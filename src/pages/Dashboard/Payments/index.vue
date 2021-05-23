<template>
  <div class="payments">
    <h1>Payments</h1>
    <div class="ae-payment-info" v-if="!loading && isAE">
      <div class="setup-noti" v-if="!PayoutEnable  && !needEmailVerification && !needIdVerification">
        <i class="fas fa-info-circle"></i>
        <p class="noti-message">Please finish setting up your payment method by registering your Stripe account below</p>
      </div>
      <div class="setup-noti" v-if="needEmailVerification">
        <i class="fas fa-info-circle"></i>
        <p class="noti-message">It looks like you have registered your Stripe account. Please verify your Stripe account from your registered email to continue.</p>
      </div>
      <div class="setup-noti" v-if="needIdVerification">
        <i class="fas fa-info-circle"></i>
        <p class="noti-message">Please finish verifying your ID document for your Stripe account below</p>
      </div>
      <Button v-if="!needEmailVerification" :text=buttonStatus class="general-btn" @click="fetchStripeLinkAccount" />
    </div>
  </div>
</template>

<script>
  import User from '@/apis/User.js'
  import Button from '@/components/atoms/Button.vue'
  import AccountsMixin from '@/mixins/AccountsMixin'
  export default {
    name: "Payment",
    components: { Button },
    mixins: [AccountsMixin],
    data() {
      return {
        loading: true,
        btnLoading: false,
        PayoutEnable: false,
        needEmailVerification: false,
        needIdVerification: false
      }
    },
    methods: {
      fetchPaymentInfo() {

        User.getPaymentInfo().then((res) => {

          this.loading = false
          console.log(res)
          if (res.payouts_enabled === false) this.PayoutEnable = false
            else this.PayoutEnable = true
          if (res.requirements.currently_due[0]) {
            for (let i = 0; i < res.requirements.currently_due.length; i++ ) {
              let req = res.requirements.currently_due[i].split(".")
              console.log(req)
              console.log(req[req.length - 1])
              if (req[req.length - 1] === "document") this.needIdVerification = true
            }
     
            console.log(res.requirements.currently_due[0])

            this.pendingVerification = false
          }
            else this.pendingVerification = false
        })
      },
      fetchStripeLinkAccount() {
        this.btnLoading = true
        User.getStripeLinkAccount(this.urls).then((res) => {
          location.replace(res.account_link)
        }).catch(err => {
          console.log(err.response)
        })
      }
    },
    computed: {
      buttonStatus() {
        if (this.btnLoading === true) return "Loading"
          if (this.PayoutEnable === false && this.needIdVerification === false) return "Finish Setting Payment" 
          else if (this.needIdVerification === true) return "Verify Your Account"
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