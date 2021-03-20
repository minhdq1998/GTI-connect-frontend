<template>
    <button :text="text" :class="styleMode" v-bind="$attrs">{{text}}</button>
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

<style scoped>
button {
    border: none;
    color: var(--primarycolour);
    padding: 10px 15px;
    text-align: center;
    cursor: pointer;
    font-weight: 700;
    border-radius: 3px;
    height: 40px;
}
</style>