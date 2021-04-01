<template>
   <div class="textarea">
    <span
      class="emoji-trigger"
      :class="{ 'triggered': showEmojiPicker }"
      @mousedown.prevent="toggleEmojiPicker"
    >
      <svg
        style="width:20px;height:20px"
        viewBox="0 0 24 24"
      >
        <path fill="#888888" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
      </svg>
    </span>
    <textarea 
      ref="textarea"
      v-model="currentValue"
      :style="inputStyle" 
    ></textarea>
    <textarea class="shadow" v-model="currentValue" ref="shadow" tabindex="0"></textarea>
    <div>
      <div class="row">
        <Picker v-if="showEmojiPicker" emoji="relaxed" :data="emojiIndex" set="google" @select="addEmoji" title="Pick your emoji"/>
      </div>
    </div>
  </div>
</template>

<script>
  import data from "emoji-mart-vue-fast/data/all.json";
  import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
  import "emoji-mart-vue-fast/css/emoji-mart.css";

  let emojiIndex = new EmojiIndex(data);

  export default {
    name: 'comment-text-area',
    components: {Picker},
    props: {
      modelValue: {
        type: [String, Number],
        required: true
      },

    },
    data () {
      return {
        currentValue: "",
        inputHeight: '0',
        emojiIndex: emojiIndex,
        showEmojiPicker: false
      }
    },
    watch: {
      currentValue () {
        this.resize()
        this.$emit('update:modelValue', this.currentValue)
      }
    },
    computed: {
      inputStyle () {
        return {
          'min-height': this.inputHeight
        }
      }
    },
    mounted () {
      this.resize()
    },
    methods: {
      resize () {
        this.inputHeight = `${this.$refs.shadow.scrollHeight}px`
      },
      toggleEmojiPicker () {
        this.showEmojiPicker = !this.showEmojiPicker
      },
      addEmoji (emoji) {
        const textarea = this.$refs.textarea
        const cursorPosition = textarea.selectionEnd
        this.currentValue = this.currentValue + emoji.native
        textarea.focus()
        this.$nextTick(() => {
          textarea.selectionEnd = cursorPosition + emoji.native.length
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.textarea {
    textarea {
      padding: 8px 25px 8px 8px;
      border: 1px solid #aeaeae;
      resize: none;
      overflow: hidden;
      font-size: 16px;
      height: 0;
      font-weight: normal;

      &.shadow {
        max-height: 0;
        pointer-events: none;
        opacity: 0;
        margin: 0;
    }
  }
}
textarea {
    padding: 10px;
    width: 100%;
    resize: none;
    border-radius: 3px;
}

.textarea {
  position: relative;
}

.emoji-mart {
  position:absolute;
  top: 33px;
  right: 0px;
}
.emoji-trigger {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  height: 20px;
}
.emoji-trigger path {
  transition: 0.1s all;
}
.emoji-trigger:hover path {
  fill: #000000;
}
.emoji-trigger.triggered path {
  fill: darken(#FEC84A, 15%);
}

.row {
  display: flex;
  flex-direction: row-reverse;
}
</style>