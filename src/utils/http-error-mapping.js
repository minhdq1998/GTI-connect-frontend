import store from '@/store'
import { notiType } from '@/constants'
import { session } from '@/constants'

export default function httpErrorMapping(e) {
    const responseStatus = e?.response?.status ? e.response.status : undefined;
    let path = e.response.config.url
    if (path == 'accounts/token/') return Promise.reject(e)
    switch (responseStatus) {
        case 401:{
            sessionExpiredAction()
            return Promise.reject(e)
        } default: {
            return Promise.reject(e)
        }
    }
}

export function sessionExpiredAction() {
    const notification = { type: notiType.FAIL, message: session.SESSION_EXPIRE }
    store.dispatch('user/logout', notification, { root: true })
}