<template>
  <span :class="styleClass">{{ number }}</span>
</template>

<script>
export default {
    name:"PageNumber",
    props: {
        number: Number,
        isActive: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        styleClass() {
            return this.isActive ? "page-number active" : "page-number"
        }
    }
}
</script>

<style scoped>
.page-number {
    display: inline-block;
    padding: 5px;
    border: 1px solid var(--textgray);
    margin: 5px;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    text-align: center;
    cursor: pointer;
}

.page-number.active {
    border: 1px solid var(--successcolour);
    color: var(--successcolour);
}
</style>