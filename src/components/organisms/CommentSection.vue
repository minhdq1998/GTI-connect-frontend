<template>
  <div>
    <h3>Comments</h3>
    <div>
      <comment-list :comments="comments" />
    </div>
    <pagination 
      :activePage="page" 
      :totalItems="totalComments" 
      :itemsPerPage=10
      @setPage="(newpage) => { page = newpage }" />
  </div>
  <comment-field v-if="isAE" :connectionId="connectionId" :ownerId="ownerId" />
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
      isAE: {
        type: Boolean,
        default: false
      },
      ownerId: {
        type: Number,
        required: true
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
      this.dispatchGetComments({
        page:this.page, 
        connectionId: this.connectionId }).then(res => {
        this.comments = res.results
        this.totalComments = res.count
      }).catch(() => {
        this.showBadNotification( error.SOMETHING_WENT_WRONG )
      })
    }
  },
  watch: {
    page: {
      handler() {
        this.fetchComments()
      }
    }
  }

  }
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 0px;
}
</style>