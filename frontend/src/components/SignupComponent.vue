<template>
    <div class="signup-container">
        <div class="signup-form">
            <h1 class="signup-title">{{ title }}</h1>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter your username" v-model="username" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter your password" v-model="password" />
                </div>
                <button class="signup-button" @click="signup">Sign Up</button>
            <div class="login-link">
                <span>Already have an account?</span>
                <router-link to="/login">Log in</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { signup } from '@/api';

let group;
export default {
    name: 'SignupComponent',
    data() {
        return {
            username: '',
            password: '',
            title: '',
        };
    },
    methods: {
        async signup() {
            if (this.username == '' || this.password == '') {
                alert('Please enter username and password');
                return;
            }

            let result = await signup(this.username, this.password, group);
            if (result.status == 201) {
                this.$router.push({ name: 'Login' });
            } else if (result.status == 400) {
                if (result.data.errors.msg != undefined) alert(result.data.errors);
                else
                    alert(
                        "password has to be at leas 8 characters long"
                    );
            } else {
                alert('Something went wrong');
            }
        },
        setGroupA() {
            localStorage.setItem('group', 'A');
            this.title = 'Want to be part of our evergrowing family?';
        },
        setGroupB() {
            localStorage.setItem('group', 'B');
            this.title = 'Create account:';
        },
    },
    mounted() {
        if (localStorage.group == undefined) {
            if (Math.random() <= 0.5) {
                group = 'A';
                this.setGroupA();
            } else {
                group = 'B';
                this.setGroupB();
            }
        } else {
            group = localStorage.group;
            if (group == 'A') {
                this.setGroupA();
            } else {
                this.setGroupB();
            }
        }
    },
};
</script>

<style scoped>
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-form {
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    background-color: #1f1f1f;
}

.signup-title {
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

.signup-button {
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

.signup-button:hover {
    background-color: #0069d9;
}

.login-link {
    margin-top: 20px;
    text-align: center;
}

.login-link span {
    margin-right: 5px;
}
</style>
