import User from '../../apis/User'
import router from '@/router'
import { account_role } from '@/constants'

import { 
  getCurrentUserId,
  setCredentials, 
  removeCredentials,
  getRefreshToken,
} from '../../utils/auth'

export const namespaced = true

export const state = {
  accessToken: '',
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  payment_registered: false,
  role: account_role.VISITOR,
  avatarUrl: '',
  cvUrl: '',
  profile: {}
}

export const mutations = {
  SET_CURRENT_USER(state, user) {
    state = Object.assign(state, user)
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
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
        role: userInfo.role,
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
        setCredentials(res.refresh)
        context.commit('SET_ACCESS_TOKEN',res.access)
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  },
  loginWithGoogle(context, authToken) {
    return new Promise((resolve, reject) => {
      User.loginWithGoogle({
        auth_token: authToken
      }).then(res=> {
        if (res.refresh) {
          setCredentials(res.refresh)
          context.commit('SET_ACCESS_TOKEN',res.access)
        }
        resolve(res)
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
          payment_registered: res.is_payment_registration_finish,
          role: res.role,
          email: res.email,
          avatarUrl: process.env.VUE_APP_ROOT_API.concat(res.profile.avatar),
          profile: res.profile,
          cvUrl: process.env.VUE_APP_ROOT_API.concat(res.profile.cvdocument),
        }
        context.commit('SET_CURRENT_USER', storeUserInfo)
        resolve(res)
      }).catch(e => reject(e))
    })
  },
  getUser(context, id) {
    return new Promise((resolve, reject) => {
      User.getUser(id).then( res => {
        resolve(res)
        return res
      }).catch(e=> reject(e))
    })
  },
  updateCurrentUser(context, userInfo) {
    return new Promise((resolve, reject) => {
      User.updateUser(getCurrentUserId(), userInfo).then (res => {
        let storeUserInfo = {
          id: res.pk,
          first_name: res.first_name,
          last_name: res.last_name,
          role: res.role,
          email: res.email,
          avatarUrl: process.env.VUE_APP_ROOT_API.concat(res.profile.avatar),
          profile: res.profile,
          cvUrl: process.env.VUE_APP_ROOT_API.concat(res.profile.cvdocument)
        }
        context.commit('SET_CURRENT_USER', storeUserInfo)
        resolve(res)
      }).catch(e => reject(e))
    })
  },
  getSectorsList() {
    return new Promise((resolve, reject) => {
      User.getSectors().then( res => {
        resolve(res)
        return res
      }).catch(e=> reject(e))
    })
  },
  refreshToken(context) {
    return new Promise((resolve, reject) => {
      User.refreshToken({refresh: getRefreshToken()}
        ).then(res => {
          context.commit('SET_ACCESS_TOKEN', res.access)
          resolve()
        }).catch(e=> reject(e))
    })
  },
 

}

