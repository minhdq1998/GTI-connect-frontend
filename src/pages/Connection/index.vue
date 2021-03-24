<template>
<div class="connection-container">
    <div class="connection-header">
        <div class="connection-info">
            <h2>{{connection.request_type}}</h2>
        </div>
        <div owner-info>
            <profile-avatar :avatarUrl="avatarUrl"></profile-avatar>
        </div>
    </div>
</div>
</template>

<script>
import ProfileAvatar from '@/components/atoms/ProfileAvatar'

import NotificationMixin from '@/mixins/NotificationMixin'
import { mapActions } from 'vuex'
import { getMediaUrl } from '@/utils/media'
import { error } from '@/constants'

export default {
    name:'connection',
    components:{ProfileAvatar},
    mixins: [NotificationMixin],
    data() {
        return {
            id: this.$route.params.id,
            connection: {},
        }
    },
    methods: {
        ...mapActions({
            dispatchGetConnectionDetail: 'connection/getConnectionDetail'
        })
    },
    async mounted(){
        console.log(`Connection ID: ${this.id}`)
        await this.dispatchGetConnectionDetail(this.id)
        .then(res => {
            this.connection = res
            console.log(res)
        }).catch(() => {
            this.showBadNotification(error.SOMETHING_WENT_WRONG)
        })
    },
    computed: {
        owner() {
            return this.connection.owner ? 
                this.connection.owner : { profile: {} }
        },
        avatarUrl() {
            return getMediaUrl(this.owner.profile.avatar)
        }
    }
}
</script>

<style scoped>
.connection-header {
    display: flex;
}

.connection-info {
    width: calc(100% - 200px);
}

.owner-info { 
    width: 200px;
}
</style>