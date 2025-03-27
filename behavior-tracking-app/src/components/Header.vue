<template>
  <header class="header">
    <div class="header-content">
      <div>
        <h1 class="user-greeting">Hi, {{ name }}</h1>
        <p class="date">{{ date }}</p>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.header {
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-greeting {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
}

.date {
  color: #4b5563; /* gray-600 */
}
</style>
