import Cookies from 'js-cookie'

const refreshTokenKey = 'REFRESH_TOKEN'
const accessTokenKey = 'ACCESS_TOKEN'

export function getAccessToken() {
    return Cookies.get(accessTokenKey)
}

export function setCredentials(refreshToken, accessToken) {
    Cookies.set(refreshTokenKey, refreshToken) 
    Cookies.set(accessTokenKey, accessToken) 
}

export function removeCredentials() {
    Cookies.remove(refreshTokenKey)
    Cookies.remove(accessTokenKey)
}