<template>
  <div class="payment-list-container">
    <h2>Payment list</h2>
    <div class="ae payment-list" v-if=isAE>
      <div class="payment-list-items" v-for="(payment, index) in paymentList" :key="index">
        <div class="item">
          <span><span class="title">Connection:</span> {{payment.connection}}</span>
          <span><span class="title">Payer:</span> {{payment.payer}}</span>
          <span><span class="title">Amount:</span> {{payment.amount}}</span>
          <span><span class="title">Status:</span> {{payment.status}}</span>
        </div>
      </div>
    </div>
    <div class="gt payment-list" v-if=isGT>
      <div class="payment-list-items" v-for="(payment, index) in paymentList" :key="index">
        <div class="item">
          <span><span class="title">Connection:</span> {{payment.connection}}</span>
          <span><span class="title">Receiver:</span> {{payment.receiver}}</span>
          <span><span class="title">Amount:</span> {{payment.amount}}</span>
          <span><span class="title">Status:</span> {{payment.status}}</span>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import Payment from '@/apis/Payment.js'
  import AccountsMixin from '@/mixins/AccountsMixin'

  import { mapActions } from 'vuex'


  export default {
    mixins: [AccountsMixin],
    data() {
      return {
        paymentList: []
      }
    },
    methods: {
      ...mapActions({
        dispatchGetUser: 'user/getUser'
      }),
      getPaymentList() {
        Payment.getPaymentList().then((res) => {
          for (let i = 0; i < res.results.length; i++) {
              let singleResult = res.results[i]
              if (this.isAE) {
                this.dispatchGetUser(singleResult.global_talent).then(res => {
                  let payerName = res.first_name + " " + res.last_name
                  let singlePayment = {
                  connection: singleResult.connection,
                  payer: payerName,
                  amount: (singleResult.amount/100).toLocaleString("en-US", {style:"currency", currency:"AUD"}),
                  status: singleResult.status,
                }
                this.paymentList.push(singlePayment)
                })
              }
              if (this.isGT) {
                this.dispatchGetUser(singleResult.australian_expert).then(res => {
                  let receiverName = res.first_name + " " + res.last_name
                  let singlePayment = {
                  connection: singleResult.connection,
                  receiver: receiverName,
                  amount: (singleResult.amount/100).toLocaleString("en-US", {style:"currency", currency:"AUD"}),
                  status: singleResult.status,
                }
                this.paymentList.push(singlePayment)
                })
              }
              
          }
         
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
  margin-top: 10px;
}

.payment-list-container {
    margin-top: 20px;
}

.payment-list-container h2 {
  margin: 0px
}

.item p {
  margin: 0px
}

.item {
  margin-bottom: 10px;
  border: 1px solid var(--infocolour);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

.title {
  font-weight: 600;
}
</style>