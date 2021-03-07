import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/accounts/',
  timeout: 10000
})

export default {
  createUserAccount(user) {
    return apiClient.post('/registration/', user)
  }
}