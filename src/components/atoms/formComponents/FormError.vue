<template>
    <p class="form-error">{{errorMsg}}</p>
</template>
<script>
export default {
    name: 'FormError',
    props: {
        errorMsg: {
            type: String
        }
    }
}
</script>
<style scoped>
.form-error {
    color: var(--errorcolour);
    margin: 5px 0px 0px 0px;
}
</style>