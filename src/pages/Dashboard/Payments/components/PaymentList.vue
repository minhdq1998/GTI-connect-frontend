<template>
  <div class="payment-list-container">
    <h2>Payment list</h2>
    <div class="payment-list">
      <div class="payment-list-items" v-for="(payment, index) in paymentList" :key="index">
        <div class="item"  @click="$router.push({name: 'Connection', params: {id:payment.connection}})">
          <span class="info"><span class="title">Connection:</span> {{payment.connection}}</span>
          <span class="info" v-if=isAE>
            <span class="title" v-if=isAE>Payer:</span> {{payment.global_talent}}
          </span>
          <span class="info" v-if=isGT>
            <span class="title">Receiver:</span> {{payment.australian_expert}}
          </span>
          <span class="info"><span class="title">Amount:</span> {{payment.amount}}</span>
          <span class="info">
            <span class="title">Status:</span> 
            <span class="payment-status" :style="{color: payment.statusColor}">{{payment.status}}</span>
          </span>
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
          console.log(res)
          for (let i = 0; i < res.results.length; i++) {
            let singleResult = res.results[i]
            let statusColor
            if (singleResult.status === "on hold") statusColor = "#fadf11"
            else if (singleResult.status === "on the way") statusColor = "#fadf11"
            else if (singleResult.status === "released") statusColor = " #20c997"
            let singlePayment = {
            connection: singleResult.connection,
            global_talent: singleResult.global_talent.first_name + " " + singleResult.global_talent.last_name,
            australian_expert: singleResult.australian_expert.first_name + " " + singleResult.australian_expert.last_name,
            amount: (singleResult.amount/100).toLocaleString("en-US", {style:"currency", currency:"AUD"}),
            status: singleResult.status,
            statusColor: statusColor
            }
            this.paymentList.push(singlePayment)
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
  cursor: pointer;
}

.title {
  font-weight: 600;
}

.info {
  width: 25%;
  margin: 0px 20px 0px 20px;
}

.payment-status {
  margin-left: 2px;
}
</style>