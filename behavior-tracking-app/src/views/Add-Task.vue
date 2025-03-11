<template>
  <div>
    <h2>Add Tasks</h2>

    <div v-for="(task, index) in tasks" :key="index">
      <input v-model="task.title" placeholder="Task Title" />
      <input v-model.number="task.points" type="number" placeholder="Points" />
      <button @click="removeTask(index)">Remove</button>
    </div>

    <button @click="addTask">+ Add Another Task</button>

    <p v-if="totalPoints !== 100" style="color: red">
      Total points must be exactly 100. Current: {{ totalPoints }}
    </p>

    <button @click="submitTasks" :disabled="totalPoints !== 100">
      Submit Tasks
    </button>
  </div>
</template>

<script>
import { createTask } from "@/api.js";

export default {
  data() {
    return {
      tasks: [{ title: "", points: 0 }],
    };
  },
  computed: {
    totalPoints() {
      return this.tasks.reduce((sum, task) => sum + task.points, 0);
    },
  },
  methods: {
    addTask() {
      this.tasks.push({ title: "", points: 0 });
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    async submitTasks() {
      if (this.totalPoints !== 100) {
        alert("Total points must be exactly 100!");
        return;
      }

      try {
        await createTask(this.tasks);
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
