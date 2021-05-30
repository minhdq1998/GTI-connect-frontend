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
                package: connectionInfo.package,
                description: connectionInfo.description
            }).then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        })
    },

    getConnectionListByOwnerId(context, {page, owner, status}) {
        return new Promise((resolve, reject) => {
            Connection.getConnectionListByOwnerId(page, owner, status
            ).then(res =>
                resolve(res)
            ).catch(e => {
                reject(e)
            })
        })
    },
    
    getConnectionList(context, {page, status}) {
        return new Promise((resolve, reject) => {
            Connection.getConnectionList(page, status
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
    },

    getConnectionListByAEId(context, {page, aeId, status}) {
        return new Promise((resolve, reject) => {
            Connection.getConnectionListByAEId(page, aeId, status
            ).then(res => { 
                resolve(res) 
            }).catch(e => 
                { reject(e) 
            })
        }) 
    },

    getConnectionListAEOffered(context, aeId) {
        return new Promise((resolve, reject) => {
            Connection.getConnectionListAEOffered(aeId
            ).then(res => { 
                resolve(res) 
            }).catch(e => 
                { reject(e) 
            })
        }) 
    },

    // Connection Documents

    getAllConnectionDocuments(context, connectionId) {
        return new Promise((resolve, reject) => {
            Connection.getAllConnectionDocuments(connectionId
            ).then(res => { resolve(res)
            }).catch(e => {reject(e)
            })
        })
    },

    uploadDocument(context, {connectionId, document}) {
        return new Promise((resolve, reject) => {
            Connection.uploadDocument(
                connectionId,
                document
                ).then(res => { resolve(res)
                }).catch(e => {reject(e)
            })
        })
    },

    deleteDocument(context, {connectionId, documentId}) {
        return new Promise((resolve, reject) => {
            Connection.deleteDocument(
                connectionId,
                documentId
                ).then(res => { resolve(res)
                }).catch(e => {reject(e)
            })
        })
    },

    // Request Finish Connection Actions

    requestFinishConnection(context, connectionId) {
        return new Promise((resolve, reject) => {
            Connection.requestFinishConnection(connectionId
            ).then(res => { resolve(res)
            }).catch(e => {reject(e)
            })
        })
    },

    responseRequestFinishConnection(context, {connectionId, response}) {
        return new Promise((resolve, reject) => {
            Connection.responseRequestFinishConnection(
                connectionId,
                response
                ).then(res => { resolve(res)
                }).catch(e => {reject(e)
            })
        })
    },

    // Connection Report Actions


    uploadReport(context, {connectionId, report}) {
        return new Promise((resolve, reject) => {
            Connection.uploadReport(
                connectionId,
                report
                ).then(res => { resolve(res)
                }).catch(e => {reject(e)
            })
        })
    },

    // Comment Actions

    getConnectionComments(context, {page, connectionId}) {
        return new Promise((resolve, reject) => {
            Connection.getComments(
                page, 
                connectionId
            ).then(res => { resolve(res) 
            }).catch(e => { reject(e) 
            })
        }) 
    },

    postConnectionComment(context, commentInfo) {
        return new Promise((resolve, reject) => {
            Connection.postComment({
                owner: commentInfo.owner, 
                connection: commentInfo.connection,
                content: commentInfo.content
            }).then(res => { resolve(res) 
            }).catch(e => { reject(e) 
            })
        }) 
    },

    // Offer Actions 

    postConnectionOffer(context, offerInfo) {
        return new Promise((resolve, reject) => {
            Connection.sendOffer({
                connection: offerInfo.connection,
                mesage: offerInfo.message,
                time_number: offerInfo.time_number,
                time_type: offerInfo.time_type
            }).then(res => { resolve(res) 
            }).catch(e => { reject(e) 
            })
        })
    },

    getOfferByOwner(context, {connectionId, ownerId}) {
        return new Promise((resolve, reject) => {
            Connection.getOfferByOwner(
                connectionId, 
                ownerId
            ).then(res => { resolve(res) 
            }).catch(e => { reject(e) 
            })
        })
    },

    getAllConnectionOffers(context, connectionId) {
        return new Promise((resolve, reject) => {
            Connection.getAllOffers(connectionId)
            .then(res => { resolve(res)
            }).catch(e => { reject(e)
            })
        })
    },

    acceptOffer(context, offerId) {
        return new Promise((resolve, reject) => {
            Connection.acceptOffer(offerId)
            .then(res => { resolve(res)
            }).catch(e => { reject(e)
            })
        })
    },

    cancelOffer(context, offerId) {
        return new Promise((resolve, reject) => {
            Connection.cancelOffer(offerId)
            .then(res => { resolve(res)
            }).catch(e => { reject(e)
            })
        })
    },

    // Stripe Checkout Payment
    createCheckoutSession(context, checkoutInfo) {
        return new Promise((resolve, reject) => {
            Connection.createCheckoutSession(checkoutInfo)
            .then(res => { resolve(res)
            }).catch(e => { reject(e)
            })
        })
    }
}

