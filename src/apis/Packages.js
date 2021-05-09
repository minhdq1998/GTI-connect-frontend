import requestAPI from '@/utils/requests'

export default {
  getPackages() {
    return requestAPI({
        url: `packages/`,
        method: 'GET'
    })
  },
}