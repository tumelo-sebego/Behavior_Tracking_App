<template>
  <div class="nav-wrapper">
    <div class="bottom-nav">
      <!-- Goals Submenu -->
      <div v-if="isGoalsMenuOpen" class="goals-submenu">
        <button
          v-for="item in goalItems"
          :key="item.id"
          @click="$emit('goalSelect', item.id)"
          class="nav-button"
          :class="{ 'active-tab': props.activeGoal === item.id }">
          <span class="material-icons icon-spacing">{{ item.icon }}</span>
          <span class="nav-text">{{ item.text }}</span>
        </button>
      </div>

      <div class="nav-container">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="handleTabClick(tab.id)"
          class="nav-button"
          :class="{
            'active-tab':
              tab.id === 'calendar'
                ? isGoalsMenuOpen
                : props.active === tab.id && !isGoalsMenuOpen,
            'inactive-tab':
              tab.id === 'calendar'
                ? !isGoalsMenuOpen
                : props.active !== tab.id || isGoalsMenuOpen,
          }">
          <span
            v-if="
              tab.id === 'calendar'
                ? isGoalsMenuOpen
                : props.active === tab.id && !isGoalsMenuOpen
            "
            class="nav-text"
            >{{ tab.text }}</span
          >
          <span v-else class="material-icons">{{ tab.icon }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  active: {
    type: String,
    required: true,
  },
  activeGoal: {
    type: String,
    default: "daily",
  },
});

const emit = defineEmits(["navigate", "goalSelect"]);

const isGoalsMenuOpen = ref(false);

function handleTabClick(tabId) {
  if (tabId === "calendar") {
    isGoalsMenuOpen.value = !isGoalsMenuOpen.value;
  } else {
    isGoalsMenuOpen.value = false;
    emit("navigate", tabId);
  }
}

const tabs = ref([
  { id: "home", icon: "home", text: "Home" },
  { id: "calendar", icon: "calendar_today", text: "Goals" },
  { id: "profile", icon: "person", text: "Profile" },
]);

const goalItems = ref([
  { id: "daily", icon: "bolt", text: "Daily Progress" },
  { id: "weekly", icon: "star", text: "Weekly Progress" },
  { id: "monthly", icon: "emoji_events", text: "Monthly Progress" },
]);
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
