<template>
  <div class="week-item" @click="$emit('show-details')">
    <div class="week-content">
      <div class="status-dot" :class="statusColorClass"></div>
      <div class="week-info">
        <div class="title">Week {{ weekNumber }}</div>
        <div class="active-days">
          <i class="pi pi-calendar"></i>
          <span class="days-text"
            >Active Days: {{ activeDays }}/{{ daysPerWeek }}</span
          >
        </div>
      </div>
      <div class="separator"></div>
      <div class="points-container">
        <span class="points-value">{{ percentageComplete }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useActivitiesStore } from "@/store/activities";
import { useGoalSettingsStore } from "@/store/goalSettings";

const props = defineProps({
  weekStart: {
    type: String,
    required: true,
  },
  weekNumber: {
    type: Number,
    required: true,
  },
});

defineEmits(["show-details"]);

const store = useActivitiesStore();
const goalStore = useGoalSettingsStore();

// Get the active goal's daysPerWeek
const daysPerWeek = computed(() => {
  const activeGoal = goalStore.getActiveGoal;
  return activeGoal ? activeGoal.daysPerWeek : 5; // fallback to 5 if no active goal
});

// Get activities for this week
const weekActivities = computed(() => {
  const startDate = new Date(props.weekStart);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + daysPerWeek.value - 1);

  return store.activities.filter((activity) => {
    const activityDate = new Date(activity.dateCreated);
    return activityDate >= startDate && activityDate <= endDate;
  });
});

// Calculate active days (days with points > 0)
const activeDays = computed(() => {
  const daysWithPoints = new Set();
  weekActivities.value.forEach((activity) => {
    if (activity.status === "done" && activity.points > 0) {
      const date = new Date(activity.dateCreated).toDateString();
      daysWithPoints.add(date);
    }
  });
  return daysWithPoints.size;
});

// Calculate total points and percentage
const totalPoints = computed(() => {
  return weekActivities.value
    .filter((activity) => activity.status === "done")
    .reduce((total, activity) => total + activity.points, 0);
});

// Update percentage calculation to use daysPerWeek from active goal
const percentageComplete = computed(() => {
  const maxPoints = daysPerWeek.value * 100;
  return Math.round((totalPoints.value / maxPoints) * 100);
});

// Status color based on percentage complete
const statusColorClass = computed(() => {
  const percentage = percentageComplete.value;
  if (percentage === 0) return "no-points";
  if (percentage <= 25) return "low-points";
  if (percentage <= 50) return "medium-points";
  if (percentage <= 75) return "high-points";
  return "max-points";
});
</script>

<style scoped>
.week-item {
  background-color: #eaeed3;
  border-radius: 1rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.week-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 3.5rem;
  padding: 0 0.5rem;
}

.status-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.status-dot.no-points {
  background-color: #232323;
}

.status-dot.low-points {
  background-color: #8c8c8c;
}

.status-dot.medium-points {
  background-color: #ebc22b;
}

.status-dot.high-points {
  background-color: #36aafe;
}

.status-dot.max-points {
  background-color: #50a65d;
}

.week-info {
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
}

.active-days {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transform: scale(0.9);
  transform-origin: left;
}

.active-days i {
  color: #50a65d;
  font-size: 1rem;
}

.days-text {
  color: #232323;
  font-size: 0.875rem;
}

.separator {
  width: 2px;
  background-color: rgba(35, 35, 35, 0.3);
  align-self: stretch;
  margin: 0;
}

.points-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  margin-left: 1rem;
  padding-right: 1rem;
}

.points-value {
  color: #232323;
  font-weight: 500;
  font-size: 1.125rem;
}
</style>
