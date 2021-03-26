<template>
  <div class="profile-item">
    <label class="item-label">CV/Resume</label>
    <div class="cv-upload-container" v-if="!isSuccess">
      <a target="_blank" :href="user.cvUrl"><Button text="Your CV" styleMode="cv-url"></Button></a>
    </div>
    <div v-if="editable === true">
       <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <div class="dropbox">
            <input 
              type="file" 
              :name="uploadFieldName" 
              :disabled="isSaving" 
              @change="filesChange($event.target.name, $event.target.files[0])"
              accept="application/pdf" 
              class="input-file"
            >
              <p v-if="isInitial">
                Drag your file here to begin<br> or click to browse
              </p>
              <p v-if="isSaving">
                Uploading file...
              </p>
          </div>
        </form>
        <p class="upload-success" v-if="isSuccess">Your new CV has been updated!</p>
         <div v-if="isFailed">
            <h3>Save failed.</h3>
            <p class="err-message">{{ uploadError }}</p>
            <p><a href="javascript:void(0)" @click="reset()">Try again</a></p>
          </div>
    </div>
  </div>
</template>

<script>
  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;


  import AccountsMixin from '@/mixins/AccountsMixin'
  import Button from '../../../../components/atoms/Button.vue'
  import User from '../../../../apis/User'

  export default {
  components: { Button },
  mixins:[AccountsMixin],
  props: {
    editable: {
      type: Boolean,
      default: false
    },
  },
  data() {
      return {
        uploadedFile: null,
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'cvdocument',
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      },
    },
    methods: {
      reset() {
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFile = null;
        this.uploadError = null;
      },
      saveCV(userId, formData) {
        this.currentStatus = STATUS_SAVING
        User.uploadCV(userId, formData).then(() => {
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response.data.cvdocument[0]
          this.currentStatus = STATUS_FAILED
        })
      },
      filesChange(fieldName, file) {
        const formData = new FormData();
        formData.append(fieldName, file)
        this.saveCV(this.user.id, formData)
      }
    },
    watch: { 
      editable: function() { 
        this.currentStatus = STATUS_INITIAL
      }
    }
  }
</script>

<style lang="scss" scoped>
.profile-item {
  margin-bottom: 20px;
  width: 45%;
}

.item-label {
  font-weight: 600;
  color: var(--labelcolour);
  font-size: 1.2rem;
}

.cv-upload-container {
    display: flex;
}

.cv-url {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border: 1px solid var(--secondarycolour);
  color: var(--secondarycolour);
  background-color: var(--bgcolour);
}

.cv-upload-container a {
  text-decoration: none;
}

.cv-url:hover {
  background-color: var(--secondarycolour-hover);
}


.dropbox {
  margin-top: 5px;
  outline: 2px dashed var(--secondarycolour); 
  outline-offset: -10px;
  background: var(--secondarycolour-hover);
  color: var(--textgray);
  padding: 10px 10px;
  min-height: 100px; 
  min-width: 45%;
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
}

.input-file {
  opacity: 0;
  width: 100%;
  position: absolute;
  height: 100%;
  cursor: pointer;
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 15px 0px;
}

.upload-success {
  color: var(--successcolour);
}

.err-message {
  color: var(--errorcolour);
}

</style>