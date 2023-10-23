<template>
    <div class="login-container">
        <div class="login-form">
            <h1 class="login-title">Login</h1>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" placeholder="Enter your username" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" placeholder="Enter your password" />
            </div>
            <button class="login-button" @click="login">Login</button>
            <div class="signup-link">
                <span>Don't have an account?</span>
                <router-link to="/signup">Sign up</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from "@/api";
export default {
    name: "LoginComponent",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async login() {
            if (this.username == "" || this.password == "") {
                alert("Please enter username and password");
                return;
            }
            let result = await login(this.username, this.password);

            if (result.status == 200) {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("username", this.username);
                this.$router.push({ name: "TodoList" });
            } else {
                alert(result.data.errors);
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    background-color: #1f1f1f;

}

.login-title {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
}

.login-button {
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    width: 100%;
}

.login-button:hover {
    background-color: #0069d9;
}

.signup-link {
    margin-top: 20px;
    text-align: center;
}

.signup-link span {
    margin-right: 5px;
}
</style>
