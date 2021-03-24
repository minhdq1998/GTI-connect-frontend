<template>
<div class="connection-container">
    <div class="connection-top">
        <container-box class="connection-info">
            <connection-info :connection="connection" />
        </container-box>
        <container-box class="owner-info">
            <owner-info :owner=owner />
            <Button 
                class="connection-create-submit-btn action-btn" 
                text="Make an offer">
            </Button>
        </container-box>
    </div>
</div>
</template>

<script>
import ContainerBox from '@/components/atoms/ContainerBox'
import OwnerInfo from './components/OwnerInfo'
import ConnectionInfo from './components/ConnectionInfo'
import Button from '@/components/atoms/Button'

import NotificationMixin from '@/mixins/NotificationMixin'
import { mapActions } from 'vuex'
import { error } from '@/constants'

export default {
    name:'connection',
    components:{ ContainerBox, OwnerInfo, ConnectionInfo, Button },
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
    mounted(){
        this.dispatchGetConnectionDetail(this.id)
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
    }
}
</script>

<style scoped>
.connection-top {
    display: flex;
}

.connection-info {
    width: calc(100% - 270px);
    padding: 20px;
    margin: 0px 20px 20px 0px;
}

.owner-info {
    text-align: center;
    padding: 20px;
    width: 270px;
    height:fit-content;
}

@media screen and (max-width: 640px) {
    .connection-top {
        flex-direction: column-reverse;
    } 

    .connection-info {
        width: calc(100% - 40px);
    }

    .owner-info {
        width: calc(100% - 40px);
        height: auto;
    }
}

.action-btn {
    display: block;
    margin-top: 20px;
    width: 100%;
}
</style>