import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    progress: 0,
  }),
  actions: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.tasks = response.data.tasks;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async completeTask(taskId) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          "http://127.0.0.1:5000/tasks/complete",
          { task_id: taskId },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        this.fetchTasks(); // Refresh task list
      } catch (error) {
        console.error("Error completing task:", error);
      }
    },
  },
});
