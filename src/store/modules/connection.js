import Connection from '../../apis/Connection'

export const namespaced = true

export const state = {
}

export const mutations = {
}

export const actions = {

    create(context, connectionInfo) {
        return new Promise((resolve, reject) => {
            Connection.createConnection({
                request_type: connectionInfo.request_type,
                description: connectionInfo.description
            }).then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    },

    getConnectionList(context, {page, owner, status}) {
        return new Promise((resolve, reject) => {
            Connection.getConnectionList(page, owner, status
            ).then(res =>
                resolve(res)
            ).catch(e => {
                reject(e)
            })
        })
    },

    getConnectionDetail(context, connectionId) {
        return new Promise((resolve, reject) => {
            Connection.getConnectionDetail(connectionId
            ).then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    },

    getConnectionListBySectors(context, {page, status, sectors}) {
        return new Promise((resolve, reject) => {
            Connection.getConnectionListBySectors(
                    page, 
                    status, 
                    sectors.join('|')
                ).then(res => { resolve(res) 
                }).catch(e => { reject(e) 
                })
        }) 
    }
}

