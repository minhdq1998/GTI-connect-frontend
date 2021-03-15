import axios from 'axios'
import {getAccessToken, tokenIsAlive} from '@/utils/auth/'
import httpErrorMapping from './http-error-mapping'
import store from '@/store'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true,
})

service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    e => {
        return httpErrorMapping(e)
    }
)

export function getAuthorizationHeader() {
    let accessToken = getAccessToken()
    return {
        'Authorization': `Bearer ${accessToken}`
    }
}

export default async function requestAPI(request, withCredentials=true) {
    let accessToken = getAccessToken()
    console.log(tokenIsAlive())
    if (!tokenIsAlive()) {
        await store.dispatch('user/refreshToken')
    }
    if (withCredentials) {
        request.headers = {
            ...request.headers,
            'Authorization': `Bearer ${accessToken}`
        }
    }
    return service(request)
}

// export service