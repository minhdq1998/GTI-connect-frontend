<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
        
              </slot>
                <div class="modal-button-wrapper">
                <Button text="Cancel" styleMode="close-modal-btn" @click="$emit('onClose')" />
                </div>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from '@/components/atoms/Button'
  export default {
    components: { Button }
  }
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 500px;
  width: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
}

.close-modal-btn {
  background-color: var(--btnclosecolour);
  color: var(--whitecolour);
  margin-left: 10px;
}

.close-modal-btn:hover {
  background-color: var(--hover-btnclosecolour);
}
</style>