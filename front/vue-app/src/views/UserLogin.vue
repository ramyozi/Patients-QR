<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" v-model="password" required>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p v-if="loginError" class="error-message">Invalid email or password</p>
      <p class="switch-form">
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { firebaseLogin } from '@/service/authService'; // Make sure the path is correct

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
    };
  },
  methods: {
    async login() {
      try {
        await firebaseLogin(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login error', error);
        this.loginError = true;
      }
    }
  }
}
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  padding: 20px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.login-form h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
}
</style>
