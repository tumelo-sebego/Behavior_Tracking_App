<template>
  <div class="add-task">
    <h2>Add Tasks</h2>

    <div v-for="(task, index) in tasks" :key="index" class="task-item">
      <div class="p-field">
        <label>Task Title</label>
        <InputText
          v-model="task.title"
          placeholder="Enter task title"
          class="p-inputtext-sm" />
      </div>

      <div class="p-field">
        <label>Points</label>
        <InputNumber
          v-model="task.points"
          :min="0"
          :max="100"
          class="p-inputnumber-sm" />
      </div>

      <Button
        label="Remove"
        icon="pi pi-trash"
        severity="danger"
        class="p-button-sm"
        @click="removeTask(index)" />
    </div>

    <Button
      label="+ Add Another Task"
      icon="pi pi-plus"
      class="p-mb-2 p-button-sm"
      @click="addTask" />

    <Message v-if="totalPoints !== 100" severity="error" class="p-mt-2">
      Total points must be exactly 100. Current: {{ totalPoints }}
    </Message>

    <Button
      label="Submit Tasks"
      icon="pi pi-check"
      class="p-mt-3 p-button-sm"
      :disabled="totalPoints !== 100"
      @click="submitTasks" />
  </div>
</template>

<script>
import { createTask } from "@/api.js";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Message from "primevue/message";

export default {
  components: {
    InputText,
    InputNumber,
    Button,
    Message,
  },
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

.task-item {
  margin-bottom: 10px;
}

.p-field {
  margin-bottom: 10px;
}
</style>
