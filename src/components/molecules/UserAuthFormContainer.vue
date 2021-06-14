<template>
    <div class="form-container">
        <form 
            class="user-auth-form-wrapper" 
            @submit.prevent="$emit('onSubmit')">
            <p class="user-auth-form-title">{{title}}</p>
            <slot></slot>
        </form>
    </div>
</template>
<script>
export default {
    name: 'UserAuthFormContainer',
    props: {
        title: {
            type: String
        }
    },
    methods: {
    }
}
</script>
<style scoped>

.user-auth-form-title {
    font-weight: bold;
    margin:10px 0px 15px 0px;
    font-size: 30px;
    text-align: center;
}

.user-auth-form-wrapper {
    margin: 0px auto;
    max-width: 300px;
     padding: 10px 0px 10px 0px
}

.form-container {
    max-width: 350px;
    margin: 0 auto;
    border-radius: 3px;
    box-shadow: 0px 2px 10px -3px;
}

@media screen and (max-width: 640px) {
    .form-container {
        max-width: 350px;
        margin: 0 auto;
        border: none;
        min-width: 300px;
    }
}
</style>