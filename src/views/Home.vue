<template>
  <div class="min-h-screen bg-green-100">
    <!-- Show Login Form if Not Logged In -->
    <div v-if="!isAuthenticated" class="p-4">
      <Card class="p-shadow-3">
        <template #title>Login</template>
        <template #content>
          <form @submit.prevent="login" class="p-fluid">
            <FloatLabel>
              <InputText id="email" v-model="email" />
              <label for="email">Email</label>
            </FloatLabel>

            <FloatLabel class="p-mt-3">
              <Password id="password" v-model="password" toggleMask />
              <label for="password">Password</label>
            </FloatLabel>

            <Button
              label="Login"
              icon="pi pi-sign-in"
              class="p-mt-3"
              type="submit" />
          </form>
          <p class="p-mt-3">
            <router-link to="/forgot-password">Forgot Password?</router-link>
          </p>
          <Button
            label="Register"
            class="p-button-secondary"
            @click="$router.push('/register')" />
        </template>
      </Card>
    </div>

    <template v-else>
      <!-- Main Content when authenticated -->
      <div class="p-4">
        <!-- Header -->
        <h1 class="text-2xl font-semibold mb-4">Ola,{{ username }}</h1>

        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <ProgressSpinner />
          <p class="ml-3">Loading tasks...</p>
        </div>

        <template v-else>
          <!-- Progress Circle and Tasks -->
          <div class="bg-white rounded-lg p-6 mb-4 text-center">
            <div class="relative w-32 h-32 mx-auto mb-4">
              <svg class="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  stroke-width="3" />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4ade80"
                  stroke-width="3"
                  :stroke-dasharray="`${calculateProgress()}, 100`" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-3xl font-semibold text-green-500"
                  >{{ calculateProgress() }}%</span
                >
              </div>
            </div>

            <!-- Task List -->
            <div class="space-y-3">
              <div v-if="tasks.length === 0" class="text-center p-4">
                <p class="text-gray-600">You have no tasks for today.</p>
                <Button
                  label="Add Task"
                  icon="pi pi-plus"
                  @click="goToAddTask"
                  class="mt-3" />
              </div>

              <div
                v-else
                v-for="task in tasks"
                :key="task.title"
                class="bg-green-50 rounded-lg p-3 flex justify-between items-center">
                <div class="flex items-center">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="
                      task.completed ? 'bg-green-500' : 'bg-blue-500'
                    "></div>
                  <span
                    class="ml-2"
                    :class="{ 'line-through text-gray-500': task.completed }">
                    {{ task.title }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-600">{{ task.points }} points</span>
                  <Button
                    v-if="!task.completed"
                    icon="pi pi-check"
                    class="p-button-rounded p-button-success p-button-sm"
                    @click="markComplete(task.title)" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom Navigation -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div class="flex justify-between p-4 max-w-md mx-auto">
          <router-link to="/" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              class="flex items-center justify-center w-12 h-12 rounded-full"
              :class="
                $route.path === '/' ? 'bg-green-500 text-white' : 'bg-gray-200'
              ">
              <span class="material-icons">home</span>
            </button>
          </router-link>
          <router-link to="/tasks" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              class="flex items-center justify-center w-12 h-12 rounded-full"
              :class="
                $route.path === '/tasks'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              ">
              <span class="material-icons">grid_view</span>
            </button>
          </router-link>
          <router-link to="/timer" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              class="flex items-center justify-center w-12 h-12 rounded-full"
              :class="
                $route.path === '/timer'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              ">
              <span class="material-icons">play_circle</span>
            </button>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import ProgressSpinner from "primevue/progressspinner";
import { login, getTasks, completeTask } from "@/api.js";

const router = useRouter();
const route = useRoute();
const isAuthenticated = ref(false);
const email = ref("");
const password = ref("");
const tasks = ref([]);
const loading = ref(true);
const username = ref("Tumelo"); // You might want to get this from your auth system

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
  loading.value = true;
  try {
    const response = await getTasks();
    if (response.data.message) {
      tasks.value = [];
    } else {
      tasks.value = response.data;
    }
  } finally {
    setTimeout(() => (loading.value = false), 2000);
  }
};

const calculateProgress = () => {
  if (!tasks.value.length) return 0;
  const completedPoints = tasks.value
    .filter((task) => task.completed)
    .reduce((total, task) => total + task.points, 0);
  const totalPoints = tasks.value.reduce(
    (total, task) => total + task.points,
    0,
  );
  return Math.round((completedPoints / totalPoints) * 100) || 0;
};

const markComplete = async (taskTitle) => {
  await completeTask(taskTitle);
  const task = tasks.value.find((t) => t.title === taskTitle);
  if (task) task.completed = true;
};

const goToAddTask = () => router.push("/add-task");

onMounted(() => {
  checkAuth();
  if (isAuthenticated.value) loadTasks();
});
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/* Progress circle animation */
path {
  transition: stroke-dasharray 0.5s ease;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
