<template>
  <div class="connection-type">
    <h2>{{ connection.request_type }} | {{ packageTitle }}</h2>
    <div><h4>Created At:</h4>{{ createdAt }}</div>
  </div>
  <p style="white-space: pre-line">{{ connection.description }}</p>
  
  <br />
  <div v-bind="getRootProps()" class="outline-none">
    <input v-bind="getInputProps()" type="file" multiple />
    <div class="dropzone">
      <p v-if="reports.length === 0" style="text-align: center; width: 100%">
        Drop reports here or click to upload.
      </p>
      <div v-else>
        <div
          class="dz-preview dz-file-preview dz-processing dz-success dz-complete"
          v-for="report in reports"
          :key="report.name"
        >
          <div class="dz-image">
            <div class="dz-details">
              <div class="dz-filename">
                <span data-dz-name="">{{ report.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Button styleMode="submit" text="Submit" @click="uploadReport(reports)"/>
</template>

<script>
  import { mapActions } from 'vuex'
  import PackagesInfoMixin from "@/mixins/PackagesInfoMixin";
  import { useDropzone } from "vue3-dropzone";
  import { reactive } from "vue";
  import { connectionDocument } from "@/constants";
  import Button from '../../../components/atoms/Button.vue'

  export default {
    name: "connection-info",
    components: {Button},
    mixins: [PackagesInfoMixin],
    props: {
      connection: {
        type: Object,
        required: true,
      },
    },
    setup() {
      function onDrop(acceptFiles, rejectReasons) {
        console.log("acceptFiles", acceptFiles);
        console.log("rejectReasons", rejectReasons);
        let formData = new FormData();
        acceptFiles.forEach((element) => {
          reports.push(element);
          formData.append("report", element);
        });
        console.log("arrReport", reports);
      }

      const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });
      let reports = reactive([]);
      return {
        getRootProps,
        getInputProps,
        reports,
        connectionId: this.connection.pk,
        ...rest,
      };
    },
    computed: {
      packageTitle() {
        let packageInfo = this.getPackageInfo(this.connection.request_type);
        return packageInfo ? packageInfo.summary : "";
      },
      createdAt() {
        return new Date(this.connection.created_at).toString();
      },
    },
    methods: {
      ...mapActions({
        dispatchUploadReport: 'connection/uploadReport',
        dispatchGetAllReports: 'connection/getAllConnectionReports',
      }),
      uploadReport() {
        let formData = new FormData();
        console.log("this.reports", this.reports);
        for (var i = 0; i < this.reports.length; i++) {
          let report = this.reports[i];
          formData.append("report[" + i + "]", report);
        }
        this.dispatchUploadReport({
          connectionId: this.connectionId,
          document: formData
        }).then(() => {
          this.showGoodNotification(connectionDocument.UPLOAD_DOCUMENT_SUCCESS)
          this.getReports()
        }).catch(() => {
          this.showBadNotification(connectionDocument.UPLOAD_DOCUMENT_FAIL)
        })
      },
      getReports() {
        this.dispatchGetAllReports(this.connection.pk).then(res => {
        this.reports = res.report
        console.log("all reports", this.reports)
        }).catch(() => {
          this.showBadNotification(connectionDocument.GET_DOCUMENT_FAIL)
        })
      }
    },
    mounted() {
      console.log("connection", this.connection);
      console.log("id", this.connectionId);
      this.getReports()
    },
  };
</script>

<style scoped lang="scss">
.connection-type {
  display: flex;
}

.connection-type > div {
  width: 200px;
}

.connection-type > h2 {
  width: calc(100% - 200px);
}
.dropzone {
  width: 100%;
  min-height: 150px;
  border: 2px dashed #0087f7;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  color: #646c7f;
  font-size: 20px;
  display: flex;
  align-items: center;
  outline: none !important;
}
.outline-none {
  outline: none !important;
}
.dropzone .dz-preview {
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 16px;
  min-height: 100px;
}
.dropzone.dz-clickable * {
  cursor: default;
}
.dropzone .dz-image {
  border-radius: 20px;
  background: #999;
  background: linear-gradient(to bottom, #eee, #ddd);
}
.dropzone .dz-preview .dz-image {
  border-radius: 20px;
  overflow: hidden;
  width: 150px;
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 10;
  .dz-details {
    word-break: break-word;
    z-index: 20;
    font-size: 13px;
    width: 100%;
    padding: 2em 1em;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    line-height: 150%;
  }
}
</style>
