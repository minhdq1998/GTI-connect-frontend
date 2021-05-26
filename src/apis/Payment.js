import requestAPI  from '@/utils/requests'

export default 
{
  getPaymentInfo() {
    return requestAPI({
      url: '/payments/info/',
      method: 'GET'
    })
  },


  getStripeLinkAccount(urls) {
    return requestAPI({
      url: 'payments/registration/',
      method: 'PUT',
      data: urls
    })
  },

  getPaymentList() {
    return requestAPI({
      url: 'payments/',
      method: 'GET'
    })
  }
}