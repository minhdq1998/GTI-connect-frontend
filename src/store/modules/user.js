import User from '../../apis/User'

export const namespaced = true

export const state = {
  user: {}
}

export const mutations = {

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
  }

}

