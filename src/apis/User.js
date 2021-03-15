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

  refreshToken(data) {
    return requestAPI({
      url: 'accounts/token/refresh/',
      method: 'POST',
      data: data
    }, false)
  }
}