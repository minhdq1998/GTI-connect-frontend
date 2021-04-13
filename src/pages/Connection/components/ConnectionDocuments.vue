<template>
  <div>
    <div class="header">  
      <h3>Documents</h3>
      <span class="header-desc">Supporting documents for the connection</span>
    </div>

    <div class="body">
      <h4>Document List</h4>
      <div class="document-list-item" v-for="item, index in documentList" :key="index">
        <a target="_blank" :href="documentUrl(item.document)"><Button :text="documentNameFormat(item.document)" /></a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { connectionDocument } from 'constants'
  import NotificationMixin from '@/mixins/NotificationMixin'
import Button from '../../../components/atoms/Button.vue'

  export default {
    name: "connection-documents",
    components: {Button},
    mixins: [NotificationMixin],
    props: {
      connectionId: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        documentList: []
      }
    },
    methods: {
      ...mapActions({
        dispatchGetAllDocuments: 'connection/getAllConnectionDocuments'
      }),
      documentUrl(document) {
        return process.env.VUE_APP_ROOT_API.concat(document)
      },
      documentNameFormat(document) {
        let doc = document.split("/")
        return doc[4]
      }

    },
    mounted() {
      this.dispatchGetAllDocuments(this.connectionId).then(res => {
        this.documentList = res
        console.log(this.documentList)
      }).catch(() => {
        this.showBadNotification(connectionDocument.GET_DOCUMENT_FAIL)
      })
    }

  }
</script>

<style lang="scss" scoped>
h3 {
  margin: 0px;
}

.body {
  padding: 10px;
}

.body h4 {
  margin: 5px 0px 5px 0px;
}

.document-list-item a {
  text-decoration: none;
}

.document-list-item {
  margin-bottom: 5px;
}

.header-desc {
  font-size: 12px;
}
</style>