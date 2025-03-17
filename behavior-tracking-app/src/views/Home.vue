<template>
  <Menubar :model="menuItems" class="p-mb-3" />

  <Sidebar v-model:visible="sidebarVisible">
    <h3>Menu</h3>
    <Button
      label="Home"
      icon="pi pi-home"
      @click="$router.push('/')"
      class="p-button-text" />
    <Button
      label="Add Task"
      icon="pi pi-plus"
      @click="$router.push('/add-task')"
      class="p-button-text" />
    <Button
      label="Logout"
      icon="pi pi-sign-out"
      @click="logout"
      class="p-button-danger" />
  </Sidebar>

  <div class="p-container">
    <!-- Show Login Form if Not Logged In -->
    <Card v-if="!isAuthenticated" class="p-shadow-3">
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

    <!-- Loading Spinner -->
    <div v-else-if="loading" class="p-text-center">
      <ProgressSpinner />
      <p>Loading tasks...</p>
    </div>

    <!-- No Tasks Message -->
    <Card v-else-if="tasks.length === 0" class="p-shadow-3">
      <template #title>No Tasks for Today</template>
      <template #content>
        <p>
          You have no tasks for today. Add new tasks to track your progress.
        </p>
        <Button label="Add Task" icon="pi pi-plus" @click="goToAddTask" />
      </template>
    </Card>

    <!-- Daily Tasks Table -->
    <Card v-else class="p-shadow-3">
      <template #title>Daily Tasks</template>
      <template #content>
        <DataTable :value="tasks" class="p-mt-3">
          <Column field="title" header="Task">
            <template #body="slotProps">
              <span :class="{ completed: slotProps.data.completed }">{{
                slotProps.data.title
              }}</span>
            </template>
          </Column>
          <Column field="points" header="Points"></Column>
          <Column header="Action">
            <template #body="slotProps">
              <Button
                v-if="!slotProps.data.completed"
                icon="pi pi-check"
                label="Complete"
                class="p-button-success"
                @click="markComplete(slotProps.data.title)" />
            </template>
          </Column>
        </DataTable>
        <h2 class="p-mt-3">Daily Progress: {{ progress }}%</h2>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { login, getTasks, completeTask } from "@/api.js";
import Menubar from "primevue/menubar";
import Sidebar from "primevue/sidebar";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import ProgressSpinner from "primevue/progressspinner";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    Menubar,
    Sidebar,
    Card,
    InputText,
    Password,
    Button,
    FloatLabel,
    ProgressSpinner,
    DataTable,
    Column,
  },
  setup() {
    const isAuthenticated = ref(false);
    const email = ref("");
    const password = ref("");
    const tasks = ref([]);
    const progress = ref(0);
    const loading = ref(true);
    const sidebarVisible = ref(false);
    const router = useRouter();

    const menuItems = ref([
      { label: "Home", icon: "pi pi-home", command: () => router.push("/") },
      {
        label: "Add Task",
        icon: "pi pi-plus",
        command: () => router.push("/add-task"),
      },
      { label: "Logout", icon: "pi pi-sign-out", command: () => logout() },
    ]);

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
        console.log(response.data);
        tasks.value = response.data;
        progress.value = tasks.value
          .filter((task) => task.completed)
          .reduce((total, task) => total + task.points, 0);
      } finally {
        setTimeout(() => (loading.value = false), 2000);
      }
    };

    const markComplete = async (taskTitle) => {
      await completeTask(taskTitle);
      const task = tasks.value.find((t) => t.title === taskTitle);
      if (task) task.completed = true;
      progress.value = tasks.value
        .filter((task) => task.completed)
        .reduce((total, task) => total + task.points, 0);
    };

    const logout = () => {
      localStorage.removeItem("token");
      isAuthenticated.value = false;
      router.push("/");
    };

    onMounted(() => {
      checkAuth();
      if (isAuthenticated.value) loadTasks();
    });

    return {
      isAuthenticated,
      email,
      password,
      tasks,
      progress,
      loading,
      sidebarVisible,
      menuItems,
      login: loginUser,
      loadTasks,
      markComplete,
      logout,
      goToAddTask: () => router.push("/add-task"),
    };
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: gray;
}
.p-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
</style>
