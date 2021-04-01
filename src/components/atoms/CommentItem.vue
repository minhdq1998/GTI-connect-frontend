<template>
  <div class="comment-item">
    <div class="comment-header">
     <span class="owner-name">{{comment.ownerInfo.first_name}} {{comment.ownerInfo.last_name}}</span>
    </div>
    <div class="comment-content">
      <p class="comment-text">{{comment.content}}</p>
    </div>
 
    <div class="created-at">
      <h4>Created at</h4>
      {{createdAt}}
    </div>
  </div>
</template>

<script>
  export default {
    name:"comment-item",
    props: {
        comment: Object
    },
    computed: {
      createdAt() {
        return (new Date(this.comment.created_at)).toLocaleString()
      }
    }
  }
</script>

<style lang="scss" scoped>
.comment-item {
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-radius: 5px;
  padding: 20px 20px 10px 20px;
}

.comment-header {
  margin-top: 0px;
  margin-bottom: 10px;
}

.comment-content p {
  margin-top: 0px;
}

.owner-name {
  font-weight: 600;
}

.created-at {
  display: flex;
  justify-content: flex-end;
}

.comment-text {
  white-space: pre-line;
}


.created-at h4 {
  margin: 0px 5px 0px 0px;
}
</style>