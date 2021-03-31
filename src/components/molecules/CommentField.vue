<template>
  <div class="comment-field">
      <text-area-input class="comment-input" :displayCharacterCount=false v-model="comment" />
      <Button class="general-btn" text="Post comment" />
  </div>
</template>

<script>
import Button from '../atoms/Button.vue'
import TextAreaInput from '../atoms/TextAreaInput.vue'
  export default {
    name: "component-field",
    components: { TextAreaInput, Button },
    data() {
      return {
        comment: ""
      }
    }
  }
</script>

<style lang="scss" scoped>
.comment-field {
  padding: 10px;
}

.comment-input {
  margin-bottom: 5px;
}
</style>