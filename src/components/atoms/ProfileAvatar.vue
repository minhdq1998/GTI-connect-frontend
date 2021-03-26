<template>
  <div class="profile-avatar">
    <img class="avatar" :src="avatarUrl" />
  </div>
</template>

<script>
  export default {
    name: 'ProfileAvatar',
    props: {
      avatarUrl: {
        type: String,
        default: '../../assets/avatar.svg'
      }
    }
  }
</script>

<style scoped>
.profile-avatar img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}

.profile-avatar {
  width: 100%;
}
</style>