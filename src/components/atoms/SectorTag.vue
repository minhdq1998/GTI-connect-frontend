<template>
  <span class="sector-tag">{{sector}}</span>
</template>

<script>
export default {
    name: 'sector-tag',
    props: {
        sector: {
            type: String,
            required: true
        }
    },
}
</script>

<style scoped>
.sector-tag {
    margin: 15px 10px 0px 0px;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: var(--disabledcolour);
    color: var(--labelcolour);
    width: fit-content;
    font-weight: bold;
    font-size: 12px;
}
</style>