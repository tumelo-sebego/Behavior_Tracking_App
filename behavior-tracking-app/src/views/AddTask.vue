<template>
  <div class="add-task">
    <h1>Add New Task</h1>
    <form @submit.prevent="addTask">
      <label for="taskName">Task Name:</label>
      <input type="text" v-model="taskName" required />

      <label for="points">Task Points:</label>
      <input type="number" v-model="points" min="1" max="100" required />

      <button type="submit">Add Task</button>
    </form>

    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
import { createTask } from "@/api.js";

export default {
  data() {
    return {
      taskName: "",
      points: "",
    };
  },
  methods: {
    async addTask() {
      try {
        await createTask({ name: this.taskName, points: this.points });
        this.$router.push("/"); // Redirect back to Home after adding
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
  },
};
</script>

<style scoped>
.add-task {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
</style>
