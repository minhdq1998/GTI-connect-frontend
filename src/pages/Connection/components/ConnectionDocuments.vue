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
        <div v-if="isGT">
          <Button styleMode="delete-btn" text="Delete" @click="deleteDocument(item.pk)"/>
        </div>
      </div>
    </div>

    <div v-if="isGT" class="footer">
      <label for="document-upload" class="upload-document">
        Upload Document
        <form enctype="multipart/form-data" novalidate>
          <input
            id="document-upload"
            type="file" 
            name="document"
            @change="filesChange($event.target.name, $event.target.files[0])"
            accept="application/pdf"
          >
        </form>
      </label>    
    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { connectionDocument } from '@/constants'
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
      isGT: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        documentList: []
      }
    },
    methods: {
      ...mapActions({
        dispatchUploadDocument: 'connection/uploadDocument',
        dispatchGetAllDocuments: 'connection/getAllConnectionDocuments',
        dispatchDeleteDocuments: 'connection/deleteDocument',
      }),
      documentUrl(document) {
        return process.env.VUE_APP_ROOT_API.concat(document)
      },
      documentNameFormat(document) {
        let doc = document.split("/")
        return doc[4]
      },
      filesChange(fieldName, file) {
        const formData = new FormData();
        formData.append(fieldName, file)
        this.uploadDocument(formData)
      },
      uploadDocument(document) {
        this.dispatchUploadDocument({
          connectionId: this.connectionId,
          document: document
        }).then(() => {
          this.showGoodNotification(connectionDocument.UPLOAD_DOCUMENT_SUCCESS)
          this.getDocuments()
        }).catch(() => {
          this.showBadNotification(connectionDocument.UPLOAD_DOCUMENT_FAIL)
        })
      },
      deleteDocument(documentId) {
        this.dispatchDeleteDocuments({
          connectionId: this.connectionId,
          documentId: documentId
        }).then(() => {
          this.showGoodNotification(connectionDocument.DELETE_DOCUMENT_SUCCESS)
          this.getDocuments()
        }).catch(() => {
          this.showBadNotification(connectionDocument.DELETE_DOCUMENT_FAIL)
        })
      },
      getDocuments() {
        this.dispatchGetAllDocuments(this.connectionId).then(res => {
        this.documentList = res
        }).catch(() => {
          this.showBadNotification(connectionDocument.GET_DOCUMENT_FAIL)
        })
      }

    },
    mounted() {
      this.getDocuments()
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
  display: flex;
  margin-bottom: 5px;
}

.header-desc {
  font-size: 12px;
}

.delete-btn {
  margin-left: 10px;
}

.upload-document input {
  height: 100%;
  display: none;
  cursor: pointer;
  z-index: 110;
}

.upload-document {
  border: none;
  cursor: pointer;
  height: 40px;
  font-weight: 700;
  position:relative;
  display: table-cell;
  padding: 0px 15px;
  overflow: hidden;
  vertical-align: middle;
  background-color: var(--secondarycolour);
  color: var(--whitecolour);
}

.upload-document:hover {
  background-color: var(--hovercolour);
}


</style>