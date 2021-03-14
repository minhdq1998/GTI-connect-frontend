<template>
    <div 
    class="nav-router-link nav-bar-profile" 
    @click="showDropdown = !showDropdown"
    @focusout="showDropdown = false"
    tabindex="-1"
    >
        <img class="navbar-avatar" src="./../../assets/avatar.svg">
        <span class="navbar-name">{{`${user.first_name} ${user.last_name}`}}</span>
        <div v-if="showDropdown" class="nav-bar-profile-dropdown" @click="dispatchLogout">Logout</div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name:'ProfileMiniNavigation',
    computed: mapState({
        user: state => ({
            id: state.user.id,
            first_name: state.user.first_name,
            last_name: state.user.last_name,
            role: state.user.role
        })
    }),
    data() {
        return {
            showDropdown:false
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
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    outline: none;
}

.navbar-avatar {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    
}

.navbar-name {
    margin-left: 5px;
    display: inline;
    padding-left: 45px;
}

.nav-bar-profile-dropdown {
    width: calc(100% - 20px);
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