<template>
  <Dialog
    :visible="visible"
    @hide="onClose"
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
    class="day-details-dialog"
    transition="dialog">
    <div class="dialog-wrapper" :class="{ 'dialog-enter-active': visible }">
      <!-- Close Button -->
      <div class="close-button-container">
        <Button icon="pi pi-times" @click="onClose" text class="close-button" />
      </div>

      <!-- Date Header -->
      <h2 class="dialog-title">{{ formattedDate }}</h2>

      <!-- Progress Circle -->
      <div class="progress-container">
        <ProgressCircle :progress="dayProgress" />
      </div>

      <!-- Activities List -->
      <div class="activities-container">
        <ActivityItem
          v-for="activity in dayActivities"
          :key="activity.id"
          :id="activity.id"
          @open-dialog="showActivityDialog" />
      </div>

      <!-- ActivityTimer Dialog -->
      <ActivityTimer
        v-if="selectedActivityId"
        v-model:visible="activityDialogVisible"
        :id="selectedActivityId" />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { useActivitiesStore } from "@/store/activities";
import ActivityItem from "./ActivityItem.vue";
import ProgressCircle from "./ProgressCircle.vue";
import ActivityTimer from "./ActivityTimer.vue";

const props = defineProps({
  activityDate: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);
const store = useActivitiesStore();

const activityDialogVisible = ref(false);
const selectedActivityId = ref(null);

// Get activities for this day
const dayActivities = computed(() => {
  return store.getActivitiesByDate(props.activityDate);
});

// Format the date
const formattedDate = computed(() => {
  const date = new Date(props.activityDate);
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "long" });

  function getOrdinalSuffix(d) {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
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

  return `${weekday}, ${month} ${day}${getOrdinalSuffix(day)}`;
});

// Calculate day's progress
const dayProgress = computed(() => {
  return dayActivities.value
    .filter((activity) => activity.status === "done")
    .reduce((total, activity) => total + activity.points, 0);
});

// Show ActivityTimer dialog
function showActivityDialog(activityId) {
  selectedActivityId.value = activityId;
  activityDialogVisible.value = true;
}

// Close dialog
function onClose() {
  emit("update:visible", false);
}
</script>

<style scoped>
.dialog-wrapper {
  display: flex;
  flex-direction: column;
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
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #232323;
  text-align: center;
}

.progress-container {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
}

.activities-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

:deep(.p-dialog-mask) {
  background-color: rgb(250 251 231);
}

:deep(.p-dialog) {
  margin: 0;
  color: #232323;
  overflow: visible;
  height: 100vh;
  max-height: 100vh;
  border-radius: 0;
}

:deep(.p-dialog-content) {
  padding: 0;
  background-color: rgb(250 251 231);
  overflow: visible !important;
}
</style>
