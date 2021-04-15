<template>
  <div class="manage-offers">
    <h1>Manage Offers</h1>
    <div>
      <router-link to="/dashboard/createoffer/" v-if="isGT">
        <Button
          text="Establish new Offer"
          styleMode="tab-nav-create-button"
        ></Button>
      </router-link>
    </div>
    <TabsContainer
      :tabs="tabs"
      :selectedTab="currentTab"
      @selectTab="
        (tab) => {
          currentTab = tab;
        }
      "
    >
      <Tab v-if="'Accepted' == currentTab"
        ><OfferList :offers="offers" :withOwnerDisplay="false"
      /></Tab>
      <Tab v-if="'Cancelled' == currentTab"
        ><OfferList :offers="offers" :withOwnerDisplay="false"
      /></Tab>
      <Tab v-if="'Pending' == currentTab"
        ><OfferList :offers="offers" :withOwnerDisplay="false"
      /></Tab>
      <Tab v-if="'Failed' == currentTab"
        ><OfferList :offers="offers" :withOwnerDisplay="false"
      /></Tab>
    </TabsContainer>
    <div class="container-pagination">
      <pagination
        :activePage="page"
        :totalItems="totalOffers"
        :itemsPerPage="10"
        @setPage="
          (newpage) => {
            page = newpage;
          }
        "
      />
    </div>
  </div>
</template>

<script>
import TabsContainer from "@/components/organisms/TabsContainer";
import Tab from "@/components/molecules/Tab";
import Button from "@/components/atoms/Button";
import AccountsMixin from "@/mixins/AccountsMixin";
import OfferList from "@/components/organisms/OfferList";
import Pagination from "@/components/molecules/Pagination";

import { mapActions } from "vuex";
import { notiType, error } from "@/constants";
import { account_role } from "../../../constants";

export default {
  name: "manage-offers",
  components: { TabsContainer, Tab, Button, OfferList, Pagination },
  mixins: [AccountsMixin],
  created() {
    this.tabs = ["Accepted", "Cancelled", "Pending", "Failed"];
    this.currentTab = "Accepted";
  },
  mounted() {
    this.fetchOffers();
  },
  data() {
    return {
      id: this.$route.params.id,
      currentUserId: this.user.id,
      connectionOwnerId: "",
      aeRole: account_role.AE,

      // AE view - View AE's offer to connection
      offerSent: false,
      currentOffer: {},

      // GT view - View all received offers
      offersView: false,
      receivedOffers: [],

      page: 1,
      tabs: [],
      currentTab: "",
      offers: [],
      totalOffers: 0,
    };
  },
  methods: {
    ...mapActions({
      dispatchGetOfferByOwner: "connection/getOfferByOwner",
      dispatchGetAllConnectionOffers: "connection/getAllConnectionOffers",
      dispatchNotification: "notification/add",
    }),
    fetchOffers() {
      this.dispatchGetOfferByOwner(this.offerInfo)
        .then((res) => {
          this.offers = res.results;
          this.totalOffers = res.count;
        })
        .catch(() => {
          this.dispatchNotification({
            type: notiType.ERROR,
            message: error.SOMETHING_WENT_WRONG,
          });
        });
    },
    aeFetchOffers() {
      this.dispatchGetAllConnectionOffers(this.id)
        .then((res) => {
          let aeOffer = res.results.filter((offer) => {
            return offer.connection === this.user.id;
          });
          this.offers = aeOffer;
        })
        .catch(() => {
          this.dispatchNotification({
            type: notiType.ERROR,
            message: error.SOMETHING_WENT_WRONG,
          });
        });
    },
  },
  watch: {
    currentTab: {
      handler() {
        this.page = 1;
        if (this.isGT) {
          this.fetchConnections();
        } else if (this.isAE) {
          this.aeFetchConnection();
        }
      },
    },
    page: {
      handler() {
        if (this.isGT) {
          this.fetchConnections();
        } else if (this.isAE) {
          this.aeFetchConnection();
        }
      },
    },
  },
  computed: {
    offerInfo() {
      return {
        connectionId: this.id,
        ownerId: this.user.id,
      };
    },
    isAccepted() {
      if (this.offers.status === "Accepted") {
        return true;
      }
      return false;
    },
    isCancelled() {
      if (this.offers.status === "Cancelled") {
        return true;
      }
      return false;
    },
    isPending() {
      if (this.offers.status === "Pending") {
        return true;
      }
      return false;
    },
    isFailed() {
      if (this.offers.status === "Failed") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-nav-create-button {
  background-color: var(--secondarycolour);
  color: var(--bgcolour);
  margin-bottom: 20px;
}

.tab-nav-create-button:hover {
  background-color: var(--hovercolour);
  font-weight: bold;
}

.container-pagination {
  margin-top: 10px;
}
</style>