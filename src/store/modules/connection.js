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
}

