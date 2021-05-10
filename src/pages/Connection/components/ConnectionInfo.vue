<template>
    <div class="connection-type">
        <h2>{{ packageName }}</h2>
        <div><h4>Created At: </h4>{{createdAt}}</div>
    </div>
    <p style="white-space: pre-line;">{{ connection.description }}</p>
</template>

<script>

export default {
    name:'connection-info',
    props: {
        connection: {
            type: Object,
            required: true,
        },
        packageName: {
            type: String,
            required: true
        }
    },
    computed: {
        packageTitle() {
            let packageInfo = this.getPackageInfo(this.connection.request_type)
            return packageInfo ? packageInfo.summary : ''
        },
        createdAt() {
            return (new Date(this.connection.created_at)).toString()
        }
    }
}
</script>

<style scoped>
.connection-type {
    display: flex;
}

.connection-type > div {
    width: 200px;
}

.connection-type > h2 {
    width: calc(100% - 200px)
}
</style>