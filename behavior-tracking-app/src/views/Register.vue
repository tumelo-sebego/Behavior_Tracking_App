<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { register } from "@/api.js";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await register(this.email, this.password);
        localStorage.setItem("token", response.data.token);
        console.log("Registration successful", response.data);
      } catch (error) {
        console.error("Registration failed", error.response.data);
      }
    },
  },
};
</script>
