<template>
  <div
    class="activity-item"
    @click="$emit('open-dialog', { title, duration, status })">
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
      <div
        class="dialog-wrapper"
        :class="{ 'dialog-enter-active': dialogVisible }">
        <div class="close-button-container">
          <Button
            icon="pi pi-times"
            @click="dialogVisible = false"
            text
            class="close-button" />
        </div>
        <h2 class="dialog-title">{{ title }}</h2>
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
:deep(.activity-dialog) {
  overflow: hidden;
}

:deep(.p-dialog) {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

:deep(.p-dialog-mask) {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

:deep(.p-dialog-content) {
  padding: 0 !important;
  border: none !important;
  background-color: rgb(250 251 231) !important;
  height: 100vh !important;
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
