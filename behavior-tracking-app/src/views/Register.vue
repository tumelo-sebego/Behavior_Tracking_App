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
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      console.log("Registering:", this.email, this.password);
    },
  },
};
</script>
