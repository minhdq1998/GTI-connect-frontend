<template>
  <router-link class="connection-container" :to="detailUrl">
      <div class="connection-info">
        <div>
            <h4>{{ connection.request_type}}</h4>
            <div class="connection-description">{{ connection.description }}</div>
        </div>
        <div>
            <SectorTag v-for="sector, index in owner.profile.sectors" :sector="sector" :key="index" />
        </div>
      </div>
      <div class="connection-meta">
        <div v-if="withOwnerDisplay" class="owner-preview">
            <img :src="avatarUrl"><span class="onwer-name">{{owner.first_name}} {{ owner.last_name}}</span>
        </div>
        <h4>Created at:</h4>
        <p>{{ createdAt }}</p>
      </div>
  </router-link>
</template>

<script>
import SectorTag from '../atoms/SectorTag'

export default {
    name:"connection-list-item",
    components: {SectorTag},
    props: {
        connection: Object,
        withOwnerDisplay: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        createdAt() {
            return (new Date(this.connection.created_at)).toString()
        },
        detailUrl() {
            return `/connections/${this.connection.pk}`
        },
        owner() {
            return this.connection.owner ? this.connection.owner : { profile: {} }
        },
        avatarUrl() {
            return this.owner.profile.avatar
        },
    }
}
</script>

<style scoped>
.connection-container {
    display: flex;
    border: 1px solid var(--boxshadowcolour2);
    margin-bottom: 10px;
    padding: 20px;
    transition: all 0.25s;
    text-decoration: none;
    color: var(--textgray);
}

.connection-info {
    width: calc(100% - 200px);
    display: flex;
    flex-direction: column;
}

.connection-description {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 48px;
}

.connection-meta {
    width: 200px;
}

.connection-container:hover {
    box-shadow: 0 0 2.5px 2px var(--boxshadowcolour2);
    cursor: pointer;
}

.owner-preview {
    display: flex;
    align-items: center;
}

.owner-preview img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.onwer-name {
    font-size: 18px;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 21px;
}
</style>