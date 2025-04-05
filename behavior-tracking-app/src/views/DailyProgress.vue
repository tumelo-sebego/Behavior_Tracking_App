<template>
  <div class="phone-frame">
    <div class="h-full flex-col-container">
      <!-- Custom Header -->
      <div class="page-header">
        <span class="material-icons">bolt</span>
        <span class="header-text">Daily Progress</span>
      </div>

      <div class="content-container">
        <div class="days-container">
          <DayItem
            v-for="day in groupedActivities"
            :key="day.date"
            :activity-date="day.date.toISOString()"
            @show-details="showDayDetails(day.date)" />
        </div>

        <DayDetailsDialog
          v-model:visible="dayDetailsVisible"
          :activity-date="selectedDate" />

        <!-- ActivityTimer dialog -->
        <ActivityTimer
          v-if="selectedActivityId"
          v-model:visible="dialogVisible"
          :id="selectedActivityId" />
      </div>

      <Navbar :active="'calendar'" :activeGoal="'daily'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useActivitiesStore } from "@/store/activities";
import DayItem from "@/components/DayItem.vue";
import Navbar from "@/components/Navbar.vue";
import ActivityTimer from "@/components/ActivityTimer.vue";
import DayDetailsDialog from "@/components/DayDetailsDialog.vue";

const store = useActivitiesStore();
const dialogVisible = ref(false);
const selectedActivityId = ref(null);
const dayDetailsVisible = ref(false);
const selectedDate = ref("");

// Group activities by date
const groupedActivities = computed(() => {
  const activities = store.getLatestActivities;
  const groups = activities.reduce((acc, activity) => {
    const date = new Date(activity.dateCreated).toDateString();
    if (!acc[date]) {
      acc[date] = {
        date: new Date(activity.dateCreated),
        activities: [],
      };
    }
    acc[date].activities.push(activity);
    return acc;
  }, {});

  return Object.values(groups).sort((a, b) => b.date - a.date);
});

function showDayDetails(date) {
  selectedDate.value = date.toISOString();
  dayDetailsVisible.value = true;
}
</script>

<style scoped>
.phone-frame {
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: rgb(250 251 231);
  color: #f1f3e6;
}

.h-full {
  height: 100%;
}

.flex-col-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  flex: 1;
  padding: 1rem;
}

.days-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.day-item {
  border-radius: 1rem;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.day-date {
  font-size: 1.1rem;
  font-weight: 500;
}

.day-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.duration-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #81c784;
}

.duration-group i {
  font-size: 1rem;
}

.progress-value {
  color: #81c784;
  font-weight: 500;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Add these new styles */
.page-header {
  background-color: #50a65d;
  color: #232323;
  padding: 0.25rem;
  border-radius: 9999px;
  width: 20rem;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.material-icons {
  font-size: 1.5rem;
}

.header-text {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
