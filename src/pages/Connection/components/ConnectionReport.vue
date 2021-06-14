<template>
  <div>
    <div class="header">  
      <h3>Report</h3>
      <span class="header-desc">Report from AE to this connection.</span>
    </div>

    <div class="body">

      <div class="report-item" v-if="hasReport">
        <a target="_blank" :href="reportUrl(connection.report)" ><Button :text="reportNameFormat(connection.report)" /></a>
      </div>
    </div>

    <div v-if="isAE && isInProgress" class="footer">
      <label for="report-upload" class="upload-report">
        Update report
        <form enctype="multipart/form-data" novalidate>
          <input
            id="report-upload"
            type="file" 
            name="report"
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
  import { connectionReport } from '@/constants'
  import NotificationMixin from '@/mixins/NotificationMixin'
  import Button from '@/components/atoms/Button'

  export default {
    name: 'connection-report',
    components: { Button },
    mixins: [NotificationMixin],
    emits: ['updatedReport'],
    props: {
      connection: {
      type: Object,
      required: true
      },
      isAE: {
        type: Boolean,
        required: true
      },
      isInProgress: {
        type: Boolean,
        required: true
      },
      hasReport: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      ...mapActions({
        dispatchUploadReport: 'connection/uploadReport',
      }),
      reportUrl(report) {
        return process.env.VUE_APP_ROOT_API.concat(report)
      },
      reportNameFormat(report) {
        let doc = report.split("/")
        return doc[4]
      },
      filesChange(fieldName, file) {
        const formData = new FormData();
        formData.append(fieldName, file)
        this.updateReport(formData)
      },
      updateReport(report) {
        this.dispatchUploadReport({
          connectionId: this.connection.pk,
          report: report
        }).then(() => {
          this.showGoodNotification(connectionReport.UPLOAD_REPORT_SUCCESS)
          this.$emit('updatedReport')
        }).catch(() => {
          this.showBadNotification(connectionReport.UPLOAD_REPORT_FAIL)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
h3 {
  margin: 0px;
}


.report-item a {
  text-decoration: none;
}

.report-item {
  display: flex;
  margin-bottom: 15px;
}

.header-desc {
  font-size: 12px;
}

.header {
  margin-bottom: 10px;
}

.delete-btn {
  margin-left: 10px;
}

.upload-report input {
  height: 100%;
  display: none;
  cursor: pointer;
  z-index: 110;
}

.upload-report {
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

.upload-report:hover {
  background-color: var(--hovercolour);
}

</style>