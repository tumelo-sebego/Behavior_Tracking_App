<template>
  <div>
    <h2>Daily Progress: {{ progress }}%</h2>
  </div>
</template>

<script>
import { useTaskStore } from "@/store/tasks";
import { onMounted } from "vue";

export default {
  setup() {
    const taskStore = useTaskStore();

    onMounted(() => {
      taskStore.fetchTasks();
    });

    return { progress: taskStore.progress };
  },
};
</script>
