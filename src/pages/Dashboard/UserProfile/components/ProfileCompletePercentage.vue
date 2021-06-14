<template>
  <div>
    <span class="label">Your profile completion</span>
    <div className="progress-container">
      <div className="progress-bar" :style="{width: completedPercentage, backgroundColor: progressColour}">
        <span className="progress-label">
            {{completedPercentage}}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
  import AccountsMixin from '@/mixins/AccountsMixin'

  export default {
    mixins: [AccountsMixin],
    props: {
      emptyField: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        
        requiredField: 14,
      }
    },
    computed: {
      totalField() {
        return Object.keys(this.user.profile).length
      },
      completedField() {
        return this.totalField - this.emptyField
      },
      completedPercentage() {
        return ((this.completedField / this.totalField) * 100).toFixed(0) + "%"
      },
      progressColour() {
        let percentage = ((this.completedField / this.totalField) * 100).toFixed(0)
        if (percentage < 20) return "var(--btnclosecolour)"
        else if (percentage < 50) return "var(--lightyellowcolour)"
        return "var(--secondarycolour)"
      }
    }
  }
</script>

<style lang="scss" scoped>
.label {
  font-weight: 600;
  color: var(--labelcolour);
}

.progress-container {
  margin-top: 5px;
  height: 20px;
  width: 100%;
  background-color: var(--disabledcolour);
  border-radius: 5px;
}

.progress-bar {
  height: 100%;
  width: 0px;
  background-color: #f77062;
  border-radius: inherit;
  border-radius: 5px;
  transition: width 1s ease-in-out ;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.progress-label {
  color: var(--whitecolour);
  padding-right: 5px;
  font-weight: 600;
}
</style>