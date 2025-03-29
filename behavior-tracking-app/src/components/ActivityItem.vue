<template>
  <div class="activity-item" @click="showDialog">
    <div class="activity-content">
      <div class="activity-info">
        <div class="title">{{ title }}</div>
        <div class="status-row">
          <div
            class="status-indicator"
            :class="{
              'status-done': status === 'done',
              'status-pending': status === 'pending',
              'status-expired': status === 'expired',
              'status-active': status === 'active',
            }"></div>
          <span class="status-text">{{ statusText }}</span>
        </div>
      </div>
      <div class="separator"></div>
      <div class="duration-container">
        <template v-if="status === 'pending'">
          <i class="pi pi-clock pending-icon"></i>
        </template>
        <template v-else>
          <span class="duration-value">{{ duration }}</span>
          <span class="duration-unit">min</span>
        </template>
      </div>
    </div>

    <Dialog
      v-model:visible="dialogVisible"
      :style="{ width: '100%', height: '100%', maxWidth: '100vw', margin: 0 }"
      position="center"
      modal
      :closable="true"
      closeOnEscape>
      <template #header>
        <div class="dialog-header">
          <span>{{ title }}</span>
          <Button icon="pi pi-times" @click="dialogVisible = false" text />
        </div>
      </template>
      <div class="dialog-content">
        <h2>{{ title }}</h2>
        <div class="timer-display">00:00:00</div>
        <div class="activity-points">
          <span>Activity Points: {{ duration }}</span>
        </div>
        <div class="activity-status">
          <span>Status: {{ statusText }}</span>
        </div>
        <div class="action-buttons">
          <Button
            v-if="status === 'pending'"
            label="Start"
            class="p-button-success" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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
  status: {
    type: String,
    required: true,
    validator: (value) =>
      ["done", "pending", "expired", "active"].includes(value),
  },
});

const dialogVisible = ref(false);

const statusText = computed(() => {
  const statusMap = {
    done: "Done",
    pending: "Pending",
    expired: "Expired",
    active: "Active",
  };
  return statusMap[props.status];
});

function showDialog() {
  dialogVisible.value = true;
}
</script>

<style scoped>
.activity-item {
  background-color: #f1f3e6;
  border-radius: 1rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.activity-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 3.5rem;
  padding: 0 0.5rem;
}

.activity-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1.5rem;
  margin-right: 2rem;
  width: 200px;
}

.title {
  font-weight: 500;
  color: #232323;
  font-size: 1.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transform: scale(0.9);
  transform-origin: left;
}

.status-indicator {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 9999px;
  box-sizing: border-box;
}

.status-text {
  font-size: 0.75rem;
}

.status-done {
  background-color: #50a65d;
}

.status-done + .status-text {
  color: #50a65d;
}

.status-pending {
  border: 1px solid #4299e1;
  background-color: #4299e1;
}

.status-pending + .status-text {
  color: #4299e1;
}

.status-expired {
  background-color: #232323;
}

.status-expired + .status-text {
  color: #232323;
}

.status-active {
  background-color: #fbbf24;
}

.status-active + .status-text {
  color: #fbbf24;
}

.separator {
  width: 2px;
  background-color: rgba(35, 35, 35, 0.3);
  align-self: stretch;
  margin: 0;
}

.duration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  margin-left: 1rem;
  padding-right: 1rem;
}

.duration-value {
  color: #232323;
  font-weight: 500;
  font-size: 1.125rem;
}

.duration-unit {
  color: #232323;
  font-size: 0.75rem;
  opacity: 0.8;
}

.pending-icon {
  color: #4299e1;
  font-size: 1.25rem;
}

/* Dialog styles */
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: calc(100vh - 6rem);
  background-color: rgb(250 251 231);
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

:deep(.p-dialog) {
  margin: 0;
  max-height: 100vh;
  height: 100vh;
  border-radius: 0;
}

:deep(.p-dialog-content) {
  padding: 0 !important;
}
</style>
