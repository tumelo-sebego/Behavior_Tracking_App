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
import { api } from "../api";

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
        const response = await api.post("/auth/register", {
          email: this.email,
          password: this.password,
        });
        console.log("Registration successful", response.data);
      } catch (error) {
        console.error("Registration failed", error.response.data);
      }
    },
  },
};
</script>
