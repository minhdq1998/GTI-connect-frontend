<template>
  <div>
    <modal-container class="change-avatar-modal" @onClose="$emit('closeModal')">
      <template v-slot:header>
        <h2>Change your profile picture</h2>
      </template>
      <template v-slot:body>
        <form enctype="multipart/form-data" novalidate v-if="!uploadedFile">
          <div class="dropbox">
            <input 
              type="file" 
              :name="uploadFieldName" 
              :disabled="isSaving" 
              @change="filesChange($event.target.name, $event.target.files[0])"
              accept="image/*" 
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
        <div class="preview-container">
          <img class="img-preview" v-if="uploadedFile && !isFailed" :src="uploadedFile" />
          <div  v-if="uploadedFile && !isFailed">
            <p>Your profile picture preview</p>
            <a href="javascript:void(0)" @click="reset()">Upload again</a>
          </div>
          <div v-if="isFailed">
            <h2>Save failed.</h2>
            <p class="err-message">{{ uploadError }}</p>
            <p><a href="javascript:void(0)" @click="reset()">Try again</a></p>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <Button text="Save avatar" :disabled="!uploadedFile || isFailed" styleMode="general-btn" @click="saveAvatar(user.id, avatarFormData)"/>
      </template>
    </modal-container>
  </div>
</template>

<script>

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

import ModalContainer from '@/components/atoms/ModalContainer.vue';
import AccountsMixin from '@/mixins/AccountsMixin'
import User from '../../apis/User'

import Button from '../atoms/Button.vue';
  export default {
    components: { ModalContainer, Button },
    mixins:[AccountsMixin],
    emits: ['closeModal'],
  
    data() {
      return {
        uploadedFile: null,
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'avatar',
        avatarFormData: null
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
      }
    },
    methods: {
      reset() {
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFile = null;
        this.uploadError = null;
      },
      saveAvatar(userId, formData) {
        this.currentStatus = STATUS_SAVING
        User.uploadAvatar(userId, formData).then(() => {
          this.currentStatus = STATUS_SUCCESS
          this.$emit('closeModal')
          window.location.reload()
        })
        .catch(err => {
          this.uploadError = err.response.data.avatar[0]
          this.currentStatus = STATUS_FAILED
        })
      },
      filesChange(fieldName, file) {
        const formData = new FormData();
        formData.append(fieldName, file)
        this.avatarFormData = formData
        var reader = new FileReader()
        reader.onload = (e) => {
          this.uploadedFile = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    },
    mounted() {
      this.currentStatus = STATUS_INITIAL;
    },
  }

</script>

<style lang="scss" scoped>

.change-avatar-modal h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.dropbox {
    outline: 2px dashed grey; 
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; 
    position: relative;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .img-preview {
    width: 400px;
    height: 400px;
    display: block;
    margin: auto;
  }

  .input-file {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
    
  }

  .preview-container {
    text-align: center;
    margin-bottom: 20px;
  }

  .preview-container p {
    margin-top: 5px;
    margin-bottom: 0px
  }

  .dropbox:hover {
    background: lightblue; 
  }

  .err-message {
    color: var(--errorcolour);
    margin-bottom: 5px;
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>