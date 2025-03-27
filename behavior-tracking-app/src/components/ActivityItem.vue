<template>
  <div class="activity-item">
    <div class="activity-content">
      <div class="activity-info">
        <div class="title">{{ title }}</div>
        <div class="status-row">
          <div
            class="status-indicator"
            :class="status === 'done' ? 'status-done' : 'status-pending'"></div>
          <span class="status-text">{{
            status === "done" ? "Done" : "Pending"
          }}</span>
        </div>
      </div>
      <div class="separator"></div>
      <div class="duration-container">
        <span class="duration-value">{{ duration }}</span>
        <span class="duration-unit">min</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
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
    validator: (value) => ["done", "pending"].includes(value),
  },
});
</script>

<style scoped>
.activity-item {
  background-color: rgba(239, 240, 216, 0.7);
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
  border: 2px solid #232323;
  background-color: transparent;
}

.status-pending + .status-text {
  color: #232323;
}

.separator {
  width: 2px;
  background-color: rgba(35, 35, 35, 0.3);
  align-self: stretch;
  /* height: 100%; */
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
</style>
