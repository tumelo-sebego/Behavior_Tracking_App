<script setup>
import { ref, computed } from "vue";
import { useTimer } from "@vueuse/core";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible", "complete"]);

const { pause, resume, time } = useTimer({
  initialValue: props.duration * 60, // Convert minutes to seconds
  interval: 1000,
  controls: true,
});

const status = ref("pending"); // pending, active, done
const startTime = ref(null);

const formattedTime = computed(() => {
  const hours = Math.floor(time.value / 3600);
  const minutes = Math.floor((time.value % 3600) / 60);
  const seconds = Math.floor(time.value % 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
});

function onStart() {
  status.value = "active";
  startTime.value = new Date();
  resume();
}

function onFinish() {
  status.value = "done";
  pause();
  emit("complete", {
    duration: Math.round((new Date() - startTime.value) / 1000 / 60), // Duration in minutes
    startTime: startTime.value,
    endTime: new Date(),
  });
}

function onClose() {
  pause();
  emit("update:visible", false);
}
</script>

<template>
  <Dialog
    :visible="visible"
    :modal="true"
    :closable="true"
    :style="{ width: '100vw', height: '100vh', maxWidth: '100vw', margin: 0 }"
    position="center"
    @update:visible="onClose"
    class="activity-timer-dialog">
    <template #header>
      <div class="dialog-header">
        <Button icon="pi pi-times" text @click="onClose" />
      </div>
    </template>

    <div class="activity-timer">
      <h2 class="activity-title">{{ title }}</h2>

      <div class="timer-display">
        <div class="time">{{ formattedTime }}</div>
      </div>

      <div class="activity-points">
        <i class="pi pi-bolt"></i>
        <span>Activity Points</span>
        <span class="points">{{ duration }}</span>
      </div>

      <div class="status-indicator" :class="status">
        <span class="status-text">{{
          status === "pending"
            ? "Pending"
            : status === "active"
            ? "Active"
            : "Done"
        }}</span>
      </div>

      <div class="action-buttons">
        <Button
          v-if="status === 'pending'"
          label="Start"
          icon="pi pi-play"
          class="p-button-success"
          @click="onStart" />
        <Button
          v-if="status === 'active'"
          label="Finish"
          icon="pi pi-check"
          class="p-button-primary"
          @click="onFinish" />
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
</style>
