<template>
    <h2>{{ connection.request_type }} | {{ packageTitle }}</h2>
    <p style="white-space: pre-line;">{{ connection.description }}</p>
</template>

<script>
import PackagesInfoMixin from '@/mixins/PackagesInfoMixin'


export default {
    name:'connection-info',
    mixins: [PackagesInfoMixin],
    props: {
        connection: {
            type: Object,
            required: true
        }
    },
    computed: {
        packageTitle() {
            let packageInfo = this.getPackageInfo(this.connection.request_type)
            return packageInfo ? packageInfo.summary : ''
        }
    }
}
</script>

<style scoped>

</style>