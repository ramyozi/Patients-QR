<template>
  <div class="signup-container">
    <div class="signup-form">
      <h1>Sign Up</h1>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="Enter first name" v-model="firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Enter last name" v-model="lastName" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="role" required>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
      </form>
      <p v-if="signupError" class="error-message">{{ signupErrorMessage }}</p>
      <p class="switch-form">
        Already have an account? <router-link to="/">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { signup } from '@/service/authService';

export default {
  name: 'UserSignin',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'doctor',
      signupError: false,
      signupErrorMessage: ''
    };
  },
  methods: {
    async signup() {
      try {
        await signup(this.email, this.password, this.firstName, this.lastName, this.role);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Signup error', error);
        this.signupError = true;
        this.signupErrorMessage = error.message;
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
   font-weight: bold;
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
 
 .switch-form {
   text-align: center;
   margin-top: 15px;
 }
 
 .signup-container {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   background-color: #f5f5f5;
 }
 
 .signup-form {
   padding: 20px;
   background: white;
   border-radius: 5px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   width: 300px;
 }
 
 .signup-form h1 {
   text-align: center;
   margin-bottom: 20px;
   color: #333;
 }
 
 .signup-form .form-group {
   margin-bottom: 15px;
 }
 
 .signup-form .form-group label {
   display: block;
   margin-bottom: 5px;
   font-weight: bold;
 }
 
 .signup-form .form-group input {
   width: 100%;
   padding: 10px;
   border: 1px solid #ddd;
   border-radius: 4px;
   box-sizing: border-box;
 }
 
 .signup-form .form-group select {
   width: 100%;
   padding: 10px;
   border: 1px solid #ddd;
   border-radius: 4px;
   box-sizing: border-box;
 }
 
 .signup-button {
   width: 100%;
   background: #28a745;
   color: white;
   padding: 10px;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.2s;
 }
 
 .signup-button:hover {
   background-color: #218838;
 }
 
 .signup-form .error-message {
   color: red;
 }
 </style>
 