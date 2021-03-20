import requestAPI from '@/utils/requests'

export default {
    
    createConnection(connectionInfo) {
        return requestAPI({
            url: 'connectionrequests/',
            method: 'POST',
            data: connectionInfo
        })
    }

}