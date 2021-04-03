<template>
  <div class="comment-list">
    <comment-item 
      v-for="(comment, index) in comments" 
      :key="index"
      v-bind="$attrs" 
      :comment="comment"  />
  </div>
</template>

<script>
  import CommentItem from '@/components/atoms/CommentItem.vue';
  export default {
    name:"comment-list",
    components: { CommentItem },
     props: {
        comments: Array
    }
  }
</script>

<style lang="scss" scoped>

</style>