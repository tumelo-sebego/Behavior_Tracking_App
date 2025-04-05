<template>
  <div class="phone-frame">
    <div class="h-full flex-col-container">
      <Header :name="username" :date="date" />

      <div class="content-container">
        <div class="days-container">
          <div
            v-for="day in groupedActivities"
            :key="day.date"
            class="day-item">
            <!-- Day Header -->
            <div class="day-header">
              <span class="day-date">{{ formatDate(day.date) }}</span>
              <div class="day-stats">
                <span class="duration-group">
                  <i class="pi pi-clock"></i>
                  <span>{{ formatTotalDuration(day.activities) }}</span>
                </span>
                <span class="progress-value"
                  >{{ calculateDayProgress(day.activities) }} pts</span
                >
              </div>
            </div>

            <!-- Activities List -->
            <div class="activities-list">
              <ActivityItem
                v-for="activity in day.activities"
                :key="activity.id"
                :id="activity.id"
                @open-dialog="showDialog" />
            </div>
          </div>
        </div>

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
import Header from "@/components/Header.vue";
import ActivityItem from "@/components/ActivityItem.vue";
import Navbar from "@/components/Navbar.vue";
import ActivityTimer from "@/components/ActivityTimer.vue";

const store = useActivitiesStore();
const username = ref("Tumelo");
const date = ref(formatCurrentDate());
const dialogVisible = ref(false);
const selectedActivityId = ref(null);

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

function formatDate(date) {
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const suffix = getOrdinalSuffix(day);
  return `${weekday}. ${day}${suffix} ${month}`;
}

function formatCurrentDate() {
  const today = new Date();
  const day = today.getDate();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const month = today.toLocaleDateString("en-US", { month: "long" });
  return `${weekday}, ${month} ${day}${getOrdinalSuffix(day)}`;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatTotalDuration(activities) {
  const totalMinutes = activities.reduce((total, activity) => {
    return total + (activity.duration || 0);
  }, 0);

  if (totalMinutes === 0) return "0 min";
  if (totalMinutes < 60) return `${totalMinutes} min`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

function calculateDayProgress(activities) {
  return activities
    .filter((activity) => activity.status === "done")
    .reduce((total, activity) => total + activity.points, 0);
}

function showDialog(activityId) {
  selectedActivityId.value = activityId;
  dialogVisible.value = true;
}
</script>

<style scoped>
.phone-frame {
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #1a1a1a;
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
  background: #232323;
  border-radius: 1rem;
  padding: 1rem;
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
</style>
