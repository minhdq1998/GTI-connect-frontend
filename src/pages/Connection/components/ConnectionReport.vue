<template>
<div>
  <label for="report-upload" class="upload-report">
    Upload Report
    <form enctype="multipart/form-data" novalidate>
      <input
        id="report-upload"
        type="file" 
        name="report"
        @change="filesChange($event.target.name, $event.target.files[0])"
      >
    </form>
  </label>
</div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { connectionDocument } from '@/constants'

  export default {
    name:'connection-report',
    props: ['connectionId', 'connectionReport'],
    methods: {
      ...mapActions({
        dispatchUploadReport: 'connection/uploadReport',
      }),
      filesChange(fieldName, file) {
        const formData = new FormData();
        formData.append(fieldName, file)
        this.uploadReport(formData)
      },
      uploadReport(report) {
        console.log("upload report", this.connectionId, report)
        this.dispatchUploadReport({
          connectionId: this.connectionId,
          report: report
        }).then(res => {
          this.showGoodNotification(connectionDocument.UPLOAD_DOCUMENT_SUCCESS)
          console.log("res: ", res)
          this.$emit('onUpload', res)
        }).catch(() => {
          console.log("report: ", report)
          this.showBadNotification(connectionDocument.UPLOAD_DOCUMENT_FAIL)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
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