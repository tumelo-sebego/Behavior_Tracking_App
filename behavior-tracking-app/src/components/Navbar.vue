<template>
  <div class="nav-wrapper">
    <div class="bottom-nav">
      <!-- Goals Submenu -->
      <div v-if="isGoalsMenuOpen" class="goals-submenu">
        <button
          v-for="item in goalItems"
          :key="item.id"
          @click="navigateToGoal(item.id)"
          class="nav-button"
          :class="{ 'active-tab': activeGoal === item.id }">
          <span class="material-icons icon-spacing">{{ item.icon }}</span>
          <span class="nav-text">{{ item.text }}</span>
        </button>
      </div>

      <div class="nav-container">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="navigateToTab(tab.id)"
          class="nav-button"
          :class="{ 'active-tab': isTabActive(tab.id) }">
          <!-- Show text if active, otherwise show icon -->
          <span v-if="isTabActive(tab.id)" class="nav-text">{{
            tab.text
          }}</span>
          <span v-else class="material-icons">{{ tab.icon }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// State to track the active tab and active goal
const activeTab = ref(""); // Default to no active tab
const activeGoal = ref(""); // Default to no active goal
const isGoalsMenuOpen = ref(false);

// Tabs for the main navigation
const tabs = ref([
  { id: "home", icon: "home", text: "Home" },
  { id: "calendar", icon: "calendar_today", text: "Goals" },
  { id: "profile", icon: "person", text: "Profile" },
]);

// Submenu items for the "Goals" tab
const goalItems = ref([
  { id: "daily", icon: "bolt", text: "Daily Progress" },
  { id: "weekly", icon: "star", text: "Weekly Progress" },
  { id: "monthly", icon: "emoji_events", text: "Monthly Progress" },
]);

// Function to determine if a tab is active
function isTabActive(tabId) {
  if (tabId === "calendar") {
    // The "Goals" tab is active if the submenu is open or a goal view is displayed
    return isGoalsMenuOpen.value || route.path.includes("progress");
  }
  return activeTab.value === tabId && !isGoalsMenuOpen.value;
}

// Function to handle navigation for main tabs
function navigateToTab(tabId) {
  if (tabId === "calendar") {
    // Toggle the Goals submenu
    isGoalsMenuOpen.value = !isGoalsMenuOpen.value;
    activeGoal.value = ""; // Reset active goal when toggling
    activeTab.value = "calendar"; // Set "Goals" as the active tab
  } else {
    // Close the Goals submenu and navigate to the selected tab
    isGoalsMenuOpen.value = false;
    activeGoal.value = ""; // Reset active goal
    activeTab.value = tabId;
    router.push(`/${tabId === "home" ? "" : tabId}`);
  }
}

// Function to handle navigation for goal submenu items
function navigateToGoal(goalId) {
  // Set the active goal and navigate to the corresponding view
  activeGoal.value = goalId;
  isGoalsMenuOpen.value = false;
  activeTab.value = "calendar"; // Keep "Goals" tab active
  router.push(`/${goalId}progress`);
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.nav-wrapper {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 1rem;
}

.bottom-nav {
  background-color: #232323;
  padding: 0.25rem;
  border-radius: 9999px;
  width: 20rem;
  z-index: 10;
  position: relative;
  display: block;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  max-width: 28rem;
}

.goals-submenu {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.goals-submenu .nav-button {
  background-color: #e2e8f0;
  border-radius: 9999px;
  padding: 0.25rem;
  animation: slideUpItem 0.3s ease-out forwards;
  opacity: 0;
  transform-origin: bottom;
  color: #232323;
}

.goals-submenu .nav-button.active-tab {
  background-color: #81c784;
}

.goals-submenu .nav-button:nth-child(3) {
  animation-delay: 0s;
}

.goals-submenu .nav-button:nth-child(2) {
  animation-delay: 0.1s;
}

.goals-submenu .nav-button:nth-child(1) {
  animation-delay: 0.2s;
}

.goals-submenu .nav-button .material-icons {
  color: #232323;
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
  background: transparent;
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

.icon-spacing {
  margin-right: 0.5rem;
}

.active-tab .material-icons {
  color: #232323;
}

@keyframes slideUpItem {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
