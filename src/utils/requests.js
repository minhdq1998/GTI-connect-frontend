import axios from 'axios'
import {getAccessToken} from '@/utils/auth/'
// import httpErrorMapping from './http-error-mapping'

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
        return Promise.reject(e)
        // return httpErrorMapping(e)
    }
)

export function getAuthorizationHeader() {
    let accessToken = getAccessToken()
    return {
        'Authorization': `Bearer ${accessToken}`
    }
}

export default service