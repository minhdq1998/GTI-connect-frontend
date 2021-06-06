<template>
  <div class="payment-info">
    <div class="title">
      What about payment?
    </div>
    <div class="payment-info-content">
      We are currently using Stripe, a secure payment processing service to ensure the transactions between our talents and professionals run securely and smoothly.
      <a href="">Learn more</a>
    </div>
    <div class="icons">
      <i class="fab fa-cc-stripe"></i>
      <i class="fab fa-cc-mastercard"></i>
      <i class="fab fa-cc-visa"></i>
    </div>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.payment-info {
  margin-top: 10px;
  border-radius: 10px;
  max-height: 400px;
  padding: 20px;
}

.icons {
  font-size: 3rem;
  display: flex;
  align-content: center;
  justify-content: center;
}

.fab {
  margin-right: 20px;
}

.title {
  width: 100%;
  font-size: 3vw;
  margin-bottom: 20px;
  text-align: center;
}

.payment-info-content {
  font-size: 1.4rem;
  margin: 0px 60px 0px 60px;
}

</style>