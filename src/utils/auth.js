import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"
import store from '@/store'

const refreshTokenKey = 'REFRESH_TOKEN'

export function getCurrentUserId() {
    try {
        let decoded = jwt_decode(store.state.user.accessToken)
        return decoded.user_id
    } catch {
        return undefined;
    }
}

export function tokenIsAlive() {
    try {
        let decoded = jwt_decode(store.state.user.accessToken)
        let expired_time = decoded.exp;
        let now = Math.floor((new Date()).getTime() / 1000)
        return now < expired_time;
    } catch {
        return false
    }
} 

export function getRefreshToken() {
    return Cookies.get(refreshTokenKey)
}

export function setCredentials(refreshToken) {
    Cookies.set(refreshTokenKey, refreshToken)
}

export function removeCredentials() {
    Cookies.remove(refreshTokenKey)
}

export function isLoggedIn() {
    return getRefreshToken() ? true : false
}