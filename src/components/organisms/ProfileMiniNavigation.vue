<template>
    <div 
    class="nav-router-link nav-bar-profile" 
    @click="showDropdown = !showDropdown"
    @focusout="showDropdown = false"
    tabindex="-1"
    >   
        <div class="navbar-wrapper">
            <img class="navbar-avatar" :src="user.avatarUrl">
            <p class="navbar-name">{{`${user.first_name} ${user.last_name}`}}</p>
        </div>
        <div v-if="showDropdown" class="nav-bar-profile-dropdown" @click="dispatchLogout">Logout</div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import AccountsMixin from '@/mixins/AccountsMixin'

export default {
    name:'ProfileMiniNavigation',
    mixins: [AccountsMixin],
    data() {
        return {
            showDropdown: false,
        }
    },
    methods: {
        ...mapActions({
            dispatchLogout: 'user/logout'
        })
    }
}
</script>

<style lang="scss" scoped>


.nav-bar-profile {
    direction: ltr;
    border: 1px solid var(--textgray);
    border-radius: 25px;
    font-weight: bold;
    padding: 5px 10px 5px 10px;
    max-width: 140px;
    width: 140px;
    position: relative;
    cursor: pointer;
    outline: none;
    height:40px;
}

.navbar-wrapper {
    position:absolute;
    top: 50%;
    transform: translateY(-36.5%);
}

.navbar-avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
}

.navbar-name {
    margin: 0px 0px 0px 5px;
    display: inline-block;
    width: 100%;
    padding-left: 45px;
    max-lines: 1;
    width: calc(140px - 45px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.nav-bar-profile-dropdown {
    width: calc(140px - 10px);
    z-index: 1001;
    position: absolute;
    bottom: -60px;
    left: 0px;
    display: block;
    padding: 5px 10px 5px 10px;
    background-color: var(--bgcolour);
    // border:1px solid var(--textgray);
    box-shadow: 0px 2px 10px -3px;
    border-radius: 3px
}
</style>