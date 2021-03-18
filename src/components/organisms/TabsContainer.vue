<template>
<div class="tabs-container">
  <div class="tabs-bar-nav">
        <div 
            v-for="(tab, index) in tabs" 
            :key="index" 
            @click="setTab(tab)"
            :class="getClass(tab)">{{tab}}</div>
  </div>
    <slot></slot>
</div>
</template>

<script>
export default {
    name:"tabs-container",
    props: {
        tabs: {
            type: Array,
            required: true
        },
        selectedTab: {
            type: String,
            required: true
        }
    },
    methods: {
        setTab(tab) {
            this.$emit('selectTab', tab)
        },
        getClass(tab) {
            return tab == this.selectedTab ? 'tab-nav active': 'tab-nav'
        }
    }
}
</script>

<style scoped>

.tabs-container {
    position: relative;
}

.tabs-bar-nav {
    display: flex;
    width: 100%;
}

.tab-nav {
    width: 150px;
    background-color: var(--bgcolour);
    text-align: center;
    padding: 10px 0px 10px 0px;
    cursor: pointer;
    margin-right:5px;
}


.tab-nav:hover {
    box-shadow: 0 -3px 0.75px 2px var(--boxshadowcolour2);
    position: relative;
    z-index: 997
}

.tab-nav.active {
    box-shadow: 0 -3px 1.5px 2px var(--boxshadowcolour2);
    position: relative;
    z-index: 999;
    color: var(--textactive);
    font-weight: bold;
}

</style>