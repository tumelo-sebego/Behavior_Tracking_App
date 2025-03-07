<template>
  <div>
    <h1>Welcome to the Behavior Tracking App</h1>
    <p>Track your daily tasks and progress here.</p>
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
