import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"

const refreshTokenKey = 'REFRESH_TOKEN'
const accessTokenKey = 'ACCESS_TOKEN'

export function getAccessToken() {
    return Cookies.get(accessTokenKey)
}

export function getCurrentUserId() {
    try {
        let decoded = jwt_decode(getAccessToken())
        return decoded.user_id
    } catch {
        return undefined;
    }
}

export function getRefreshToken() {
    return Cookies.get(refreshTokenKey)
}

export function setCredentials(refreshToken, accessToken) {
    Cookies.set(refreshTokenKey, refreshToken) 
    Cookies.set(accessTokenKey, accessToken) 
}

export function removeCredentials() {
    Cookies.remove(refreshTokenKey)
    Cookies.remove(accessTokenKey)
}

export function isLoggedIn() {
    return getCurrentUserId() ? true : false
}