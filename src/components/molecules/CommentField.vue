<template>
  <div class="comment-field">
      <h4>Post a comment</h4>
      <comment-text-area v-model="comment"/>
      <Button :disabled="!isCommented" class="general-btn" text="Post comment" @click="postComment()" />
  </div>
</template>

<script>
import Button from '../atoms/Button.vue'
import CommentTextArea from '../atoms/CommentTextArea.vue'

import { mapActions } from 'vuex'
import { notiType, error } from '@/constants'

  export default {
    name: "component-field",
    components: { Button, CommentTextArea },
    data() {
      return {
        comment: "",
      }
    },
    props: {
      connectionId: {
        type: String,
        required: true
      },
      ownerId: {
        type: Number,
        required: true
      },
      commentListInfo: Object
    },
    computed: {
      commentInfo() {
        return {
          owner: this.ownerId,
          connection: this.connectionId,
          content: this.comment
        }
      },
      isCommented() {
        if (this.comment === "") {
          return false
        }
        return true
      }
    },
    methods: {
      ...mapActions({
        dispatchPostComment: 'connection/postConnectionComment',
        dispatchNotification: 'notification/add',
        dispatchGetComments: 'connection/getConnectionComments'
      }),
      postComment() {
        this.dispatchPostComment(this.commentInfo).then(() => {
            this.comment = ''
            this.$emit('onPostComment')
          }).catch(() => {
            this.dispatchNotification(
              { type: notiType.ERROR, message: error.SOMETHING_WENT_WRONG })
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
.comment-field {
  padding: 10px;
}

.comment-input {
  margin-bottom: 5px;
}

h4 {
  margin: 5px 0px 5px 0px
}

</style>