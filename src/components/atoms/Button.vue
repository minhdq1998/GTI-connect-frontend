<template>
    <button :text="text" :class="styleMode" v-bind="$attrs"><i :class="icon"></i> {{text}}</button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        icon: {
            type: String,
        },
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