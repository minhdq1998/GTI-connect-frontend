import store from '@/store'
import router from '@/router'
import { notiType } from '@/constants'
import { session, error } from '@/constants'

export default function httpErrorMapping(e) {
    const responseStatus = e?.response?.status ? e.response.status : undefined;
    switch (responseStatus) {
        case 401:{
            sessionExpiredAction()
            return Promise.reject(e)
        } default: {
            store.dispatch('notification/add', {type: notiType.FAIL, message: error.SOMETHING_WENT_WRONG })
            return Promise.reject(e)
        }
    }
}

export function sessionExpiredAction() {
    const notification = { type: notiType.FAIL, message: session.SESSION_EXPIRE }
    store.dispatch('user/logout', notification, { root: true })
    router.push({ name: 'Sign In' })
}