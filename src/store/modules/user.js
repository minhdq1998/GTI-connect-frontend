import User from '../../apis/User'
import router from '@/router'

import { getAccessToken ,setCredentials, removeCredentials } from '../../utils/auth'

export const namespaced = true

export const state = {
  accessToken: getAccessToken(),
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  role: '',
  sectors: []
}

export const mutations = {
  SET_CURRENT_USER: (state, user) => {
    state.user = user
  }
}

export const actions = {

  register(context, userInfo) {
    return new Promise((resolve, reject) => {
      User.createUserAccount({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        password: userInfo.password,
        password2: userInfo.password2,
        role: userInfo.role
      }).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  login(context, loginInfo) {
    return new Promise((resolve, reject) => {
      User.getToken({
        email: loginInfo.email,
        password: loginInfo.password
      }).then(res => {
        setCredentials(res.refresh, res.access)
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  },
  logout() {
    removeCredentials()
    router.reload()
  }

}

