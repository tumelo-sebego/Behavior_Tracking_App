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

function startTimer() {
  if (timer.value) return; // Prevent multiple intervals
  startTime.value = new Date();
  emit("active-state"); // Emit active state when the timer starts
  timer.value = setInterval(() => {
    elapsedTime.value += 1;
  }, 1000);
}

function finishTimer() {
  clearInterval(timer.value);
  timer.value = null;
  emit("complete", {
    duration: elapsedTime.value, // Emit the elapsed time as the duration
    startTime: startTime.value,
    endTime: new Date(),
  });
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
      elapsedTime.value = newDuration * 60; // Set elapsedTime based on duration
    } else {
      elapsedTime.value = 0; // Reset to 0 for other statuses
    }
  },
  { immediate: true }, // Run the watcher immediately when the component is created
);
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
      <div class="activity-status">
        <span
          >Status:
          {{
            status === "pending"
              ? "Pending"
              : status === "active"
              ? "Active"
              : status === "expired"
              ? "Expired"
              : "Done"
          }}</span
        >
      </div>
      <div class="action-buttons">
        <Button
          v-if="status === 'pending'"
          label="Start"
          icon="pi pi-play"
          class="p-button-success"
          @click="startTimer" />
        <Button
          v-if="status === 'active'"
          label="Done"
          icon="pi pi-check"
          class="p-button-primary"
          @click="finishTimer" />
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
  background-color: rgba(255, 255, 255, 0.8);
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

.timer-display {
  font-size: 3rem;
  font-weight: 700;
  margin: 2rem 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.activity-points,
.activity-status {
  margin: 1rem 0;
  font-size: 1.2rem;
}

.action-buttons {
  margin-top: 2rem;
}
</style>
