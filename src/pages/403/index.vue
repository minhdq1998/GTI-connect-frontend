<template>
  <div class="page-403">
      <h1>403</h1>
      <div>Access Denied</div>
      <Button 
      class="form-main-button redirect-btn" 
      text="Back to Home Page"
      @click="$router.push('/')" />
  </div>
</template>

<script>
import Button from '@/components/atoms/Button'

export default {
    name:'403',
    components: {Button}
}
</script>

<style scoped>
.page-403 {
    text-align: center;
}

.page-403 h1 {
    color: var(--errorcolour);
    font-size: 50px;
    margin-top: 50px;
    margin-bottom: 10px;
}

.page-403 div {
    font-size: 40px;
    margin-top:0px;
}

.redirect-btn {
    margin-top: 20px;
    width: auto;
}
</style>