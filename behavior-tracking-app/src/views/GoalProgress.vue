<template>
  <div class="phone-frame">
    <div class="h-full flex-col-container">
      <!-- Sticky Header -->
      <div class="header-container">
        <div class="page-header" :class="{ 'header-hidden': isHeaderHidden }">
          <span class="material-icons">flag</span>
          <span class="header-text">Goal Progress</span>
        </div>
      </div>

      <div
        class="content-container"
        @scroll="handleScroll"
        ref="contentContainer">
        <!-- Progress Circle -->
        <div class="progress-container">
          <ProgressCircle :progress="activeGoal?.completionRate || 0" />
        </div>

        <!-- Days Left Container -->
        <div class="days-left-pill">
          <div class="left-group">
            <i class="pi pi-sun sun-icon"></i>
            <span class="days-text">Days left to completion</span>
          </div>
          <div class="right-group">
            <span class="vertical-line"></span>
            <div class="days-count">
              <span class="count-value">{{ daysLeft }}</span>
              <span class="count-label">days</span>
            </div>
          </div>
        </div>
      </div>

      <Navbar :active="'calendar'" :activeGoal="'goal'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useGoalSettingsStore } from "@/store/goalSettings";
import ProgressCircle from "@/components/ProgressCircle.vue";
import Navbar from "@/components/Navbar.vue";

const goalStore = useGoalSettingsStore();
const contentContainer = ref(null);
const isHeaderHidden = ref(false);
let lastScrollPosition = 0;

const activeGoal = computed(() => goalStore.getActiveGoal);

// Calculate days left until goal completion
const daysLeft = computed(() => {
  if (!activeGoal.value?.endDate) return 0;

  const endDate = new Date(activeGoal.value.endDate);
  const today = new Date();
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
});

function handleScroll(event) {
  const currentScroll = event.target.scrollTop;
  if (Math.abs(currentScroll - lastScrollPosition) > 5) {
    isHeaderHidden.value =
      currentScroll > lastScrollPosition && currentScroll > 50;
    lastScrollPosition = currentScroll;
  }
}
</script>

<style scoped>
.phone-frame {
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: rgb(250 251 231);
  color: #f1f3e6;
}

.h-full {
  height: 100%;
}

.flex-col-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-container {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1rem 0;
  background-color: rgb(250 251 231);
}

.page-header {
  background-color: #50a65d;
  color: #232323;
  padding: 0.25rem;
  border-radius: 9999px;
  width: 20rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.header-hidden {
  transform: translateY(-200%);
}

.content-container {
  flex: 1;
  padding: 0 1rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.progress-container {
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  max-width: 200px;
}

.days-left-pill {
  margin: 1rem 0;
  padding: 0.75rem 1.5rem;
  background-color: #e6e7e9;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #232323;
}

.left-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.right-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sun-icon {
  color: #fbbf24;
  font-size: 1.25rem;
}

.days-text {
  font-size: 1rem;
  font-weight: 500;
}

.vertical-line {
  width: 2px;
  height: 1.5rem;
  background-color: #232323;
}

.days-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
}

.count-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #232323;
}

.count-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
}
</style>
