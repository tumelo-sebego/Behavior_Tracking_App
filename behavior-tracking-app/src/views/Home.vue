<template>
  <div class="phone-frame">
    <div class="h-full flex-col-container">
      <!-- Show Login Form if Not Logged In -->
      <div v-if="!isAuthenticated" class="login-container">
        <Card class="p-shadow-3">
          <template #title>
            <span class="login-title">Login</span>
          </template>
          <template #content>
            <form @submit.prevent="loginUser" class="p-fluid">
              <FloatLabel>
                <InputText id="email" v-model="email" class="dark-text" />
                <label for="email">Email</label>
              </FloatLabel>

              <FloatLabel class="p-mt-3">
                <Password
                  id="password"
                  v-model="password"
                  toggleMask
                  class="dark-text" />
                <label for="password">Password</label>
              </FloatLabel>

              <Button
                label="Login"
                icon="pi pi-sign-in"
                class="p-mt-3"
                type="submit" />
            </form>
            <p class="p-mt-3 forgot-password">
              <router-link to="/forgot-password" class="link">
                Forgot Password?
              </router-link>
            </p>
            <router-link to="/register" custom v-slot="{ navigate }">
              <Button
                label="Register"
                class="p-button-secondary"
                @click="navigate" />
            </router-link>
          </template>
        </Card>
      </div>

      <template v-else>
        <Header :name="username" :date="date" />

        <!-- Main Content -->
        <div class="content-container">
          <template v-if="activeTab === 'home'">
            <div class="progress-container">
              <ProgressCircle :progress="progress" />
            </div>

            <div class="activities-container">
              <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :title="activity.title"
                :duration="activity.duration"
                :status="activity.status"
                :points="activity.points"
                :time-active="activity.timeActive"
                :time-done="activity.timeDone"
                :date-created="activity.dateCreated"
                @open-dialog="showDialog(activity)" />
            </div>

            <!-- ActivityTimer dialog -->
            <ActivityTimer
              v-if="selectedActivity"
              v-model:visible="dialogVisible"
              :title="selectedActivity.title"
              :duration="selectedActivity.duration"
              :status="selectedActivity.status"
              :points="selectedActivity.points"
              :time-active="selectedActivity.timeActive"
              :time-done="selectedActivity.timeDone"
              :date-created="selectedActivity.dateCreated"
              @active-state="onActiveState"
              @complete="onTimerComplete" />
          </template>

          <template v-else-if="activeTab === 'calendar'">
            <div class="progress-view-container">
              <h2 class="section-title">Progress View</h2>

              <div class="progress-buttons-container">
                <Button
                  class="progress-button"
                  :class="
                    activeProgressType === 'daily'
                      ? 'active-button'
                      : 'inactive-button'
                  "
                  @click="handleProgressTypeChange('daily')">
                  <i class="pi pi-bolt icon-spacing"></i>
                  <span>Daily Progress</span>
                </Button>

                <Button
                  class="progress-button"
                  :class="
                    activeProgressType === 'weekly'
                      ? 'active-button'
                      : 'inactive-button'
                  "
                  @click="handleProgressTypeChange('weekly')">
                  <i class="pi pi-star icon-spacing"></i>
                  <span>Weekly Progress</span>
                </Button>

                <Button
                  class="progress-button"
                  :class="
                    activeProgressType === 'monthly'
                      ? 'active-button'
                      : 'inactive-button'
                  "
                  @click="handleProgressTypeChange('monthly')">
                  <i class="pi pi-trophy icon-spacing"></i>
                  <span>Monthly Progress</span>
                </Button>
              </div>

              <div class="progress-message">
                <p>
                  {{ progressTypeMessage }}
                </p>
              </div>
            </div>
          </template>

          <template v-else-if="activeTab === 'profile'">
            <div class="profile-container">
              <div class="profile-content">
                <h2 class="section-title">User Profile</h2>
                <p class="secondary-text">
                  Your profile information will appear here
                </p>
              </div>
            </div>
          </template>
        </div>

        <!-- Replace BottomNavigation with Navbar -->
        <Navbar
          :active="activeTab"
          :active-goal="activeProgressType"
          @navigate="handleNavigate"
          @goal-select="handleProgressTypeChange" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import Header from "@/components/Header.vue";
import ProgressCircle from "@/components/ProgressCircle.vue";
import ActivityItem from "@/components/ActivityItem.vue";
import Navbar from "@/components/Navbar.vue";
import ActivityTimer from "@/components/ActivityTimer.vue";
import { login, getTasks } from "@/api";

const isAuthenticated = ref(false);
const email = ref("");
const password = ref("");
const username = ref("Tumelo");
const activeTab = ref("home");
const progress = ref(20);
const date = ref("");
const activeProgressType = ref("daily");

// Sample activities
const activities = ref([
  {
    id: 1,
    title: "Doing Yoga",
    duration: 30,
    status: "done",
    timeActive: "2025-03-30T07:00:00Z",
    timeDone: "2025-03-30T07:30:00Z",
    dateCreated: "2025-03-29T09:00:00Z",
    points: 20, // 20% of the total points
  },
  {
    id: 2,
    title: "Evening Running",
    duration: 45,
    status: "expired",
    timeActive: null, // Never active
    timeDone: null, // Not completed
    dateCreated: "2025-03-30T16:00:00Z",
    points: 30, // 30% of the total points
  },
  {
    id: 3,
    title: "Reading A Book",
    duration: 25,
    status: "pending",
    timeActive: null, // Not yet active
    timeDone: null, // Not yet done
    dateCreated: "2025-03-30T06:00:00Z",
    points: 50, // 50% of the total points
  },
]);

const dialogVisible = ref(false);
const selectedActivity = ref(null);

function showDialog(activity) {
  selectedActivity.value = activity; // Store the entire activity object
  dialogVisible.value = true;
}

function onActiveState() {
  console.log("Timer is active");
  // Handle any logic when the timer becomes active
}

function onTimerComplete(data) {
  console.log("Timer Complete:", data);
  // Handle the completion of the timer, e.g., updating activity status
  const activity = activities.value.find(
    (activity) => activity.title === selectedActivity.value.title,
  );
  if (activity) {
    activity.status = "done"; // Update the activity status to "done"
  }
  dialogVisible.value = false; // Close the dialog
}

const progressTypeMessage = computed(() => {
  switch (activeProgressType.value) {
    case "daily":
      return "Your daily progress stats will appear here";
    case "weekly":
      return "Your weekly progress summary will appear here";
    case "monthly":
      return "Your monthly achievements will appear here";
    default:
      return "";
  }
});

const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem("token");
};

const loginUser = async () => {
  try {
    const response = await login(email.value, password.value);
    localStorage.setItem("token", response.data.access_token);
    isAuthenticated.value = true;
    loadTasks();
  } catch {
    alert("Login failed! Check your credentials.");
  }
};

const loadTasks = async () => {
  try {
    const response = await getTasks();
    if (response.data.message) {
      activities.value = [];
    } else {
      activities.value = response.data;
    }
    // Set progress immediately
    progress.value = 0;
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
};

const handleNavigate = (tab) => {
  activeTab.value = tab;
};

const handleProgressTypeChange = (type) => {
  activeProgressType.value = type;
};

onMounted(() => {
  // Format current date
  const today = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "long",
  };
  date.value = today.toLocaleDateString("en-US", options);

  checkAuth();
  if (isAuthenticated.value) {
    loadTasks();
  }
});
</script>

<style scoped>
/* All styles have been moved to globals.css */
.content-container {
  padding: 1rem;
}

.activities-container {
  margin-top: 1rem;
}

.progress-container {
  margin-bottom: 1rem;
}
</style>
