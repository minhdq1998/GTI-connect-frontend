import { mapActions } from 'vuex'

import { notiType } from '@/constants'

export default {
    methods: {
        ...mapActions({
            dispatchNotification: 'notification/add'
        }),
        showBadNotification(message) {
            this.dispatchNotification(
                { type: notiType.ERROR, message: message }
            )
        },
        showGoodNotification(message) {
            this.dispatchNotification(
                { type: notiType.SUCCESS, message: message }
            )
        }
    },

}