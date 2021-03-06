import requestAPI  from '@/utils/requests'

export default {

  createUserAccount(user) {
    return requestAPI({
      url: 'accounts/registration/',
      method: 'POST',
      data: user
    }, false)
  },

  getToken(loginInfo) {
    return requestAPI({
      url: 'accounts/token/',
      method: 'POST',
      data: loginInfo
    }, false)
  },

  getUser(userId) {
    return requestAPI({
      url: `profiles/${userId}/`,
      method: 'GET',
    })
  },

  updateUser(userId, userInfo) {
    return requestAPI({
      url: `profiles/${userId}/`,
      method: 'PATCH',
      data: userInfo
    })
  },

  refreshToken(data) {
    return requestAPI({
      url: 'accounts/token/refresh/',
      method: 'POST',
      data: data
    }, false)
  },

  getSectors() {
    return requestAPI({
      url: `profiles/sectors/`,
      method: 'GET',
    })
  },

  uploadAvatar(userId, avatar) {
    return requestAPI({
      url: `profiles/${userId}/avatar/`,
      method: 'POST',
      data: avatar
    })
  },

  uploadCV(userId, cvdocument) {
    return requestAPI({
      url: `profiles/${userId}/cv/`,
      method: 'POST',
      data: cvdocument
    })
  },

  loginWithGoogle(loginInfo) {
    return requestAPI({
      url: `accounts/google_social_auth/`,
      method: 'POST',
      data: loginInfo
    }, false)
  },

  changePassword(passwordForm) {
    return requestAPI({
      url: `accounts/change_password/`,
      method: 'POST',
      data: passwordForm
    })
  }
}