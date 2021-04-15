<template>
  <div class="connection-type">
    <h2>{{ connection.request_type }} | {{ packageTitle }}</h2>
    <div>
      <h4>Created At:</h4>
      {{ createdAt }}
    </div>
  </div>
  <p style="white-space: pre-line">{{ connection.description }}</p>

  <br />
  <div class="body">
    <h4>Files List</h4>
    <div v-bind="getRootProps()" class="outline-none">
      <input
        v-bind="getInputProps()"
        ref="files"
        multiple
        @change="filesChange()"
      />
      <div class="dropzone">
        <p v-if="files.length === 0" style="text-align: center; width: 100%">
          Drop files here or click to upload.
        </p>
        <div v-else>
          <div
            class="dz-preview dz-file-preview dz-processing dz-success dz-complete"
            v-for="file in files"
            :key="file.name"
          >
            <div class="dz-image">
              <div class="dz-details">
                <div class="dz-filename">
                  <a target="_blank" :href="fileUrl(file.name)"
                    ><Button :text="fileNameFormat(file.name)"
                  /></a>
                  <div v-if="isGT">
                    <Button
                      styleMode="delete-btn"
                      text="Delete"
                      @click="deleteFile(item.pk)"
                    />
                  </div>
                  <span data-dz-name="">{{ file.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="file-list-item"
      v-for="(item, index) in fileList"
      :key="index"
    >
      <a target="_blank" :href="fileUrl(item.file)"
        ><Button :text="fileNameFormat(item.file)"
      /></a>
      <div v-if="isGT">
        <Button
          styleMode="delete-btn"
          text="Delete"
          @click="deleteFile(item.pk)"
        />
      </div>
    </div> -->
  </div>

  <div v-if="isGT" class="footer">
    <label for="file-upload" class="upload-file">
      Upload File
      <form enctype="multipart/form-data" novalidate>
        <input
          id="file-upload"
          type="file"
          name="file"
          @change="filesChange($event.target.name, $event.target.files[0])"
          accept="application/pdf"
        />
      </form>
    </label>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PackagesInfoMixin from "@/mixins/PackagesInfoMixin";
import { useDropzone } from "vue3-dropzone";
import { reactive } from "vue";
// import { axios } from "axios";
import { connectionDocument } from "@/constants";
import Button from "../../../components/atoms/Button.vue";

export default {
  name: "connection-info",
  components: { Button },
  mixins: [PackagesInfoMixin],
  props: {
    connection: {
      type: Object,
      required: true,
    },
    connectionId: {
      type: String,
      required: true,
    },
    isGT: {
      type: Boolean,
      required: true,
    },
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
      dispatchUploadFile: "connection/uploadFile",
      dispatchGetAllFiles: "connection/getAllConnectionFiles",
      dispatchDeleteFiles: "connection/deleteFile",
    }),
    fileUrl(file) {
      return process.env.VUE_APP_ROOT_API.concat(file);
    },
    fileNameFormat(file) {
      let doc = file.split("/");
      return doc[4];
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
    filesChange(fieldName, file) {
      const formData = new FormData();
      formData.append(fieldName, file);
      this.uploadFile(formData);
    },
    // uploadFile(file) {
    //   let formData = new FormData();

    //   for (var i = 0; i < this.files.length; i++) {
    //     let file = this.files[i];
    //     formData.append("files[" + i + "]", file);
    //   }
    // axios
    //   .post("/api/connections/3/report/", file, {
    //     headers: {
    //     },
    //   })
    //   .then(() => {
    //     this.showGoodNotification(connectionDocument.UPLOAD_DOCUMENT_SUCCESS);
    //     this.getFiles();
    //   })
    //   .catch(() => {
    //     this.showBadNotification(connectionDocument.UPLOAD_DOCUMENT_FAIL);
    //   });
    // },
    uploadFile(file) {
      this.dispatchUploadFile({
        connectionId: this.connectionId,
        file: file,
      })
        .then(() => {
          this.showGoodNotification(connectionDocument.UPLOAD_DOCUMENT_SUCCESS);
          this.getFiles();
        })
        .catch(() => {
          this.showBadNotification(connectionDocument.UPLOAD_DOCUMENT_FAIL);
        });
    },
    deleteFile(fileId) {
      this.dispatchDeleteFiles({
        connectionId: this.connectionId,
        fileId: fileId,
      })
        .then(() => {
          this.showGoodNotification(connectionDocument.DELETE_DOCUMENT_SUCCESS);
          this.getFiles();
        })
        .catch(() => {
          this.showBadNotification(connectionDocument.DELETE_DOCUMENT_FAIL);
        });
    },
    getFiles() {
      this.dispatchGetAllFiles(this.connectionId)
        .then((res) => {
          this.fileList = res;
          console.log(this.fileList);
        })
        .catch(() => {
          this.showBadNotification(connectionDocument.GET_DOCUMENT_FAIL);
        });
    },
  },
  setup() {
    function onDrop(acceptFiles, rejectReasons) {
      console.log(acceptFiles);
      console.log(rejectReasons);
      let formData = new FormData();
      acceptFiles.forEach((element) => {
        files.push(element);
        formData.append("file", element);
      });
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });
    const files = reactive([]);
    return {
      getRootProps,
      getInputProps,
      files,
      ...rest,
    };
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