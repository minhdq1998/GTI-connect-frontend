<template>
  <div class="payments">
    <h1>Payments</h1>

    <div class="ae-payment-info" v-if="!loading && isAE">
      <info-bar 
        v-if="!PayoutEnable && !needIdVerification && !pendingVerification && !pendingIdVerification"
        message="Please finish setting up your payment method by registering your Stripe account below" 
      />
      <info-bar
        v-if="needIdVerification"
        message="Please finish verifying your ID document for your Stripe account below"
      />
      <info-bar
        v-if="pendingVerification"
        message="We are currently processing your Stripe account. Please verify your Stripe account from your registered email and check back later to finish the registration process."
      />
      <info-bar
        v-if="pendingIdVerification"
        message="We are currently verifying your ID document on Stripe. Please check back later to finish the registration process."
      />
 
       <div class="setup-noti-success" v-if="PayoutEnable">
        <i class="fas fa-check-circle"></i>
        <p class="noti-message">You are all set! You can view and edit your payment infomation below.</p>
      </div>

      <Button v-if="!pendingVerification && !pendingIdVerification" :text=buttonStatus class="general-btn" @click="fetchStripeLinkAccount" />
    </div>
    <payment-list />
    
  </div>
</template>

<script>
  import Payment from '@/apis/Payment.js'
  import Button from '@/components/atoms/Button.vue'
  import AccountsMixin from '@/mixins/AccountsMixin'
  import PaymentList from './components/PaymentList.vue'
import InfoBar from '../../../components/atoms/InfoBar.vue'
  export default {
    name: "Payment",
    components: { Button, PaymentList, InfoBar },
    mixins: [AccountsMixin],
    data() {
      return {
        loading: true,
        btnLoading: false,
        PayoutEnable: false,
        needIdVerification: false,
        pendingVerification: false,
        pendingIdVerification: false,
      }
    },
    methods: {
      fetchPaymentInfo() {

        Payment.getPaymentInfo().then((res) => {
          this.loading = false
          // console.log(res)
          // Check for registration
          if (res.payouts_enabled === false) this.PayoutEnable = false
            else this.PayoutEnable = true
          // Check for ID verification
          if (res.requirements.currently_due[0]) {
            for (let i = 0; i < res.requirements.currently_due.length; i++ ) {
              let req = res.requirements.currently_due[i].split(".")
              if (req[req.length - 1] === "document") this.needIdVerification = true
            }
          }
          // Check for Stripe processing account after register Stripe account
          if (res.requirements.pending_verification[0]) this.pendingVerification = true
          // Check for Stripe processing account after verifying ID Document on Stripe
          if (res.requirements.disabled_reason != null) {
            let disabledReason = res.requirements.disabled_reason.split(".")
            if (disabledReason[disabledReason.length - 1] === "pending_verification" && !res.requirements.pending_verification[0]) {
              this.pendingIdVerification = true
            }
          }
        })
      },
      fetchStripeLinkAccount() {
        this.btnLoading = true
        Payment.getStripeLinkAccount(this.urls).then((res) => {
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
.payments h1 {
  margin-bottom: 20px;
}


.setup-noti-success {
  display: flex;
  margin-bottom: 20px;
  padding: 20px;
  color: var(--secondarycolour);
  background-color: var(--secondarycolour-hover);
  border: 1px solid var(--secondarycolour);
}

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