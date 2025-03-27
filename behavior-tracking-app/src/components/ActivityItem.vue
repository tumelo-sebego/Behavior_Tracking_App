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
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.activity-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-title-container {
  display: flex;
  align-items: center;
}

.status-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
}

.status-done {
  background-color: #10b981; /* green-500 */
}

.status-pending {
  background-color: #3b82f6; /* blue-500 */
}

.completed-task {
  text-decoration: line-through;
  color: #6b7280; /* gray-500 */
}

.duration {
  color: #4b5563; /* gray-600 */
}
</style>
