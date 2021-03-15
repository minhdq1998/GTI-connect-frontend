<template>
    <div :style="styleClass">  </div>
</template>
<script>
export default {
    name:"SpacingDiv",
    props: {
        space:Number
    },
    computed:{
        styleClass() {
            return {
                height: this.space + 'px'
            }
        }
    }
}
</script>