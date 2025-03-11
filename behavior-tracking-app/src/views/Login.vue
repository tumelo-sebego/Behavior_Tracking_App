<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { login } from "@/api.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await login(this.email, this.password);
        localStorage.setItem("token", response.data.token);
        console.log("Login successful", response.data);
      } catch (error) {
        console.error("Login failed", error.response.data);
      }
    },
  },
};
</script>
