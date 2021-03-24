import requestAPI from '@/utils/requests'

export default {
    
    createConnection(connectionInfo) {
        return requestAPI({
            url: 'connectionrequests/',
            method: 'POST',
            data: connectionInfo
        })
    },
    getConnectionList(page, owner, status) {
        return requestAPI({
            url: `connectionrequests/?page=${page}&$owner=${owner}&status=${status}`,
            method: 'GET'
        })
    },
    getConnectionDetail(connectionId) {
        return requestAPI({
            url: `connectionrequests/${connectionId}/`,
            method: 'GET'
        })
    }

}