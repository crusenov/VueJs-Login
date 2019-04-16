<template>
    <div id="login">
        <div id="info">
            Username: Johnny<br />
            Password: password<br />
        </div>

        <h1>Login</h1>

        <form @submit.prevent="handleSubmit">
             <div class="form-group">
                 <label for="username">Username</label>
                 <input type="text" v-model="input.username" placeholder="Username" name="username" class="form-control" :class="{ 'is-invalid': input.submitted && !input.username }" />
                 <div v-show="input.submitted && !input.username" class="invalid-feedback">Username is required</div>
             </div>
             <div class="form-group">
                 <label htmlFor="password">Password</label>
                 <input type="password" v-model="input.password" placeholder="Password" name="password" class="form-control" :class="{ 'is-invalid': input.submitted && !input.password }" />
                 <div v-show="input.submitted && !input.password" class="invalid-feedback">Password is required</div>
             </div>
             <div class="form-group">
                 <button class="btn btn-primary">Login</button>
             </div>
         </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            input: {
                username: "",
                password: "" ,
                submitted: false 
            }
        }
    },
    methods: {
        ...mapActions(["login"]),
        handleSubmit() {
            this.input.submitted = true;

            if(this.input.username != "" && this.input.password != "") {
                this.$emit("authenticated", true)
                const { username, password } = this.input
                if (username && password) {
                    this.login({ username, password })
                }
            } else {
                console.log("A username and password must be present")
            }
        }
    }
}
</script>

<style scoped>
    #login {
            width: 500px;
            border: 1px solid #CCCCCC;
            background-color: #FFFFFF;
            margin: auto;
            margin-top: 200px;
            padding: 20px;
        }
</style>


