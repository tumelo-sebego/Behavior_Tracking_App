<script setup>
import { ref, computed, onUnmounted, watch } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: Number,
    required: false, // Make duration optional
    default: null, // Default to null when not provided
    validator: (value) => value === null || value >= 0, // Validate if provided
  },
  status: {
    type: String,
    required: true,
    validator: (value) =>
      ["pending", "active", "expired", "done"].includes(value),
  },
  points: {
    type: Number,
    required: true,
  },
  timeActive: {
    type: String,
    required: false,
    default: null,
  },
  timeDone: {
    type: String,
    required: false,
    default: null,
  },
  dateCreated: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:visible", "complete", "active-state"]);

const elapsedTime = ref(0); // Always start at 0
const timer = ref(null);
const startTime = ref(null);

const formattedTime = computed(() => {
  const hours = Math.floor(elapsedTime.value / 3600);
  const minutes = Math.floor((elapsedTime.value % 3600) / 60);
  const seconds = Math.floor(elapsedTime.value % 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
});

// Start the timer to increment elapsedTime by 1 each second
function startTimer() {
  if (!timer.value) {
    startTime.value = Date.now();
    timer.value = setInterval(() => {
      elapsedTime.value += 1; // Increment elapsedTime by 1 each second
    }, 1000);
    // Change status to active
    emit("active-state", new Date().toISOString()); // Notify parent component to update the status
    isClicked.value = true; // Update the button state
  }
}

// Stop the timer
function stopTimer() {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
    emit("complete", elapsedTime.value, new Date().toISOString()); // Notify parent to change status to "done"
    isClicked.value = false; // Reset the button state
  }
}

function onClose() {
  emit("update:visible", false); // Notify parent to close the dialog
}

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value); // Clean up the timer when the component is unmounted
  }
});

// Watch for changes in props.duration and props.status to reset elapsedTime
watch(
  () => [props.duration, props.status],
  ([newDuration, newStatus]) => {
    if (newStatus === "expired" || newStatus === "done") {
      elapsedTime.value = newDuration;
    } else {
      elapsedTime.value = 0; // Reset to 0 for other statuses
    }
  },
  { immediate: true }, // Run the watcher immediately when the component is created
);

// Helper function to add ordinal suffix to the day
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th"; // Covers 11th to 19th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Computed property to format the timeActive (start date)
const formattedStartDate = computed(() => {
  if (!props.timeActive) return "N/A"; // Handle cases where timeActive is not provided
  const date = new Date(props.timeActive);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  return `${day}${getOrdinalSuffix(day)} ${month}`;
});
// Computed property to format timeActive
const formattedTimeActive = computed(() => {
  if (!props.timeActive) return "N/A";
  const date = new Date(props.timeActive);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
});

// Computed property to format timeDone
const formattedTimeDone = computed(() => {
  if (!props.timeDone) return "N/A";
  const date = new Date(props.timeDone);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
});

// Reactive state for action button
const isClicked = ref(false);
</script>

<template>
  <Dialog
    :visible="visible"
    @hide="onClose"
    modal
    :closable="false"
    :showHeader="false"
    :dismissableMask="true"
    :contentStyle="{ padding: '0', height: '100vh' }"
    :style="{
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      margin: '0',
      borderRadius: '0',
    }"
    position="top"
    class="activity-dialog">
    <div class="dialog-wrapper" :class="{ 'dialog-enter-active': visible }">
      <div class="close-button-container">
        <Button icon="pi pi-times" @click="onClose" text class="close-button" />
      </div>
      <h2 class="dialog-title">{{ title }}</h2>
      <div class="timer-display">{{ formattedTime }}</div>

      <!-- Activity Points Pill -->
      <div class="activity-points-pill">
        <div class="bolt-icon-group">
          <i class="pi pi-bolt bolt-icon"></i>
          <span class="points-text">Activity Points</span>
        </div>
        <div class="points-group">
          <span class="vertical-line"></span>
          <span class="points-value">{{ points }}%</span>
        </div>
      </div>

      <!-- Activity Details Pill -->
      <div
        v-if="status !== 'pending' && status !== 'active'"
        class="activity-details-pill">
        <div class="details-group">
          <i class="pi pi-calendar calendar-icon"></i>
          <span class="details-date">{{ formattedStartDate }}</span>
        </div>
        <div class="details-group">
          <span class="vertical-line"></span>
          <span class="details-time">{{ formattedTimeActive }}</span>
          <span>-</span>
          <span class="details-time">{{ formattedTimeDone }}</span>
        </div>
      </div>

      <!-- Activity Status Pill -->
      <div class="activity-status-pill">
        <div class="status-group">
          <span
            class="status-dot"
            :class="{
              pending: status === 'pending',
              active: status === 'active',
              done: status === 'done',
              expired: status === 'expired',
            }"></span>
          <span class="status-text">{{ status }}</span>
        </div>
      </div>

      <!-- Action Buttons Pill -->
      <div
        v-if="status === 'pending' || status === 'active'"
        class="action-buttons-pill"
        :class="{ clicked: isClicked }"
        @click="isClicked ? stopTimer() : startTimer()">
        <span class="action-text">{{ isClicked ? "Finish" : "Start" }}</span>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.activity-timer-dialog {
  padding: 0;
}

.dialog-header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.activity-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: calc(100vh - 6rem);
  background-color: rgb(250 251 231);
}

.activity-title {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #232323;
}

.timer-display {
  background-color: #eaeed3;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.time {
  font-size: 2.5rem;
  font-weight: 500;
  color: #232323;
  font-variant-numeric: tabular-nums;
}

.activity-points {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 9999px;
}

.points {
  font-weight: 500;
  margin-left: 0.5rem;
}

.status-indicator {
  margin-bottom: 2rem;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-indicator.pending {
  background-color: #4299e1;
  color: white;
}

.status-indicator.active {
  background-color: #f472b6;
  color: white;
}

.status-indicator.done {
  background-color: #50a65d;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

:deep(.p-dialog-mask) {
  background-color: rgb(250 251 231);
}

:deep(.p-dialog) {
  margin: 0;
  height: 100vh;
  max-height: 100vh;
  border-radius: 0;
}

:deep(.p-dialog-content) {
  padding: 0;
  background-color: rgb(250 251 231);
}

:deep(.p-dialog-header) {
  padding: 0;
  background-color: transparent;
  border: none;
}

.dialog-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
  width: 100%;
  background-color: rgb(250 251 231);
  position: relative;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.dialog-enter-active {
  transform: translateY(0);
  opacity: 1;
}

.close-button-container {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
}

.close-button {
  background-color: rgba(255, 255, 255, 0.7) !important;
  border-radius: 50% !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
}

.dialog-title {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #232323;
}

.activity-points,
.activity-status {
  margin: 1rem 0;
  font-size: 1.2rem;
}

.activity-details {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #555;
}

.activity-details p {
  margin: 0.5rem 0;
}

.action-buttons {
  margin-top: 2rem;
}

/* Add styles for the activity points pill */
.activity-points-pill {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #e6e7e9;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between left and right groups */
  width: 100%; /* Full width */
  color: #232323;
}

.bolt-icon-group {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between the bolt icon and text */
}

.points-group {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between the vertical line and points */
}

.bolt-icon {
  color: #fbbf24; /* Yellow color for the bolt icon */
  font-size: 1.2rem;
}

.points-text {
  font-size: 1rem;
  font-weight: 500;
}

.vertical-line {
  width: 2px; /* Increased width to match activity-points-pill */
  height: 1.5rem;
  background-color: #232323;
}

.points-value {
  font-size: 1rem;
  font-weight: 700;
}

/* Add styles for the activity details pill */
.activity-details-pill {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #e6e7e9;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between left and right groups */
  width: 100%; /* Full width */
  color: #232323;
}

.details-group {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between the icon and text */
}

.calendar-icon {
  color: #4299e1; /* Blue color for the calendar icon */
  font-size: 1.2rem;
}

.details-date,
.details-time {
  font-size: 1rem;
  font-weight: 500;
}

/* Add styles for the activity status pill */
.activity-status-pill {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #e6e7e9;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Full width */
  color: #232323;
}

.status-group {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between the dot and the text */
}

.status-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #d1d5db; /* Default gray color */
}

.status-dot.pending {
  background-color: #4299e1; /* Blue for pending */
}

.status-dot.active {
  background-color: #f472b6; /* Pink for active */
}

.status-dot.done {
  background-color: #50a65d; /* Green for done */
}

.status-dot.expired {
  background-color: #e53e3e; /* Red for expired */
}

.status-text {
  font-size: 1rem;
  font-weight: 500;
  text-transform: capitalize; /* Capitalize the status text */
}

/* Updated styles for all pill containers */
.activity-points-pill,
.activity-details-pill,
.activity-status-pill {
  margin-top: 0; /* Remove margin-top */
  margin-bottom: 1rem; /* Add margin-bottom */
  padding: 0.5rem 1rem;
  background-color: #e6e7e9;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between left and right groups */
  width: 100%; /* Full width */
  color: #232323;
}

/* Styles for the action buttons pill */
.action-buttons-pill {
  margin: 1rem 0; /* Keep the existing margin */
  padding: 0.5rem 1rem;
  background-color: #50a65d;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Full width */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.action-buttons-pill.clicked {
  background-color: #232323;
  color: #e5e7eb;
}

.action-text {
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
}
</style>
