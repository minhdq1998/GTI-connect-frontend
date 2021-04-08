<template>
<div class="connection-container">
    <container-box class="connection-closed" v-if="isCancelled">
        <i class="fas fa-exclamation-triangle"></i>
        <p class="error-message">This connection is closed.</p>
    </container-box>
    <div class="connection-top">
        <container-box class="connection-info">
            <connection-info :connection="connection" />
        </container-box>
        <container-box class="owner-info">
            <owner-info :owner=owner />
            <Button 
                v-if="user.id != connectionOwnerId && isAE && !isCancelled && !offerSent"
                class="connection-create-submit-btn action-btn" 
                text="Make an offer"
                @click="showMakeOfferConnectionModal">
            </Button>
            <Button 
                v-if="offerSent"
                class="view-offer-btn action-btn" 
                text="View your offer"
                @click="showOfferDetailConnectionModal">
            </Button>
            <Button 
                :disabled="isCancelled"
                v-if="user.id === connectionOwnerId"
                class="cancel-connection-btn action-btn" 
                text="Close connection"
                @click="showCancelModal">
            </Button>
        </container-box>
    </div>
    <container-box class="comment-section">
        <comment-section :isCancelled="isCancelled" :connectionId="id" :ownerId="user.id" :canComment="canComment" />
    </container-box>

    <!-- Modals -->
    <send-offer-modal v-if="showSendOfferModal" @closeModal="showSendOfferModal = false" :connection=id />
    <offer-detail-modal v-if="showOfferDetailModal" @closeModal="showOfferDetailModal = false" :offer=currentOffer />
    <cancel-connection-modal :connectionId="id" v-if="showCancelConnectionModal" @closeModal="showCancelConnectionModal = false"></cancel-connection-modal>
</div>
</template>

<script>
import ContainerBox from '@/components/atoms/ContainerBox'
import OwnerInfo from './components/OwnerInfo'
import ConnectionInfo from './components/ConnectionInfo'
import Button from '@/components/atoms/Button'
import CancelConnectionModal from '@/components/molecules/CancelConnectionModal.vue'
import CommentSection from '@/components/organisms/CommentSection.vue'

import NotificationMixin from '@/mixins/NotificationMixin'
import AccountsMixin from '@/mixins/AccountsMixin'
import { mapActions } from 'vuex'
import { error } from '@/constants'
import { account_role } from '@/constants'
import SendOfferModal from './components/SendOfferModal.vue'
import OfferDetailModal from './components/OfferDetailModal.vue'


export default {
    name:'connection',
    components:{ ContainerBox, OwnerInfo, ConnectionInfo, Button, CancelConnectionModal, CommentSection, SendOfferModal, OfferDetailModal },
    mixins: [NotificationMixin, AccountsMixin],
    data() {
        return {
            id: this.$route.params.id,
            currentUserId: this.user.id,
            connection: {},
            connectionOwnerId: "",
            aeRole: account_role.AE,
            offerSent: false,
            currentOffer: {},

            // modals handling
            showCancelConnectionModal: false,
            showSendOfferModal: false,
            showOfferDetailModal: false,
        }
    },
    methods: {
        ...mapActions({
            dispatchGetConnectionDetail: 'connection/getConnectionDetail',
            dispatchGetSingleConnectionOffer: 'connection/getSingleConnectionOffer',
            dispatchGetCurrentUser: 'user/getCurrentUser'
        }),
        showCancelModal() {
            this.showCancelConnectionModal = true
        },
        showMakeOfferConnectionModal() {
            this.showSendOfferModal = true
        },
        showOfferDetailConnectionModal() {
            this.showOfferDetailModal = true
        }
    },
    mounted(){
        //  this.dispatchGetSingleConnectionOffer(this.id, this.currentUserId).then(res => {
        //         console.log(res)
        //     }).catch(() => {
        //     this.showBadNotification(error.SOMETHING_WENT_WRONG)
        // })
        this.dispatchGetConnectionDetail(this.id)
        .then(res => {
            this.connection = res
            this.connectionOwnerId = res.owner.pk
            this.dispatchGetSingleConnectionOffer(this.offerInfo).then(res => {
                if (res.count === 1 && res.results[0].status === "Pending") {
                    this.offerSent = true,
                    this.currentOffer = res.results[0]
                }
            }).catch(() => {
            this.showBadNotification(error.SOMETHING_WENT_WRONG)
            })
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

.view-offer-btn {
    color: var(--whitecolour);
    background-color: var(--primarycolour);
}

.view-offer-btn:hover {
    background-color: var(--primarycolour-hover);
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

.action-btn {
    display: block;
    margin-top: 20px;
    width: 100%;
}
</style>