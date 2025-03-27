<template>
  <div class="bottom-nav">
    <div class="nav-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="$emit('navigate', tab.id)"
        class="nav-button"
        :class="active === tab.id ? 'active-tab' : 'inactive-tab'">
        <span class="material-icons">{{ tab.icon }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  active: {
    type: String,
    required: true,
  },
});

defineEmits(["navigate"]);

const tabs = ref([
  { id: "home", icon: "home" },
  { id: "calendar", icon: "calendar_today" },
  { id: "profile", icon: "person" },
]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #232323;
  padding: 0.25rem;
  border-radius: 9999px;
  margin: 1rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  max-width: 28rem;
  margin: 0 auto;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  color: white;
}

.active-tab {
  background-color: #81c784;
  color: #232323;
}

.inactive-tab {
  background-color: transparent;
}
</style>
