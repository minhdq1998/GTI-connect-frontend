import request, {getAuthorizationHeader} from '@/utils/requests'

export default {

  createUserAccount(user) {
    return request({
      url: 'accounts/registration/',
      method: 'POST',
      data: user
    })
  },

  getToken(loginInfo) {
    return request({
      url: 'accounts/token/',
      method: 'POST',
      data: loginInfo
    })
  },

  getUser(userId) {
    return request({
      url: `profiles/${userId}/`,
      method: 'GET',
      headers: getAuthorizationHeader()
    })
  }
}