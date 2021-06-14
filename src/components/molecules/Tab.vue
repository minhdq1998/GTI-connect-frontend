<template>
    <div class="tab-content">
      <slot></slot>
    </div>
</template>

<script>
export default {
    nam:"tab",
}
</script>

<style scoped>
.tab-content {
    box-shadow: 0 0 2.5px 2px var(--boxshadowcolour2);
    margin-top: 0;
    min-height: 50px;
    position: relative;
    z-index: 998;
    padding: 20px;
    height: calc(100vh - 400px);
    overflow-y: scroll;
}
</style>