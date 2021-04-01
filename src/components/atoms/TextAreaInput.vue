<template>
    <div class="text-area-input-wrapper">
        <textarea
        v-bind="$attrs"
        :rows="rows"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :maxlength="maxLength">
        </textarea>
        <div class="text-area-characters" v-if="displayCharacterCount">{{ modelValue.length }}/{{maxLength}}</div>
    </div>
</template>

<script>
export default {
    name:"text-area-input",
    props: {
        maxLength: {
            type: Number,
            default: 10000
        },
        modelValue: {
            type: [String, Number],
            required: true
        },
        displayCharacterCount: {
            type: Boolean,
            default: true
        },
        rows: {
            type: Number,
            default: 10
        },
    },
}
</script>

<style>
.text-area-input-wrapper {
    position: relative;
}

textarea {
    padding: 10px;
    width: 100%;
    resize: none;
    border-radius: 3px;
}

.text-area-characters {
    position: absolute;
    right: 2px;
}
</style>