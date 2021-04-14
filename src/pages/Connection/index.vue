<template>
<div class="connection-container">
    <container-box class="connection-closed" v-if="isCancelled">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="error-message">This connection is closed.</p>
    </container-box>

    <container-box class="connection-in-progress" v-if="isInProgress">
        <i class="fas fa-info-circle"></i>
        <p class="info-message">{{aeInCharge.first_name}} {{aeInCharge.last_name}} is currently in charged for this connection.</p>
    </container-box>

    <div class="connection-top">
        <container-box class="connection-info">
            <connection-info :connection="connection" />
        </container-box>
        <container-box class="owner-info">
            <owner-info :owner=owner />
            <connection-button-group 
                :isConnectionOwner=isConnectionOwner 
                :isAE=isAE 
                :isCancelled=isCancelled
                :isOpen=isOpen
                :isInProgress=isInProgress
                :offerSent=offerSent
                :hasOffers=hasOffers
                @showMakeOffer="showMakeOfferConnectionModal"
                @showOfferDetail="showOfferDetailConnectionModal"
                @closeConnection="showCancelConnectionModal"
                @showReceivedOffers="showReceivedOffersConnectionModal"
            />
        </container-box>
    </div>

    <container-box class="documents-section">
        <connection-documents :connectionId=id :isGT="isGT"/>
    </container-box>

    <container-box class="comment-section">
        <comment-section :isCancelled="isCancelled" :connectionId="id" :ownerId="user.id" :canComment="canComment" />
    </container-box>

    <!-- Modals -->
    <send-offer-modal v-if="showSendOfferModal" @offerSent="handleOfferSent" @closeModal="showSendOfferModal = false" :connection=id />
    <offer-detail-modal @cancelOffer="handleOfferCancel" :offerOwner=user :isAE="isAE" v-if="showOfferDetailModal" @closeModal="showOfferDetailModal = false" :offer=currentOffer />
    <view-all-offers-modal v-if="showReceivedOffersModal" @closeModal="showReceivedOffersModal = false" :offers=receivedOffers />
    <cancel-connection-modal :connectionId="id" v-if="showCancelModal" @closeModal="showCancelModal = false"></cancel-connection-modal>
</div>
</template>

<script>
import ContainerBox from '@/components/atoms/ContainerBox'
import OwnerInfo from './components/OwnerInfo'
import ConnectionInfo from './components/ConnectionInfo'
import CommentSection from '@/components/organisms/CommentSection.vue'
import ConnectionButtonGroup from './components/ConnectionButtonGroup.vue'

import SendOfferModal from './components/SendOfferModal.vue'
import OfferDetailModal from './components/OfferDetailModal.vue'
import ViewAllOffersModal from './components/viewAllOffersModal.vue'
import CancelConnectionModal from '@/components/molecules/CancelConnectionModal.vue'

import NotificationMixin from '@/mixins/NotificationMixin'
import AccountsMixin from '@/mixins/AccountsMixin'
import { mapActions } from 'vuex'
import { error } from '@/constants'
import { account_role } from '@/constants'
import ConnectionDocuments from './components/ConnectionDocuments.vue'



export default {
    name:'connection',
    components: { 
        ContainerBox, 
        OwnerInfo, 
        ConnectionInfo, 
        CancelConnectionModal, 
        CommentSection, 
        SendOfferModal, 
        OfferDetailModal, 
        ConnectionButtonGroup,
        ViewAllOffersModal,
        ConnectionDocuments
    },
    mixins: [NotificationMixin, AccountsMixin],
    data() {
        return {
            id: this.$route.params.id,
            currentUserId: this.user.id,
            connection: {},
            connectionOwnerId: "",
            aeRole: account_role.AE,

            // AE view - View AE's offer to connection
            offerSent: false,
            currentOffer: {},

            // GT view - View all received offers
            offersView: false,
            receivedOffers: [],
            
            // AE in charge
            aeInCharge: {},

            // modals handling
            showCancelModal: false,
            showSendOfferModal: false,
            showOfferDetailModal: false,
            showReceivedOffersModal: false,

        }
    },
    methods: {
        ...mapActions({
            dispatchGetConnectionDetail: 'connection/getConnectionDetail',
            dispatchGetOfferByOwner: 'connection/getOfferByOwner',
            dispatchGetAllConnectionOffers: 'connection/getAllConnectionOffers',
            dispatchGetCurrentUser: 'user/getCurrentUser',
            dispatchGetUser: 'user/getUser'
        }),
        showCancelConnectionModal() {
            this.showCancelModal = true
        },
        showMakeOfferConnectionModal() {
            this.showSendOfferModal = true
        },
        showOfferDetailConnectionModal() {
            this.showOfferDetailModal = true
        },
        showReceivedOffersConnectionModal() {
            this.showReceivedOffersModal = true
        },

        handleOfferSent() {
            this.dispatchGetOfferByOwner(this.offerInfo).then(res => {
                if (res.count != 0 && res.results[0].status === "Pending") {
                    this.offerSent = true,
                    this.currentOffer = res.results[0]
                }
            }).catch(() => {
            this.showBadNotification(error.SOMETHING_WENT_WRONG)
            })
        },
        handleOfferCancel() {
            this.dispatchGetOfferByOwner(this.offerInfo).then(() => {
                this.offerSent = false
            }).catch(() => {
            this.showBadNotification(error.SOMETHING_WENT_WRONG)
            })
        }
    },
    mounted(){
        this.dispatchGetConnectionDetail(this.id)
        .then(res => {
            this.connection = res
            this.connectionOwnerId = res.owner.pk
            this.handleOfferSent()
            this.dispatchGetAllConnectionOffers(this.id).then(res => {
                this.receivedOffers = res.results
            }).catch(() => {
                this.showBadNotification(error.SOMETHING_WENT_WRONG)
            })
            if (this.isInProgress) {
                this.aeInCharge = this.connection.person_in_charge
            }
        }).catch(() => {
            this.showBadNotification(error.SOMETHING_WENT_WRONG)
        })
       
    },
    computed: {
        owner() {
            return this.connection.owner ? 
                this.connection.owner : { profile: {} }
        },
        offerInfo() {
            return {
                connectionId: this.id,
                ownerId: this.user.id
            }
        },
        canComment() {
            if (this.user.role === this.aeRole) {
                return true
            } else if (this.connectionOwnerId === this.user.id) {
                return true
            }
            return false
        },
        isCancelled() {
            if (this.connection.status === "Cancelled") {
                return true
            }
            return false
        },
        isOpen() {
            if (this.connection.status === "Open") {
                return true
            }
            return false
        },
        isInProgress() {
            if (this.connection.status === "In Progress") {
                return true
            }
            return false
        },
        isConnectionOwner() {
            if (this.user.id === this.connectionOwnerId) {
                return true
            }
            return false
        },
        hasOffers() {
            if (this.receivedOffers.length > 0) {
                return true
            }
            return false
        }
    }
}
</script>

<style scoped>
.connection-top {
    display: flex;
}

.connection-info {
    width: calc(100% - 270px);
    padding: 20px;
    margin: 0px 20px 20px 0px;
}

.owner-info {
    text-align: center;
    padding: 20px;
    width: 270px;
    height:fit-content;
    margin-bottom: 20px;
}

.comment-section {
    padding: 20px;
}

.documents-section {
    margin-bottom: 20px;
    padding: 20px;
}

.connection-closed {
    display: flex;
    margin-bottom: 20px;
    padding: 20px;
    background-color: var(--errorcolourlight);
}

.error-message {
    margin: 0px 0px 0px 10px;
    color: var(--errorcolour);
}

.fa-exclamation-triangle {
    color: var(--errorcolour);
}
.connection-in-progress {
    display: flex;
    margin-bottom: 20px;
    padding: 20px;
    background-color: var(--infobgcolour);
}

.info-message {
    margin: 0px 0px 0px 10px;
    color: var(--infocolour);
}

.fa-info-circle {
    color: var(--infocolour);
}





@media screen and (max-width: 640px) {
    .connection-top {
        flex-direction: column-reverse;
    } 

    .connection-info {
        width: calc(100% - 40px);
    }

    .owner-info {
        width: calc(100% - 40px);
        height: auto;
    }
    
    .comment-section {
        width: calc(100% - 40px);
    }

    .connection-closed {
        width: calc(100% - 40px);
    }
}

</style>