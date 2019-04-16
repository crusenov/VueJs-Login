<template>
    <div id="secure">
        <h1>Secure Area</h1>
        <p>This is a secure area</p>
        <router-link to="/logout" v-on:click.native="onLogout()" replace>Logout</router-link>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Secure',
    data() {
        return {};
    },
    methods: {
        ...mapActions(["logout"]),
        onLogout() {
            this.logout()
        }
    }
}
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>


