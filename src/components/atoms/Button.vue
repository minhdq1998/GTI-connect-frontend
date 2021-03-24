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
    padding: 10px 15px;
    text-align: center;
    cursor: pointer;
    font-weight: 700;
    height: 40px;
}

button:disabled {
    background-color: var(--disabledcolour);
}

button:disabled:hover {
    background-color: var(--disabledcolour);
}
</style>