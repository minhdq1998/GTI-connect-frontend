<template>
    <div :class="styleClass">{{ text }}</div>
</template>

<script>
export default {
    name:"OptionItem",
    props: {
        isSelected: {
            type: Boolean,
            default: false,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        optionStyleClass: {
            type: String,
            default: 'option'
        },
        selectedStyleClass: {
            type: String,
            default: 'option-selected'
        }
    },
    computed: {
        styleClass() {
            return this.isSelected ? 
                `${this.optionStyleClass} ${this.selectedStyleClass}` : 
                `${this.optionStyleClass}`
        }
    },
    methods: {
    }
}
</script>

<style>
.option {
    padding: 10px;
    color: var(--textgray);
    border: 1px solid var(--textgray);
    margin-right: 10px;
    border-radius: 3px;
    cursor: pointer;
}

.option:hover {
    border: 1px solid var(--successcolour);
    background-color: var(--hovercolour);
    color: var(--bgcolour);
}

.option-selected {
    color: var(--secondarycolour);
    border: 2px solid var(--secondarycolour);
    background-color: var(--bgcolour);
    font-weight: bold;
}

.option-selected:hover {
    color: var(--secondarycolour);
    background-color: var(--bgcolour);
    border: 2px solid var(--secondarycolour);
    font-weight: bold;
}
</style>