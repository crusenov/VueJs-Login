<template>
    <div id="logout">
        <h1>Logout Area</h1>
        <router-link to="/login" v-on:click.native="onLoginClick()" replace>Try to login</router-link>
    </div>
</template>

<script>
export default {
    name: 'Logout',
    data() {
        return {};
    },
    methods: {
        onLoginClick() {
            console.log('onLoginClick')
        }
    }
}
</script>

<style scoped>
    #logout {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>