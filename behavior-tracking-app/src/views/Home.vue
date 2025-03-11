<template>
  <div v-if="!isAuthenticated">
    <!-- Show Login Form if Not Logged In -->
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required />
      <button type="submit">Login</button>
    </form>
    <p><router-link to="/forgot-password">Forgot Password?</router-link></p>
    <button @click="$router.push('/register')">Register</button>
  </div>

  <!-- If no tasks, show the "Add New Task" view -->
  <div v-else-if="tasks.length === 0">
    <p>You have no tasks for today. Add new tasks to track your progress.</p>
    <button @click="goToAddTask">Add Task</button>
  </div>

  <div v-else>
    <!-- Show Daily Tasks if Logged In -->
    <h1>Daily Tasks</h1>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        <span :class="{ completed: task.completed }"
          >{{ task.name }} - {{ task.points }} pts</span
        >
        <button @click="markComplete(task._id)" v-if="!task.completed">
          ✔ Complete
        </button>
      </li>
    </ul>
    <h2>Daily Progress: {{ progress }}%</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { login, getTasks, completeTask, getDailyProgress } from "@/api.js";

export default {
  data() {
    return {
      isAuthenticated: false,
      email: "",
      password: "",
      tasks: [],
      progress: 0,
    };
  },
  created() {
    this.checkAuth();
    if (this.isAuthenticated) {
      this.loadTasks();
    }
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      this.isAuthenticated = !!token;
    },
    async login() {
      try {
        const response = await login(this.email, this.password);
        localStorage.setItem("token", response.data.token);
        this.isAuthenticated = true;
        this.loadTasks();
      } catch (error) {
        alert("Login failed! Check your credentials.");
      }
    },
    async loadTasks() {
      this.tasks = (await getTasks()).data;
      this.progress = (await getDailyProgress()).data.progress;
    },
    async markComplete(taskId) {
      await completeTask(taskId);
      this.loadTasks();
    },
    logout() {
      localStorage.removeItem("token");
      this.isAuthenticated = false;
      this.$router.push("/"); // Stay on Home page
    },
    goToAddTask() {
      this.$router.push("/add-task"); // Navigate to Add Task page
    },
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
