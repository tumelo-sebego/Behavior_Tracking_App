<template>
  <div class="activity-item">
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
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

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
</style>
