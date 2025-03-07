<template>
  <div>
    <h2>Today's Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ completed: task.completed }">{{ task.title }} - {{ task.points }} pts</span>
        <button v-if="!task.completed" @click="completeTask(task.id)">✔ Complete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useTaskStore } from '@/store/tasks';
import { onMounted } from 'vue';

export default {
  setup() {
    const taskStore = useTaskStore();

    onMounted(() => {
      taskStore.fetchTasks();
    });

    return { 
      tasks: taskStore.tasks, 
      completeTask: taskStore.completeTask 
    };
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
