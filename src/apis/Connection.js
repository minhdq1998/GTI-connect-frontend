import requestAPI from '@/utils/requests'

export default {

    // Connection API

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
    },

    // Comments API

    getComments(page, connectionId) {
        return requestAPI({
            url: `comments/?page=${page}&connection=${connectionId}`,
            method: 'GET'
        })
    },
    postComment(commentInfo) {
        return requestAPI({
            url: `comments/`,
            method: 'POST',
            data: commentInfo
        })
    },

    // Offer API
    sendOffer(offerInfo) {
        return requestAPI({
            url: `offers/`,
            method: 'POST',
            data: offerInfo
        })
    },
    getOfferByOwner(connectionId, ownerId) {
        return requestAPI({
            url: `offers/?connection=${connectionId}&owner=${ownerId}`,
            method: 'GET'
        })
    },

    getAllOffers(connectionId) {
        return requestAPI({
            url: `offers/?connection=${connectionId}`,
            method: 'GET'
        })
    },

    acceptOffer(offerId) {
        return requestAPI({
            url: `offers/${offerId}/accept/`,
            method: 'PUT',
        })
    },

    cancelOffer(offerId) {
        return requestAPI({
            url: `offers/${offerId}/cancel/`,
            method: 'PUT',
        })
    }

}