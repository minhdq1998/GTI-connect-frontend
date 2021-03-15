import User from '../../apis/User'
import router from '@/router'

import { 
  getCurrentUserId, 
  getAccessToken ,
  setCredentials, 
  removeCredentials,
  getRefreshToken,
  setAccessToken
} from '../../utils/auth'

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
  SET_CURRENT_USER(state, user) {
    state = Object.assign(state, user)
  },
  SET_ACCESS_TOKEN(state) {
    state.accessToken = getAccessToken()
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
        context.commit('SET_ACCESS_TOKEN')
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  },
  logout() {
    removeCredentials()
    router.go()
  },
  getCurrentUser(context) {
    return new Promise((resolve, reject) => {
      User.getUser(getCurrentUserId()).then(res => {
        let storeUserInfo = {
          id: res.pk,
          first_name: res.first_name,
          last_name: res.last_name,
          role: res.role,
          email: res.email,
          sectors: res.sector_list
        }
        context.commit('SET_CURRENT_USER', storeUserInfo)
        resolve(res)
      }).catch(e => reject(e))
    })
  },
  refreshToken(context) {
    return new Promise((resolve, reject) => {
      User.refreshToken({refresh: getRefreshToken()}
        ).then(res => {
          setAccessToken(res.access)
          context.commit('SET_ACCESS_TOKEN')
          resolve()
        }).catch(e=> reject(e))
    })
  }

}

