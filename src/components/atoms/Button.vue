<template>
    <button v-bind:value=text />
</template>
<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
        },
        href: {
            type: String,
            default: '#'
        },
        styleMode: {
            type: String,
        }
    }
}
</script>