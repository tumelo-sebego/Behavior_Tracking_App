<template>
  <div class="activity-item">
    <div class="activity-content">
      <div class="activity-title-container">
        <div
          class="status-indicator"
          :class="status === 'done' ? 'status-done' : 'status-pending'"></div>
        <span :class="{ 'completed-task': status === 'done' }">
          {{ title }}
        </span>
      </div>
      <div class="duration">{{ duration }}min</div>
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
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.activity-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-title-container {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #232323;
}

.status-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
}

.status-done {
  background-color: #50a65d;
}

.status-pending {
  border: 2px solid #232323;
}

.completed-task {
  color: #232323;
}

.duration {
  color: #232323;
  font-weight: 500;
}
</style>
