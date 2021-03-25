<template>
  <div>
    <profile-avatar :avatarUrl="avatarUrl" class="custom-profile-img"></profile-avatar>
    <div class="owner-name">{{owner.first_name}} {{owner.last_name}}</div>
    <div>
        <div class="info-group">
        <span v-if="owner.profile.occupation_title">{{owner.profile.occupation_title}}</span>
        <span v-if="owner.profile.employer"> at {{owner.profile.employer}}</span>
        </div>
        <div class="info-group" v-if="owner.profile.nationality"><b>Nationality: </b>{{owner.profile.nationality}}</div>
        <div class="sectors-tag" v-if="owner.profile.sectors">
            <div class="sector-tag" v-for="sector, index in owner.profile.sectors" :key="index">{{sector}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import ProfileAvatar from '@/components/atoms/ProfileAvatar'
import { getMediaUrl } from '@/utils/media'

export default {
    name:'owner-info',
    components: {ProfileAvatar},
    props: {
        owner: {
            type:Object,
            required: true
        }
    },
    computed: {
        avatarUrl() {
            return getMediaUrl(this.owner.profile.avatar)
        },
    }
}
</script>

<style scoped>
.owner-name {
    font-weight: bold;
    font-size: 20px;
}

.info-group {
    margin-top: 7px;
}

.sectors-tag {
    margin-top: 20px;
}

.custom-profile-img {
      margin: 20px 0px 20px 0px;
}

.sector-tag {
    margin-top: 3px;
    padding: 3px 10px 3px 10px;
    border-radius: 3px;
    background-color: var(--disabledcolour);
    color: var(--labelcolour);
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
}
</style>