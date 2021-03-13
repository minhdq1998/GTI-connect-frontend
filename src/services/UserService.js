import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_ACCOUNT_API_URL,
  timeout: 10000
})

export default {
  createUserAccount(user) {
    return apiClient.post('/registration/', user)
  }
}