<template>
   <div class="textarea">
    <textarea v-model="currentValue" :style="inputStyle" @input="$emit('update:modelValue', $event.target.value)"></textarea>
    <textarea class="shadow" v-model="currentValue" ref="shadow" tabindex="0"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'AutoTextarea',
    props: {
      modelValue: {
        type: [String, Number],
        required: true
      },

    },
    data () {
      return {
        currentValue: '',
        inputHeight: '0'
      }
    },
    watch: {
      currentValue () {
        this.resize()
        this.$emit('input', this.currentValue)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
.textarea {
    textarea {
      padding: 8px;
      border: 1px solid #aeaeae;
      resize: none;
      overflow: hidden;
      font-size: 16px;
      height: 0;

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

</style>