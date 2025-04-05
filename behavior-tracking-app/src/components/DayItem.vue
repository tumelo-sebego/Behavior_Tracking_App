<template>
  <div class="day-item">
    <div class="day-content">
      <div class="day-info">
        <div class="title">{{ formattedDate }}</div>
        <div class="time-range">
          <i class="pi pi-clock"></i>
          <span class="time-text">{{ dayTimeRange }}</span>
        </div>
      </div>
      <div class="separator"></div>
      <div class="points-container">
        <span class="points-value">{{ totalPoints }}</span>
        <span class="points-unit">pts</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useActivitiesStore } from "@/store/activities";

const props = defineProps({
  id: {
    type: String, // Date string as ID
    required: true,
  },
});

const store = useActivitiesStore();

// Get activities for this day
const dayActivities = computed(() => {
  const activities = store.getLatestActivities;
  return activities.filter(activity => {
    const activityDate = new Date(activity.dateCreated);
    return activityDate.toDateString() === new Date(props.id).toDateString();
  });
});

// Format the date (e.g., "Mon, March 24th")
const formattedDate = computed(() => {
  const date = new Date(props.id);
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  
  function getOrdinalSuffix(d) {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  return `${weekday}, ${month} ${day}${getOrdinalSuffix(day)}`;
});

// Calculate time range from first to last activity
const dayTimeRange = computed(() => {
  if (!dayActivities.value.length) return "No activities";

  const times = dayActivities.value.map(activity => 
    new Date(activity.dateCreated).getHours());
  
  const firstTime = Math.min(...times);
  const lastTime = Math.max(...times);

  return `${firstTime}:00 - ${lastTime}:00`;
});

// Calculate total points from completed activities
const totalPoints = computed(() => {
  return dayActivities.value
    .filter(activity => activity.status === "done")
    .reduce((total, activity) => total + activity.points, 0);
});
</script>

<style scoped>
.day-item {
  background-color: #eaeed3;
  border-radius: 1rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.day-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 3.5rem;
  padding: 0 0.5rem;
}

.day-info {
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

.time-range {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transform: scale(0.9);
  transform-origin: left;
}

.time-range i {
  color: #50a65d;
  font-size: 1rem;
}

.time-text {
  color: #50a65d;
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

.points-unit {
  color: #232323;
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>