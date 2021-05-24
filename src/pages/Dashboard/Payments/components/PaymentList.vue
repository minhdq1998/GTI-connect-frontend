<template>
  <div class="payment-list-container">
    <h2>Payment list</h2>
    <div class="ae payment-list" v-if=isAE>
      AE
    </div>
    <div class="gt payment-list" v-if=isGT>
      GT
    </div>
    </div>
</template>

<script>
  import Payment from '@/apis/Payment.js'
  import AccountsMixin from '@/mixins/AccountsMixin'

  export default {
    mixins: [AccountsMixin],
    methods: {
      getPaymentList() {
        Payment.getPaymentList().then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getPaymentList()
    }
  }
</script>

<style lang="scss" scoped>

.payment-list {
  height: 300px;
  width: 100%;
  border: 1px solid var(--infocolour);
  background-color: var(--infobgcolour)
}

.payment-list-container {
    margin-top: 20px;
}

.payment-list-container h2 {
  margin-top: 0px
}
</style>