<template>
  <div class="page-container">
    <Header />
    <div class="content-container">
      <h1 class="page-title">Profile</h1>
      <p class="page-description">
        This is the Profile page where user information will be displayed.
      </p>
    </div>
    <Navbar />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Navbar from "../components/Navbar.vue";
</script>

<style scoped>
/* Mimic the layout of the home page */
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1rem;
  color: #555;
}
</style>
