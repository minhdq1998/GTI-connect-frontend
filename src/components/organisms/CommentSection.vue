<template>
  <div>
    <h3>Comments</h3>
    <comment-field 
      :commentListInfo="commentListInfo" 
      v-if="canComment && !isCancelled" 
      :connectionId="connectionId" 
      :ownerId="ownerId"
      @onPostComment="fetchComments()"
      />
    <div>
      <comment-list :comments="comments" />
    </div>
    <pagination 
      :activePage="page" 
      :totalItems="totalComments" 
      :itemsPerPage=10
      @setPage="(newpage) => { page = newpage }" />
  </div>
</template>

<script>
import CommentList from '@/components/molecules/CommentList.vue'
import Pagination from '@/components/molecules/Pagination'
import CommentField from '@/components/molecules/CommentField.vue'

import NotificationMixin from '@/mixins/NotificationMixin'
import { error } from '@/constants'
import { mapActions } from 'vuex'

  export default {
    name: "comment-section",
    components: { CommentList, Pagination, CommentField },
    mixins: [NotificationMixin],
    data() {
      return {
        page: 1,
        comments: [],
        totalComments: 0,
      }
    },
    props: {
      connectionId: {
        type: String,
        required: true
      },
      canComment: {
        type: Boolean,
        default: false
      },
      ownerId: {
        type: Number,
        required: true
      },
      isCancelled: {
        type: Boolean,
        default: false
      }
      
    },
     mounted() {
      this.fetchComments()
    },
    methods: {
    ...mapActions({
      dispatchGetComments: 'connection/getConnectionComments'

    }),
    fetchComments() {
      this.dispatchGetComments(this.commentListInfo).then(res => {
        this.comments = res.results
        this.totalComments = res.count
      }).catch(() => {
        this.showBadNotification( error.SOMETHING_WENT_WRONG )
      })
    },
  },
  computed:{
    commentListInfo() {
      return {
        page:this.page, 
        connectionId: this.connectionId
      }
    }
  },
  watch: {
    page: {
      handler() {
        this.fetchComments()
      }
    },
    // comments: {
    //   handler() {
    //     this.fetchComments()
    //   }
    // }
  }

  }
</script>

<style lang="scss" scoped>
h3 {
  margin: 0px;
}
</style>