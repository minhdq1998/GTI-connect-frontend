import request from '@/utils/requests'

export default {

  createUserAccount(user) {
    return request({
      url: 'accounts/registration/',
      method: 'POST',
      data: user
    })
  }

}