import requestAPI from '@/utils/requests'

export default {
    createConnection(connectionInfo) {
        return requestAPI({
            url: 'connections/',
            method: 'POST',
            data: connectionInfo
        })
    },
    getConnectionList(page, owner, status) {
        return requestAPI({
            url: `connections/?page=${page}&owner=${owner}&status=${status}`,
            method: 'GET'
        })
    },
    getConnectionListBySectors(page, status, sectors) {
        return requestAPI({
            url: `connections/?page=${page}&status=${status}&sectors=${sectors}`,
            method: 'GET'
        })
    },
    getConnectionDetail(connectionId) {
        return requestAPI({
            url: `connections/${connectionId}/`,
            method: 'GET'
        })
    },
    closeConnection(connectionId) {
        return requestAPI({
            url: `connections/${connectionId}/cancel/`,
            method: 'PATCH'
        })
    }

}