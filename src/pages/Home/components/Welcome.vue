<template>
  <div class="welcome">
    <div class="welcome-intro">
      <div class="welcome-title">Get connected and refine your career path</div> 
      <div class="welcome-desc">
        <span>Start connecting with global talents and Australian experts and take your career to the next level.</span>
      </div>
      <div class="welcome-button">
        <Button v-if="isVisitor" class="welcome-btn general-btn" text="Get started now" @click="$router.push({name: 'Join'})" />
        <Button v-if="isLoggedIn" class="welcome-btn general-btn" text="Go to your dashboard" @click="$router.push({name: 'Your Profile'})" />
      </div>
    </div>
    <div class="welcome-intro-img">
      <img src="./../../../assets/connect.jpg" alt="connect-img">
    </div>
  </div>
</template>

<script>
  import Button from '@/components/atoms/Button.vue'
  import AccountsMixin from '@/mixins/AccountsMixin'

  export default {
    components: {
      Button
    },
    mixins: [AccountsMixin]
  }
</script>

<style lang="scss" scoped>
  .welcome {
  max-height: 500px;

  padding: 20px;
  display: flex;
  }

  .welcome-intro {
    width: 60%;
    display: block;
    align-content: space-between;
  }

  .welcome-title {
    font-size: 3.6vw;
    height: 33%;
  }

  .welcome-desc {
    font-size: calc(1vw + 10px);
    margin: 50px 0px 10px 0px;
  }

  .welcome-button {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .welcome-intro-img {
    width: 50%;
  }

  .welcome-btn {
    border-radius: 5px;
  }

  .welcome-intro-img img {
    width: 100%;
  }
</style>