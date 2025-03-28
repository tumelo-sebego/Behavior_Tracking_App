<template>
  <div class="bottom-nav">
    <div class="nav-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="$emit('navigate', tab.id)"
        class="nav-button"
        :class="active === tab.id ? 'active-tab' : 'inactive-tab'">
        <span v-if="active === tab.id" class="nav-text">{{ tab.text }}</span>
        <span v-else class="material-icons">{{ tab.icon }}</span>
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
  { id: "home", icon: "home", text: "Home" },
  { id: "calendar", icon: "calendar_today", text: "Goals" },
  { id: "profile", icon: "person", text: "Profile" },
]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 40px;
  display: block;
  right: 0;
  background-color: #232323;
  padding: 0.25rem;
  border-radius: 9999px;
  margin: 1rem 0;
  width: 20rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  max-width: 28rem;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 2.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0 1.5rem;
}

.nav-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.active-tab {
  background-color: #81c784;
  color: #232323;
}

.inactive-tab {
  background-color: transparent;
}

.material-icons {
  font-size: 1.5rem;
  color: #f1f3e6;
}
</style>
